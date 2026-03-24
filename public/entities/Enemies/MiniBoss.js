// Mini-boss des ruines : charge + coup rapide

import { Entity } from "../../engine/Entity.js";
import { Explosion } from "../Effects/Explosion.js";
import { Emerald } from "../Items/Emerald.js";
import { SpriteSheet } from "../../engine/SpriteSheet.js";
import { SCALE } from "../../constants.js";

export class MiniBoss extends Entity {
  constructor(x, y) {
    super(x, y, 48, 48);

    this.netId = "boss_" + Math.random().toString(36).slice(2, 11);
    this.enemyType = "MINIBOSS";

    this.hp = 16;
    this.maxHp = 16;
    this.speed = 30;
    this.chaseSpeed = 55;
    this.chargeSpeed = 180;
    this.addTag("ENEMY");
    this.addTag("MINIBOSS");

    this.spriteSheet = new SpriteSheet("CHOMP", 3, 3, 16, 16);

    this.anchor = { x, y };
    this.state = "IDLE"; // IDLE, WALK, CHASE, CHARGE_WINDUP, CHARGE, STUNNED
    this.stateTimer = 1500;
    this.facing = "DOWN";
    this.target = null;
    this.painState = null;

    this.chargeDir = { x: 0, y: 0 };
    this.chargeDuration = 0;
    this.chargeCooldown = 0;

    this.animTime = 0;
    this.flashTime = 0;
  }

  update(delta) {
    this.animTime += delta;
    if (this.flashTime > 0) this.flashTime -= delta;
    if (this.chargeCooldown > 0) this.chargeCooldown -= delta;

    if (this.painState) {
      this.handlePain(delta);
    } else {
      this.think(delta);
      this.act(delta);
    }
    super.update(delta);
  }

  think(delta) {
    const players = window.game.engine.entities.filter(
      (e) => e.hasTag("PLAYER") && !e.isDead,
    );
    let closest = null;
    let minDist = 250;

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
    switch (this.state) {
      case "IDLE":
      case "WALK":
        if (this.target) {
          this.state = "CHASE";
          return;
        }
        this.roam(delta);
        break;

      case "CHASE":
        if (!this.target) {
          this.state = "IDLE";
          this.velX = 0;
          this.velY = 0;
          return;
        }
        this.chase();
        const dist = Math.hypot(this.target.x - this.x, this.target.y - this.y);
        if (dist < 120 && this.chargeCooldown <= 0) {
          this.startCharge();
        }
        break;

      case "CHARGE_WINDUP":
        this.velX = 0;
        this.velY = 0;
        this.stateTimer -= delta;
        if (this.stateTimer <= 0) {
          this.state = "CHARGE";
          this.chargeDuration = 400;
          this.velX = this.chargeDir.x * this.chargeSpeed;
          this.velY = this.chargeDir.y * this.chargeSpeed;
        }
        break;

      case "CHARGE":
        this.chargeDuration -= delta;
        if (this.chargeDuration <= 0) {
          this.state = "STUNNED";
          this.stateTimer = 800;
          this.velX = 0;
          this.velY = 0;
          this.chargeCooldown = 3000;
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
    this.stateTimer = 600;
  }

  isBlocked(dirX, dirY) {
    const step = 14;
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

  chase() {
    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;

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
      this.velX = primX * this.chaseSpeed;
      this.velY = primY * this.chaseSpeed;
    } else if (!this.isBlocked(secX, secY)) {
      this.velX = secX * this.chaseSpeed;
      this.velY = secY * this.chaseSpeed;
    } else if (!this.isBlocked(-secX, -secY)) {
      this.velX = -secX * this.chaseSpeed;
      this.velY = -secY * this.chaseSpeed;
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

  roam(delta) {
    this.stateTimer -= delta;
    if (this.stateTimer <= 0) {
      this.state = this.state === "IDLE" ? "WALK" : "IDLE";
      this.stateTimer = 1500 + Math.random() * 1500;
      if (this.state === "WALK") {
        const dirs = ["UP", "DOWN", "LEFT", "RIGHT"];
        this.facing = dirs[Math.floor(Math.random() * 4)];
        this.velX =
          this.facing === "LEFT"
            ? -this.speed
            : this.facing === "RIGHT"
              ? this.speed
              : 0;
        this.velY =
          this.facing === "UP"
            ? -this.speed
            : this.facing === "DOWN"
              ? this.speed
              : 0;
      } else {
        this.velX = 0;
        this.velY = 0;
      }
    }
  }

  takeDamage(amount, direction) {
    if (typeof amount === "string") {
      direction = amount;
      amount = 1;
    }
    if (this.painState || this.toRemove) return;
    this.hp -= (amount || 1);
    this.flashTime = 150;
    window.game.engine.shake(4, 100);

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

  handlePain(delta) {
    this.x += this.painState.velX * (delta / 1000);
    this.y += this.painState.velY * (delta / 1000);
    this.painState.msLeft -= delta;
    if (this.painState.msLeft <= 0) this.painState = null;
  }

  onCollision(other) {
    if (other.hasTag("PLAYER")) {
      // Bonus de degats en CHARGE (2 au lieu de 1)
      if (this.state === "CHARGE") {
        other.takeDamage?.(2);
      }
    }
  }

  die() {
    if (this.toRemove) return;
    this.toRemove = true;

    const engine = window.game.engine;
    const network = window.game.network;

    engine.add(new Explosion(this.x, this.y));
    engine.add(new Explosion(this.x + 20, this.y + 10));
    if (network) {
      network.sendExplosion(this.x, this.y);
      network.sendExplosion(this.x + 20, this.y + 10);
    }

    // Loot genere par l'host
    if (network?.isHost || !network) {
      const isPickpocket = window.game.player && window.game.player.bowLevel > 0;
      const count = isPickpocket ? 10 : 5;

      for (let i = 0; i < count; i++) {
        const em = new Emerald(this.x + (i - (count/2)) * 15, this.y + 20);
        em.netId = "it_" + Math.random().toString(36).slice(2, 7);
        engine.add(em);
        if (network?.socket) {
          network.socket.emit("item_spawn", {
            id: em.netId, x: em.x, y: em.y, type: "EMERALD",
          });
        }
      }
    }

    const qm = window.game.questManager;
    if (qm) {
      qm.defeatBoss();
    }

    engine.shake(10, 300);
  }

  draw(ctx) {
    // Clignotement de degats
    if (this.flashTime > 0 && Math.floor(this.flashTime / 50) % 2 === 0) return;

    let col, row;
    const isMoving = Math.abs(this.velX) > 0.1 || Math.abs(this.velY) > 0.1;
    const downCycle = isMoving ? (Math.floor(Date.now() / 150) % 2) : 0;
    const sideCycle = isMoving ? (Math.floor(Date.now() / 150) % 2) : 0;

    switch (this.facing) {
      case "LEFT":
        col = sideCycle;
        row = 1;
        break;
      case "RIGHT":
        col = sideCycle;
        row = 2;
        break;
      case "UP":
        col = 2;
        row = 0;
        break;
      case "DOWN":
        col = downCycle;
        row = 0;
        break;
    }

    const frame = row * 3 + col;
    this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, 3);

    // Indicateur de windup
    if (this.state === "CHARGE_WINDUP") {
      const shake = Math.sin(this.animTime * 0.05) * 2;
      ctx.fillStyle = "#ff6600";
      ctx.fillRect(this.x + 2 + shake, this.y - 4, 18, 3);
    }

    // Barre de vie
    const barW = 48;
    const barH = 4;
    const barX = this.x + (this.width - barW) / 2;
    const barY = this.y - 8;
    ctx.fillStyle = "#333";
    ctx.fillRect(barX, barY, barW, barH);
    ctx.fillStyle = this.hp > this.maxHp * 0.3 ? "#ff3333" : "#ff0000";
    ctx.fillRect(barX, barY, barW * (this.hp / this.maxHp), barH);
  }
}
