/**
 * @file NetworkUpdater.js
 * @description Gère toute la communication réseau entre le client et le serveur.
 * Synchronise les joueurs, les ennemis (Moblin/Octorok), les projectiles, les explosions et le loot.
 */

import { NetworkPlayer } from '../entities/Player/NetworkPlayer.js';

export class NetworkUpdater {
    /**
     * @param {Player} localPlayer - Instance du héros local
     * @param {GameEngine} engine - Instance du moteur de jeu
     * @param {boolean} forceHost - Indique si ce client est l'Hôte
     */
    constructor(localPlayer, engine, forceHost = false) {
        this.localPlayer = localPlayer;
        this.engine = engine;

        this.remotePlayers = {};
        this.remoteEnemies = {};

        this.isHost = forceHost;
        this.socket = window.menuSocket || ((typeof io !== 'undefined') ? io() : null);

        // Référence globale pour les entités
        if (!window.game) window.game = {};
        window.game.network = this;

        this.setupListeners();
    }

    setupListeners() {
        if (!this.socket) return;

        // 1. INITIALISATION DU SKIN
        this.socket.on('init_player', ({ skin }) => {
            if (this.localPlayer && typeof this.localPlayer.setSkin === 'function') {
                this.localPlayer.setSkin(skin);
            }
            window.dispatchEvent(new CustomEvent('network_ready'));
        });

        // 2. POSITION DES JOUEURS DISTANTS
        this.socket.on('network_update', ({ id, data }) => {
            if (id === this.socket.id) return;

            const parts = data.split('|');
            const [action, x, y, vx, vy, skin] = parts;

            if (!this.remotePlayers[id]) {
                const np = new NetworkPlayer(parseInt(x), parseInt(y), skin);
                np.socketId = id;
                this.remotePlayers[id] = np;
                this.engine.add(np);
            }

            this.remotePlayers[id].onNetworkUpdate(data);
        });

        // 3. ACTIONS (ATTAQUES, SONS)
        this.socket.on('network_player_action', ({ id, action, facing }) => {
            if (id !== this.socket.id) {
                this.remotePlayers[id]?.triggerAction(action, facing);
            }
        });

        // 4. SYNCHRONISATION DES ENNEMIS (Avec isAiming et isHurt pour les frames)
        this.socket.on('network_enemies', async (enemiesData) => {
            if (this.isHost) return;

            const currentIds = [];

            for (const dataString of enemiesData) {
                // On récupère les 7 paramètres (netId, x, y, facing, type, isAiming, isHurt)
                const [netId, x, y, facing, type, isAiming, isHurt] = dataString.split('|');
                currentIds.push(netId);

                if (!this.remoteEnemies[netId]) {
                    let mob;
                    if (type === 'OCTOROK') {
                        const { NetworkOctorok } = await import('../entities/Enemies/NetworkOctorok.js');
                        mob = new NetworkOctorok(parseFloat(x), parseFloat(y));
                    } else if (type === 'MALDREK') {
                        const { NetworkMaldrek } = await import('../entities/Enemies/NetworkMaldrek.js');
                        mob = new NetworkMaldrek(parseFloat(x), parseFloat(y));
                    } else if (type === 'MINIBOSS') {
                        const { NetworkMiniBoss } = await import('../entities/Enemies/NetworkMiniBoss.js');
                        mob = new NetworkMiniBoss(parseFloat(x), parseFloat(y));
                    } else if (type === 'CREUSE') {
                        const { NetworkCreuse } = await import('../entities/Enemies/NetworkCreuse.js');
                        mob = new NetworkCreuse(parseFloat(x), parseFloat(y));
                    } else {
                        const { NetworkMoblin } = await import('../entities/Enemies/NetworkMoblin.js');
                        mob = new NetworkMoblin(parseFloat(x), parseFloat(y));
                    }

                    mob.netId = netId;
                    this.remoteEnemies[netId] = mob;
                    this.engine.add(mob);
                } else {
                    // Mise à jour visuelle : on transmet l'état de tir ET de douleur
                    this.remoteEnemies[netId].updateFromNetwork(
                        x, 
                        y, 
                        facing, 
                        type === 'CREUSE' ? parseInt(isAiming) : isAiming === 'true', 
                        isHurt === 'true'
                    );
                }
            }

            // Nettoyage des ennemis morts
            for (const id in this.remoteEnemies) {
                if (!currentIds.includes(id)) {
                    this.engine.remove(this.remoteEnemies[id]);
                    delete this.remoteEnemies[id];
                }
            }
        });

        // 5. GESTION DU LOOT (ÉMERAUDES / COEURS)
        this.socket.on('network_item_spawn', async ({ id, x, y, type }) => {
            if (this.isHost) return;
            const path = type === "HEART" ? "../entities/Items/Heart.js" : "../entities/Items/Emerald.js";
            try {
                const mod = await import(path);
                const ItemClass = type === "HEART" ? mod.Heart : mod.Emerald;
                const item = new ItemClass(x, y);
                item.netId = id;
                this.engine.add(item);
            } catch (e) {
                console.error("Erreur spawn item réseau:", e);
            }
        });

        this.socket.on('network_item_remove', ({ id }) => {
            const item = this.engine.entities.find(e => e.netId === id);
            if (item) this.engine.remove(item);
        });

        // 6. PROJECTILES OCTOROK ET MAGIC
        this.socket.on('network_projectile_spawn', async (data) => {
            if (this.isHost) return;
            try {
                if (data.type === 'MAGIC') {
                    const { MagicProjectile } = await import('../entities/Enemies/MagicProjectile.js');
                    // Compute dirX, dirY and speed from vx, vy
                    const speed = Math.hypot(data.vx, data.vy) || 1;
                    const proj = new MagicProjectile(data.x, data.y, data.vx/speed, data.vy/speed, speed, data.ownerId);
                    proj.netId = data.id;
                    proj.collider = false;
                    this.engine.add(proj);
                } else {
                    const { OctorokProjectile } = await import('../entities/Enemies/OctorokProjectile.js');
                    const proj = new OctorokProjectile(data.x, data.y, data.vx, data.vy, data.ownerId);
                    proj.netId = data.id;
                    proj.collider = false; 
                    this.engine.add(proj);
                }
            } catch (e) {
                console.error("Erreur projectile réseau:", e);
            }
        });

        // 7. EXPLOSIONS
        this.socket.on('network_explosion', async ({ x, y }) => {
            if (this.isHost) return;
            try {
                const { Explosion } = await import('../entities/Effects/Explosion.js');
                this.engine.add(new Explosion(x, y));
            } catch (e) {
                console.error("Erreur explosion réseau:", e);
            }
        });

        // 8. CHANGEMENT DE ZONE (synchronisation entre joueurs)
        this.socket.on('network_zone_change', async ({ zone, entryDir }) => {
            const zm = window.game.zoneManager;
            if (zm && zm.currentZone !== zone) {
                await zm.loadZone(zone, entryDir);
                console.log(`[Network] Zone synchronisee : ${zone}`);
            }
        });

        // 9. DÉCONNEXION
        this.socket.on('player_disconnected', (id) => {
            if (this.remotePlayers[id]) {
                this.engine.remove(this.remotePlayers[id]);
                delete this.remotePlayers[id];
            }
        });

        // 10. RÉCEPTION DÉGÂTS (Exécuté sur l'Hôte uniquement)
        this.socket.on('network_enemy_hit', ({ enemyNetId, damage, direction }) => {
            if (!this.isHost) return;
            const realMob = this.engine.entities.find(e => e.netId === enemyNetId);
            if (realMob && typeof realMob.takeDamage === 'function') {
                realMob.takeDamage(direction);
            }
        });
    }

    // --- MÉTHODES D'ENVOI ---

    sendHit(enemyNetId, damage, direction) {
        this.socket?.emit('enemy_hit', { enemyNetId, damage, direction });
    }

    sendPlayerAction(action, facing) {
        this.socket?.emit('player_action', { action, facing });
    }

    sendUpdate() {
        if (!this.socket || !this.localPlayer) return;

        const p = this.localPlayer;
        const action = p.actionAnimation?.type || 'IDLE';

        // Envoi joueur local
        const msg = `${action}|${Math.round(p.x)}|${Math.round(p.y)}|${Math.round(p.velX ?? 0)}|${Math.round(p.velY ?? 0)}|${p.skinId}|${p.facing}|${p.arrows || 0}|${p.isPainFlashing ? 'true' : 'false'}`;
        this.socket.emit('player_update', msg);

        // Si Hôte : diffusion état global des ennemis
        if (this.isHost) {
            const enemies = this.engine.entities.filter(e => e.hasTag('ENEMY') && e.enemyType !== 'SCIE' && !e.toRemove);
            const enemiesData = enemies.map(e => {
                if (!e.netId) e.netId = 'mob_' + Math.random().toString(36).slice(2, 7);

                const type = e.enemyType || 'MOBLIN';
                let isAimingState = "false";
                if (type === "CREUSE") isAimingState = e.frame !== undefined ? e.frame.toString() : "0";
                else if (type === "MINIBOSS") isAimingState = (e.state === "CHARGE_WINDUP" || e.state === "CHARGE") ? "true" : "false";
                else if (type === "MALDREK") isAimingState = (e.state === "CHARGE_WINDUP" || e.state === "CHARGE" || e.state === "CAST") ? "true" : "false";
                else isAimingState = (e.state === "AIM" || e.state === "CHARGING") ? "true" : "false";

                const isHurt = e.painState ? "true" : "false"; 

                return `${e.netId}|${Math.round(e.x)}|${Math.round(e.y)}|${e.facing}|${type}|${isAimingState}|${isHurt}`;
            });
            this.socket.emit('enemies_update', enemiesData);
        }
    }

    sendExplosion(x, y) {
        if (!this.isHost || !this.socket) return;
        this.socket.emit('explosion', { x, y });
    }

    sendItemPickup(itemId) {
        this.socket?.emit('item_collected', { id: itemId });
    }
}