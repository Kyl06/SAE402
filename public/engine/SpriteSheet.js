/**
 * @file SpriteSheet.js
 * @description Découpe et dessine des images individuelles (frames) à partir d'une grande image (Atlas).
 * Utilisé pour toutes les entités animées (Link, Moblins, Explosions).
 */

import { Assets } from './Assets.js';

export class SpriteSheet {
    /**
     * @param {string} assetName - Clé de l'image chargée dans le gestionnaire Assets
     * @param {number} cols - Nombre de colonnes de sprites dans l'image
     * @param {number} rows - Nombre de lignes de sprites
     * @param {number} spriteW - Largeur d'un sprite individuel en pixels
     * @param {number} spriteH - Hauteur d'un sprite individuel
     */
    constructor(assetName, cols, rows, spriteW, spriteH) {
        this.assetName = assetName;
        this.cols = cols;
        this.rows = rows;
        this.spriteW = spriteW;
        this.spriteH = spriteH;
    }

    /**
     * Dessine une frame spécifique sur le canvas.
     * @param {CanvasRenderingContext2D} ctx - Le contexte 2D du canvas
     * @param {number} frameIdx - L'index de la frame (commence à 0, de gauche à droite puis de haut en bas)
     * @param {number} x - Position X de rendu
     * @param {number} y - Position Y de rendu
     * @param {number} scale - Zoom d'affichage (2 par défaut dans ce jeu)
     */
    drawFrame(ctx, frameIdx, x, y, scale = 1) {
        // On récupère l'image source brute
        const image = Assets.get(this.assetName);
        if (!image) return;

        // Calcul des coordonnées du rectangle source (dans le fichier image)
        // sx = reste de la division par le nombre de colonnes
        const sx = (frameIdx % this.cols) * this.spriteW;
        // sy = quotient entier de la division par le nombre de colonnes
        const sy = Math.floor(frameIdx / this.cols) * this.spriteH;
        
        /**
         * Appel natif drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
         * s = source (dans l'image)
         * d = destination (sur le canvas)
         */
        ctx.drawImage(
            image, 
            sx, sy,             // Point de départ dans la source
            this.spriteW, this.spriteH, // Taille à découper
            Math.floor(x), Math.floor(y), // Position sur l'écran (arrondi pour éviter le flou)
            this.spriteW * scale, this.spriteH * scale // Taille d'affichage finale
        );
    }
}