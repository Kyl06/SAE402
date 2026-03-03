import { Entity } from '../engine/Entity.js';

export class Floor extends Entity {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.addTag('WALL'); // Considéré comme un mur pour les projectiles
        this.addTag('SOLID');
        this.collider = true;
        this.z = 0; // Niveau du sol
    }

    // Version Debug : Dessine une zone rouge semi-transparente
    // À désactiver ou remplacer par une texture plus tard
    draw(ctx) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'; 
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    /**
     * Empêche les entités de traverser l'obstacle.
     * Utilise la méthode de séparation sur l'axe de moindre pénétration.
     */
    onCollision(other) {
        if (!other.collider || other.hasTag('ITEM')) return;

        if (other.hasTag('PLAYER') || other.hasTag('ENEMY')) {
            // Calcul des centres
            const midThisX = this.x + this.width / 2;
            const midOtherX = other.x + other.width / 2;
            const midThisY = this.y + this.height / 2;
            const midOtherY = other.y + other.height / 2;

            // Calcul de l'overlap (chevauchement)
            const dx = midThisX - midOtherX;
            const dy = midThisY - midOtherY;
            
            const combinedHalfWidths = (this.width + other.width) / 2;
            const combinedHalfHeights = (this.height + other.height) / 2;

            const overlapX = combinedHalfWidths - Math.abs(dx);
            const overlapY = combinedHalfHeights - Math.abs(dy);

            // On repousse sur l'axe où le chevauchement est le plus faible
            if (overlapX < overlapY) {
                if (dx > 0) {
                    other.x = this.x - other.width;
                } else {
                    other.x = this.x + this.width;
                }
            } else {
                if (dy > 0) {
                    other.y = this.y - other.height;
                } else {
                    other.y = this.y + this.height;
                }
            }
        }
    }
}