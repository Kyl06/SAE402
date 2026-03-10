import { NetworkPlayer } from '../entities/Player/NetworkPlayer.js';
import { NetworkMoblin } from '../entities/Enemies/NetworkMoblin.js';

export class NetworkUpdater {
    constructor(localPlayer, engine) {
        this.localPlayer = localPlayer;
        this.engine = engine;
        this.remotePlayers = {};
        this.remoteEnemies = {}; 
        this.isHost = false;

        this.socket = (typeof io !== 'undefined') ? io() : null;
        this.setupListeners();
    }

    setupListeners() {
        if (!this.socket) return;

        // 1. Initialisation (Assignation du skin et du rôle Host/Client)
        this.socket.on('init_player', ({ skin, isHost }) => {
            this.isHost = isHost;
            if (this.localPlayer && this.localPlayer.setSkin) {
                this.localPlayer.setSkin(skin);
            }
            console.log("Statut reçu : Host =", this.isHost);

            // Prévient le main.js que la connexion est établie
            window.dispatchEvent(new CustomEvent('network_ready'));
        });

        // 2. Mise à jour des autres JOUEURS
        this.socket.on('network_update', ({ id, data }) => {
            // SÉCURITÉ : Ne pas mettre à jour le joueur local avec ses propres données réseau
            // C'est ce qui empêchait tes animations de se jouer correctement
            if (id === this.socket.id) return;

            const [action, x, y, facing, skin] = data.split('|');

            if (!this.remotePlayers[id]) {
                const newNetPlayer = new NetworkPlayer(parseInt(x), parseInt(y), skin);
                this.remotePlayers[id] = newNetPlayer;
                this.engine.add(newNetPlayer);
            }

            const p = this.remotePlayers[id];
            // Met à jour la position et l'animation du fantôme (NetworkPlayer)
            p.onNetworkUpdate?.(data); 
        });

        // 3. Mise à jour des ENNEMIS (Pour les Clients seulement)
        this.socket.on('network_enemies', (enemiesData) => {
            if (this.isHost) return; // Le Host possède déjà les vrais objets

            enemiesData.forEach(data => {
                const [netId, x, y, facing] = data.split('|');

                if (!this.remoteEnemies[netId]) {
                    const mob = new NetworkMoblin(parseFloat(x), parseFloat(y));
                    mob.netId = netId; // On synchronise l'ID
                    this.remoteEnemies[netId] = mob;
                    this.engine.add(mob);
                } else {
                    this.remoteEnemies[netId].updateFromNetwork(x, y, facing);
                }
            });

            // Suppression des monstres morts ou disparus
            const currentIds = enemiesData.map(d => d.split('|')[0]);
            for (let id in this.remoteEnemies) {
                if (!currentIds.includes(id)) {
                    this.engine.remove(this.remoteEnemies[id]);
                    delete this.remoteEnemies[id];
                }
            }
        });

        // 4. Déconnexion d'un joueur
        this.socket.on('player_disconnected', (id) => {
            if (this.remotePlayers[id]) {
                this.engine.remove(this.remotePlayers[id]);
                delete this.remotePlayers[id];
            }
        });

        // 5. Réception d'un coup sur un ennemi (Traitement par le Host)
        this.socket.on('network_enemy_hit', ({ enemyNetId, damage, direction }) => {
            if (this.isHost) {
                // Le Host cherche le monstre "maître" pour lui retirer des PV
                const realMob = this.engine.entities.find(e => e.netId === enemyNetId);
                if (realMob && realMob.takeDamage) {
                    console.log("Coup validé par le Host sur :", enemyNetId);
                    // On applique les dégâts et le recul dans la bonne direction
                    realMob.takeDamage(direction || "DOWN");
                }
            }
        });
    }

    /**
     * Envoie un signal de dégâts au Host (utilisé par Sword.js / Arrow.js)
     */
    sendHit(enemyNetId, damage, direction) {
        if (this.socket) {
            this.socket.emit('enemy_hit', { enemyNetId, damage, direction });
        }
    }

    /**
     * Envoie les données du joueur local au serveur
     */
    sendUpdate() {
        if (!this.socket || !this.localPlayer) return;

        const p = this.localPlayer;
        const action = p.actionAnimation?.type || "IDLE";
        const msg = `${action}|${Math.round(p.x)}|${Math.round(p.y)}|${p.facing}|${p.skinId}`;
        this.socket.emit('player_update', msg);

        // Si Host : Diffusion de la position des ennemis à tous les clients
        if (this.isHost) {
            const enemies = this.engine.entities.filter(e => e.hasTag("ENEMY") && !e.toRemove);
            const enemiesData = enemies.map(e => {
                // On s'assure que chaque Moblin a un ID permanent
                if (!e.netId) e.netId = 'mob_' + Math.random().toString(36).slice(2, 7);
                return `${e.netId}|${Math.round(e.x)}|${Math.round(e.y)}|${e.facing}`;
            });
            this.socket.emit('enemies_update', enemiesData);
        }
    }
}