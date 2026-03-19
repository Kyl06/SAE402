/**
 * @file MaldekBeam.js
 * @description Projectile spécial (rayon) lancé par le boss Maldek.
 */

import { Entity } from "../../engine/Entity.js";
import { SpriteSheet } from "../../engine/SpriteSheet.js";
import { UP, DOWN, LEFT, RIGHT, SCALE } from "../../constants.js";

export class MaldekBeam extends Entity {
    constructor(x, y, vx, vy, ownerNetId = null) {
        super(x, y, 24, 48); // Hitbox plus large et haute
        
        this.netId = 'mal_beam_' + Math.random().toString(36).slice(2, 11);
        this.ownerNetId = ownerNetId;
        
        this.velX = vx;
        this.velY = vy;
        
        this.lifetime = 2000;
        this.age = 0;
        this.active = true;
        this.damage = 2; // Dégâts de boss

        // On utilise le spritesheet de Maldek, 7 colonnes, 32x35
        this.spriteSheet = new SpriteSheet("MALDEK", 7, 4, 32, 35);
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
            other.takeDamage?.(this.damage, DOWN);
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
        
        // On utilise une frame du spritesheet pour le rayon (par exemple frame 5 de la ligne DOWN ?)
        // Ou une frame dédiée si elle existe. Essayons la frame 5 du spritesheet global.
        this.spriteSheet.drawFrame(ctx, 5, this.x, this.y, 3);
    }
}
