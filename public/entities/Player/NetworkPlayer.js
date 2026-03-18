/**
 * @file NetworkPlayer.js
 * @description Représente l'avatar d'un autre joueur (Joueur 2 vu par le Joueur 1, et vice-versa).
 * Contrairement au Joueur local, le NetworkPlayer ne répond pas au clavier.
 * Il est piloté par les messages envoyés par le serveur.
 */

import { Entity } from '../../engine/Entity.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';
import { Sword } from '../Weapons/Sword.js';
import { Arrow } from '../Weapons/Arrow.js';
import { Animator } from '../../engine/Animator.js';
import { SpriteSequence } from '../../engine/SpriteSequence.js';
import { UP, DOWN, LEFT, RIGHT, SCALE } from '../../constants.js';

export class NetworkPlayer extends Entity {
    /**
     * @param {number} x, y - Position initiale
     * @param {string} skinId - "LINK" ou "LINK2"
     */
    constructor(x, y, skinId) {
        super(x, y, 16, 16);
        this.skinId = skinId || 'LINK';
        this.addTag("PLAYER");
        this.facing   = DOWN;
        this.currentAction = 'IDLE'; 
        this.isWalking = false;      
        this.collider  = false;      
        this.z = 10;
        this.actionAnimation = null;

        // Prépare les ressources graphiques
        this._buildSheets();

        // Animateurs de marche
        this.animations = {
            [DOWN]:  new Animator([0,  1],  150),
            [UP]:    new Animator([5,  6],  150),
            [LEFT]:  new Animator([10, 11], 150),
            [RIGHT]: new Animator([15, 16], 150),
        };
    }

    /** 
     * Initialise ou met à jour les spritesheets selon le skinId.
     */
    _buildSheets() {
        this.spriteSheet = new SpriteSheet(this.skinId, 5, 4, 16, 16);
        this.swordSheet  = new SpriteSheet('SWORD', 3, 4, 16, 16);
    }

    /** 
     * Met à jour l'état interne à partir d'un message réseau.
     * @param {string} data - Format : action|x|y|vx|vy|skinId|facing|arrows|isPainFlashing
     */
    onNetworkUpdate(data) {
        const [action, x, y, vx, vy, skin, facing, arrows, isPainFlashing] = data.split('|');

        // On ne change pas l'action si on a déjà une animation locale lancée par triggerAction
        if (!this.actionAnimation) {
            this.currentAction = action;
        }

        this.x = parseInt(x);
        this.y = parseInt(y);
        this.facing = facing || DOWN;
        this.isWalking = (parseFloat(vx) !== 0 || parseFloat(vy) !== 0);

        if (arrows !== undefined) {
            this.arrows = parseInt(arrows);
        }

        if (isPainFlashing !== undefined) {
            this.isPainFlashing = (isPainFlashing === 'true');
        }

        // Si le joueur distant change de personnage, on met à jour localement
        if (skin && this.skinId !== skin) {
            this.skinId = skin;
            this._buildSheets();
        }
    }

    /** 
     * Reproduit visuellement une attaque déclenchée par le joueur distant.
     */
    triggerAction(actionType, facing) {
        this.facing = facing;

        if (actionType === 'SWORD') {
            const sword = new Sword(this.x, this.y, facing);
            sword.collider = false;
            sword.owner    = this;
            window.game.engine.add(sword);

            this.currentAction = 'SWORD';
            
            // On utilise la même logique de séquence que PlayerActions.js
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

    /** Mise à jour de l'animation. */
    update(delta) {
        if (this.actionAnimation) {
            this.actionAnimation.work(delta);
        }

        if (this.isWalking) {
            this.animations[this.facing]?.update(delta);
        } else {
            this.animations[this.facing]?.reset();
        }
    }

    /** Rendu graphique du clone distant. */
    draw(ctx) {
        // Clignotement de douleur
        if (this.isPainFlashing && Math.floor(Date.now() / 80) % 2 === 0) {
            return;
        }

        // Choix de la ligne de spritesheet selon la direction
        const rowStart = { [DOWN]: 0, [UP]: 5, [LEFT]: 10, [RIGHT]: 15 }[this.facing] ?? 0;
        let frame;

        // On affiche la frame de l'animation en cours (SWORD/ARROW)
        if (this.actionAnimation) {
            frame = rowStart + this.actionAnimation.frameIdx;
        } else if (this.currentAction === 'SWORD' || this.currentAction === 'ARROW') {
            frame = rowStart + 2;
        } else if (this.isWalking) {
            frame = this.animations[this.facing]?.frame ?? rowStart;
        } else {
            frame = rowStart; // Image de Link debout immobile
        }

        this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, SCALE);
    }
}