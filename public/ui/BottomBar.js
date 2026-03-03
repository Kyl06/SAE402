import { Entity } from '../engine/Entity.js';
import { Hearts } from './Hearts.js';

export class BottomBar extends Entity {
    constructor() {
        // Positionnée en bas de l'écran (Zone UI)
        super(0, 600, 800, 60); 
        this.collider = false;
        this.z = 999; // Priorité d'affichage absolue
        this.heartsUI = new Hearts();
    }

    draw(ctx) {
        // 1. Rendu du fond de la barre
        ctx.fillStyle = "#000";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Bordure blanche pour le style rétro
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 4;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // 2. Récupération du joueur
        // On privilégie la référence directe pour la performance
        const player = window.game.player;

        if (player) {
            // Dessin des cœurs basé sur les HP actuels de Link
            // On place les cœurs à 20px du bord gauche et centrés verticalement
            this.heartsUI.draw(ctx, player.hp, 20, this.y + 18);
        }

        // Optionnel : Tu pourrais ajouter ici le compteur de rubis ou de flèches
    }
}