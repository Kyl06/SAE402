/**
 * @file Emerald.js
 * @description Objet d'émeraude ramassable. Augmente le compteur d'émeraudes du joueur.
 */

import { Entity } from "../../engine/Entity.js";
import { Assets } from "../../engine/Assets.js";

export class Emerald extends Entity {
    constructor(x, y) {
        super(x, y, 24, 24); // Hitbox un peu plus grande pour faciliter la collecte

        this.addTag("ITEM");
        this.sprite = Assets.get("EMERALD"); // Utilisation directe de l'image chargée
        this.z = 5;
        this.collider = true;

        // Animation d'apparition : grandit de 0 à 1 sur 240ms
        this.spawnStart = Date.now();
        this.spawnDuration = 240;
    }

    /**
     * Lorsque le joueur touche l'émeraude, on incrémente le compteur global.
     */
    onCollision(other) {
        if (!other.hasTag("PLAYER")) return;

        // Garantir que le compteur existe
        window.game.emeralds = (window.game.emeralds || 0) + 1;
        this.kill();
    }

    /** Rendu simple de l'émeraude avec un léger flottement. */
    draw(ctx) {
        if (!this.sprite) return; // sécurité si l'image n'est pas chargée

        const bounce = Math.sin(Date.now() / 200) * 3;
        ctx.drawImage(this.sprite, this.x, this.y + bounce, 24, 24);
    }
}