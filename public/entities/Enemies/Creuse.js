import { Entity } from "../../engine/Entity.js";
import { SpriteSheet } from "../../engine/SpriteSheet.js";
import { Explosion } from "../Effects/Explosion.js";
import { Heart } from "../Items/Heart.js";
import { Emerald } from "../Items/Emerald.js";

export class Creuse extends Entity {
  constructor(x, y) {
    super(x, y, 32, 32);
    this.addTag("ENEMY");
    this.enemyType = "CREUSE";

    this.state = "HIDDEN"; // HIDDEN, EMERGING, ACTIVE, HIDING
    this.timer = 0;
    this.frame = 0;

    this.aggroRange = 120; // Distance à laquelle il sort du sol
    this.hp = 2; // Peut être tué quand il est sorti

    // Spritesheet: 4 colonnes, 1 ligne, sprite de 16x16
    this.spriteSheet = new SpriteSheet("CREUSE", 4, 1, 16, 16);
  }

  update(delta) {
    if (this.toRemove) return;

    if (this.painState) {
      this.x += this.painState.velX * (delta / 1000);
      this.y += this.painState.velY * (delta / 1000);
      this.painState.msLeft -= delta;
      if (this.painState.msLeft <= 0) this.painState = null;
      super.update(delta);
      return;
    }

    const players = window.game.engine.entities.filter(
      (e) => e.hasTag("PLAYER") && !e.isDead,
    );
    let distToPlayer = Infinity;
    let targetPlayer = null;
    if (players.length > 0) {
      for (const p of players) {
        const d = Math.hypot(p.x - this.x, p.y - this.y);
        if (d < distToPlayer) {
          distToPlayer = d;
          targetPlayer = p;
        }
      }
    }

    switch (this.state) {
      case "HIDDEN":
        this.collider = false; // Intouchable
        this.frame = 0;
        if (distToPlayer < this.aggroRange) {
          this.state = "EMERGING";
          this.timer = 0;
        }
        break;
      case "EMERGING":
        this.collider = false;
        this.timer += delta;
        // Animation : 0 -> 1 -> 2 -> 3 (sur 400ms)
        if (this.timer > 100) this.frame = 1;
        if (this.timer > 200) this.frame = 2;
        if (this.timer > 300) {
          this.frame = 3;
          this.state = "ACTIVE";
          this.collider = true; // Devient solide et dangereux
        }
        break;
      case "ACTIVE":
        this.frame = 3;

        // Mouvement lent vers le joueur (chase)
        if (targetPlayer) {
          const dx = targetPlayer.x - this.x;
          const dy = targetPlayer.y - this.y;
          const mag = Math.hypot(dx, dy);
          if (mag > 0) {
            this.velX = (dx / mag) * 40; // 40 pixels/sec
            this.velY = (dy / mag) * 40;
          }
        }

        if (distToPlayer > this.aggroRange + 50) {
          // S'éloigne beaucoup
          this.state = "HIDING";
          this.timer = 0;
        }
        break;
      case "HIDING":
        this.velX = 0; // S'arrete
        this.velY = 0;
        this.collider = false;
        this.timer += delta;
        // Animation : 3 -> 2 -> 1 -> 0
        if (this.timer > 100) this.frame = 2;
        if (this.timer > 200) this.frame = 1;
        if (this.timer > 300) {
          this.frame = 0;
          this.state = "HIDDEN";
        }
        break;
    }

    // On ne l'affiche pas du tout si frame == 0 dans HIDDEN pour faire un vrai effet de surprise
    // Ou on peut laisser frame 0 s'il y a un trou visible sur l'image

    super.update(delta);
  }

  takeDamage(amount, direction) {
    if (typeof amount === "string") {
      direction = amount;
      amount = 1;
    }
    // Ne prends des dégâts que s'il est sorti
    if (this.state !== "ACTIVE" || this.toRemove || this.painState) return;

    this.hp -= (amount || 1);
    if (this.hp <= 0) {
      this.die();
      return;
    }

    const force = 150;
    this.painState = {
      msLeft: 120,
      velX: direction === "LEFT" ? -force : direction === "RIGHT" ? force : 0,
      velY: direction === "UP" ? -force : direction === "DOWN" ? force : 0,
    };
  }

  onCollision(other) {}

  die() {
    const engine = this.engine || window.game.engine;
    if (engine) engine.add(new Explosion(this.x, this.y));
    if (window.game.network) window.game.network.sendExplosion(this.x, this.y);

    this.spawnLoot();

    this.toRemove = true;
  }

  spawnLoot() {
    const engine = this.engine || window.game.engine;
    if (!engine) return;

    // Probabilités : 20% Rien, 60% Emeraude, 20% Coeur
    const rand = Math.random();
    let loot = null;
    let type = "";

    if (rand < 0.2) {
      return; // Pas de chance !
    } else if (rand < 0.8) {
      loot = new Emerald(this.x, this.y);
      type = "EMERALD";
    } else {
      // Un coeur doit tomber, mais on vérifie si quelqu'un en a besoin
      const players = engine.entities.filter((e) => e.hasTag("PLAYER"));
      const anyoneInjured = players.some((p) => p.hp < 6);

      if (anyoneInjured) {
        loot = new Heart(this.x, this.y);
        type = "HEART";
      } else {
        loot = new Emerald(this.x, this.y);
        type = "EMERALD";
      }
    }

    if (loot) {
      loot.netId = "item_" + Math.random().toString(36).slice(2, 9);
      engine.add(loot);

      // Envoi au serveur pour que le P2 la voie aussi
      if (window.game.network && window.game.network.isHost) {
        window.game.network.socket.emit("item_spawn", {
          id: loot.netId,
          x: loot.x,
          y: loot.y,
          type: type,
        });
      }
    }
  }

  draw(ctx) {
    // Ne dessine pas si c'est caché et qu'on ne veut rien montrer
    if (this.state === "HIDDEN" && this.frame === 0) {
      // Optionnel : ne pas la dessiner pour qu'il soit invisible
    }

    this.spriteSheet.drawFrame(ctx, this.frame, this.x, this.y, 2);
  }
}
