import { Entity } from '../../engine/Entity.js';
import { SCALE } from '../../constants.js';

export class NetworkMiniBoss extends Entity {
    constructor(x, y) {
        super(x, y, 40, 40);

        this.enemyType = 'MINIBOSS';
        this.addTag('ENEMY');
        this.addTag('MINIBOSS');
        this.collider = true;

        this.facing = 'DOWN';
        this.state = 'IDLE'; 
        
        this.hp = 12; 
        this.maxHp = 12;
        this.animTime = 0;
        this.flashTime = 0;
    }

    updateFromNetwork(targetX, targetY, facing, isAiming = false, isHurt = false) {
        this.targetX = parseFloat(targetX);
        this.targetY = parseFloat(targetY);
        this.facing = facing;

        if (isAiming) {
            this.state = 'CHARGE'; 
        } else {
            this.state = 'WALK';
        }

        if (!this.isHurt && isHurt) {
            this.flashTime = 150;
        }
        this.isHurt = isHurt;
    }

    update(delta) {
        this.animTime += delta;
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

        const s = SCALE;
        const px = this.x;
        const py = this.y;
        const isCharging = this.state === 'CHARGE';

        // Corps principal (armure)
        ctx.fillStyle = isCharging ? '#ff3333' : '#4a2a6a';
        ctx.fillRect(px + 4 * s, py + 8 * s, 14 * s, 14 * s);

        // Epaulettes
        ctx.fillStyle = isCharging ? '#cc2222' : '#3a1a5a';
        ctx.fillRect(px + 1 * s, py + 8 * s, 5 * s, 6 * s);
        ctx.fillRect(px + 16 * s, py + 8 * s, 5 * s, 6 * s);

        // Tete (casque)
        ctx.fillStyle = '#555577';
        ctx.fillRect(px + 5 * s, py + 1 * s, 12 * s, 9 * s);

        // Visiere
        ctx.fillStyle = '#333355';
        ctx.fillRect(px + 6 * s, py + 4 * s, 10 * s, 3 * s);

        // Yeux rouges
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(px + 7 * s, py + 5 * s, 2 * s, 2 * s);
        ctx.fillRect(px + 13 * s, py + 5 * s, 2 * s, 2 * s);

        // Barre de vie au-dessus (invisible chez le client pour coller avec le Moblin ?) 
        // On la garde cachée ou fixe puisque le sync hp n'est pas fait pour le boss client actuellement
    }
}
