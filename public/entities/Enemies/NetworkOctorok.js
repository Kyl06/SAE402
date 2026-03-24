// Réplique réseau de l'Octorok
import { Entity } from '../../engine/Entity.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';

export class NetworkOctorok extends Entity {
    constructor(x, y) {
        super(x, y, 28, 28);
        this.spriteSheet = new SpriteSheet('OCTOROK', 4, 4, 16, 16);
        this.facing = 'DOWN';
        this.addTag('ENEMY');
        this.isAiming = false;
        this.isHurt = false;
        this.netId = null;
    }

    updateFromNetwork(x, y, facing, isAiming = false, isHurt = false) {
        this.targetX = parseFloat(x);
        this.targetY = parseFloat(y);
        this.facing = facing;
        this.isAiming = isAiming;
        this.isHurt = isHurt;
    }

    update(delta) {
        if (this.targetX !== undefined) {
            this.x += (this.targetX - this.x) * 0.3;
            this.y += (this.targetY - this.y) * 0.3;
        }
        super.update(delta);
    }

    draw(ctx) {
        const row = { DOWN: 0, UP: 4, LEFT: 8, RIGHT: 12 }[this.facing] || 0;
        let frame;
        if (this.isHurt) {
            frame = row + (Math.floor(Date.now() / 50) % 2);
            ctx.filter = "brightness(2)";
        } else if (this.isAiming) {
            frame = row + 2;
        } else {
            frame = row + (Math.floor(Date.now() / 150) % 2);
        }
        this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, 2);
        ctx.filter = "none";
    }
}
