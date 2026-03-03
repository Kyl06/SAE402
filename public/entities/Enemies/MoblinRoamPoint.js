export class MoblinRoamPoint {
    constructor(x, y, radius = 100) {
        this.x = x; // Centre de la zone de patrouille
        this.y = y;
        this.radius = radius; // Rayon maximal d'éloignement
    }

    // Calcule une position aléatoire à l'intérieur du rayon
    getNextPoint() {
        return {
            x: this.x + (Math.random() - 0.5) * this.radius * 2,
            y: this.y + (Math.random() - 0.5) * this.radius * 2
        };
    }

    // Vérifie si une entité est encore dans la zone (Utile pour l'IA)
    isInside(targetX, targetY) {
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        return Math.abs(dx) <= this.radius && Math.abs(dy) <= this.radius;
    }
}