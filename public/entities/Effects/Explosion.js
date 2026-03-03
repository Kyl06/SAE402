import { Entity } from '../../engine/Entity.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';

export class Explosion extends Entity {
    constructor(x, y) {
        super(x, y, 32, 32);
        this.spriteSheet = new SpriteSheet('EXPLOSION', 7, 1, 32, 32);
        this.frame = 0;
        this.timer = 0;
        this.speed = 70; // Vitesse de l'animation en ms
        this.z = 20;    // Toujours au-dessus des ennemis et du joueur
        this.collider = false; // Une explosion ne doit pas bloquer les mouvements
    }

    update(delta) {
        this.timer += delta;
        if (this.timer >= this.speed) {
            this.timer = 0;
            this.frame++;
            
            // Si on dépasse la 7ème colonne, on supprime l'entité
            if (this.frame >= 7) {
                this.kill(); 
            }
        }
    }

    draw(ctx) {
        // scale 2 pour une explosion bien visible
        this.spriteSheet.drawFrame(ctx, this.frame, this.x, this.y, 2);
    }
}