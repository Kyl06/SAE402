// Réplique réseau de Maldrek (boss final)
import { Entity } from "../../engine/Entity.js";
import { SpriteSheet } from "../../engine/SpriteSheet.js";

export class NetworkMaldrek extends Entity {
  constructor(x, y) {
    super(x, y, 64, 64);
    this.spriteSheet = new SpriteSheet("MALDEK", 3, 4, 32, 36);
    this.facing = "DOWN";
    this.isAiming = false;
    this.isHurt = false;
    this.collider = true;
    this.addTag("ENEMY");
    this.addTag("BOSS");
    this.enemyType = "MALDREK";
    this.hp = 30;
    this.maxHp = 30;
    this.phase = 1;
    this.flashTime = 0;
  }

  updateFromNetwork(targetX, targetY, facing, isAiming = false, isHurt = false, hp = null) {
    this.targetX = parseFloat(targetX);
    this.targetY = parseFloat(targetY);
    this.facing = facing;
    this.isAiming = isAiming;
    if (!this.isHurt && isHurt) this.flashTime = 150;
    this.isHurt = isHurt;
    if (hp !== null && !isNaN(parseFloat(hp))) {
      this.hp = parseFloat(hp);
      const ratio = this.hp / this.maxHp;
      this.phase = ratio <= 0.3 ? 3 : ratio <= 0.6 ? 2 : 1;
    }
  }

  update(delta) {
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

    const rowOffset = { DOWN: 0, UP: 3, LEFT: 6, RIGHT: 9 }[this.facing] || 0;
    const walkCycle = (Math.abs(this.velX) > 1 || Math.abs(this.velY) > 1) ? Math.floor(Date.now() / 150) % 2 : 0;
    let col = this.isHurt ? 2 : (this.isAiming ? 1 : walkCycle);
    this.spriteSheet.drawFrame(ctx, rowOffset + col, this.x, this.y, 2);

    // Indicateur de phase
    if (this.phase > 1) {
      ctx.fillStyle = "#ffcc00";
      ctx.font = "bold 10px monospace";
      ctx.textAlign = "center";
      ctx.fillText(this.phase === 3 ? "***" : "**", this.x + this.width / 2, this.y - 14);
    }

    // Barre de vie
    const barW = 56, barH = 5;
    const barX = this.x + (this.width - barW) / 2;
    const barY = this.y - 8;
    ctx.fillStyle = "#333";
    ctx.fillRect(barX, barY, barW, barH);
    const hpRatio = this.hp / this.maxHp;
    ctx.fillStyle = hpRatio > 0.6 ? "#cc22aa" : hpRatio > 0.3 ? "#ff4400" : "#ff0000";
    ctx.fillRect(barX, barY, barW * Math.max(0, hpRatio), barH);
    ctx.strokeStyle = "#888";
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barW, barH);

    ctx.fillStyle = "#ff88cc";
    ctx.font = "bold 10px monospace";
    ctx.textAlign = "center";
    ctx.fillText("MALDREK", this.x + this.width / 2, barY - 4);
    ctx.textAlign = "left";
  }
}
