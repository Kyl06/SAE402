import { Entity } from '../../engine/Entity.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';
import { SCALE, DOWN, UP, LEFT, RIGHT } from '../../constants.js';

export class NetworkPlayer extends Entity {
    constructor(x, y, skinId) {
        super(x, y, 32, 32);
        this.skinId = skinId || "LINK";
        this.spriteSheet = new SpriteSheet(this.skinId, 4, 4, 32, 32);
        this.swordSheet = new SpriteSheet("SWORD", 3, 4, 32, 32);
        
        this.facing = DOWN;
        this.currentAction = "IDLE";
        this.frame = 0;
    }

    onNetworkUpdate(data) {
        const [action, x, y, facing] = data.split('|');
        this.currentAction = action;
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.facing = facing;

        // Animation simple des jambes si le joueur bouge
        if (action === "IDLE") {
            const row = { [DOWN]: 0, [UP]: 1, [LEFT]: 2, [RIGHT]: 3 }[this.facing];
            this.frame = row * 4;
        }
    }

    draw(ctx) {
        // 1. Dessiner le corps
        const row = { [DOWN]: 0, [UP]: 1, [LEFT]: 2, [RIGHT]: 3 }[this.facing];
        let frameIdx = row * 4;
        
        // Si en action SWORD, on force la frame d'attaque de Link (ex: frame 2 du sprite)
        if (this.currentAction === "SWORD") frameIdx += 2; 
        
        this.spriteSheet.drawFrame(ctx, frameIdx, this.x, this.y, SCALE);

        // 2. Dessiner l'épée si l'action est SWORD
        if (this.currentAction === "SWORD") {
            this.drawSwordGhost(ctx);
        }
    }

    drawSwordGhost(ctx) {
        const baseFrame = { [DOWN]: 0, [UP]: 3, [LEFT]: 6, [RIGHT]: 9 };
        const frame = baseFrame[this.facing] + 1; // On dessine la frame du milieu du swing
        
        // On applique les mêmes décalages que Sword.js pour que l'épée soit bien placée
        let dx = 0, dy = 0;
        if (this.facing === DOWN) dy = 9;
        if (this.facing === UP) dy = -9;
        if (this.facing === LEFT) dx = -8;
        if (this.facing === RIGHT) dx = 8;

        this.swordSheet.drawFrame(ctx, frame, this.x + (dx * SCALE), this.y + (dy * SCALE), 2);
    }
}