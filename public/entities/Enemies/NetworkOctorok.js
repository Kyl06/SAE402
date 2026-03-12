/**
 * @file NetworkOctorok.js
 * @description Version réseau de l'Octorok (client Joueur 2)
 */

import { Entity } from '../../engine/Entity.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';

export class NetworkOctorok extends Entity {
    constructor(x, y) {
        super(x, y, 28, 28);
        
        this.spriteSheet = new SpriteSheet('OCTOROK', 4, 4, 16, 16);
        this.facing = 'DOWN';
        this.collider = true;
        this.addTag('ENEMY');
        this.isAiming = false;
    }

    updateFromNetwork(data) {
        this.targetX = parseFloat(data.x);
        this.targetY = parseFloat(data.y);
        this.facing = data.facing;
        this.isAiming = data.isAiming || false;
    }

    update(delta) {
        if (this.targetX !== undefined) {
            this.x += (this.targetX - this.x) * 0.2;
            this.y += (this.targetY - this.y) * 0.2;
        }
        super.update(delta);
    }

    draw(ctx) {
        const row = { DOWN: 0, UP: 4, LEFT: 8, RIGHT: 12 }[this.facing] || 0;
        const walkCycle = (Math.floor(Date.now() / 150) % 2);
        const frame = this.isAiming ? (row + 2) : (row + walkCycle);
        
        this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, 2);
    }
}