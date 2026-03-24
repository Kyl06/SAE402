// Piege scie : va-et-vient horizontal, invincible

import { Entity } from "../../engine/Entity.js";
import { Assets } from "../../engine/Assets.js";

export class Scie extends Entity {
  constructor(x, y, range = 64, speed = 100) {
    super(x, y, 32, 32);
    this.addTag("ENEMY");
    this.addTag("NOCLIP"); // Traverse les murs
    this.enemyType = "SCIE";

    this.anchorX = x;
    this.range = range;

    this.velX = speed;
    this.velY = 0;

    this.collider = true;

    this.angle = 0;
  }

  update(delta) {
    if (this.velX > 0 && this.x > this.anchorX + this.range) {
      this.velX = -Math.abs(this.velX);
    } else if (this.velX < 0 && this.x < this.anchorX - this.range) {
      this.velX = Math.abs(this.velX);
    }

    this.angle += (delta / 1000) * 360 * 2;

    super.update(delta);
  }

  takeDamage() {}
  onCollision(other) {}

  draw(ctx) {
    const img = Assets.get("SCIE");
    if (!img) return;

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate((this.angle * Math.PI) / 180);

    ctx.drawImage(
      img,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
    );

    ctx.restore();
  }
}
