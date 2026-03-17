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
        const walkables = ['GRASS', 'SAND', 'ORANGE_GROUND', 'ORANGE_PLANT', 'YELLOW_GROUND', 'BLUE_GROUND', 'TULIP', 'LEAVES', 'LIGHT_BLUE_GROUND', 'LEAF_GROUND', 'ORANGE_PATH', 'FLOWERS', 'DIRT', 'DIRT_BRIGHT', 'SHOP', 'BRIDGE_H_LEFT', 'BRIDGE_H_RIGHT', 'HERBESOL', 'HERBESOL2', 'PORTAIL',
            'FORT_SOL_BLEU', 'FORT_SOL_BLEU_2', 'FORT_MUR_BLEU',
            'CIM_STRUCT_4', 'CIM_SOL_15', 'CIM_SOL_16', 'CIM_SOL_17', 'CIM_SOL_18', 'CIM_SOL_19', 'CIM_SOL_20', 'CIM_SOL_21', 'CIM_SOL_22', 'CIM_SOL_23', 'CIM_SOL_24', 'CIM_SOL_25', 'CIM_SOL_26', 'CIM_SOL_27', 'CIM_SOL_28'];
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

        // Tiles depuis la spritesheet forteresse.png
        if (this.type.startsWith('FORT_')) {
            const fortImg = Assets.get("FORTERESSE");
            if (!fortImg) return;
            const fortMapping = {
                'FORT_MUR_GRIS': { sx: 0, sy: 0 }, 'FORT_MUR_BLEU': { sx: 16, sy: 0 }, 'FORT_BARREAUX_1': { sx: 32, sy: 0 }, 'FORT_BARREAUX_2': { sx: 48, sy: 0 }, 'FORT_SOL_BLEU': { sx: 64, sy: 0 }, 'FORT_PIERRE_SOMBRE': { sx: 80, sy: 0 }, 'FORT_MUR_LIGNE': { sx: 96, sy: 0 }, 'FORT_NOIR': { sx: 112, sy: 0 }, 'FORT_COIN_1': { sx: 128, sy: 0 }, 'FORT_COIN_2': { sx: 144, sy: 0 },
                'FORT_MUR_GRIS_2': { sx: 0, sy: 16 }, 'FORT_MUR_BLEU_2': { sx: 16, sy: 16 }, 'FORT_BARREAUX_3': { sx: 32, sy: 16 }, 'FORT_BARREAUX_4': { sx: 48, sy: 16 }, 'FORT_SOL_BLEU_2': { sx: 64, sy: 16 }, 'FORT_PIERRE_SOMBRE_2': { sx: 80, sy: 16 }, 'FORT_MUR_LIGNE_2': { sx: 96, sy: 16 }, 'FORT_NOIR_2': { sx: 112, sy: 16 }, 'FORT_COIN_3': { sx: 128, sy: 16 }, 'FORT_COIN_4': { sx: 144, sy: 16 },
                'FORT_SOL_1': { sx: 0, sy: 32 }, 'FORT_SOL_2': { sx: 16, sy: 32 }, 'FORT_SOL_3': { sx: 32, sy: 32 }, 'FORT_SOL_4': { sx: 48, sy: 32 }, 'FORT_SOL_5': { sx: 64, sy: 32 }, 'FORT_SOL_6': { sx: 80, sy: 32 }, 'FORT_SOL_7': { sx: 96, sy: 32 }, 'FORT_SOL_8': { sx: 112, sy: 32 }, 'FORT_SOL_9': { sx: 128, sy: 32 }, 'FORT_SOL_10': { sx: 144, sy: 32 },
                'FORT_DECO_1': { sx: 0, sy: 48 }, 'FORT_DECO_2': { sx: 16, sy: 48 }, 'FORT_DECO_3': { sx: 32, sy: 48 }, 'FORT_DECO_4': { sx: 48, sy: 48 }, 'FORT_DECO_5': { sx: 64, sy: 48 }, 'FORT_DECO_6': { sx: 80, sy: 48 }, 'FORT_DECO_7': { sx: 96, sy: 48 }, 'FORT_DECO_8': { sx: 112, sy: 48 }, 'FORT_DECO_9': { sx: 128, sy: 48 }, 'FORT_DECO_10': { sx: 144, sy: 48 },
                'FORT_BAS_1': { sx: 0, sy: 64 }, 'FORT_BAS_2': { sx: 16, sy: 64 }, 'FORT_BAS_3': { sx: 32, sy: 64 }, 'FORT_BAS_4': { sx: 48, sy: 64 }, 'FORT_BAS_5': { sx: 64, sy: 64 }, 'FORT_BAS_6': { sx: 80, sy: 64 }, 'FORT_BAS_7': { sx: 96, sy: 64 }, 'FORT_BAS_8': { sx: 112, sy: 64 }, 'FORT_BAS_9': { sx: 128, sy: 64 }, 'FORT_BAS_10': { sx: 144, sy: 64 },
            };
            const ft = fortMapping[this.type];
            if (ft) {
                ctx.drawImage(fortImg, ft.sx, ft.sy, 16, 16, this.x, this.y, this.width, this.height);
            }
            return;
        }

        // Tiles depuis la spritesheet cimetiere.png
        if (this.type.startsWith('CIM_')) {
            const cimImg = Assets.get("CIMETIERE");
            if (!cimImg) return;
            const cimMapping = {
                // Row 0
                'CIM_TOMBE_HG': { sx: 0, sy: 0 }, 'CIM_TOMBE_HD': { sx: 16, sy: 0 }, 'CIM_SOL_1': { sx: 32, sy: 0 }, 'CIM_SOL_2': { sx: 48, sy: 0 }, 'CIM_SOL_3': { sx: 64, sy: 0 }, 'CIM_SOL_4': { sx: 80, sy: 0 }, 'CIM_SOL_5': { sx: 96, sy: 0 }, 'CIM_SOL_6': { sx: 112, sy: 0 }, 'CIM_SOL_7': { sx: 128, sy: 0 }, 'CIM_MUR_1': { sx: 144, sy: 0 }, 'CIM_MUR_2': { sx: 160, sy: 0 }, 'CIM_PILIER_1': { sx: 176, sy: 0 }, 'CIM_MUR_3': { sx: 192, sy: 0 }, 'CIM_MUR_4': { sx: 208, sy: 0 },
                // Row 1
                'CIM_TOMBE_BG': { sx: 0, sy: 16 }, 'CIM_TOMBE_BD': { sx: 16, sy: 16 }, 'CIM_SOL_8': { sx: 32, sy: 16 }, 'CIM_SOL_9': { sx: 48, sy: 16 }, 'CIM_SOL_10': { sx: 64, sy: 16 }, 'CIM_SOL_11': { sx: 80, sy: 16 }, 'CIM_SOL_12': { sx: 96, sy: 16 }, 'CIM_SOL_13': { sx: 112, sy: 16 }, 'CIM_SOL_14': { sx: 128, sy: 16 }, 'CIM_MUR_5': { sx: 144, sy: 16 }, 'CIM_MUR_6': { sx: 160, sy: 16 }, 'CIM_PILIER_2': { sx: 176, sy: 16 }, 'CIM_MUR_7': { sx: 192, sy: 16 }, 'CIM_MUR_8': { sx: 208, sy: 16 },
                // Row 2
                'CIM_DECO_1': { sx: 0, sy: 32 }, 'CIM_DECO_2': { sx: 16, sy: 32 }, 'CIM_DECO_3': { sx: 32, sy: 32 }, 'CIM_DECO_4': { sx: 48, sy: 32 }, 'CIM_MOSAIQUE_1': { sx: 64, sy: 32 }, 'CIM_MOSAIQUE_2': { sx: 80, sy: 32 }, 'CIM_MOSAIQUE_3': { sx: 96, sy: 32 }, 'CIM_MOSAIQUE_4': { sx: 112, sy: 32 }, 'CIM_MOSAIQUE_5': { sx: 128, sy: 32 }, 'CIM_MUR_9': { sx: 144, sy: 32 }, 'CIM_MUR_10': { sx: 160, sy: 32 }, 'CIM_PILIER_3': { sx: 176, sy: 32 }, 'CIM_MUR_11': { sx: 192, sy: 32 }, 'CIM_MUR_12': { sx: 208, sy: 32 },
                // Row 3
                'CIM_DECO_5': { sx: 0, sy: 48 }, 'CIM_DECO_6': { sx: 16, sy: 48 }, 'CIM_ROSE_1': { sx: 32, sy: 48 }, 'CIM_ROSE_2': { sx: 48, sy: 48 }, 'CIM_ROSE_3': { sx: 64, sy: 48 }, 'CIM_ROSE_4': { sx: 80, sy: 48 }, 'CIM_ROSE_5': { sx: 96, sy: 48 }, 'CIM_ROSE_6': { sx: 112, sy: 48 }, 'CIM_ROSE_7': { sx: 128, sy: 48 }, 'CIM_MUR_13': { sx: 144, sy: 48 }, 'CIM_MUR_14': { sx: 160, sy: 48 }, 'CIM_PILIER_4': { sx: 176, sy: 48 }, 'CIM_MUR_15': { sx: 192, sy: 48 }, 'CIM_MUR_16': { sx: 208, sy: 48 },
                // Row 4
                'CIM_STRUCT_1': { sx: 0, sy: 64 }, 'CIM_STRUCT_2': { sx: 16, sy: 64 }, 'CIM_ROSE_8': { sx: 32, sy: 64 }, 'CIM_ROSE_9': { sx: 48, sy: 64 }, 'CIM_ROSE_10': { sx: 64, sy: 64 }, 'CIM_ROSE_11': { sx: 80, sy: 64 }, 'CIM_ROSE_12': { sx: 96, sy: 64 }, 'CIM_ROSE_13': { sx: 112, sy: 64 }, 'CIM_ROSE_14': { sx: 128, sy: 64 }, 'CIM_MUR_17': { sx: 144, sy: 64 }, 'CIM_MUR_18': { sx: 160, sy: 64 }, 'CIM_PILIER_5': { sx: 176, sy: 64 }, 'CIM_MUR_19': { sx: 192, sy: 64 }, 'CIM_MUR_20': { sx: 208, sy: 64 },
                // Row 5
                'CIM_STRUCT_3': { sx: 0, sy: 80 }, 'CIM_STRUCT_4': { sx: 16, sy: 80 }, 'CIM_SOL_15': { sx: 32, sy: 80 }, 'CIM_SOL_16': { sx: 48, sy: 80 }, 'CIM_SOL_17': { sx: 64, sy: 80 }, 'CIM_SOL_18': { sx: 80, sy: 80 }, 'CIM_SOL_19': { sx: 96, sy: 80 }, 'CIM_SOL_20': { sx: 112, sy: 80 }, 'CIM_SOL_21': { sx: 128, sy: 80 }, 'CIM_MUR_21': { sx: 144, sy: 80 }, 'CIM_MUR_22': { sx: 160, sy: 80 }, 'CIM_DECO_7': { sx: 176, sy: 80 }, 'CIM_MUR_23': { sx: 192, sy: 80 }, 'CIM_MUR_24': { sx: 208, sy: 80 },
                // Row 6
                'CIM_STRUCT_5': { sx: 0, sy: 96 }, 'CIM_STRUCT_6': { sx: 16, sy: 96 }, 'CIM_SOL_22': { sx: 32, sy: 96 }, 'CIM_SOL_23': { sx: 48, sy: 96 }, 'CIM_SOL_24': { sx: 64, sy: 96 }, 'CIM_SOL_25': { sx: 80, sy: 96 }, 'CIM_SOL_26': { sx: 96, sy: 96 }, 'CIM_SOL_27': { sx: 112, sy: 96 }, 'CIM_SOL_28': { sx: 128, sy: 96 }, 'CIM_MUR_25': { sx: 144, sy: 96 }, 'CIM_MUR_26': { sx: 160, sy: 96 }, 'CIM_DECO_8': { sx: 176, sy: 96 }, 'CIM_MUR_27': { sx: 192, sy: 96 }, 'CIM_MUR_28': { sx: 208, sy: 96 },
            };
            const ct = cimMapping[this.type];
            if (ct) {
                ctx.drawImage(cimImg, ct.sx, ct.sy, 16, 16, this.x, this.y, this.width, this.height);
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