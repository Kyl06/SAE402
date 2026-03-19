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
        // x, y est la position du joueur (32x32)
        super(x, y, 32, 32); 
        this.playerX = x;
        this.playerY = y;
        this.facing = facing;
        this.collider = true;
        this.z = 20; 
        
        // Spritesheet : 3 colonnes, 4 lignes 
        // 0=BAS (Arc Gauche->Bas), 1=HAUT (Arc Droite->Haut), 
        // 2=GAUCHE (Arc Haut->Gauche), 3=DROITE (Arc Haut->Droite)
        this.spriteSheet = new SpriteSheet('SWORD', 3, 4, 16, 16);
        
        this.useFrame(0);
    }

    /**
     * Définit l'étape de l'animation (0, 1 ou 2) avec les arcs précis demandés.
     */
    useFrame(swingStep) {
        // Mapping des lignes selon l'ordre : BAS, HAUT, GAUCHE, DROITE
        const rowMapping = { [DOWN]: 0, [UP]: 1, [LEFT]: 2, [RIGHT]: 3 };
        const row = rowMapping[this.facing];
        this.frame = row * 3 + swingStep;

        // Offsets calibrés pour chaque arc spécifique (pixels par rapport au centre de Link)
        const offsetTable = {
            [DOWN]: [
                { dx: -28, dy: 6   }, // Frame 0: Sur la gauche (départ)
                { dx: -18, dy: 22  }, // Frame 1: Bas-Gauche (swing)
                { dx: 4,   dy: 28  }  // Frame 2: Bas (fin)
            ],
            [UP]: [
                { dx: 28,  dy: -6  }, // Frame 0: Sur la droite
                { dx: 18,  dy: -22 }, // Frame 1: Haut-Droite
                { dx: -4,  dy: -28 }  // Frame 2: Haut
            ],
            [LEFT]: [
                { dx: 4,   dy: -28 }, // Frame 0: En haut
                { dx: -22, dy: -20 }, // Frame 1: Haut-Gauche
                { dx: -28, dy: 4   }  // Frame 2: Gauche
            ],
            [RIGHT]: [
                { dx: -4,  dy: -28 }, // Frame 0: En haut
                { dx: 22,  dy: -20 }, // Frame 1: Haut-Droite
                { dx: 28,  dy: 4   }  // Frame 2: Droite
            ]
        };

        const config = offsetTable[this.facing][swingStep] || { dx: 0, dy: 0 };
        this.x = this.playerX + config.dx;
        this.y = this.playerY + config.dy;
    }

    /** Suit le joueur */
    updateFollow(x, y) {
        this.playerX = x;
        this.playerY = y;
    }

    getCollisionBox() {
        return { x: this.x, y: this.y, w: 32, h: 32 };
    }

    onCollision(other) {
        if (other.hasTag('ENEMY')) {
            // Degats : 1 de base, 2 avec epee en fer
            const player = window.game.player;
            const dmg = (player && player.swordLevel > 0) ? 2 : 1;

            if (other.takeDamage) {
                other.takeDamage(this.facing);
            }

            if (window.game.network && other.netId) {
                window.game.network.sendHit(other.netId, dmg, this.facing);
            }
        }
    }

    draw(ctx) {
        this.spriteSheet.drawFrame(ctx, this.frame, this.x, this.y, 2);
    }
}