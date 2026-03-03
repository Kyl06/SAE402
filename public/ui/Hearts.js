import { SpriteSheet } from '../engine/SpriteSheet.js';

export class Hearts {
    constructor() {
        // SpriteSheet : 0 = Vide, 1 = Moitié, 2 = Plein
        this.spriteSheet = new SpriteSheet('HEARTS', 3, 1, 8, 8);
    }

    draw(ctx, hp, xStart, yPos, maxHearts = 3) {
        const spacing = 28; // Espace entre chaque cœur
        const scale = 3;    // Multiplicateur pour le pixel art 8x8

        for (let i = 0; i < maxHearts; i++) {
            let frame = 0; // Par défaut : Cœur vide

            // Logique de remplissage par palier de 2 HP
            if (hp >= (i + 1) * 2) {
                frame = 2; // Cœur plein
            } else if (hp >= (i * 2) + 1) {
                frame = 1; // Demi-cœur
            }

            const x = xStart + (i * spacing);
            this.spriteSheet.drawFrame(ctx, frame, x, yPos, scale);
        }
    }
}