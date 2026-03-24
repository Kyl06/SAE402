// Projectile fleche tiree par le joueur

import { Entity } from "../../engine/Entity.js";
import { SpriteSheet } from "../../engine/SpriteSheet.js";
import { UP, DOWN, LEFT, RIGHT } from "../../constants.js";

export class Arrow extends Entity {
  constructor(x, y, facing, owner) {
    super(x, y, 16, 16);
    this.facing = facing;
    this.owner = owner;
    const bowLevel = owner?.bowLevel || 0;
    this.bowLevel = bowLevel;
    this.speed = 300;
    this.damage = 3;
    this.z = 50;

    this.spriteSheet = new SpriteSheet("ARROW", 1, 4, 16, 16);

    this.velX = (facing === LEFT) ? -this.speed : (facing === RIGHT ? this.speed : 0);
    this.velY = (facing === UP)   ? -this.speed : (facing === DOWN  ? this.speed : 0);
  }

  update(delta) {
    super.update(delta);

    // Nettoyage si hors limites
    if (this.x < -100 || this.x > 1000 || this.y < -100 || this.y > 800) {
      this.kill();
    }
  }

  onCollision(other) {
    if (other === this.owner || other.hasTag("PLAYER")) return;

    if (other.hasTag("ENEMY")) {
      if (other.takeDamage) other.takeDamage(this.damage, this.facing);

      if (window.game.network && other.netId) {
          window.game.network.sendHit(other.netId, this.damage, this.facing);
      }

      this.kill();
    }

    if (other.hasTag("WALL") || other.hasTag("SOLID")) {
      this.kill();
    }
  }

  draw(ctx) {
    const frame = { [DOWN]: 0, [UP]: 1, [LEFT]: 2, [RIGHT]: 3 }[this.facing] || 0;
    this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, 1.5);
  }
}
