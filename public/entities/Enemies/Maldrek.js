/**
 * @file Maldrek.js
 * @description Boss final. Humanoide sorcier, plus grand que les ennemis normaux.
 * Patterns : charge epee + projectiles magiques. 3 phases (accelere en perdant de la vie).
 */

import { Entity } from "../../engine/Entity.js";
import { Explosion } from "../Effects/Explosion.js";
import { Emerald } from "../Items/Emerald.js";
import { SCALE } from "../../constants.js";
import { SpriteSheet } from "../../engine/SpriteSheet.js";
import { MagicProjectile } from "./MagicProjectile.js";

export class Maldrek extends Entity {
  constructor(x, y) {
    super(x, y, 64, 64);
    this.spriteSheet = new SpriteSheet("MALDEK", 3, 4, 32, 36);

    this.netId = "maldrek_" + Math.random().toString(36).slice(2, 11);
    this.enemyType = "MALDREK";

    this.hp = 30;
    this.maxHp = 30;
    this.speed = 35;
    this.chaseSpeed = 60;
    this.chargeSpeed = 200;
    this.addTag("ENEMY");
    this.addTag("BOSS");

    this.state = "IDLE"; // IDLE, CHASE, CHARGE_WINDUP, CHARGE, STUNNED, CAST, TELEPORT
    this.stateTimer = 2000;
    this.facing = "DOWN";
    this.target = null;
    this.painState = null;

    // Phase (1, 2, 3)
    this.phase = 1;

    // Charge
    this.chargeDir = { x: 0, y: 0 };
    this.chargeDuration = 0;
    this.chargeCooldown = 0;

    // Projectiles
    this.castCooldown = 0;

    // Animation
    this.animTime = 0;
    this.flashTime = 0;
    this.z = 10;
    this.collider = true;
  }

  update(delta) {
    this.animTime += delta;
    if (this.flashTime > 0) this.flashTime -= delta;
    if (this.chargeCooldown > 0) this.chargeCooldown -= delta;
    if (this.castCooldown > 0) this.castCooldown -= delta;

    // Mise a jour de la phase
    const hpRatio = this.hp / this.maxHp;
    if (hpRatio <= 0.3) this.phase = 3;
    else if (hpRatio <= 0.6) this.phase = 2;

    if (this.painState) {
      this.handlePain(delta);
    } else {
      this.think(delta);
      this.act(delta);
    }
    super.update(delta);
  }

  think() {
    const players = window.game.engine.entities.filter(
      (e) => e.hasTag("PLAYER") && !e.isDead,
    );
    let closest = null;
    let minDist = 400;

    players.forEach((p) => {
      const d = Math.hypot(p.x - this.x, p.y - this.y);
      if (d < minDist) {
        minDist = d;
        closest = p;
      }
    });
    this.target = closest;
  }

  act(delta) {
    const phaseSpeedMult = 1 + (this.phase - 1) * 0.3;

    switch (this.state) {
      case "IDLE":
        this.velX = 0;
        this.velY = 0;
        this.stateTimer -= delta;
        if (this.target) {
          this.state = "CHASE";
        } else if (this.stateTimer <= 0) {
          this.stateTimer = 2000;
        }
        break;

      case "CHASE": {
        if (!this.target) {
          this.state = "IDLE";
          this.velX = 0;
          this.velY = 0;
          return;
        }
        this.chase(phaseSpeedMult);

        const dist = Math.hypot(this.target.x - this.x, this.target.y - this.y);

        // Tenter une charge
        if (dist < 150 && this.chargeCooldown <= 0) {
          this.startCharge();
          return;
        }

        // Lancer des projectiles
        if (dist > 80 && this.castCooldown <= 0) {
          this.startCast();
          return;
        }
        break;
      }

      case "CHARGE_WINDUP":
        this.velX = 0;
        this.velY = 0;
        this.stateTimer -= delta;
        if (this.stateTimer <= 0) {
          this.state = "CHARGE";
          this.chargeDuration = 500;
          this.velX = this.chargeDir.x * this.chargeSpeed * phaseSpeedMult;
          this.velY = this.chargeDir.y * this.chargeSpeed * phaseSpeedMult;
        }
        break;

      case "CHARGE":
        this.chargeDuration -= delta;
        if (this.chargeDuration <= 0) {
          this.state = "STUNNED";
          this.stateTimer = Math.max(400, 800 - this.phase * 150);
          this.velX = 0;
          this.velY = 0;
          this.chargeCooldown = Math.max(1500, 3000 - this.phase * 500);
        }
        break;

      case "STUNNED":
        this.velX = 0;
        this.velY = 0;
        this.stateTimer -= delta;
        if (this.stateTimer <= 0) {
          this.state = "CHASE";
        }
        break;

      case "CAST":
        this.velX = 0;
        this.velY = 0;
        this.stateTimer -= delta;
        if (this.stateTimer <= 0) {
          this.fireProjectiles();
          this.state = "CHASE";
          this.castCooldown = Math.max(1500, 3500 - this.phase * 600);
        }
        break;
    }
  }

  isBlocked(dirX, dirY) {
    const step = 16;
    const testX = this.x + dirX * step;
    const testY = this.y + dirY * step;
    const entities = window.game.engine.entities;
    for (let i = 0; i < entities.length; i++) {
      const e = entities[i];
      if (!e.collider || !e.hasTag("SOLID")) continue;
      const box = e.getCollisionBox();
      if (
        testX < box.x + box.w &&
        testX + this.width > box.x &&
        testY < box.y + box.h &&
        testY + this.height > box.y
      ) {
        return true;
      }
    }
    return false;
  }

  chase(speedMult) {
    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const speed = this.chaseSpeed * speedMult;

    let primX, primY, secX, secY;

    if (Math.abs(dx) > Math.abs(dy)) {
      primX = Math.sign(dx);
      primY = 0;
      secX = 0;
      secY = Math.sign(dy) || 1;
    } else {
      primX = 0;
      primY = Math.sign(dy);
      secX = Math.sign(dx) || 1;
      secY = 0;
    }

    if (!this.isBlocked(primX, primY)) {
      this.velX = primX * speed;
      this.velY = primY * speed;
    } else if (!this.isBlocked(secX, secY)) {
      this.velX = secX * speed;
      this.velY = secY * speed;
    } else if (!this.isBlocked(-secX, -secY)) {
      this.velX = -secX * speed;
      this.velY = -secY * speed;
    } else {
      this.velX = 0;
      this.velY = 0;
    }

    if (Math.abs(this.velX) > Math.abs(this.velY)) {
      this.facing = this.velX > 0 ? "RIGHT" : "LEFT";
    } else if (Math.abs(this.velY) > 0) {
      this.facing = this.velY > 0 ? "DOWN" : "UP";
    }
  }

  startCharge() {
    if (!this.target) return;
    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const dist = Math.hypot(dx, dy) || 1;
    this.chargeDir = { x: dx / dist, y: dy / dist };
    this.facing =
      Math.abs(dx) > Math.abs(dy)
        ? dx > 0
          ? "RIGHT"
          : "LEFT"
        : dy > 0
          ? "DOWN"
          : "UP";
    this.state = "CHARGE_WINDUP";
    this.stateTimer = Math.max(300, 600 - this.phase * 100);
  }

  startCast() {
    this.state = "CAST";
    this.stateTimer = 500;
  }

  fireProjectiles() {
    const cx = this.x + this.width / 2;
    const cy = this.y + this.height / 2;
    const count = this.phase + 2; // 3 en phase 1, 4 en phase 2, 5 en phase 3
    const speed = 120 + this.phase * 30;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + this.animTime * 0.001;
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);

      const proj = new MagicProjectile(cx, cy, dx, dy, speed, this.netId);
      proj.netId = "mag_" + Math.random().toString(36).slice(2, 9);
      window.game.engine.add(proj);

      if (window.game.network?.socket) {
        window.game.network.socket.emit("projectile", {
          x: cx,
          y: cy,
          vx: dx * speed,
          vy: dy * speed,
          id: proj.netId,
          ownerId: this.netId,
          type: "MAGIC",
        });
      }
    }
  }

  takeDamage(direction) {
    if (this.painState || this.toRemove) return;
    this.hp--;
    this.flashTime = 150;
    window.game.engine.shake(5, 120);

    if (this.hp <= 0) {
      this.die();
      return;
    }

    const force = 100;
    this.painState = {
      msLeft: 100,
      velX: direction === "LEFT" ? -force : direction === "RIGHT" ? force : 0,
      velY: direction === "UP" ? -force : direction === "DOWN" ? force : 0,
    };
  }

  handlePain(delta) {
    this.x += this.painState.velX * (delta / 1000);
    this.y += this.painState.velY * (delta / 1000);
    this.painState.msLeft -= delta;
    if (this.painState.msLeft <= 0) this.painState = null;
  }

  onCollision(other) {
    // Redirection : on laisse le Player gérer ses propres dégâts via son onCollision.
    // Cela garantit un recul correct calculé par le Player.
  }

  die() {
    if (this.toRemove) return;
    this.toRemove = true;

    const network = window.game.network;

    // Explosions multiples (diffusées au P2)
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const ox = this.x + (Math.random() - 0.5) * 60;
        const oy = this.y + (Math.random() - 0.5) * 60;
        window.game.engine.add(new Explosion(ox, oy));
        if (network) network.sendExplosion(ox, oy);
      }, i * 200);
    }

    // Loot (Host génère et diffuse au P2)
    if (network?.isHost || !network) {
      for (let i = 0; i < 10; i++) {
        const em = new Emerald(this.x + (i - 5) * 12, this.y + 30);
        em.netId = "it_" + Math.random().toString(36).slice(2, 7);
        window.game.engine.add(em);
        if (network?.socket) {
          network.socket.emit("item_spawn", {
            id: em.netId,
            x: em.x,
            y: em.y,
            type: "EMERALD",
          });
        }
      }
    }

    // Victoire !
    window.game.engine.shake(15, 500);
    setTimeout(() => {
      const db = window.game.dialogueBox;
      if (db) {
        db.show(
          "Victoire !",
          [
            "Maldrek a ete vaincu !",
            "La Relique Sacree est liberee !",
            "Le village est sauve. Felicitations, heros !",
          ],
          null,
        );
      }
    }, 1500);
  }

  draw(ctx) {
    if (this.flashTime > 0 && Math.floor(this.flashTime / 50) % 2 === 0) return;

    const px = this.x;
    const py = this.y;
    const isCharging = this.state === "CHARGE";
    const isWindup = this.state === "CHARGE_WINDUP";
    const isCasting = this.state === "CAST";

    // Sprite frame calculation (3 cols: pas gauche, pas droit, dégât)
    const rowOffset = { DOWN: 0, UP: 3, LEFT: 6, RIGHT: 9 }[this.facing];
    const isMoving = Math.abs(this.velX) > 0.1 || Math.abs(this.velY) > 0.1;
    const walkCycle = isMoving ? Math.floor(Date.now() / 150) % 2 : 0;
    let col;
    if (this.painState) {
      col = 2;
    } else if (isCharging || isWindup || isCasting) {
      col = 1;
    } else {
      col = walkCycle;
    }
    const frame = rowOffset + col;
    this.spriteSheet.drawFrame(ctx, frame, px, py, 2);

    // Indicateur de windup
    if (isWindup) {
      const shake = Math.sin(this.animTime * 0.05) * 3;
      ctx.fillStyle = "#ff4400";
      ctx.fillRect(px + 8 + shake, py - 6, 48, 4);
    }

    // Indicateur de phase
    if (this.phase > 1) {
      ctx.fillStyle = "#ffcc00";
      ctx.font = "bold 10px monospace";
      ctx.textAlign = "center";
      const stars = this.phase === 3 ? "***" : "**";
      ctx.fillText(stars, px + this.width / 2, py - 14);
    }

    // Barre de vie
    const barW = 56;
    const barH = 5;
    const barX = px + (this.width - barW) / 2;
    const barY = py - 8;
    ctx.fillStyle = "#333";
    ctx.fillRect(barX, barY, barW, barH);
    const hpRatio = this.hp / this.maxHp;
    ctx.fillStyle =
      hpRatio > 0.6 ? "#cc22aa" : hpRatio > 0.3 ? "#ff4400" : "#ff0000";
    ctx.fillRect(barX, barY, barW * hpRatio, barH);
    ctx.strokeStyle = "#888";
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barW, barH);

    // Nom
    ctx.fillStyle = "#ff88cc";
    ctx.font = "bold 10px monospace";
    ctx.textAlign = "center";
    ctx.fillText("MALDREK", px + this.width / 2, barY - 4);
    ctx.textAlign = "left";
  }
}
