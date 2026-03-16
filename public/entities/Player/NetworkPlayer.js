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
        this.currentAction = 'IDLE'; // Action réseau en cours (SWORD/ARROW)
        this.isWalking = false;      // Contrôle l'activation de l'Animator
        this.collider  = false;      // Les clones n'ont pas de physique locale (évite les bugs de décalage)
        this.z = 10;

        // Prépare les ressources graphiques
        this._buildSheets();

        // Animateurs de marche (identiques à Player.js)
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
        // Spritesheet du joueur (5 colonnes × 4 lignes)
        this.spriteSheet = new SpriteSheet(this.skinId, 5, 4, 16, 16);
        // On pré-charge aussi l'épée
        this.swordSheet  = new SpriteSheet('SWORD', 3, 4, 32, 32);
    }

    /** 
     * Met à jour l'état interne à partir d'un message réseau.
     * @param {string} data - Format : action|x|y|vx|vy|skinId|facing
     */
   onNetworkUpdate(data) {
    const [action, x, y, vx, vy, skin, facing, arrows] = data.split('|');

    this.currentAction = action;
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.facing = facing || DOWN;
    this.isWalking = (parseFloat(vx) !== 0 || parseFloat(vy) !== 0);
    
    // Synchronise le nombre de flèches (8ème paramètre)
    if (arrows !== undefined) {
        this.arrows = parseInt(arrows);
    }

    if (skin && this.skinId !== skin) {
        this.skinId = skin;
        this._buildSheets();
    }
}
    /** 
     * Reproduit visuellement une attaque déclenchée par le joueur distant.
     * @param {string} actionType - 'SWORD' ou 'ARROW'
     * @param {string} facing - Direction de l'attaque
     */
    triggerAction(actionType, facing) {
        this.facing = facing;

        if (actionType === 'SWORD') {
            // Création d'une épée PUREMENT VISUELLE (ne doit pas infliger de dégâts sur cet écran)
            const sword = new Sword(this.x, this.y, facing);
            sword.collider = false;
            sword.owner    = this;
            window.game.engine.add(sword);

            this.currentAction = 'SWORD';
            // On désactive l'état d'attaque après 150ms (fin de l'animation)
            setTimeout(() => {
                this.currentAction = 'IDLE';
                sword.kill();
            }, 150);
        }

        if (actionType === 'ARROW') {
            // Création d'une flèche PUREMENT VISUELLE (ne doit pas toucher les monstres ici)
            const arrow = new Arrow(this.x, this.y, facing, this);
            arrow.collider = false;
            window.game.engine.add(arrow);

            this.currentAction = 'ARROW';
            setTimeout(() => { this.currentAction = 'IDLE'; }, 500);
        }
    }

    /** Mise à jour de l'animation de marche. */
    update(delta) {
        if (this.isWalking) {
            this.animations[this.facing]?.update(delta);
        } else {
            this.animations[this.facing]?.reset();
        }
    }

    /** Rendu graphique du clone distant. */
    draw(ctx) {
        // Choix de la ligne de spritesheet selon la direction
        const rowStart = { [DOWN]: 0, [UP]: 5, [LEFT]: 10, [RIGHT]: 15 }[this.facing] ?? 0;
        let frame;

        // On affiche la frame d'attaque (2) si une action est en cours
        if (this.currentAction === 'SWORD' || this.currentAction === 'ARROW') {
            frame = rowStart + 2;
        } else if (this.isWalking) {
            frame = this.animations[this.facing]?.frame ?? rowStart;
        } else {
            frame = rowStart; // Image de Link debout immobile
        }

        this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, SCALE);
    }
}