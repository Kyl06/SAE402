import { Entity } from '../../engine/Entity.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';

export class NetworkPlayer extends Entity {
    constructor(x, y, skinId = "LINK") {
        super(x, y, 32, 32);
        this.skinId = skinId;
        this.facing = 'DOWN';
        this.isPainFlashing = false;
        this.collider = false; // Désactivé pour éviter les bugs de collision en local
        
        // On utilise l'ID de l'asset (ex: 'LINK') chargé dans Assets.js
        this.spriteSheet = new SpriteSheet(this.skinId, 10, 10, 32, 32);
    }

    // Met à jour l'allié avec les données reçues du serveur
    onNetworkUpdate(data) {
        const parts = data.split('|');
        // Structure attendue : action|x|y|facing|flashing (ajuste selon ton NetworkUpdater)
        this.x = parseInt(parts[1]);
        this.y = parseInt(parts[2]);
        this.facing = parts[3]; 
        this.isPainFlashing = parts[4] === 'true';
    }

    draw(ctx) {
        // Effet de clignotement si le joueur distant prend des dégâts
        if (this.isPainFlashing && Math.floor(Date.now() / 100) % 2 === 0) return;

        // Calcul de la frame selon la direction (ex: ligne 0 pour DOWN)
        const row = { DOWN: 0, UP: 10, LEFT: 20, RIGHT: 30 }[this.facing] || 0;
        const walkCycle = (Math.floor(Date.now() / 150) % 2);

        this.spriteSheet.drawFrame(ctx, row + walkCycle, this.x, this.y, 2); 
    }
}