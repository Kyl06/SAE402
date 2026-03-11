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
        
        // Le collider doit être actif pour que l'épée du Joueur 2 puisse "toucher" ce clone
        this.collider = true;  
        this.addTag('ENEMY'); 
    }

    /**
     * Reçoit les nouvelles coordonnées de la part de l'Hôte.
     * @param {number|string} targetX, targetY - Coordonnées réelles du monstre sur le serveur
     * @param {string} facing - Direction du monstre
     */
    updateFromNetwork(targetX, targetY, facing) {
        // Au lieu de téléporter brutalement l'entité, on stocke la cible
        // pour faire une interpolation (mouvement fluide).
        this.targetX = parseFloat(targetX);
        this.targetY = parseFloat(targetY);
        this.facing = facing;
    }

    /**
     * Met à jour la position locale pour se rapprocher de la position réseau.
     */
    update(delta) {
        if (this.targetX !== undefined) {
            // Lissage (Interpolation Linéaire / Lerp) :
            // On comble 20% de la distance à chaque frame pour un rendu fluide.
            this.x += (this.targetX - this.x) * 0.2;
            this.y += (this.targetY - this.y) * 0.2;
        }
        super.update(delta);
    }

    /** Rendu graphique (Similaire au Moblin.js mais simplifié). */
    draw(ctx) {
        // Décalage de 4 frames par direction (DOWN=0, UP=4, LEFT=8, RIGHT=12)
        const row = { DOWN: 0, UP: 4, LEFT: 8, RIGHT: 12 }[this.facing] || 0;

        // Animation de marche alternant toutes les 150ms
        const walkCycle = (Math.floor(Date.now() / 150) % 2);

        this.spriteSheet.drawFrame(ctx, row + walkCycle, this.x, this.y, 2);
    }
}