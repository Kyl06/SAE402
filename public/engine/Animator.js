/**
 * @file Animator.js
 * @description Gère le défilement des images d'une animation.
 * Utilisé pour la marche, les attaques ou les explosions.
 */

export class Animator {
    /**
     * @param {Array<number>} frames - Liste des indices des images (ex: [0, 1] pour la marche)
     * @param {number} frameDuration - Temps d'affichage de chaque image en millisecondes
     */
    constructor(frames = [0], frameDuration = 100) {
        this.frames = frames;           // Tableau des index de frames dans la spritesheet
        this.duration = frameDuration;  // Vitesse de l'animation
        this.timer = 0;                 // Chronomètre interne
        this.currentFrameIdx = 0;       // Index actuel dans le tableau 'frames'
    }

    /**
     * Met à jour le chronomètre et passe à la frame suivante si nécessaire.
     * @param {number} delta - Temps écoulé depuis la dernière mise à jour
     */
    update(delta) {
        // Pas besoin de calculer si l'animation est statique (1 seule image)
        if (this.frames.length <= 1) return;

        this.timer += delta;
        if (this.timer >= this.duration) {
            // Boucle : on repasse à 0 si on dépasse la fin du tableau
            this.currentFrameIdx = (this.currentFrameIdx + 1) % this.frames.length;
            this.timer = 0; // Réinitialise le timer pour la frame suivante
        }
    }

    /** 
     * Retourne l'index de l'image actuelle à dessiner.
     * @returns {number} 
     */
    get frame() {
        return this.frames[this.currentFrameIdx];
    }

    /** Remet l'animation à son point de départ. */
    reset() {
        this.currentFrameIdx = 0;
        this.timer = 0;
    }
}