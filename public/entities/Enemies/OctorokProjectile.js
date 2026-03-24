// Projectile pierre lance par l'Octorok

import { Entity } from "../../engine/Entity.js";
import { SpriteSheet } from "../../engine/SpriteSheet.js";
import { UP, DOWN, LEFT, RIGHT, SCALE } from "../../constants.js";

export class OctorokProjectile extends Entity {
    constructor(x, y, vx, vy, ownerNetId = null) {
        super(x, y, 16, 16);

        this.netId = 'octo_proj_' + Math.random().toString(36).slice(2, 11);
        this.ownerNetId = ownerNetId;

        this.velX = vx;
        this.velY = vy;

        this.lifetime = 2500;
        this.age = 0;
        this.active = true;
        this.damage = 1;

        // Frame 3 = projectile dans la spritesheet Octorok
        this.spriteSheet = new SpriteSheet("OCTOROK", 4, 4, 16, 16);
    }

    update(delta) {
        if (!this.active) return;

        this.age += delta;
        if (this.age >= this.lifetime) {
            this.deactivate();
            return;
        }

        super.update(delta);
    }

    onCollision(other) {
        if (!this.active) return;

        if (other.hasTag("PLAYER") && !other.isDead) {
            let direction;
            if (Math.abs(this.velX) > Math.abs(this.velY)) {
                direction = this.velX > 0 ? RIGHT : LEFT;
            } else {
                direction = this.velY > 0 ? DOWN : UP;
            }

            other.takeDamage?.(this.damage, direction);
            this.deactivate();
        }

        if (other.hasTag("WALL") || other.hasTag("SOLID")) {
            this.deactivate();
        }
    }

    deactivate() {
        this.active = false;
        this.kill();
    }

    draw(ctx) {
        if (!this.active) return;
        // Decalage pour centrer la hitbox 16x16 sur le sprite 32x32
        this.spriteSheet.drawFrame(ctx, 3, this.x - 8, this.y - 8, SCALE);
    }
}
