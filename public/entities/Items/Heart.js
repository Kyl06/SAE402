// Objet de soin ramassable (restaure 2 HP = 1 coeur)

import { Entity } from "../../engine/Entity.js";
import { Assets } from "../../engine/Assets.js";

export class Heart extends Entity {
  constructor(x, y) {
    super(x, y, 24, 24);

    this.addTag("ITEM");
    this.sprite = Assets.get("HEARTS");
    this.z = 5;
    this.collider = true;
  }

  onCollision(other) {
    // Seul le joueur local peut ramasser, et seulement s'il est blesse
    if (
      other.hasTag("PLAYER") &&
      other === window.game.player &&
      other.hp < (other.maxHp || 6)
    ) {
      other.hp = Math.min(other.maxHp || 6, other.hp + 2);

      if (window.game.network && this.netId) {
        window.game.network.socket.emit("item_collected", { id: this.netId });
      }

      this.kill();
    }
  }

  draw(ctx) {
    if (!this.sprite) return;

    const bounce = Math.sin(Date.now() / 200) * 3;
    // Index 2 = coeur rouge plein dans la spritesheet 8px
    const sx = 2 * 8;
    const sy = 0;
    const sw = 8;
    const sh = 8;

    ctx.drawImage(this.sprite, sx, sy, sw, sh, this.x, this.y + bounce, 24, 24);
  }
}
