/**
 * @file Heart.js
 * @description Objet de soin (Cœur) pouvant être ramassé par le joueur.
 * Apparaît aléatoirement lors de la défaite d'un Moblin.
 */

import { Entity } from "../../engine/Entity.js";
import { SpriteSheet } from "../../engine/SpriteSheet.js";

export class Heart extends Entity {
    /**
     * @param {number} x, y - Position d'apparition
     */
    constructor(x, y) {
        super(x, y, 24, 24); // Hitbox légèrement agrandie pour faciliter la ramasse
        
        this.addTag("ITEM"); // Identifié comme un objet collectable
        
        // Utilise la spritesheet des cœurs (8x8 pixels à l'origine)
        this.spriteSheet = new SpriteSheet("HEARTS", 3, 1, 8, 8);
        this.z = 5;         // Dessiné au sol (sous Link)
        this.collider = true; 
    }

    /** 
     * Gestion du contact avec Link.
     */
    onCollision(other) {
        // On vérifie si c'est Link qui touche le cœur et s'il n'est pas déjà full vie (6 HP)
        if (other.hasTag("PLAYER") && other.hp < 6) {
            // Soin de 1 cœur plein (équivaut à 2 points de vie)
            other.hp = Math.min(6, other.hp + 2);
            
            // L'item disparaît une fois consommé
            this.kill();
        }
    }

    /** Rendu graphique. */
    draw(ctx) {
        // Animation de flottement (effet "levitation") via une fonction sinus
        const bounce = Math.sin(Date.now() / 200) * 3;
        
        // On dessine l'index 2 (le cœur rouge plein)
        // Zoomé 3 fois pour être bien visible sur la carte
        this.spriteSheet.drawFrame(ctx, 2, this.x, this.y + bounce, 3);
    }
}