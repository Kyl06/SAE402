/**
 * @file Floor.js
 * @description Gère les éléments du décor (sol, arbres, murs).
 * Détermine les zones marchables et les obstacles solides.
 */

import { Entity } from '../engine/Entity.js';
import { Assets } from '../engine/Assets.js';
import { SCALE } from '../constants.js';

export class Floor extends Entity {
    constructor(x, y, type = 'GRASS', options = {}) {
        // Définition de la taille source
        let srcSize = 16;
        if (['TREE', 'ORANGE_TREE', 'DOOR', 'BUSH_BIG'].includes(type)) srcSize = 32;
        if (type === 'SHOP') srcSize = 48;

        // TAILLE RÉELLE DANS LE JEU (ex: 16 * SCALE)

        const realSize = srcSize * SCALE;

        super(x, y, realSize, realSize);

        this.type = type;
        // On ajuste le Z pour les objets hauts et les objets de décor
        const decors = ['OWL', 'EGGS', 'SIGN', 'CHEST', 'STONE', 'VERT_TOP', 'HORI_TOP', 'STATUE', 'BARREL', 'LANTERN', 'CAULDRON', 'OWL_STATUE', 'CRYSTAL'];
        this.z = (srcSize > 16 || decors.includes(type)) ? 10 : (['ORANGE_BLOCK'].includes(type) ? 5 : 0);

        // Système de collision : Solide par défaut sauf pour les sols
        const walkables = ['GRASS', 'SAND', 'ORANGE_GROUND', 'ORANGE_PLANT', 'YELLOW_GROUND', 'BLUE_GROUND', 'TULIP', 'LEAVES', 'LIGHT_BLUE_GROUND', 'LEAF_GROUND', 'ORANGE_PATH', 'FLOWERS', 'DIRT', 'DIRT_BRIGHT', 'SHOP', 'BRIDGE_H_LEFT', 'BRIDGE_H_RIGHT', 'HERBESOL', 'HERBESOL2', 'PORTAIL'];
        this.collider = !walkables.includes(this.type);

        if (this.collider) {
            this.addTag('SOLID');
        }

        // Panneau interactif
        this.signText = options.signText || null;
        this.interactRange = 50;
        this.interactKeyWasDown = false;
        this.playerInRange = false;
        this.indicatorBounce = 0;
    }

    update(delta) {
        if (!this.signText) return;
        const player = window.game.player;
        if (!player) return;

        const dx = (this.x + this.width / 2) - (player.x + player.width / 2);
        const dy = (this.y + this.height / 2) - (player.y + player.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        this.playerInRange = dist < this.interactRange;

        this.indicatorBounce += delta * 0.005;

        const keyDown = window.game.inputs.isHeld('KeyE');
        if (this.playerInRange && keyDown && !this.interactKeyWasDown && !window.game.dialogueActive) {
            const dialogueBox = window.game.dialogueBox;
            if (dialogueBox) {
                dialogueBox.show('Panneau', [this.signText]);
            }
        }
        this.interactKeyWasDown = keyDown;
    }

    draw(ctx) {
        const img = Assets.get("TILESET");
        if (!img) return;

        const mapping = {
            'GRASS': { sx: 32, sy: 0, sw: 16, sh: 16 },
            'SAND': { sx: 32, sy: 16, sw: 16, sh: 16 },
            'TREE': { sx: 0, sy: 0, sw: 32, sh: 32 },
            'WATER': { sx: 48, sy: 0, sw: 16, sh: 16 },
            'BUSH': { sx: 48, sy: 16, sw: 16, sh: 16 },

            'WALL_DOWN': { sx: 64, sy: 0, sw: 16, sh: 16 },
            'WALL_UP': { sx: 80, sy: 0, sw: 16, sh: 16 },
            'WALL_RIGHT': { sx: 64, sy: 16, sw: 16, sh: 16 },
            'WALL_LEFT': { sx: 80, sy: 16, sw: 16, sh: 16 },

            'BRIDGE_H_RIGHT': { sx: 96, sy: 0, sw: 16, sh: 16 },
            'BRIDGE_H_LEFT': { sx: 112, sy: 0, sw: 16, sh: 16 },
            'BRIDGE_V_LEFT': { sx: 96, sy: 16, sw: 16, sh: 16 },
            'BRIDGE_V_RIGHT': { sx: 112, sy: 16, sw: 16, sh: 16 },

            'ORANGE_GROUND': { sx: 128, sy: 0, sw: 16, sh: 16 },
            'ORANGE_PLANT': { sx: 144, sy: 0, sw: 16, sh: 16 },
            'YELLOW_GROUND': { sx: 128, sy: 16, sw: 16, sh: 16 },
            'BLACK_HOLE': { sx: 144, sy: 16, sw: 16, sh: 16 },

            'BLUE_GROUND': { sx: 160, sy: 0, sw: 16, sh: 16 },
            'FENCE': { sx: 176, sy: 0, sw: 16, sh: 16 },
            'RED_WALL': { sx: 160, sy: 16, sw: 16, sh: 16 },
            'BLUE_PLANT': { sx: 176, sy: 16, sw: 16, sh: 16 },

            'ORANGE_TREE': { sx: 0, sy: 32, sw: 32, sh: 32 },
            'DOOR': { sx: 32, sy: 32, sw: 32, sh: 32 },
            'BUSH_BIG': { sx: 64, sy: 32, sw: 32, sh: 32 },

            'VERT_TOP': { sx: 96, sy: 32, sw: 16, sh: 16 },
            'STONE': { sx: 112, sy: 32, sw: 16, sh: 16 },
            'CHEST': { sx: 96, sy: 48, sw: 16, sh: 16 },
            'HORI_TOP': { sx: 112, sy: 48, sw: 16, sh: 16 },

            'TULIP': { sx: 128, sy: 32, sw: 16, sh: 16 },
            'LEAVES': { sx: 144, sy: 32, sw: 16, sh: 16 },
            'LIGHT_BLUE_GROUND': { sx: 128, sy: 48, sw: 16, sh: 16 },
            'LEAF_GROUND': { sx: 144, sy: 48, sw: 16, sh: 16 },

            'OWL': { sx: 160, sy: 32, sw: 16, sh: 16 },
            'EGGS': { sx: 176, sy: 32, sw: 16, sh: 16 },
            'SIGN': { sx: 160, sy: 48, sw: 16, sh: 16 },
            'PURPLE_HOLE': { sx: 176, sy: 48, sw: 16, sh: 16 },

            'SHOP': { sx: 0, sy: 64, sw: 48, sh: 48 }
        };

        // Tiles avec leur propre asset (pas dans le tileset)
        const standalone = { 'HERBESOL': 'HERBESOL', 'HERBESOL2': 'HERBESOL2', 'PORTAIL': 'PORTAIL', 'BRIQUE': 'BRIQUE' };
        if (standalone[this.type]) {
            const sImg = Assets.get(standalone[this.type]);
            if (!sImg) return;
            if (this.type === 'PORTAIL') {
                // Portail : 64x32 source, dessine sur 4x2 tiles (128x64 px)
                ctx.drawImage(sImg, 0, 0, sImg.width, sImg.height, this.x, this.y, 4 * 32, 2 * 32);
            } else {
                ctx.drawImage(sImg, 0, 0, sImg.width, sImg.height, this.x, this.y, this.width, this.height);
            }
            return;
        }

        const t = mapping[this.type];
        if (t) {
            // On dessine à la taille calculée dans le constructeur
            ctx.drawImage(img, t.sx, t.sy, t.sw, t.sh, this.x, this.y, this.width, this.height);
        }

        // Indicateur [E] si panneau et joueur a portee
        if (this.signText && this.playerInRange && !window.game.dialogueActive) {
            this.drawSignIndicator(ctx);
        }
    }

    drawSignIndicator(ctx) {
        const bounceY = Math.sin(this.indicatorBounce * 3) * 3;
        const cx = this.x + this.width / 2;
        const cy = this.y - 10 + bounceY;

        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(cx - 12, cy - 12, 24, 16);
        ctx.strokeStyle = '#ffcc00';
        ctx.lineWidth = 1;
        ctx.strokeRect(cx - 12, cy - 12, 24, 16);

        ctx.fillStyle = '#ffcc00';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('E', cx, cy - 4);
        ctx.textBaseline = 'alphabetic';
        ctx.textAlign = 'left';
    }

    // Système de collision AABB simple
    onCollision(other) {
        if (!this.collider || !other.collider || other.hasTag('ITEM')) return;
        
        const dx = (this.x + this.width/2) - (other.x + other.width/2);
        const dy = (this.y + this.height/2) - (other.y + other.height/2);
        
        const overlapX = (this.width + other.width)/2 - Math.abs(dx);
        const overlapY = (this.height + other.height)/2 - Math.abs(dy);

        if (overlapX > 0 && overlapY > 0) {
            if (overlapX < overlapY) {
                other.x += dx > 0 ? -overlapX : overlapX;
            } else {
                other.y += dy > 0 ? -overlapY : overlapY;
            }
        }
    }
}