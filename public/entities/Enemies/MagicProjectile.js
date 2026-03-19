/**
 * @file MagicProjectile.js
 * @description Projectile magique tiré par Maldrek (Boss Final).
 */

import { Entity } from '../../engine/Entity.js';

export class MagicProjectile extends Entity {
    constructor(x, y, dirX, dirY, speed, ownerId = null) {
        super(x, y, 12, 12);
        this.velX = dirX * speed;
        this.velY = dirY * speed;
        this.addTag('ENEMY');
        this.collider = true;
        this.z = 12;
        this.lifeTime = 3000;
        this.time = 0;
        this.ownerId = ownerId;
    }

    update(delta) {
        this.time += delta;
        this.lifeTime -= delta;
        if (this.lifeTime <= 0) this.kill();
        super.update(delta);
    }

    onCollision(other) {
        if (other.hasTag('PLAYER') && !other.isDead) {
            // Le Player gère ses propres dégâts
            this.kill();
        }
        if (other.hasTag('SOLID') && !other.hasTag('ENEMY')) {
            this.kill();
        }
    }

    draw(ctx) {
        const pulse = Math.sin(this.time * 0.01) * 3 + 8;
        // Boule magique violette
        ctx.fillStyle = '#aa44ff';
        ctx.beginPath();
        ctx.arc(this.x + 6, this.y + 6, pulse, 0, Math.PI * 2);
        ctx.fill();
        // Coeur lumineux
        ctx.fillStyle = '#ff88ff';
        ctx.beginPath();
        ctx.arc(this.x + 6, this.y + 6, pulse * 0.5, 0, Math.PI * 2);
        ctx.fill();
    }
}
