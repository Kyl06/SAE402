/**
 * Découpeur d'Atlas (Spritesheet). 
 * Extrait des sous-rectangles d'une image source pour le rendu par frame.
 */

import { Assets } from './Assets.js';

export class SpriteSheet {
    constructor(assetName, cols, rows, spriteW, spriteH) {
        this.assetName = assetName;
        this.cols = cols;
        this.rows = rows;
        this.spriteW = spriteW;
        this.spriteH = spriteH;
    }

    /**
     * Rendu d'une frame via ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh).
     * @param {number} frameIdx - Index 0-based (lecture de gauche à droite, haut en bas).
     */
    drawFrame(ctx, frameIdx, x, y, scale = 1) {
        const image = Assets.get(this.assetName);
        if (!image) return;

        const sx = (frameIdx % this.cols) * this.spriteW;
        const sy = Math.floor(frameIdx / this.cols) * this.spriteH;
        
        ctx.drawImage(
            image, 
            sx, sy, this.spriteW, this.spriteH,
            Math.floor(x), Math.floor(y), // Flooring pour éviter le sub-pixel aliasing (flou).
            this.spriteW * scale, this.spriteH * scale
        );
    }
}