import { Entity } from '../../engine/Entity.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';

export class NetworkMoblin extends Entity {
    constructor(x, y) {
        super(x, y, 32, 32);
        // On s'aligne sur le Moblin original : 4 colonnes, 4 lignes
        this.spriteSheet = new SpriteSheet('MOBLIN', 4, 4, 16, 16);
        this.facing = 'DOWN';
        this.collider = false;
    }

    // Dans NetworkMoblin.js
    updateFromNetwork(targetX, targetY, facing) {
        // On ne change pas x et y brutalement, on stocke la destination
        this.targetX = parseFloat(targetX);
        this.targetY = parseFloat(targetY);
        this.facing = facing;
    }

    update(delta) {
        // Si on a une destination, on s'en rapproche doucement (Lerp)
        if (this.targetX !== undefined) {
            // 0.2 est la vitesse de lissage (entre 0 et 1)
            this.x += (this.targetX - this.x) * 0.2;
            this.y += (this.targetY - this.y) * 0.2;
        }
        super.update(delta);
    }

    draw(ctx) {
        // Sauts de 4 selon ton Moblin.js
        const row = { DOWN: 0, UP: 4, LEFT: 8, RIGHT: 12 }[this.facing] || 0;

        // Animation de marche (frames 0 et 1 de la ligne)
        const walkCycle = (Math.floor(Date.now() / 150) % 2);

        this.spriteSheet.drawFrame(ctx, row + walkCycle, this.x, this.y, 2);
    }
}