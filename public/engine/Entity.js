/**
 * @file Entity.js
 * @description Classe de base pour tous les objets du jeu (Joueur, Ennemis, Items, FX).
 * Fournit les propriétés fondamentales : position, vitesse, tags et gestion des collisions.
 */

export class Entity {
    /**
     * @param {number} x - Position X initiale (pixels)
     * @param {number} y - Position Y initiale (pixels)
     * @param {number} w - Largeur de collision (pixels)
     * @param {number} h - Hauteur de collision (pixels)
     */
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        
        // Vélocité (vitesse de déplacement en pixels par seconde)
        this.velX = 0;
        this.velY = 0;
        
        // Ordre d'affichage (0 = fond, 10 = joueur, 20 = FX)
        this.z = 0;
        
        // Liste de chaînes de caractères pour identifier l'entité (ex: ["PLAYER", "HERO"])
        this.tags = [];
        
        // Si faux (false), l'entité traverse tout le monde sans déclencher d'événement
        this.collider = true;
        
        // Si vrai (true), le GameEngine supprimera cette entité au prochain cycle de mise à jour
        this.toRemove = false;
        
        // Référence optionnelle à une autre entité (ex: qui a lancé ce projectile)
        this.owner = null;
    }

    /** Marque l'entité pour qu'elle soit supprimée du jeu. */
    kill() { this.toRemove = true; }
    
    /** Ajoute un tag d'identification s'il n'existe pas déjà. */
    addTag(tag) { if (!this.hasTag(tag)) this.tags.push(tag); }
    
    /** Vérifie si l'entité possède un tag spécifique. @returns {boolean} */
    hasTag(tag) { return this.tags.includes(tag); }

    /**
     * Retourne le rectangle de collision au format {x, y, w, h}.
     * Peut être surchargé pour créer des "hitboxes" plus petites que l'image.
     */
    getCollisionBox() {
        return { x: this.x, y: this.y, w: this.width, h: this.height };
    }

    /**
     * Vérifie si cette entité chevauche une autre entité (Algorithme AABB).
     * @param {Entity} other 
     * @returns {boolean}
     */
    collidesWith(other) {
        const a = this.getCollisionBox();
        const b = other.getCollisionBox();
        return a.x < b.x + b.w && a.x + a.w > b.x &&
               a.y < b.y + b.h && a.y + a.h > b.y;
    }

    /**
     * Logique de mise à jour (Physique).
     * @param {number} delta - Temps écoulé depuis la dernière frame en millisecondes.
     */
    update(delta) {
        // Déplacement linéaire basé sur la vitesse (pixels par seconde)
        this.x += this.velX * (delta / 1000);
        this.y += this.velY * (delta / 1000);
    }

    /**
     * Rendu graphique.
     * @param {CanvasRenderingContext2D} ctx - Le contexte 2D du canvas.
     */
    draw(ctx) {
        // À définir dans les classes enfants (Link.js, Moblin.js, etc.)
    }
}