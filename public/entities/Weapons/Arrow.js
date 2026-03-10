import { Entity } from "../../engine/Entity.js";
import { SpriteSheet } from "../../engine/SpriteSheet.js";
import { UP, DOWN, LEFT, RIGHT } from "../../constants.js";

export class Arrow extends Entity {
  constructor(x, y, facing, owner) {
    super(x, y, 16, 16);
    this.facing = facing;
    this.owner = owner;
    this.speed = 300;
    this.z = 50; // Priorité d'affichage maximale
    this.spriteSheet = new SpriteSheet("ARROW", 1, 4, 16, 16);

    // Définition de la vélocité selon la direction
    this.velX = facing === LEFT ? -this.speed : (facing === RIGHT ? this.speed : 0);
    this.velY = facing === UP ? -this.speed : (facing === DOWN ? this.speed : 0);
  }

  update(delta) {
    super.update(delta); // Utilise la logique de mouvement de base

    // Suppression automatique si la flèche sort de l'écran (Nettoyage mémoire)
    if (this.x < -50 || this.x > 1200 || this.y < -50 || this.y > 900) {
      this.kill();
    }
  }

  // Dans Arrow.js
  onCollision(other) {
    if (other === this.owner || other.hasTag("PLAYER")) return;

    if (other.hasTag("ENEMY")) {
      // Dégâts locaux
      if (other.takeDamage) other.takeDamage(this.facing);

      // SIGNAL RÉSEAU
      if (window.game.network && other.netId) {
        window.game.network.sendHit(other.netId, 1);
      }

      this.kill(); // La flèche disparaît après l'impact
    }

    if (other.hasTag("WALL") || other.hasTag("SOLID")) {
      this.kill();
    }
  }

  draw(ctx) {
    // 0: Bas, 1: Haut, 2: Gauche, 3: Droite
    const frame = { [DOWN]: 0, [UP]: 1, [LEFT]: 2, [RIGHT]: 3 }[this.facing] || 0;
    this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, 1.5);
  }
}