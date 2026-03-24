// Réplique réseau du Moblin (pas d'IA, juste rendu)
import { Entity } from '../../engine/Entity.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';

export class NetworkMoblin extends Entity {
    constructor(x, y) {
        super(x, y, 32, 32);
        this.spriteSheet = new SpriteSheet('MOBLIN', 4, 4, 16, 16);
        this.facing = 'DOWN';
        this.isAiming = false;
        this.isHurt = false;
        this.collider = true;
        this.addTag('ENEMY');
    }

    updateFromNetwork(targetX, targetY, facing, isAiming = false, isHurt = false) {
        this.targetX = parseFloat(targetX);
        this.targetY = parseFloat(targetY);
        this.facing = facing;
        this.isAiming = isAiming;
        this.isHurt = isHurt;
    }

    // Lerp pour lisser le mouvement réseau
    update(delta) {
        if (this.targetX !== undefined) {
            this.x += (this.targetX - this.x) * 0.2;
            this.y += (this.targetY - this.y) * 0.2;
        }
        super.update(delta);
    }

    draw(ctx) {
        const row = { DOWN: 0, UP: 4, LEFT: 8, RIGHT: 12 }[this.facing] || 0;
        let frame;
        if (this.isHurt) {
            frame = row + 2 + (Math.floor(Date.now() / 50) % 2);
            ctx.filter = "brightness(2.5)";
        } else {
            frame = row + (Math.floor(Date.now() / 150) % 2);
        }
        this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, 2);
        ctx.filter = "none";
    }
}
