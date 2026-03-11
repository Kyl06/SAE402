/**
 * @file Explosion.js
 * @description Effet visuel temporaire déclenché lors de la mort d'un ennemi.
 * L'explosion suit une séquence d'images unique puis se détruit automatiquement.
 */

import { Entity } from '../../engine/Entity.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';

export class Explosion extends Entity {
    /**
     * @param {number} x, y - Position de l'explosion
     */
    constructor(x, y) {
        super(x, y, 32, 32);
        
        // Spritesheet linéaire (7 colonnes, 1 ligne)
        this.spriteSheet = new SpriteSheet('EXPLOSION', 7, 1, 32, 32);
        
        this.frame = 0;   // Frame actuelle
        this.timer = 0;   // Chronomètre pour l'animation
        this.speed = 70;  // Vitesse de défilement (70ms par image)
        this.z = 20;      // Affiché par-dessus les acteurs
        
        // Une explosion est purement visuelle, elle ne bloque pas les mouvements
        this.collider = false; 
    }

    /** Mise à jour de l'animation. */
    update(delta) {
        this.timer += delta;
        if (this.timer >= this.speed) {
            this.timer = 0;
            this.frame++;
            
            // Une fois la dernière frame affichée (index 6), on retire l'objet
            if (this.frame >= 7) {
                this.kill(); 
            }
        }
    }

    /** Rendu graphique. */
    draw(ctx) {
        // Dessine avec un scale de 2 pour un effet "pixel" bien marqué
        this.spriteSheet.drawFrame(ctx, this.frame, this.x, this.y, 2);
    }
}