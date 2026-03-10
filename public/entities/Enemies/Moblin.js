import { Entity } from "../../engine/Entity.js";
import { SpriteSheet } from "../../engine/SpriteSheet.js";
import { Explosion } from "../Effects/Explosion.js";
import { Heart } from "../Items/Heart.js";

export class Moblin extends Entity {
  constructor(x, y, roamRadius = 120) {
    super(x, y, 32, 32);
    this.netId = 'mob_' + Math.random().toString(36).slice(2, 11);
    this.hp = 3;
    this.speed = 40;
    this.chaseSpeed = 70;
    this.addTag("ENEMY");

    // Système de patrouille autour d'un point d'ancrage
    this.anchor = { x, y };
    this.roamRadius = roamRadius;

    // États de l'IA
    this.state = "IDLE"; // IDLE ou WALK
    this.stateTimer = 1000;
    this.facing = "DOWN";
    this.target = null;
    this.painState = null;

    this.spriteSheet = new SpriteSheet("MOBLIN", 4, 4, 16, 16);
  }

  update(delta) {
    if (this.painState) {
      this.handlePain(delta); // Priorité au recul si blessé
    } else {
      this.think(); // Cherche le joueur
      this.move(delta); // Patrouille ou poursuit
    }
    super.update(delta);
  }

  // Détection de Link à proximité
  think() {
    const player = window.game.engine.entities.find((e) => e.hasTag("PLAYER"));
    if (player && !player.isDead) {
      const dist = Math.hypot(player.x - this.x, player.y - this.y);
      this.target = dist < 200 ? player : null;
    } else {
      this.target = null;
    }
  }

  // Logique de déplacement (IA de poursuite vs Patrouille)
  move(delta) {
    if (this.target) {
      this.chaseTarget(); // Poursuite agressive
    } else {
      this.roam(delta); // Marche aléatoire
    }
  }

  chaseTarget() {
    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      this.velX = dx > 0 ? this.chaseSpeed : -this.chaseSpeed;
      this.velY = 0;
      this.facing = dx > 0 ? "RIGHT" : "LEFT";
    } else {
      this.velX = 0;
      this.velY = dy > 0 ? this.chaseSpeed : -this.chaseSpeed;
      this.facing = dy > 0 ? "DOWN" : "UP";
    }
  }

  roam(delta) {
    this.stateTimer -= delta;
    if (this.stateTimer <= 0) {
      this.state = this.state === "IDLE" ? "WALK" : "IDLE";
      this.stateTimer = 1000 + Math.random() * 1000;

      if (this.state === "WALK") {
        this.chooseRoamDirection();
      } else {
        this.velX = 0;
        this.velY = 0;
      }
    }
  }

  chooseRoamDirection() {
    // Si trop loin de l'ancre, on revient. Sinon, direction aléatoire.
    const distToAnchorX = this.anchor.x - this.x;
    const distToAnchorY = this.anchor.y - this.y;

    if (Math.abs(distToAnchorX) > this.roamRadius || Math.abs(distToAnchorY) > this.roamRadius) {
      this.facing = Math.abs(distToAnchorX) > Math.abs(distToAnchorY)
        ? (distToAnchorX > 0 ? "RIGHT" : "LEFT")
        : (distToAnchorY > 0 ? "DOWN" : "UP");
    } else {
      this.facing = ["UP", "DOWN", "LEFT", "RIGHT"][Math.floor(Math.random() * 4)];
    }

    this.velX = this.facing === "LEFT" ? -this.speed : (this.facing === "RIGHT" ? this.speed : 0);
    this.velY = this.facing === "UP" ? -this.speed : (this.facing === "DOWN" ? this.speed : 0);
  }

  takeDamage(direction) {
    if (this.painState || this.toRemove) return;
    this.hp--;
    if (this.hp <= 0) return this.die();

    // Recul (Knockback) lors de l'impact
    const force = 250;
    const kx = direction === "LEFT" ? -force : (direction === "RIGHT" ? force : 0);
    const ky = direction === "UP" ? -force : (direction === "DOWN" ? force : 0);
    this.painState = { msLeft: 150, velX: kx, velY: ky };
  }

  handlePain(delta) {
    this.x += this.painState.velX * (delta / 1000);
    this.y += this.painState.velY * (delta / 1000);
    this.painState.msLeft -= delta;
    if (this.painState.msLeft <= 0) this.painState = null;
  }

  onCollision(other) {
    if (other.hasTag("PLAYER")) other.takeDamage?.(1);

    // Évite le chevauchement entre ennemis
    if (other instanceof Moblin) {
      this.x += this.x < other.x ? -1.5 : 1.5;
      this.y += this.y < other.y ? -1.5 : 1.5;
    }
  }

  die() {
    window.game.engine.add(new Explosion(this.x, this.y));
    // Chance de drop un cœur si Link est blessé
    if (window.game.player?.hp < 6 && Math.random() < 0.4) {
      window.game.engine.add(new Heart(this.x, this.y));
    }
    this.kill();
  }

  draw(ctx) {
    const row = { DOWN: 0, UP: 4, LEFT: 8, RIGHT: 12 }[this.facing];
    const isMoving = Math.abs(this.velX) > 0.1 || Math.abs(this.velY) > 0.1;
    const walkCycle = isMoving ? (Math.floor(Date.now() / 150) % 2) : 0;

    // Frame de douleur (index 2-3 de la ligne) ou frame de marche
    const frame = this.painState ? (row + 2 + (Math.floor(Date.now() / 50) % 2)) : (row + walkCycle);
    this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, 2);
  }

  // Dans Moblin.js (méthode d'IA/Update)
  findTarget() {
    const players = [window.game.player]; // Le P1 local

    // On ajoute tous les joueurs qui sont arrivés par le réseau
    const remotePlayers = Object.values(window.game.network.remotePlayers);
    const allPlayers = players.concat(remotePlayers);

    // Trouver le plus proche
    let closest = null;
    let minDist = 300; // Distance de détection

    allPlayers.forEach(p => {
      if (!p || p.isDead) return;
      const d = Math.hypot(p.x - this.x, p.y - this.y);
      if (d < minDist) {
        minDist = d;
        closest = p;
      }
    });

    this.target = closest;
  }
}