import { Entity } from "../../engine/Entity.js";
import { Assets } from "../../engine/Assets.js";

export class Emerald extends Entity {
    constructor(x, y) {
        super(x, y, 24, 24);
        this.addTag("ITEM");
        this.sprite = Assets.get("EMERALD");
        this.z = 5;
        this.netId = null; // Défini lors du spawn réseau
    }

    // Dans entities/Items/Emerald.js
    // entities/Items/Emerald.js

    onCollision(other) {
        // On ne traite la collision que si c'est un PLAYER
        if (other.hasTag("PLAYER")) {

            // Est-ce que c'est le joueur LOCAL (celui derrière cet écran) ?
            if (other === window.game.player) {

                // On augmente le compteur de l'instance locale
                other.emeralds = (other.emeralds || 0) + 1;

                // MISE À JOUR DE L'INTERFACE (si tu as une fonction d'UI)
                // ex: window.game.ui.updateEmeralds(other.emeralds);

                // On synchronise la disparition pour l'autre joueur
                if (window.game.network) {
                    // On utilise item_collected pour dire "Cet ID a été ramassé"
                    window.game.network.socket.emit('item_collected', { id: this.netId });
                }

                this.toRemove = true;
                console.log("Compteur local mis à jour : " + other.emeralds);
            }
        }
    }

    collect(player) {
        player.emeralds = (player.emeralds || 0) + 1;
        // L'hôte prévient tout le monde que l'item doit disparaître
        window.game.network.socket.emit('item_collected', { id: this.netId });
        this.toRemove = true;
    }

    draw(ctx) {
        if (!this.sprite) return;
        const bounce = Math.sin(Date.now() / 200) * 3;
        ctx.drawImage(this.sprite, this.x, this.y + bounce, 24, 24);
    }
}