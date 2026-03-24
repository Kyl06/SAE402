// Réplique réseau du MiniBoss
import { Entity } from "../../engine/Entity.js";
import { SpriteSheet } from "../../engine/SpriteSheet.js";

export class NetworkMiniBoss extends Entity {
  constructor(x, y) {
    super(x, y, 48, 48);
    this.enemyType = "MINIBOSS";
    this.addTag("ENEMY");
    this.addTag("MINIBOSS");
    this.collider = true;
    this.spriteSheet = new SpriteSheet("CHOMP", 3, 3, 16, 16);
    this.facing = "DOWN";
    this.state = "IDLE";
    this.hp = 12;
    this.maxHp = 12;
    this.animTime = 0;
    this.flashTime = 0;
  }

  updateFromNetwork(targetX, targetY, facing, isAiming = false, isHurt = false, hp = null) {
    this.targetX = parseFloat(targetX);
    this.targetY = parseFloat(targetY);
    this.facing = facing;
    this.state = isAiming ? "CHARGE" : "WALK";
    if (!this.isHurt && isHurt) this.flashTime = 150;
    this.isHurt = isHurt;
    if (hp !== null && !isNaN(hp)) this.hp = parseFloat(hp);
  }

  update(delta) {
    this.animTime += delta;
    if (this.targetX !== undefined) {
      this.x += (this.targetX - this.x) * 0.2;
      this.y += (this.targetY - this.y) * 0.2;
      this.velX = this.targetX - this.x;
      this.velY = this.targetY - this.y;
    }
    if (this.flashTime > 0) this.flashTime -= delta;
    super.update(delta);
  }

  draw(ctx) {
    if (this.flashTime > 0 && Math.floor(this.flashTime / 50) % 2 === 0) return;

    const isMoving = Math.abs(this.velX) > 0.1 || Math.abs(this.velY) > 0.1;
    const downCycle = isMoving ? (Math.floor(Date.now() / 150) % 2) : 0;
    const sideCycle = isMoving ? (Math.floor(Date.now() / 150) % 3) : 0;
    let col, row;

    switch (this.facing) {
      case "LEFT": col = sideCycle; row = 1; break;
      case "RIGHT": col = sideCycle; row = 2; break;
      case "UP": col = 2; row = 0; break;
      default: col = downCycle; row = 0; break;
    }

    this.spriteSheet.drawFrame(ctx, row * 3 + col, this.x, this.y, 3);

    // Barre de vie
    const barW = 48, barH = 4;
    const barX = this.x + (this.width - barW) / 2;
    const barY = this.y - 8;
    ctx.fillStyle = "#333";
    ctx.fillRect(barX, barY, barW, barH);
    ctx.fillStyle = this.hp > this.maxHp * 0.3 ? "#ff3333" : "#ff0000";
    ctx.fillRect(barX, barY, barW * (this.hp / this.maxHp), barH);
  }
}
