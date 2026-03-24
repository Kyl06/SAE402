// Emeraude collectable (monnaie du jeu)

import { Entity } from "../../engine/Entity.js";
import { Assets } from "../../engine/Assets.js";

export class Emerald extends Entity {
  constructor(x, y) {
    super(x, y, 24, 24);
    this.addTag("ITEM");
    this.sprite = Assets.get("EMERALD");
    this.z = 5;
    this.netId = null;
  }

  update(delta) {
    const players = window.game.engine.entities.filter(e => e.hasTag("PLAYER") && !e.isDead);
    let target = null;
    let minDist = 120; // Rayon de magnetisme

    players.forEach(p => {
        const d = Math.hypot(p.x - this.x, p.y - this.y);
        if (d < minDist) {
            minDist = d;
            target = p;
        }
    });

    if (target) {
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const dist = Math.hypot(dx, dy) || 1;

        const speed = 150;
        this.x += (dx / dist) * speed * (delta / 1000);
        this.y += (dy / dist) * speed * (delta / 1000);
    }

    super.update(delta);
  }

  onCollision(other) {
    // Seul le joueur local peut ramasser (evite la double collecte reseau)
    if (other.hasTag("PLAYER") && other === window.game.player) {
      this.collect(other);
    }
  }

  collect(player) {
    if (this.toRemove) return;
    player = player || window.game.player;
    if (!player) return;

    player.emeralds = (player.emeralds || 0) + 1;

    if (window.game.network) {
      window.game.network.socket.emit("item_collected", { id: this.netId });
    }

    this.kill();
  }

  draw(ctx) {
    if (!this.sprite) return;
    const bounce = Math.sin(Date.now() / 200) * 3;
    ctx.drawImage(this.sprite, this.x, this.y + bounce, 24, 24);
  }
}
