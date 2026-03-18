/**
 * @file KeyItem.js
 * @description Cle ramassable pour ouvrir le coffre du marais.
 */

import { Entity } from '../../engine/Entity.js';
import { Assets } from '../../engine/Assets.js';
import { SCALE } from '../../constants.js';

export class KeyItem extends Entity {
    constructor(x, y) {
        super(x, y, 16, 16);
        this.z = 5;
        this.collider = true;
        this.addTag('ITEM');
        this.addTag('KEY');
        this.netId = 'key_' + Math.random().toString(36).slice(2, 9);
        this.bobTime = 0;
        this.collected = false;
    }

    update(delta) {
        if (this.collected) return;
        this.bobTime += delta * 0.003;

        // Detection collision avec le joueur
        const player = window.game.player;
        if (player && !player.isDead && this.collidesWith(player)) {
            this.collect();
        }
    }

    collect() {
        if (this.collected) return;
        this.collected = true;

        const qm = window.game.questManager;
        if (qm) {
            qm.pickUpKey();
        }

        this.kill();
    }

    draw(ctx) {
        if (this.collected) return;

        const bobY = Math.sin(this.bobTime * 3) * 2;
        const image = Assets.get('CLE');
        if (image) {
            // Image 1024x1024, affichee en 24x24 sur l'ecran
            ctx.drawImage(image, Math.floor(this.x), Math.floor(this.y + bobY), 24, 24);
        }
    }
}
