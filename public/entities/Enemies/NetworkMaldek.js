/**
 * @file NetworkMaldek.js
 * @description Réplique réseau du Boss Maldek.
 */
import { Entity } from '../../engine/Entity.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';

export class NetworkMaldek extends Entity {
    constructor(x, y) {
        super(x, y, 70, 70);
        
        this.spriteSheet = new SpriteSheet('MALDEK', 7, 4, 32, 35);
        this.facing = 'DOWN';
        this.isCharging = false;
        this.isHurt = false;
        
        this.collider = true;  
        this.addTag('ENEMY'); 
    }

    updateFromNetwork(targetX, targetY, facing, isCharging = false, isHurt = false) {
        this.targetX = parseFloat(targetX);
        this.targetY = parseFloat(targetY);
        this.facing = facing;
        this.isCharging = isCharging;
        this.isHurt = isHurt;
    }

    update(delta) {
        if (this.targetX !== undefined) {
            this.x += (this.targetX - this.x) * 0.2;
            this.y += (this.targetY - this.y) * 0.2;
        }
        super.update(delta);
    }

    draw(ctx) {
        // Avec 7 colonnes : DOWN=0, UP=7, LEFT=14, RIGHT=21
        const row = { DOWN: 0, UP: 7, LEFT: 14, RIGHT: 21 }[this.facing] || 0;
        
        let frame;
        if (this.isCharging) {
            frame = row + 3 + (Math.floor(Date.now() / 100) % 2);
        } else if (this.isHurt) {
            frame = row + 2;
        } else {
            const walkCycle = (Math.floor(Date.now() / 150) % 2);
            frame = row + walkCycle;
        }

        this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, 2.5);
    }
}
