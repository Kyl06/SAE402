/**
 * @file Emerald.js
 * @description Objet de monnaie (Émeraude) collectable.
 * Augmente le compteur d'émeraudes du joueur lors du ramassage.
 */

import { Entity } from "../../engine/Entity.js";
import { Assets } from "../../engine/Assets.js";

export class Emerald extends Entity {
    /**
     * @param {number} x, y - Position d'apparition
     */
    constructor(x, y) {
        super(x, y, 24, 24);
        this.addTag("ITEM");
        this.sprite = Assets.get("EMERALD");
        this.z = 5;
        this.netId = null; // Défini lors du spawn réseau
    }

    onCollision(other) {
        if (other.hasTag("PLAYER") && other === window.game.player) {
            other.emeralds = (other.emeralds || 0) + 1;

            if (window.game.network) {
                window.game.network.socket.emit('item_collected', { id: this.netId });
            }

            this.kill();
            console.log("Compteur local mis à jour : " + other.emeralds);
        }
    }

    collect(player) {
        player.emeralds = (player.emeralds || 0) + 1;
        if (window.game.network) {
            window.game.network.socket.emit('item_collected', { id: this.netId });
        }
        this.kill();
    }

    draw(ctx) {
        if (!this.sprite) return;
        const bounce = Math.sin(Date.now() / 200) * 3;
        ctx.drawImage(this.sprite, this.x, this.y + bounce, 24, 24);
    }
}