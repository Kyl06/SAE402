/**
 * @file OctorokProjectile.js
 * @description Projectile de l'Octorok
 */

import { Entity } from "../../engine/Entity.js";
import { SpriteSheet } from "../../engine/SpriteSheet.js";
import { UP, DOWN, LEFT, RIGHT, SCALE } from "../../constants.js";

export class OctorokProjectile extends Entity {
    constructor(x, y, vx, vy, ownerNetId = null) {
        super(x, y, 16, 16); // Hitbox augmentée à 16x16
        
        this.netId = 'octo_proj_' + Math.random().toString(36).slice(2, 11);
        this.ownerNetId = ownerNetId;
        
        this.velX = vx;
        this.velY = vy;
        
        this.lifetime = 2500;
        this.age = 0;
        this.active = true;
        this.damage = 1;

        // Spritesheet de l'Octorok (4 colonnes, la 4ème à y=0 est le projectile)
        this.spriteSheet = new SpriteSheet("OCTOROK", 4, 4, 16, 16);
    }

    update(delta) {
        if (!this.active) return;
        
        this.age += delta;
        if (this.age >= this.lifetime) {
            this.deactivate();
            return;
        }
        
        // Physique héritée (super.update gère déjà x += velX * delta)
        super.update(delta);

        // Pas besoin de recalculer la collision ici si GameEngine le fait,
        // MAIS le GameEngine le fait via checkCollisions() qui appelle onCollision().
        // Donc on déplace la logique de collision dans onCollision().
    }

    onCollision(other) {
        if (!this.active) return;

        // Collision joueur
        if (other.hasTag("PLAYER") && !other.isDead) {
            // Calcul de la direction de l'attaque (d'où vient le projectile)
            let direction;
            if (Math.abs(this.velX) > Math.abs(this.velY)) {
                direction = this.velX > 0 ? RIGHT : LEFT;
            } else {
                direction = this.velY > 0 ? DOWN : UP;
            }
            
            other.takeDamage?.(this.damage, direction);
            this.deactivate();
        }
        
        // Collision murs (Floor.js avec collider=true)
        if (other.hasTag("WALL") || other.hasTag("SOLID")) {
            this.deactivate();
        }
    }

    deactivate() {
        this.active = false;
        this.kill();
    }

    draw(ctx) {
        if (!this.active) return;
        
        // Frame 3 : Projectile (4ème colonne, 1ère ligne)
        // On décale de -8 pixels (16 visual px) pour centrer la hitbox 16x16 sur le sprite 32x32
        this.spriteSheet.drawFrame(ctx, 3, this.x - 8, this.y - 8, SCALE);
    }
}