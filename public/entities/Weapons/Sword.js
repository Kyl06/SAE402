/**
 * @file Sword.js
 * @description Gère l'effet visuel et la hitbox de l'épée de Link.
 * L'épée est une entité temporaire créée lors de l'attaque.
 */

import { Entity } from '../../engine/Entity.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';
import { UP, DOWN, LEFT, RIGHT, SCALE } from '../../constants.js';

export class Sword extends Entity {
    /**
     * @param {number} x, y - Position de Link
     * @param {string} facing - Direction dans laquelle Link regarde
     */
    constructor(x, y, facing) {
        super(x, y, 32, 32); // Zone de collision large pour l'épée
        this.facing = facing;
        this.collider = true;
        this.z = 20; // Dessiné par-dessus Link
        
        // Spritesheet de l'épée (3 étapes d'animation par direction)
        this.spriteSheet = new SpriteSheet('SWORD', 3, 4, 32, 32);
        
        // Aligne précisément l'épée sur la main du sprite de Link
        this.applyNudges();
    }

    /**
     * Ajuste les coordonnées relatives pour que l'épée "sorte" du bouclier/main.
     */
    applyNudges() {
        const offsets = {
            [DOWN]:  { dx: -5, dy: 9,  f: 0 },
            [UP]:    { dx: 5,  dy: -9, f: 3 },
            [LEFT]:  { dx: -8, dy: -7, f: 6 },
            [RIGHT]: { dx: 8,  dy: -7, f: 9 }
        };

        const config = offsets[this.facing];
        // SCALE (2) est appliqué pour correspondre au zoom du jeu
        this.x += config.dx * SCALE;
        this.y += config.dy * SCALE;
        this.frame = config.f; // Frame initiale (bras levé)
    }

    /**
     * Change la frame au cours de l'animation de swing.
     * Appelé par PlayerActions via SpriteSequence.
     * @param {number} swingStep - 0, 1 ou 2
     */
    useFrame(swingStep) {
        const baseFrame = { [DOWN]: 0, [UP]: 3, [LEFT]: 6, [RIGHT]: 9 };
        this.frame = (baseFrame[this.facing] || 0) + swingStep;
    }

    /** 
     * Détection des coups portés aux ennemis.
     */
    onCollision(other) {
        if (other.hasTag('ENEMY')) {
            // 1. Feedback immédiat (L'Hôte ou le Client voit le monstre reculer localement)
            if (other.takeDamage) {
                other.takeDamage(this.facing);
            }

            // 2. SIGNAL RÉSEAU : On envoie la collision au serveur.
            // Si on est Joueur 2, le serveur relaiera à l'Hôte pour valider les PV du monstre.
            if (window.game.network && other.netId) {
                window.game.network.sendHit(other.netId, 1, this.facing);
            }
        }
    }

    /** Rendu de l'épée. */
    draw(ctx) {
        this.spriteSheet.drawFrame(ctx, this.frame, this.x, this.y, 2);
    }
}