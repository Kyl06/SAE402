/**
 * @file Hearts.js
 * @description Composant UI chargé de dessiner les cœurs de vie sur le HUD.
 * Gère les cœurs pleins, les demi-cœurs et les cœurs vides.
 */

import { SpriteSheet } from '../engine/SpriteSheet.js';

export class Hearts {
    constructor() {
        // Spritesheet d'origine : 3 colonnes (0:Vide, 1:Demi, 2:Plein)
        this.spriteSheet = new SpriteSheet("HEARTS", 3, 1, 8, 8);
        this.heartSize = 32; // Taille d'affichage (8px * scale 4)
    }

    /**
     * Dessine une ligne de cœurs.
     * @param {CanvasRenderingContext2D} ctx - Contexte canvas
     * @param {number} hp - Nombre de points de vie (2 HP = 1 cœur plein)
     * @param {number} startX - Position X de début de la ligne
     * @param {number} startY - Position Y de début de la ligne
     */
    draw(ctx, hp, startX, startY) {
        const maxHearts = 3; // On limite à 3 cœurs max
        
        for (let i = 0; i < maxHearts; i++) {
            let frame = 0; // Par défaut : cœur vide (index 0)
            
            // Calcul de l'état du i-ème cœur basé sur les HP cumulés
            // Chaque cœur i représente les HP entre [i*2 + 1] et [i*2 + 2]
            if (hp >= (i + 1) * 2) {
                frame = 2; // Cœur plein
            } else if (hp === (i * 2) + 1) {
                frame = 1; // Demi-cœur
            }

            // Dessin du cœur actuel avec un espacement horizontal
            this.spriteSheet.drawFrame(
                ctx,
                frame,
                startX + i * (this.heartSize + 8),
                startY,
                4 // Scale de 4 pour un look bien rétro
            );
        }
    }
}