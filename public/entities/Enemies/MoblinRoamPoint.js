// Zone de patrouille circulaire pour les ennemis

export class MoblinRoamPoint {
    constructor(x, y, radius = 100) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    // Coordonnees aleatoires dans la zone
    getNextPoint() {
        return {
            x: this.x + (Math.random() - 0.5) * this.radius * 2,
            y: this.y + (Math.random() - 0.5) * this.radius * 2
        };
    }

    // Utilise une AABB simplifiee au lieu de la distance euclidienne pour la performance
    isInside(targetX, targetY) {
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        return Math.abs(dx) <= this.radius && Math.abs(dy) <= this.radius;
    }
}
