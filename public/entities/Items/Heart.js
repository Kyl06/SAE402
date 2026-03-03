import { Entity } from "../../engine/Entity.js";
import { SpriteSheet } from "../../engine/SpriteSheet.js";

export class Heart extends Entity {
    constructor(x, y) {
        super(x, y, 24, 24); // Hitbox pour la détection de ramasse
        this.addTag("ITEM");
        this.spriteSheet = new SpriteSheet("HEARTS", 3, 1, 8, 8);
        this.z = 5;         // Affiché au sol
        this.collider = true; // Ne bloque pas les mouvements du joueur
    }

    // Gestion du soin lors du contact avec le joueur
    onCollision(other) {
        if (other.hasTag("PLAYER") && other.hp < 6) {
            other.hp = Math.min(6, other.hp + 2); // Soigne 1 cœur plein (2 HP)
            this.kill(); // Supprime l'item du jeu
        }
    }

    draw(ctx) {
        // Animation de flottement sinusoïdale
        const bounce = Math.sin(Date.now() / 200) * 3;
        
        // Dessine la 3ème colonne (index 2) avec un scale de 3
        this.spriteSheet.drawFrame(ctx, 2, this.x, this.y + bounce, 3);
    }
}