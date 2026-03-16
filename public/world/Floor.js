import { Entity } from '../engine/Entity.js';
import { Assets } from '../engine/Assets.js';
import { SCALE } from '../constants.js';

export class Floor extends Entity {
    constructor(x, y, type = 'GRASS') {
        // Définition de la taille source
        let srcSize = 16;
        if (['TREE', 'PALM', 'BIG_BUSH'].includes(type)) srcSize = 32;
        if (type === 'SHOP') srcSize = 48;
        
        // TAILLE RÉELLE DANS LE JEU (ex: 16 * 4 = 64px)
        const realSize = srcSize * SCALE;

        super(x, y, realSize, realSize);
        
        this.type = type;
        // On ajuste le Z pour les objets hauts
        this.z = (srcSize > 16 || ['OWL', 'STATUE', 'BARREL', 'LANTERN', 'CAULDRON', 'OWL_STATUE', 'CRYSTAL'].includes(type)) ? 10 : 0;
        
        // Système de collision : Solide par défaut sauf pour les sols
        const walkables = ['GRASS', 'SAND', 'ORANGE_PATH', 'FLOWERS', 'LEAVES', 'DIRT', 'DIRT_BRIGHT'];
        this.collider = !walkables.includes(this.type);
        
        if (this.collider) {
            this.addTag('SOLID');
        }
    }

    draw(ctx) {
        const img = Assets.get("TILESET");
        if (!img) return;

        const mapping = {
            // Row 0 & 1 (Existing + Identified)
            'TREE':           { sx: 0,   sy: 0,  sw: 32, sh: 32 },
            'GRASS':          { sx: 32,  sy: 0,  sw: 16, sh: 16 },
            'WATER':          { sx: 48,  sy: 0,  sw: 16, sh: 16 },
            'WALL_DOWN':      { sx: 64,  sy: 0,  sw: 16, sh: 16 },
            'WALL_UP':        { sx: 80,  sy: 0,  sw: 16, sh: 16 },
            'BRIDGE_H_RIGHT': { sx: 96,  sy: 0,  sw: 16, sh: 16 },
            'BRIDGE_H_LEFT':  { sx: 112, sy: 0,  sw: 16, sh: 16 },
            'ORANGE_BLOCK':   { sx: 128, sy: 0,  sw: 16, sh: 16 },
            'ORANGE_PATH':    { sx: 144, sy: 0,  sw: 16, sh: 16 },
            'YELLOW_BLOCK':   { sx: 160, sy: 0,  sw: 16, sh: 16 },
            'DESERT_BUSH':    { sx: 176, sy: 0,  sw: 16, sh: 16 },
            'WATER_WAVES':    { sx: 192, sy: 0,  sw: 16, sh: 16 },
            'FENCE_1':        { sx: 208, sy: 0,  sw: 16, sh: 16 },
            'FENCE_2':        { sx: 224, sy: 0,  sw: 16, sh: 16 },
            'FENCE_3':        { sx: 240, sy: 0,  sw: 16, sh: 16 },

            'SAND':           { sx: 32,  sy: 16, sw: 16, sh: 16 },
            'BUSH':           { sx: 48,  sy: 16, sw: 16, sh: 16 },
            'WALL_RIGHT':     { sx: 64,  sy: 16, sw: 16, sh: 16 },
            'WALL_LEFT':      { sx: 80,  sy: 16, sw: 16, sh: 16 },
            'CAVE_ENTRANCE':  { sx: 96,  sy: 16, sw: 16, sh: 16 },
            'OWL':            { sx: 112, sy: 16, sw: 16, sh: 16 },
            'STATUE':         { sx: 128, sy: 16, sw: 16, sh: 16 },
            'BARREL':         { sx: 144, sy: 16, sw: 16, sh: 16 },
            'BUSH_GREEN':     { sx: 160, sy: 16, sw: 16, sh: 16 },
            'TALL_GRASS':     { sx: 176, sy: 16, sw: 16, sh: 16 },
            'ROCK_GREY':      { sx: 192, sy: 16, sw: 16, sh: 16 },

            // Row 2 & 3
            'PALM':           { sx: 0,   sy: 32, sw: 32, sh: 32 },
            'DUNGEON_WALL_1': { sx: 32,  sy: 32, sw: 16, sh: 16 },
            'DUNGEON_WALL_2': { sx: 48,  sy: 32, sw: 16, sh: 16 },
            'DUNGEON_WALL_3': { sx: 64,  sy: 32, sw: 16, sh: 16 },
            'DUNGEON_WALL_4': { sx: 80,  sy: 32, sw: 16, sh: 16 },
            'BIG_BUSH':       { sx: 96,  sy: 32, sw: 32, sh: 32 },
            'WATERFALL':      { sx: 128, sy: 32, sw: 16, sh: 16 },
            'ROCK_WATER':     { sx: 144, sy: 32, sw: 16, sh: 16 },
            'FLOWERS':        { sx: 160, sy: 32, sw: 16, sh: 16 },
            'STREAM':         { sx: 176, sy: 32, sw: 16, sh: 16 },
            'OWL_STATUE':     { sx: 192, sy: 32, sw: 16, sh: 16 },
            'CRYSTAL':        { sx: 208, sy: 32, sw: 16, sh: 16 },

            'CHEST':          { sx: 128, sy: 48, sw: 16, sh: 16 },
            'STREAM_ALT':     { sx: 144, sy: 48, sw: 16, sh: 16 },
            'LEAVES':         { sx: 160, sy: 48, sw: 16, sh: 16 },
            'ROCK':           { sx: 176, sy: 48, sw: 16, sh: 16 },
            'LANTERN':        { sx: 192, sy: 48, sw: 16, sh: 16 },
            'CAULDRON':       { sx: 208, sy: 48, sw: 16, sh: 16 },

            // Row 4
            'SHOP':           { sx: 0,   sy: 64, sw: 48, sh: 48 }
        };

        const t = mapping[this.type];
        if (t) {
            // On dessine à la taille calculée dans le constructeur
            ctx.drawImage(img, t.sx, t.sy, t.sw, t.sh, this.x, this.y, this.width, this.height);
        }
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