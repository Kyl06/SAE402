// Réplication réseau Host/Client via Socket.io
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

    // Confirmation de rôle
    this.socket.on("init_player", ({ skin }) => {
      this.localPlayer?.setSkin?.(skin);
      window.dispatchEvent(new CustomEvent("network_ready"));
    });

    // Sync joueur distant (sérialisation compacte "ACTION|X|Y|...")
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

    // Sync ennemis (ignoré si zone différente du host)
    this.socket.on("network_enemies", async (data) => {
      if (this.isHost) return;

      const enemiesData = Array.isArray(data) ? data : (data.enemies || []);
      const hostZone = data.zone || null;

      const zm = window.game.zoneManager;
      if (hostZone && zm && zm.currentZone !== hostZone) return;

      const currentIds = [];

      for (const dataString of enemiesData) {
        const [netId, x, y, facing, type, isAiming, isHurt, hp] = dataString.split("|");
        currentIds.push(netId);

        if (!(netId in this.remoteEnemies)) {
          const config = {
            OCTOROK: "../entities/Enemies/NetworkOctorok.js",
            MALDREK: "../entities/Enemies/NetworkMaldrek.js",
            MINIBOSS: "../entities/Enemies/NetworkMiniBoss.js",
            CREUSE: "../entities/Enemies/NetworkCreuse.js",
            MOBLIN: "../entities/Enemies/NetworkMoblin.js"
          };

          if (config[type]) {
            this.remoteEnemies[netId] = "loading"; // Réserve le slot avant l'await
            const module = await import(config[type]);
            if (this.remoteEnemies[netId] !== "loading") continue; // Zone changée pendant l'await
            const ClassName = Object.keys(module)[0];
            const mob = new module[ClassName](parseFloat(x), parseFloat(y));
            mob.netId = netId;
            this.remoteEnemies[netId] = mob;
            this.engine.add(mob);
          } else { continue; }
        } else if (typeof this.remoteEnemies[netId] === "object") {
          const mob = this.remoteEnemies[netId];
          const isA = isAiming === "true" || (type === "CREUSE" ? parseInt(isAiming) : false);
          mob.updateFromNetwork(x, y, facing, isA, isHurt === "true", parseFloat(hp));
        }
      }

      // Suppression des ennemis absents du paquet
      for (const id in this.remoteEnemies) {
        if (!currentIds.includes(id)) {
          if (typeof this.remoteEnemies[id] === "object") {
            this.engine.remove(this.remoteEnemies[id]);
          }
          delete this.remoteEnemies[id];
        }
      }
    });

    // Spawn items distants
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

    // Spawn projectiles distants
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
      proj.collider = false; // Visuel uniquement côté client
      this.engine.add(proj);
    });

    this.socket.on("network_explosion", async ({ x, y }) => {
      if (this.isHost) return;
      const { Explosion } = await import("../entities/Effects/Explosion.js");
      this.engine.add(new Explosion(x, y));
    });

    // Changement de zone distant
    this.socket.on("network_zone_change", async ({ zone, entryDir, spawnX, spawnY }) => {
      const zm = window.game.zoneManager;
      if (zm?.currentZone !== zone) {
        await zm.loadZone(zone, entryDir, spawnX, spawnY);
      }
    });

    // Sync quêtes
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

    this.socket.on("player_disconnected", (id) => {
      if (this.remotePlayers[id]) {
        this.engine.remove(this.remotePlayers[id]);
        delete this.remotePlayers[id];
      }
    });

    // Host valide les dégâts envoyés par le client
    this.socket.on("network_enemy_hit", ({ enemyNetId, damage, direction }) => {
      if (!this.isHost) return;
      this.engine.entities.find((e) => e.netId === enemyNetId)?.takeDamage?.(damage, direction);
    });
  }

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
