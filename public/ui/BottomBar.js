/**
 * @file BottomBar.js
 * @description Gère l'affichage du HUD (Heads-Up Display) en bas de l'écran.
 * Affiche la barre noire contenant les cœurs de vie de Link.
 */

import { Entity } from '../engine/Entity.js';
import { Hearts } from './Hearts.js';

export class BottomBar extends Entity {
    constructor() {
        // Positionnée en bas du canvas (y=600) sur toute la largeur
        super(0, 600, 800, 60); 
        this.collider = false; // L'UI ne collisionne pas avec le monde
        this.z = 999;          // S'assure d'être au-dessus de TOUT le reste
        
        // Composant interne gérant le rendu des cœurs individuels
        this.heartsUI = new Hearts();
    }

    /** Rendu du HUD. */
    draw(ctx) {
        // 1. Fond noir opaque
        ctx.fillStyle = "#000";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // 2. Bordure blanche rétro (2 pixels d'épaisseur)
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 4;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // 3. Dessin des informations dynamiques du joueur
        const player = window.game.player;

        if (player) {
            /** 
             * Appel du module Hearts pour dessiner les HP.
             * player.hp est en demi-coeurs (max 6).
             * @param {number} hp - Points de vie actuels
             * @param {number} x - Offset horizontal (20px du bord)
             * @param {number} y - Offset vertical (centré dans la barre)
             */
            this.heartsUI.draw(ctx, player.hp, 20, this.y + 18);
        }
    }
}