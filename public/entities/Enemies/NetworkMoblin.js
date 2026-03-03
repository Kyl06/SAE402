import { Entity } from '../../engine/Entity.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';

export class NetworkMoblin extends Entity {
    constructor(x, y) {
        super(x, y, 32, 32);
        this.spriteSheet = new SpriteSheet('MOBLIN', 4, 4, 16, 16);
        this.facing = 'DOWN';
        this.collider = false; // On désactive les collisions locales pour les entités réseau
    }

    // Met à jour la position et l'orientation depuis le serveur
    onNetworkUpdate(data) {
        const [x, y, facing] = data.split('|');
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.facing = facing;
    }

    draw(ctx) {
        // Détermine la ligne de sprites selon la direction
        const row = { DOWN: 0, UP: 4, LEFT: 8, RIGHT: 12 }[this.facing] || 0;
        
        // Animation simple basée sur le temps pour les Moblins distants
        const walkCycle = (Math.floor(Date.now() / 150) % 2);
        
        this.spriteSheet.drawFrame(ctx, row + walkCycle, this.x, this.y, 2);
    }
}