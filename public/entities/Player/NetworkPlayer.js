/**
 * Puppet Réseau (Joueur Distant). 
 * Représente l'état répliqué d'un autre client. 
 * N'a pas d'autorité locale sur sa physique et ses collisions (Désactivées).
 */

import { Entity } from '../../engine/Entity.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';
import { Sword } from '../Weapons/Sword.js';
import { Arrow } from '../Weapons/Arrow.js';
import { Animator } from '../../engine/Animator.js';
import { SpriteSequence } from '../../engine/SpriteSequence.js';
import { UP, DOWN, LEFT, RIGHT, SCALE } from '../../constants.js';

export class NetworkPlayer extends Entity {
    constructor(x, y, skinId) {
        super(x, y, 16, 16);
        this.skinId = skinId || 'LINK';
        this.addTag("PLAYER");
        this.facing   = DOWN;
        this.currentAction = 'IDLE'; 
        this.isWalking = false;      
        this.collider  = false; // Le client distant ne doit pas bloquer ou heurter le monde localement.
        this.z = 20;
        this.actionAnimation = null;

        this._buildSheets();

        this.animations = {
            [DOWN]:  new Animator([0,  1],  150),
            [UP]:    new Animator([5,  6],  150),
            [LEFT]:  new Animator([10, 11], 150),
            [RIGHT]: new Animator([15, 16], 150),
        };
    }

    _buildSheets() {
        this.spriteSheet = new SpriteSheet(this.skinId, 5, 4, 16, 16);
        this.swordSheet  = new SpriteSheet('SWORD', 3, 4, 16, 16);
    }

    /**
     * Désérialisation manuelle (Action|X|Y|VX|VY|Skin|Facing|Arrows|IsPain).
     * @param {string} data - Paquet compact pipe-separated.
     */
    onNetworkUpdate(data) {
        const parts = data.split('|');
        const [action, x, y, vx, vy, skin, facing, arrows, isPain, swordLevel, bowLevel] = parts;

        if (!this.actionAnimation) this.currentAction = action;

        this.x = parseInt(x);
        this.y = parseInt(y);
        this.facing = facing || DOWN;
        this.isWalking = (parseFloat(vx) !== 0 || parseFloat(vy) !== 0);

        if (arrows !== undefined) this.arrows = parseInt(arrows);
        if (isPain !== undefined) this.isPainFlashing = (isPain === 'true');

        this.swordLevel = parseInt(swordLevel || 0);
        this.bowLevel = parseInt(bowLevel || 0);

        // Hot-swap de texture si le joueur change de rôle/skin.
        if (skin && this.skinId !== skin) {
            this.skinId = skin;
            this._buildSheets();
        }
    }

    /** Déclenchement d'actions atomiques transmises par broadcast réseau. */
    triggerAction(actionType, facing) {
        this.facing = facing;

        if (actionType === 'SWORD') {
            const sword = new Sword(this.x, this.y, facing);
            sword.collider = false; // L'hôte gère la collision, le client ne fait que l'affichage.
            sword.owner    = this;
            window.game.engine.add(sword);

            this.currentAction = 'SWORD';
            
            // Réplication de la séquence d'attaque locale.
            this.actionAnimation = new SpriteSequence('SWORD_ACTION', [
                { frame: 2, duration: 60, callback: () => { sword.updateFollow(this.x, this.y); sword.useFrame(0); } },
                { frame: 3, duration: 60, callback: () => { sword.updateFollow(this.x, this.y); sword.useFrame(1); } },
                { frame: 3, duration: 60, callback: () => { sword.updateFollow(this.x, this.y); sword.useFrame(2); } }
            ], () => {
                this.actionAnimation = null;
                this.currentAction = 'IDLE';
                sword.kill();
            });
            this.actionAnimation.actorObject = sword;
        }

        if (actionType === 'ARROW') {
            const arrow = new Arrow(this.x, this.y, facing, this);
            arrow.collider = false; 
            window.game.engine.add(arrow);

            this.currentAction = 'ARROW';
            setTimeout(() => { this.currentAction = 'IDLE'; }, 500);
        }
    }

    update(delta) {
        if (this.actionAnimation) this.actionAnimation.work(delta);

        if (this.isWalking) {
            this.animations[this.facing]?.update(delta);
        } else {
            this.animations[this.facing]?.reset();
        }
    }

    draw(ctx) {
        // Aliasing temporel pour le rendu d'invincibilité (Strobe effect).
        if (this.isPainFlashing && Math.floor(Date.now() / 80) % 2 === 0) return;

        const rowStart = { [DOWN]: 0, [UP]: 5, [LEFT]: 10, [RIGHT]: 15 }[this.facing] ?? 0;
        let frame;

        if (this.actionAnimation) {
            frame = rowStart + this.actionAnimation.frameIdx;
        } else if (this.currentAction === 'SWORD' || this.currentAction === 'ARROW') {
            frame = rowStart + 2;
        } else if (this.isWalking) {
            frame = this.animations[this.facing]?.frame ?? rowStart;
        } else {
            frame = rowStart; 
        }

        this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, SCALE);
    }
}