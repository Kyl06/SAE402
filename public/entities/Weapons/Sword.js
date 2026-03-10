import { Entity } from '../../engine/Entity.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';
import { UP, DOWN, LEFT, RIGHT, SCALE } from '../../constants.js';

export class Sword extends Entity {
    constructor(x, y, facing) {
        super(x, y, 32, 32);
        this.facing = facing;
        this.collider = true;
        this.z = 20; // Toujours au-dessus du joueur
        this.spriteSheet = new SpriteSheet('SWORD', 3, 4, 32, 32);
        this.owner = null;

        this.applyNudges(); // Aligne l'épée sur la main de Link
    }

    // Ajuste la position de l'épée selon la direction de Link
    applyNudges() {
        const offsets = {
            [DOWN]:  { dx: -5, dy: 9,  f: 0 },
            [UP]:    { dx: 5,  dy: -9, f: 3 },
            [LEFT]:  { dx: -8, dy: -7, f: 6 },
            [RIGHT]: { dx: 8,  dy: -7, f: 9 }
        };

        const config = offsets[this.facing];
        this.x += config.dx * SCALE;
        this.y += config.dy * SCALE;
        this.frame = config.f;
    }

    // Change la frame de l'épée au cours du swing (appelé par SpriteSequence)
    useFrame(swingStep) {
        const baseFrame = { [DOWN]: 0, [UP]: 3, [LEFT]: 6, [RIGHT]: 9 };
        this.frame = (baseFrame[this.facing] || 0) + swingStep;
    }

    /**
     * Gestion de la collision
     */
    onCollision(other) {
        if (other.hasTag('ENEMY')) {
            // 1. Feedback visuel immédiat pour celui qui frappe (clignotement/recul local)
            if (other.takeDamage) {
                other.takeDamage(this.facing);
            }

            // 2. SIGNAL RÉSEAU : On prévient le Host pour valider les dégâts réels
            // On envoie l'ID du monstre, la valeur (1) et la direction (this.facing)
            if (window.game.network && other.netId) {
                window.game.network.sendHit(other.netId, 1, this.facing);
            }
        }
    }

    draw(ctx) {
        this.spriteSheet.drawFrame(ctx, this.frame, this.x, this.y, 2);
    }
}