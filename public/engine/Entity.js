export class Entity {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.velX = 0;
        this.velY = 0;
        this.z = 0; // Ordre d'affichage (Layering)
        this.tags = []; // Identifiants (PLAYER, ENEMY, etc.)
        this.collider = true; // Active/désactive les collisions
        this.toRemove = false; // Flag pour suppression par le GameEngine
        this.owner = null; // Référence au créateur (ex: qui a tiré cette flèche)
    }

    kill() { this.toRemove = true; } // Marque l'entité pour suppression
    
    addTag(tag) { if (!this.hasTag(tag)) this.tags.push(tag); } // Ajoute un tag sans doublon
    
    hasTag(tag) { return this.tags.includes(tag); } // Vérifie la présence d'un tag

    // Retourne les dimensions pour l'algorithme AABB
    getCollisionBox() {
        return { x: this.x, y: this.y, w: this.width, h: this.height };
    }

    // Détection de collision par chevauchement (Rectangle vs Rectangle)
    collidesWith(other) {
        const a = this.getCollisionBox();
        const b = other.getCollisionBox();
        return a.x < b.x + b.w && a.x + a.w > b.x &&
               a.y < b.y + b.h && a.y + a.h > b.y;
    }

    // Mise à jour de la position basée sur la vélocité et le temps écoulé
    update(delta) {
        this.x += this.velX * (delta / 1000);
        this.y += this.velY * (delta / 1000);
    }

    draw(ctx) {
        // Méthode vide : doit être définie dans Link.js, Moblin.js, etc.
    }
}