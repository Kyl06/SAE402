// Hitbox temporaire de l'epee, creee lors de l'attaque

import { Entity } from '../../engine/Entity.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';
import { UP, DOWN, LEFT, RIGHT, SCALE } from '../../constants.js';

export class Sword extends Entity {
    constructor(x, y, facing) {
        super(x, y, 32, 32);
        this.playerX = x;
        this.playerY = y;
        this.facing = facing;
        this.collider = true;
        this.z = 20;

        // 3 colonnes, 4 lignes : BAS, HAUT, GAUCHE, DROITE
        this.spriteSheet = new SpriteSheet('SWORD', 3, 4, 16, 16);

        this.useFrame(0);
        this.hitEnemies = new Set();
    }

    // Definit l'etape de l'animation (0, 1 ou 2)
    useFrame(swingStep) {
        const rowMapping = { [DOWN]: 0, [UP]: 1, [LEFT]: 2, [RIGHT]: 3 };
        const row = rowMapping[this.facing];
        this.frame = row * 3 + swingStep;

        // Offsets calibres pour chaque arc de swing
        const offsetTable = {
            [DOWN]: [
                { dx: -28, dy: 6   },
                { dx: -18, dy: 22  },
                { dx: 4,   dy: 28  }
            ],
            [UP]: [
                { dx: 28,  dy: -6  },
                { dx: 18,  dy: -22 },
                { dx: -4,  dy: -28 }
            ],
            [LEFT]: [
                { dx: 4,   dy: -28 },
                { dx: -22, dy: -20 },
                { dx: -28, dy: 4   }
            ],
            [RIGHT]: [
                { dx: -4,  dy: -28 },
                { dx: 22,  dy: -20 },
                { dx: 28,  dy: 4   }
            ]
        };

        const config = offsetTable[this.facing][swingStep] || { dx: 0, dy: 0 };
        this.x = this.playerX + config.dx;
        this.y = this.playerY + config.dy;
    }

    updateFollow(x, y) {
        this.playerX = x;
        this.playerY = y;
    }

    getCollisionBox() {
        return { x: this.x, y: this.y, w: 32, h: 32 };
    }

    onCollision(other) {
        if (other.hasTag('ENEMY')) {
            if (this.hitEnemies.has(other)) return;
            this.hitEnemies.add(other);

            // 3 de base, 6 avec epee en fer
            const player = window.game.player;
            const dmg = (player && player.swordLevel > 0) ? 6 : 3;

            if (other.takeDamage) {
                other.takeDamage(dmg, this.facing);
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
