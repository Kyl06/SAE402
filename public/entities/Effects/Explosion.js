// Effet visuel temporaire a la mort d'un ennemi (7 frames)

import { Entity } from '../../engine/Entity.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';

export class Explosion extends Entity {
    constructor(x, y, onComplete) {
        super(x, y, 32, 32);

        this.spriteSheet = new SpriteSheet('EXPLOSION', 7, 1, 32, 32);

        this.frame = 0;
        this.timer = 0;
        this.speed = 70; // ms par frame
        this.z = 20;

        this.collider = false;
        this.onComplete = onComplete;
    }

    update(delta) {
        this.timer += delta;
        if (this.timer >= this.speed) {
            this.timer = 0;
            this.frame++;

            if (this.frame >= 7) {
                this.kill();
                this.onComplete?.();
            }
        }
    }

    draw(ctx) {
        this.spriteSheet.drawFrame(ctx, this.frame, this.x, this.y, 2);
    }
}
