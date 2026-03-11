/**
 * @file MoblinRoamPoint.js
 * @description Utilitaire pour définir une zone de patrouille circulaire pour les ennemis.
 * Aide l'IA à rester dans son périmètre de garde.
 */

export class MoblinRoamPoint {
    /**
     * @param {number} x, y - Centre de la zone de patrouille
     * @param {number} radius - Rayon maximum autorisé (en pixels)
     */
    constructor(x, y, radius = 100) {
        this.x = x; 
        this.y = y;
        this.radius = radius;
    }

    /**
     * Génère des coordonnées aléatoires à l'intérieur de la zone de patrouille.
     * @returns {Object} { x, y }
     */
    getNextPoint() {
        return {
            x: this.x + (Math.random() - 0.5) * this.radius * 2,
            y: this.y + (Math.random() - 0.5) * this.radius * 2
        };
    }

    /**
     * Vérifie si un point donné se trouve encore dans la zone de garde.
     * @param {number} targetX, targetY 
     * @returns {boolean}
     */
    isInside(targetX, targetY) {
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        // Utilise une boîte de collision simplifiée (AABB) pour la performance au lieu d'une distance euclidienne
        return Math.abs(dx) <= this.radius && Math.abs(dy) <= this.radius;
    }
}