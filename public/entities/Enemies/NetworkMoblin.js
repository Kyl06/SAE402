/**
 * Proxy Réseau du Moblin (Slave). 
 * Réplique l'état d'un Moblin distant sans exécuter de logique d'IA.
 */

import { Entity } from '../../engine/Entity.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';

export class NetworkMoblin extends Entity {
    constructor(x, y) {
        super(x, y, 32, 32);
        
        this.spriteSheet = new SpriteSheet('MOBLIN', 4, 4, 16, 16);
        this.facing = 'DOWN';
        this.isAiming = false;
        this.isHurt = false;
        
        this.collider = true; // Actif pour permettre la détection locale des attaques du client.
        this.addTag('ENEMY'); 
    }

    /** Synchro Snapshot-to-Entity. */
    updateFromNetwork(targetX, targetY, facing, isAiming = false, isHurt = false) {
        this.targetX = parseFloat(targetX);
        this.targetY = parseFloat(targetY);
        this.facing = facing;
        this.isAiming = isAiming;
        this.isHurt = isHurt;
    }

    /** 
     * Interpolation Linéaire (Lerp) locale.
     * Réduit le jitter (saccades) lié à la latence réseau en se rapprochant de la cible par incréments.
     */
    update(delta) {
        if (this.targetX !== undefined) {
            this.x += (this.targetX - this.x) * 0.2; // Lerp factor (20% par frame)
            this.y += (this.targetY - this.y) * 0.2;
        }
        super.update(delta);
    }

    draw(ctx) {
        const row = { DOWN: 0, UP: 4, LEFT: 8, RIGHT: 12 }[this.facing] || 0;
        
        let frame;
        if (this.isHurt) {
            frame = row + 2 + (Math.floor(Date.now() / 50) % 2);
            ctx.filter = "brightness(2.5)"; // Feedback visuel de dommage répliqué via les filtres Canvas.
        } else {
            const walkCycle = (Math.floor(Date.now() / 150) % 2);
            frame = row + walkCycle;
        }

        this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, 2);
        ctx.filter = "none";
    }
}