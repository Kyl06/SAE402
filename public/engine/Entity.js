/**
 * Bloc de construction de base (Game Object). 
 * Encapsule la transformation (X, Y), la vélocité, le Z-buffer et le système de tags.
 */

export class Entity {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        
        this.velX = 0;
        this.velY = 0;
        this.z = 0;
        this.tags = [];
        this.collider = true; // Flag d'inclusion dans le cycle de détection AABB.
        this.toRemove = false;
        this.owner = null;
    }

    kill() { this.toRemove = true; }
    
    addTag(tag) { if (!this.hasTag(tag)) this.tags.push(tag); }
    hasTag(tag) { return this.tags.includes(tag); }
    removeTag(tag) {
        const index = this.tags.indexOf(tag);
        if (index > -1) this.tags.splice(index, 1);
    }

    /** Rectangle de collision axis-aligned (Hitbox). Surcharger pour les décalages visuels. */
    getCollisionBox() {
        return { x: this.x, y: this.y, w: this.width, h: this.height };
    }

    /** Détection de chevauchement AABB (Axis-Aligned Bounding Box). */
    collidesWith(other) {
        const a = this.getCollisionBox();
        const b = other.getCollisionBox();
        return a.x < b.x + b.w && a.x + a.w > b.x &&
               a.y < b.y + b.h && a.y + a.h > b.y;
    }

    /** Physique du premier ordre : P(t+1) = P(t) + V * dt. */
    update(delta) {
        this.x += this.velX * (delta / 1000);
        this.y += this.velY * (delta / 1000);
    }

    draw(ctx) {}
}