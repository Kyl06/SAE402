/**
 * @file Heart.js
 * @description Objet de soin (Cœur) pouvant être ramassé par le joueur.
 * Apparaît aléatoirement lors de la défaite d'un Moblin.
 */

import { Entity } from "../../engine/Entity.js";
import { Assets } from "../../engine/Assets.js";

export class Heart extends Entity {
  /**
   * @param {number} x, y - Position d'apparition
   */
  constructor(x, y) {
    super(x, y, 24, 24); // Hitbox légèrement agrandie pour faciliter la ramasse

    this.addTag("ITEM"); // Identifié comme un objet collectable
    this.sprite = Assets.get("HEARTS"); // Image chargée
    this.z = 5;
    this.collider = true;
  }

  /**
   * Gestion du contact avec Link.
   */
  onCollision(other) {
    // Les deux joueurs peuvent ramasser le cœur, mais seulement le joueur local déclenche la collecte
    if (
      other.hasTag("PLAYER") &&
      other === window.game.player &&
      other.hp < 6
    ) {
      // Soin de 1 cœur plein (équivaut à 2 points de vie)
      other.hp = Math.min(6, other.hp + 2);

      // Notifier le réseau pour retirer l'item chez l'autre joueur
      if (window.game.network && this.netId) {
        window.game.network.socket.emit("item_collected", { id: this.netId });
      }

      // L'item disparaît une fois consommé
      this.kill();
    }
  }

  /** Rendu graphique. */
  draw(ctx) {
    if (!this.sprite) return;

    const bounce = Math.sin(Date.now() / 200) * 3;
    // On dessine l'index 2 (le cœur rouge plein) et on zoom x3
    const sx = 2 * 8; // index 2 sur spritesheet 8px
    const sy = 0;
    const sw = 8;
    const sh = 8;

    ctx.drawImage(this.sprite, sx, sy, sw, sh, this.x, this.y + bounce, 24, 24);
  }
}
