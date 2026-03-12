import { Entity } from '../engine/Entity.js';
import { Assets } from '../engine/Assets.js';
import { SCALE } from '../constants.js';

export class Floor extends Entity {
    constructor(x, y, type = 'GRASS') {
        // Définition de la taille source
        const srcSize = (type === 'TREE') ? 32 : 16;
        
        // TAILLE RÉELLE DANS LE JEU (ex: 16 * 4 = 64px)
        const realSize = srcSize * SCALE;

        super(x, y, realSize, realSize);
        
        this.type = type;
        this.z = (type === 'TREE') ? 10 : 0;
        
        // Seuls l'herbe et le sable n'ont pas de collisions
        this.collider = !['GRASS', 'SAND'].includes(this.type);
        if (this.collider) {
            this.addTag('SOLID');
        }
    }

    draw(ctx) {
        const img = Assets.get("TILESET");
        if (!img) return;

        const mapping = {
            'TREE':       { sx: 0,   sy: 0,  sw: 32, sh: 32 },
            'GRASS':      { sx: 32,  sy: 0,  sw: 16, sh: 16 },
            'SAND':       { sx: 32,  sy: 16, sw: 16, sh: 16 },
            'WATER':      { sx: 48,  sy: 0,  sw: 16, sh: 16 },
            'BUSH':       { sx: 48,  sy: 16, sw: 16, sh: 16 },
            'WALL_DOWN':  { sx: 64,  sy: 0,  sw: 16, sh: 16 },
            'WALL_UP':    { sx: 80,  sy: 0,  sw: 16, sh: 16 },
            'WALL_RIGHT': { sx: 64, sy: 16,  sw: 16, sh: 16 },
            'WALL_LEFT':  { sx: 80,  sy: 16, sw: 16, sh: 16 }
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