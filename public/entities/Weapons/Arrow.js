/**
 * @file Arrow.js
 * @description Projectile lancé par Link.
 * Se déplace en ligne droite jusqu'à toucher un mur ou un ennemi.
 */

import { Entity } from "../../engine/Entity.js";
import { SpriteSheet } from "../../engine/SpriteSheet.js";
import { UP, DOWN, LEFT, RIGHT } from "../../constants.js";

export class Arrow extends Entity {
  /**
   * @param {number} x, y - Position initiale
   * @param {string} facing - Direction de tir
   * @param {Entity} owner - Référence à l'entité qui a tiré (pour éviter l'auto-collision)
   */
  constructor(x, y, facing, owner) {
    super(x, y, 16, 16);
    this.facing = facing;
    this.owner = owner;
    // Arc long : vitesse et portee augmentees
    const bowLevel = owner?.bowLevel || 0;
    this.speed = bowLevel > 0 ? 400 : 300;
    this.z = 50;        // Toujours au premier plan
    
    // Spritesheet de la flèche (1 colonne x 4 lignes)
    this.spriteSheet = new SpriteSheet("ARROW", 1, 4, 16, 16);

    // Calcul immédiat du vecteur de vitesse selon l'orientation
    this.velX = (facing === LEFT) ? -this.speed : (facing === RIGHT ? this.speed : 0);
    this.velY = (facing === UP)   ? -this.speed : (facing === DOWN  ? this.speed : 0);
  }

  /** Mise à jour de la flèche. */
  update(delta) {
    super.update(delta); // Physique de base (x += velX * delta)

    // Nettoyage automatique : Si la flèche sort des limites du monde (800x660)
    // on la supprime pour ne pas surcharger la mémoire.
    if (this.x < -100 || this.x > 1000 || this.y < -100 || this.y > 800) {
      this.kill();
    }
  }

  /**
   * Gestion des collisions de la flèche.
   */
  onCollision(other) {
    // On ignore celui qui a tiré la flèche et les autres joueurs (Coop)
    if (other === this.owner || other.hasTag("PLAYER")) return;

    // Hit sur un MONSTRE
    if (other.hasTag("ENEMY")) {
      // Feedback local (recul du monstre)
      if (other.takeDamage) other.takeDamage(this.facing);

      // SIGNAL RÉSEAU : Prévient l'Hôte pour valider les dégâts réels
      if (window.game.network && other.netId) {
          window.game.network.sendHit(other.netId, 1, this.facing);
      }

      this.kill(); // La flèche se détruit à l'impact
    }

    // Hit sur un MUR
    if (other.hasTag("WALL") || other.hasTag("SOLID")) {
      this.kill(); // On perd la flèche si elle touche un mur
    }
  }

  /** Rendu graphique. */
  draw(ctx) {
    // Sélection de la frame selon la direction (0:Bas, 1:Haut, 2:Gauche, 3:Droite)
    const frame = { [DOWN]: 0, [UP]: 1, [LEFT]: 2, [RIGHT]: 3 }[this.facing] || 0;
    this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, 1.5);
  }
}