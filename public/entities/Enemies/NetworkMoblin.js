/**
 * @file NetworkMoblin.js
 * @description Version "fantôme" ou "clone" d'un Moblin sur le client Joueur 2.
 * Contrairement au Moblin réel, il n'a pas d'IA. Il se contente de suivre les 
 * coordonnées envoyées par l'Hôte via le réseau.
 */

import { Entity } from '../../engine/Entity.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';

export class NetworkMoblin extends Entity {
    /**
     * @param {number} x, y - Position initiale
     */
    constructor(x, y) {
        super(x, y, 32, 32);
        
        // Spritesheet identique au Moblin original
        this.spriteSheet = new SpriteSheet('MOBLIN', 4, 4, 16, 16);
        this.facing = 'DOWN';
        this.isAiming = false;
        this.isHurt = false;
        
        // Le collider doit être actif pour que l'épée du Joueur 2 puisse "toucher" ce clone
        this.collider = true;  
        this.addTag('ENEMY'); 
    }

    /**
     * Reçoit les nouvelles coordonnées de la part de l'Hôte.
     */
    updateFromNetwork(targetX, targetY, facing, isAiming = false, isHurt = false) {
        this.targetX = parseFloat(targetX);
        this.targetY = parseFloat(targetY);
        this.facing = facing;
        this.isAiming = isAiming;
        this.isHurt = isHurt;
    }

    /**
     * Met à jour la position locale pour se rapprocher de la position réseau.
     */
    update(delta) {
        if (this.targetX !== undefined) {
            this.x += (this.targetX - this.x) * 0.2;
            this.y += (this.targetY - this.y) * 0.2;
        }
        super.update(delta);
    }

    /** Rendu graphique */
    draw(ctx) {
        const row = { DOWN: 0, UP: 4, LEFT: 8, RIGHT: 12 }[this.facing] || 0;
        
        let frame;
        if (this.isHurt) {
            frame = row + 2 + (Math.floor(Date.now() / 50) % 2);
            ctx.filter = "brightness(2.5)"; // Flash blanc prononcé
        } else {
            const walkCycle = (Math.floor(Date.now() / 150) % 2);
            frame = row + walkCycle;
        }

        this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, 2);
        ctx.filter = "none";
    }
}