// Découpe une spritesheet en frames individuelles
import { Assets } from './Assets.js';

export class SpriteSheet {
    constructor(assetName, cols, rows, spriteW, spriteH) {
        this.assetName = assetName;
        this.cols = cols;
        this.rows = rows;
        this.spriteW = spriteW;
        this.spriteH = spriteH;
    }

    // Dessine une frame par index (gauche→droite, haut→bas)
    drawFrame(ctx, frameIdx, x, y, scale = 1) {
        const image = Assets.get(this.assetName);
        if (!image) return;

        const sx = (frameIdx % this.cols) * this.spriteW;
        const sy = Math.floor(frameIdx / this.cols) * this.spriteH;

        ctx.drawImage(
            image,
            sx, sy, this.spriteW, this.spriteH,
            Math.floor(x), Math.floor(y),
            this.spriteW * scale, this.spriteH * scale
        );
    }
}
