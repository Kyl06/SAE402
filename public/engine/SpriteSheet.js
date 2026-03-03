import { Assets } from './Assets.js';

export class SpriteSheet {
    constructor(assetName, cols, rows, spriteW, spriteH) {
        this.assetName = assetName; // Nom de l'image chargée dans Assets
        this.cols = cols;           // Nombre de colonnes
        this.rows = rows;           // Nombre de lignes
        this.spriteW = spriteW;     // Largeur d'une frame (px)
        this.spriteH = spriteH;     // Hauteur d'une frame (px)
    }

    // Dessine une frame spécifique selon son index (0, 1, 2...)
    drawFrame(ctx, frameIdx, x, y, scale = 1) {
        const image = Assets.get(this.assetName);
        if (!image) return;

        // Calcul des coordonnées de la source (dans l'image)
        const sx = (frameIdx % this.cols) * this.spriteW;
        const sy = Math.floor(frameIdx / this.cols) * this.spriteH;
        
        // Rendu sur le canvas avec mise à l'échelle
        ctx.drawImage(
            image, 
            sx, sy, this.spriteW, this.spriteH, 
            Math.floor(x), Math.floor(y), this.spriteW * scale, this.spriteH * scale
        );
    }
}