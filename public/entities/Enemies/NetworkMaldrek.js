/**
 * @file NetworkMaldrek.js
 * @description Réplique réseau du Boss final Maldrek pour les clients (invités).
 */
import { Entity } from '../../engine/Entity.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';

export class NetworkMaldrek extends Entity {
    constructor(x, y) {
        super(x, y, 64, 64);
        
        this.spriteSheet = new SpriteSheet('MALDEK', 3, 4, 32, 36);
        this.facing = 'DOWN';
        this.isAiming = false; // "true" corresponds à CHARGE_WINDUP, CHARGE, ou CAST
        this.isHurt = false;
        
        this.collider = true;  
        this.addTag('ENEMY');
        this.addTag('BOSS');
        this.enemyType = 'MALDREK';
        
        // Pour les stats visuelles (ex: pour dessiner sa barre de vie, mais le host s'occupe de sa vraie mort)
        this.hp = 30; // On pourrait synchroniser la vie exacte si nécessaire
        this.maxHp = 30;
        this.phase = 1;

        // Flash de dégâts
        this.flashTime = 0;
    }

    updateFromNetwork(targetX, targetY, facing, isAiming = false, isHurt = false) {
        this.targetX = parseFloat(targetX);
        this.targetY = parseFloat(targetY);
        this.facing = facing;
        this.isAiming = isAiming;
        if (!this.isHurt && isHurt) {
            this.flashTime = 150;
        }
        this.isHurt = isHurt;
    }

    update(delta) {
        if (this.targetX !== undefined) {
            this.x += (this.targetX - this.x) * 0.2;
            this.y += (this.targetY - this.y) * 0.2;
            
            // Calcul auto de la vélocité pour l'animation de translation
            this.velX = this.targetX - this.x;
            this.velY = this.targetY - this.y;
        }
        if (this.flashTime > 0) this.flashTime -= delta;
        
        super.update(delta);
    }

    draw(ctx) {
        if (this.flashTime > 0 && Math.floor(this.flashTime / 50) % 2 === 0) return;

        const rowOffset = { 'DOWN': 0, 'UP': 3, 'LEFT': 6, 'RIGHT': 9 }[this.facing] || 0;
        const isMoving = Math.abs(this.velX) > 1 || Math.abs(this.velY) > 1;
        const walkCycle = isMoving ? (Math.floor(Date.now() / 150) % 2) : 0;

        let col;
        if (this.isHurt) {
            col = 2;
        } else if (this.isAiming) {
            col = 1;
        } else {
            col = walkCycle;
        }

        const frame = rowOffset + col;
        this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, 2);
    }
}
