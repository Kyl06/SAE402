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
            // Affichage des émeraudes
            // ---------------------------------------------------------
            const emeraldCount = player.emeralds || 0; 
            const emeraldIconX = 140; 
            const iconY = this.y + 30;

            const emeraldImg = Assets.get("EMERALD");

            if (emeraldImg) {
                ctx.drawImage(emeraldImg, emeraldIconX, iconY - 12, 24, 24);
            }

            ctx.fillStyle = "#fff";
            ctx.font = "bold 20px monospace";
            ctx.textBaseline = "middle";
            ctx.fillText(`x${emeraldCount}`, emeraldIconX + 32, iconY);

            // ---------------------------------------------------------
            // Affichage des flèches (Utilisation de ton image arrow.png)
            // ---------------------------------------------------------
            const arrowCount = player.arrows || 0;
            const arrowIconX = 280; 
            
            // On cherche l'image avec la clé "ARROW" (correspondant à arrow.png)
            const arrowImg = Assets.get("ARROW");
            
            if (arrowImg) {
                // Si l'image est trouvée, on l'affiche proprement
                ctx.drawImage(arrowImg, arrowIconX, iconY - 12, 24, 24);
            } else {
                // Fallback uniquement si l'image n'est pas trouvée (debug)
                ctx.fillStyle = "#FFD700";
                ctx.fillRect(arrowIconX, iconY - 8, 20, 16);
                console.warn("Image 'ARROW' non trouvée dans les assets. Vérifie le nom de la clé.");
            }

            // Affiche le nombre de flèches
            ctx.fillStyle = arrowCount > 0 ? "#fff" : "#666"; // Gris si 0 flèche
            ctx.font = "bold 20px monospace";
            ctx.textBaseline = "middle";
            ctx.fillText(`x${arrowCount}`, arrowIconX + 32, iconY);
        }
    }
}

