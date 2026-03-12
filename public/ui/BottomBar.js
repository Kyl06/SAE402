/**
 * @file BottomBar.js
 */

import { Entity } from '../engine/Entity.js';
import { Hearts } from './Hearts.js';
import { Assets } from '../engine/Assets.js';

export class BottomBar extends Entity {
    constructor() {
        super(0, 600, 800, 60); 
        this.collider = false;
        this.z = 999;
        this.heartsUI = new Hearts();
        this._emeraldMissingLogged = false;
    }

    draw(ctx) {
        // 1. Fond noir opaque
        ctx.fillStyle = "#000";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // 2. Bordure blanche rétro
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 4;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // 3. Récupération sécurisée du joueur
        const player = window.game.player;

        if (player) {
            // Dessin des cœurs
            this.heartsUI.draw(ctx, player.hp, 20, this.y + 18);

            // ---------------------------------------------------------
            // Affichage des émeraudes (Correction de la source de données)
            // ---------------------------------------------------------
            // On récupère la valeur sur l'instance du joueur local
            const emeraldCount = player.emeralds || 0; 
            
            // Calcul de la position après les 3 cœurs (24px de large + 10px espacement)
            const iconX = 140; 
            const iconY = this.y + 30; // Centré verticalement dans la barre de 60px

            const emeraldImg = Assets.get("EMERALD");

            if (emeraldImg) {
                // Dessine l'icône
                ctx.drawImage(emeraldImg, iconX, iconY - 12, 24, 24);
            } else if (!this._emeraldMissingLogged) {
                console.warn("[BottomBar] Asset EMERALD introuvable.");
                this._emeraldMissingLogged = true;
            }

            // Dessin du texte du compteur
            ctx.fillStyle = "#fff"; // Blanc pour une meilleure lisibilité
            ctx.font = "bold 20px monospace"; // Police type arcade
            ctx.textBaseline = "middle";
            ctx.fillText(`x${emeraldCount}`, iconX + 32, iconY);
        }
    }
}