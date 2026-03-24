// Affichage des coeurs de vie sur le HUD (vide, demi, plein)

import { SpriteSheet } from '../engine/SpriteSheet.js';

export class Hearts {
    constructor() {
        // 3 colonnes : 0=Vide, 1=Demi, 2=Plein
        this.spriteSheet = new SpriteSheet("HEARTS", 3, 1, 8, 8);
        this.heartSize = 32;
    }

    draw(ctx, hp, startX, startY, maxHp = 6) {
        const maxHearts = Math.ceil(maxHp / 2);

        for (let i = 0; i < maxHearts; i++) {
            let frame = 0;

            // Chaque coeur i represente les HP [i*2+1] a [i*2+2]
            if (hp >= (i + 1) * 2) {
                frame = 2;
            } else if (hp === (i * 2) + 1) {
                frame = 1;
            }

            this.spriteSheet.drawFrame(
                ctx,
                frame,
                startX + i * (this.heartSize + 8),
                startY,
                4
            );
        }
    }
}
