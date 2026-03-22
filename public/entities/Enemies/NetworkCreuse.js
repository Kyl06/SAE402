import { Entity } from '../../engine/Entity.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';

export class NetworkCreuse extends Entity {
    constructor(x, y) {
        super(x, y, 32, 32);
        
        this.spriteSheet = new SpriteSheet('CREUSE', 4, 1, 16, 16);
        this.collider = false;  
        this.addTag('ENEMY');
        this.enemyType = 'CREUSE';
        
        this.frame = 0;
        this.isHurt = false;
        this.flashTime = 0;
    }

    updateFromNetwork(targetX, targetY, facing, frameOrAiming, isHurt = false) {
        this.targetX = parseFloat(targetX);
        this.targetY = parseFloat(targetY);
        
        if (typeof frameOrAiming === "number" || !isNaN(Number(frameOrAiming))) {
            this.frame = Number(frameOrAiming);
        } else {
            this.frame = 0; // Sécurité
        }

        if (!this.isHurt && isHurt) {
            this.flashTime = 150;
        }
        this.isHurt = isHurt;

        // Devient collider vrai seulement si completement sorti (frame 3)
        this.collider = (this.frame === 3);
    }

    update(delta) {
        if (this.targetX !== undefined) {
            this.x += (this.targetX - this.x) * 0.2;
            this.y += (this.targetY - this.y) * 0.2;
        }
        if (this.flashTime > 0) this.flashTime -= delta;
        super.update(delta);
    }

    draw(ctx) {
        if (this.flashTime > 0 && Math.floor(this.flashTime / 50) % 2 === 0) return;
        
        if (this.frame === 0) return; // Hidden, ne pas dessiner

        this.spriteSheet.drawFrame(ctx, this.frame, this.x, this.y, 2);
    }
}
