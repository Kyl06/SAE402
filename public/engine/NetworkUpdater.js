/**
 * Hub de communication UDP-like (via Socket.io). 
 * Gère la réplication d'état entre l'Hôte (autorité monde) et le Client (miroir).
 * Utilise une sérialisation compacte en chaîne de caractères pour réduire la charge payload.
 */

import { NetworkPlayer } from "../entities/Player/NetworkPlayer.js";

export class NetworkUpdater {
  constructor(localPlayer, engine, isHost = false) {
    this.localPlayer = localPlayer;
    this.engine = engine;
    this.remotePlayers = {};
    this.remoteEnemies = {};
    this.isHost = isHost;

    this.socket = window.menuSocket || (typeof io !== "undefined" ? io() : null);
    if (!window.game) window.game = {};
    window.game.network = this;

    this.setupListeners();
  }

  setupListeners() {
    if (!this.socket) return;

    // Synchronisation du skin dès la connexion (Role confirmation)
    this.socket.on("init_player", ({ skin }) => {
      this.localPlayer?.setSkin?.(skin);
      window.dispatchEvent(new CustomEvent("network_ready"));
    });

    /**
     * Paquet Joueur : "ACTION|X|Y|VX|VY|SKIN|FACING|ARROWS|IS_PAIN"
     * Sérialisation manuelle pour éviter l'overhead JSON sur le tick de mouvement.
     */
    this.socket.on("network_update", ({ id, data }) => {
      if (id === this.socket.id) return;
      if (!this.remotePlayers[id]) {
        const parts = data.split("|");
        const np = new NetworkPlayer(parseInt(parts[1]), parseInt(parts[2]), parts[5]);
        np.socketId = id;
        this.remotePlayers[id] = np;
        this.engine.add(np);
      }
      this.remotePlayers[id].onNetworkUpdate(data);
    });

    this.socket.on("network_player_action", ({ id, action, facing }) => {
      if (id !== this.socket.id) this.remotePlayers[id]?.triggerAction(action, facing);
    });

    /**
     * Synchronisation des ennemis.
     * Note : On ignore les updates si l'hôte est dans une zone différente pour éviter
     * le despawn brutal des mobs côté client lors d'un respawn/transition de l'hôte.
     */
    this.socket.on("network_enemies", async (data) => {
      if (this.isHost) return;

      const zm = window.game.zoneManager;
      // Ignorer pendant une transition de zone
      if (zm?.transitioning) return;

      const enemiesData = Array.isArray(data) ? data : (data.enemies || []);
      const hostZone = data.zone || null;

      if (hostZone && zm && zm.currentZone !== hostZone) return;

      // Capturer la zone au début pour détecter un changement pendant les await
      const zoneAtStart = zm?.currentZone;
      const currentIds = [];

      for (const dataString of enemiesData) {
        const [netId, x, y, facing, type, isAiming, isHurt, hp] = dataString.split("|");
        currentIds.push(netId);

        if (!this.remoteEnemies[netId]) {
          const config = {
            OCTOROK: "../entities/Enemies/NetworkOctorok.js",
            MALDREK: "../entities/Enemies/NetworkMaldrek.js",
            MINIBOSS: "../entities/Enemies/NetworkMiniBoss.js",
            CREUSE: "../entities/Enemies/NetworkCreuse.js",
            MOBLIN: "../entities/Enemies/NetworkMoblin.js"
          };

          if (config[type]) {
            const module = await import(config[type]);
            // Après l'await, vérifier que la zone n'a pas changé
            if (zm?.currentZone !== zoneAtStart || zm?.transitioning) return;
            const ClassName = Object.keys(module)[0];
            const mob = new module[ClassName](parseFloat(x), parseFloat(y));
            mob.netId = netId;
            this.remoteEnemies[netId] = mob;
            this.engine.add(mob);
          } else { continue; }
        } else {
          const mob = this.remoteEnemies[netId];
          const isA = isAiming === "true" || (type === "CREUSE" ? parseInt(isAiming) : false);
          mob.updateFromNetwork(x, y, facing, isA, isHurt === "true", parseFloat(hp));
        }
      }

      // Garbage collection des entités mortes ou sorties de zone
      for (const id in this.remoteEnemies) {
        if (!currentIds.includes(id)) {
          this.engine.remove(this.remoteEnemies[id]);
          delete this.remoteEnemies[id];
        }
      }
    });

    // Gestion du Loot et des Projectiles (Spawning dynamique via imports asynchrones)
    this.socket.on("network_item_spawn", async ({ id, x, y, type }) => {
      if (this.isHost) return;
      const path = type === "HEART" ? "../entities/Items/Heart.js" : "../entities/Items/Emerald.js";
      const mod = await import(path);
      const item = new (type === "HEART" ? mod.Heart : mod.Emerald)(x, y);
      item.netId = id;
      this.engine.add(item);
    });

    this.socket.on("network_item_remove", ({ id }) => {
      const item = this.engine.entities.find((e) => e.netId === id);
      if (item) this.engine.remove(item);
    });

    this.socket.on("network_projectile_spawn", async (data) => {
      if (this.isHost) return;
      const isMagic = data.type === "MAGIC";
      const path = isMagic ? "../entities/Enemies/MagicProjectile.js" : "../entities/Enemies/OctorokProjectile.js";
      const mod = await import(path);
      const Class = isMagic ? mod.MagicProjectile : mod.OctorokProjectile;

      const speed = isMagic ? (Math.hypot(data.vx, data.vy) || 1) : 1;
      const proj = isMagic
        ? new Class(data.x, data.y, data.vx / speed, data.vy / speed, speed, data.ownerId)
        : new Class(data.x, data.y, data.vx, data.vy, data.ownerId);

      proj.netId = data.id;
      proj.collider = false; // Le client gère visuellement, l'hôte gère la collision réelle
      this.engine.add(proj);
    });

    this.socket.on("network_explosion", async ({ x, y }) => {
      if (this.isHost) return;
      const { Explosion } = await import("../entities/Effects/Explosion.js");
      this.engine.add(new Explosion(x, y));
    });

    this.socket.on("network_zone_change", async ({ zone, entryDir, spawnX, spawnY }) => {
      const zm = window.game.zoneManager;
      if (zm?.currentZone !== zone) {
        await zm.loadZone(zone, entryDir, spawnX, spawnY);
      }
    });

    // Synchronisation du QuestManager : L'hôte diffuse les changements d'état persistants
    this.socket.on("network_quest_update", ({ type, data }) => {
      const qm = window.game.questManager;
      if (!qm) return;
      const handlers = {
        PICK_UP_KEY: () => { qm.pickUpKey(true); this.engine.entities.find(e => e.hasTag("KEY"))?.kill(); },
        OPEN_CHEST: () => { qm.openChest(true); const c = this.engine.entities.find(e => e.hasTag("CHEST")); if (c) c.opened = true; },
        MOBLIN_KILL: () => qm.registerMoblinKill(true),
        BOSS_DEFEAT: () => qm.defeatBoss(true),
        MALDREK_DEFEAT: () => qm.defeatMaldrek(true)
      };
      handlers[type]?.();
    });

    // Un coéquipier est mort
    this.socket.on("network_player_died", (id) => {
      const rp = this.remotePlayers[id];
      if (rp) {
        rp.isDead = true;
        rp.visible = false;
      }
      this.allyDead = true;
    });

    // Respawn déclenché par le retour au village
    this.socket.on("network_player_respawn", () => {
      if (this.localPlayer?.isDead) {
        this.localPlayer.respawn();
        // Charger le village si on n'y est pas
        const zm = window.game.zoneManager;
        if (zm && zm.currentZone !== "village") {
          zm.loadZone("village", null, 400, 300);
        }
      }
    });

    this.socket.on("player_disconnected", (id) => {
      if (this.remotePlayers[id]) {
        this.engine.remove(this.remotePlayers[id]);
        delete this.remotePlayers[id];
      }
    });

    // Autorité Hôte : Reçoit les demandes de dégâts des clients et les valide localement
    this.socket.on("network_enemy_hit", ({ enemyNetId, damage, direction }) => {
      if (!this.isHost) return;
      this.engine.entities.find((e) => e.netId === enemyNetId)?.takeDamage?.(damage, direction);
    });
  }

  // --- API d'envoi (Abstraction socket.emit) ---

  sendHit(enemyNetId, damage, direction) {
    this.socket?.emit("enemy_hit", { enemyNetId, damage, direction });
  }

  sendPlayerAction(action, facing) {
    this.socket?.emit("player_action", { action, facing });
  }

  sendUpdate() {
    if (!this.socket || !this.localPlayer) return;
    const p = this.localPlayer;
    const action = p.actionAnimation?.type || "IDLE";

    const msg = `${action}|${Math.round(p.x)}|${Math.round(p.y)}|${Math.round(p.velX ?? 0)}|${Math.round(p.velY ?? 0)}|${p.skinId}|${p.facing}|${p.arrows || 0}|${p.isPainFlashing ? "true" : "false"}|${p.swordLevel || 0}|${p.bowLevel || 0}`;
    this.socket.emit("player_update", msg);

    if (this.isHost) {
      const currentZone = window.game.zoneManager?.currentZone || null;
      const enemies = this.engine.entities.filter(e => e.hasTag("ENEMY") && e.enemyType !== "SCIE" && e.enemyType !== "MAGIC_PROJECTILE" && !e.toRemove);

      const enemiesData = enemies.map((e) => {
        if (!e.netId) e.netId = "mob_" + Math.random().toString(36).slice(2, 7);
        const type = e.enemyType || "UNKNOWN";
        const isA = (type === "CREUSE") ? (e.frame ?? 0).toString()
          : (["BOSS", "MINIBOSS", "MALDREK"].includes(type) ? (["CHARGE_WINDUP", "CHARGE", "CAST"].includes(e.state)).toString()
            : (e.state === "AIM" || e.state === "CHARGING").toString());

        return `${e.netId}|${Math.round(e.x)}|${Math.round(e.y)}|${e.facing}|${type}|${isA}|${e.painState ? "true" : "false"}|${e.hp ?? ""}`;
      });
      this.socket.emit("enemies_update", { zone: currentZone, enemies: enemiesData });
    }
  }

  sendExplosion(x, y) { if (this.isHost) this.socket?.emit("explosion", { x, y }); }
  sendItemPickup(itemId) { this.socket?.emit("item_collected", { id: itemId }); }
}

