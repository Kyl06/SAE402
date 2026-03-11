/**
 * @file NetworkUpdater.js
 * @description Gère toute la communication réseau entre le client et le serveur.
 * Utilise Socket.io pour synchroniser les joueurs, les monstres, les actions et les explosions.
 */

import { NetworkPlayer } from '../entities/Player/NetworkPlayer.js';
import { NetworkMoblin } from '../entities/Enemies/NetworkMoblin.js';

export class NetworkUpdater {
    /**
     * @param {Player} localPlayer - Instance du héros local contrôlé par le clavier
     * @param {GameEngine} engine - Instance du moteur pour ajouter/supprimer des entités
     * @param {boolean} forceHost - Indique si ce client est l'Hôte (maître des ennemis)
     */
    constructor(localPlayer, engine, forceHost = false) {
        this.localPlayer  = localPlayer;
        this.engine       = engine;
        
        // Dictionnaires pour stocker les entités distantes par leur ID réseau
        this.remotePlayers = {}; // { socketId: NetworkPlayer }
        this.remoteEnemies = {}; // { netId: NetworkMoblin }
        
        // État du rôle (Hôte gère les mobs réels, Client affiche des clones réseau)
        this.isHost = forceHost;

        // Réutiliser le socket créé par le menu (évite une double connexion)
        this.socket = window.menuSocket || ((typeof io !== 'undefined') ? io() : null);

        // Expose l'instance réseau globalement pour faciliter l'envoi de coups (Sword.js / Arrow.js)
        window.game.network = this;

        this.setupListeners();
    }

    /**
     * Définit tous les écouteurs d'événements réseau.
     */
    setupListeners() {
        if (!this.socket) return;

        /**
         * ── 1. INITIALISATION DU JOUEUR ──────────────────────────────────────
         * Reçu après avoir choisi un rôle dans le menu.
         */
        this.socket.on('init_player', ({ skin, isHost }) => {
            // Note: isHost est déjà fixé par le constructeur via le menu, 
            // mais on garde ceci pour la cohérence serveur.
            this.localPlayer?.setSkin?.(skin);
            console.log(`[Net] Init reçu : Skin=${skin}, Host=${this.isHost}`);
            
            // Dispatch d'un événement vanilla pour prévenir d'autres modules si besoin
            window.dispatchEvent(new CustomEvent('network_ready'));
        });

        /**
         * ── 2. POSITION DES AUTRES JOUEURS ───────────────────────────────────
         * Reçu périodiquement pour chaque autre joueur connecté.
         */
        this.socket.on('network_update', ({ id, data }) => {
            if (id === this.socket.id) return; // Ignore nos propres messages

            const parts = data.split('|');
            // Format du message string : action|x|y|vx|vy|skinId|facing
            const x    = parseInt(parts[1]);
            const y    = parseInt(parts[2]);
            const skin = parts[5];

            // Si c'est un nouveau joueur qu'on ne connaît pas encore
            if (!this.remotePlayers[id]) {
                const np = new NetworkPlayer(x, y, skin);
                this.remotePlayers[id] = np;
                this.engine.add(np);
                console.log(`[Net] Nouveau joueur distant créé : ${id}`);
            }

            // Met à jour l'instance distante avec les nouvelles coordonnées
            this.remotePlayers[id].onNetworkUpdate(data);
        });

        /**
         * ── 3. ACTIONS DISTANTES (ATTAQUES) ──────────────────────────────────
         * Déclenche l'animation de coup d'épée ou de flèche sur le clone distant.
         */
        this.socket.on('network_player_action', ({ id, action, facing }) => {
            if (id === this.socket.id) return;
            const np = this.remotePlayers[id];
            if (np) {
                np.triggerAction(action, facing);
            }
        });

        /**
         * ── 4. SYNCHRONISATION DES ENNEMIS ───────────────────────────────────
         * Uniquement pour les clients (non-hôtes).
         * Reçoit la position de tous les monstres calculée par l'Hôte.
         */
        this.socket.on('network_enemies', (enemiesData) => {
            if (this.isHost) return; // L'hôte ignore ces messages car c'est lui qui les envoie

            enemiesData.forEach(data => {
                const [netId, x, y, facing] = data.split('|');

                // Si le monstre n'existe pas encore localement
                if (!this.remoteEnemies[netId]) {
                    const mob = new NetworkMoblin(parseFloat(x), parseFloat(y));
                    mob.netId = netId;
                    this.remoteEnemies[netId] = mob;
                    this.engine.add(mob);
                } else {
                    // Sinon on déplace le clone vers sa position réelle
                    this.remoteEnemies[netId].updateFromNetwork(x, y, facing);
                }
            });

            // Nettoyage : Si un monstre n'est plus dans le message, il est mort
            const currentIds = enemiesData.map(d => d.split('|')[0]);
            for (const id in this.remoteEnemies) {
                if (!currentIds.includes(id)) {
                    this.engine.remove(this.remoteEnemies[id]);
                    delete this.remoteEnemies[id];
                }
            }
        });

        /**
         * ── 5. DÉCONNEXION ───────────────────────────────────────────────────
         */
        this.socket.on('player_disconnected', (id) => {
            if (this.remotePlayers[id]) {
                this.engine.remove(this.remotePlayers[id]);
                delete this.remotePlayers[id];
                console.log(`[Net] Le joueur ${id} s'est déconnecté.`);
            }
        });

        /**
         * ── 6. VALIDATION DES DÉGÂTS (HOST ONLY) ─────────────────────────────
         * Reçu lorsqu'un client pense avoir touché un ennemi.
         * L'hôte vérifie dans son moteur de jeu et applique les dégâts réels.
         */
        this.socket.on('network_enemy_hit', ({ enemyNetId, damage, direction }) => {
            if (!this.isHost) return;
            // Trouve le "vrai" monstre dans l'instance de l'hôte
            const realMob = this.engine.entities.find(e => e.netId === enemyNetId);
            if (realMob?.takeDamage) {
                realMob.takeDamage(direction || 'DOWN');
            }
        });

        /**
         * ── 7. EXPLOSIONS DISTANTES ──────────────────────────────────────────
         * Reçu par tout le monde quand un ennemi meurt.
         * Affiche l'effet d'explosion aux coordonnées indiquées.
         */
        this.socket.on('network_explosion', async ({ x, y }) => {
            if (this.isHost) return; // L'hôte a déjà créé l'explosion localement
            
            // Import d'Explosion à la volée pour éviter les dépendances circulaires
            const { Explosion } = await import('../entities/Effects/Explosion.js');
            this.engine.add(new Explosion(x, y));
        });
    }

    // ── API PUBLIQUE (Appelée par les entités locales) ────────────────────────

    /** Informe l'Hôte qu'on a touché un ennemi. @param {string} enemyNetId */
    sendHit(enemyNetId, damage, direction) {
        this.socket?.emit('enemy_hit', { enemyNetId, damage, direction });
    }

    /** Diffuse une explosion (mort d'ennemi) à tous les clients. @param {number} x, y */
    sendExplosion(x, y) {
        this.socket?.emit('explosion', { x, y });
    }

    /** Signale une attaque (épée/flèche) aux autres joueurs. @param {string} action */
    sendPlayerAction(action, facing) {
        this.socket?.emit('player_action', { action, facing });
    }

    /**
     * Boucle principale réseau (appelée toutes les 33ms depuis main.js).
     * Envoie notre position et, si on est l'hôte, la position de tous les monstres.
     */
    sendUpdate() {
        if (!this.socket || !this.localPlayer) return;

        const p      = this.localPlayer;
        const action = p.actionAnimation?.type || 'IDLE';
        
        // Construction du message compact : action|x|y|vx|vy|skin|facing
        const msg = `${action}|${Math.round(p.x)}|${Math.round(p.y)}|${Math.round(p.velX ?? 0)}|${Math.round(p.velY ?? 0)}|${p.skinId}|${p.facing}`;
        this.socket.emit('player_update', msg);

        // L'HÔTE SEUL diffuse l'état du monde (les ennemis)
        if (this.isHost) {
            const enemies    = this.engine.entities.filter(e => e.hasTag('ENEMY') && !e.toRemove);
            const enemiesData = enemies.map(e => {
                // Assigne un ID réseau unique si manquant
                if (!e.netId) e.netId = 'mob_' + Math.random().toString(36).slice(2, 7);
                return `${e.netId}|${Math.round(e.x)}|${Math.round(e.y)}|${e.facing}`;
            });
            this.socket.emit('enemies_update', enemiesData);
        }
    }
}