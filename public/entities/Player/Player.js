import { Entity } from "../../engine/Entity.js";
import { PlayerActions } from "./PlayerActions.js";
import { SpriteSheet } from "../../engine/SpriteSheet.js";
import { Animator } from "../../engine/Animator.js";
import { UP, DOWN, LEFT, RIGHT, TAG_PLAYER } from "../../constants.js";

export class Player extends Entity {
  constructor(x, y, skinId) {
    super(x, y, 16, 16);
    this.hp = 6;
    this.addTag(TAG_PLAYER);
    this.skinId = skinId;
    this.facing = DOWN;
    this.speed = 160;
    this.z = 10; // Devant les ennemis
    this.visible = true;
    this.isDead = false;
    this.isPainFlashing = false;

    // SpriteSheet de 5 colonnes (Marche: 0-1, Attaque: 2-3, Dégât: 4)
    this.spriteSheet = new SpriteSheet("LINK", 5, 4, 16, 16);

    // Initialisation des animateurs de marche pour chaque direction
    this.animations = {
      [DOWN]: new Animator([0, 1], 150),
      [UP]: new Animator([5, 6], 150),
      [LEFT]: new Animator([10, 11], 150),
      [RIGHT]: new Animator([15, 16], 150),
    };

    this.actions = new PlayerActions(this);
    this.actionAnimation = null; // Gère l'animation en cours (ex: épée)
  }

  // Gestion des collisions avec les ennemis
  onCollision(other) {
    if (this.isDead || this.isPainFlashing) return;

    if (other.hasTag("ENEMY")) {
      this.takeDamage(1);
      // Recul immédiat pour éviter de rester "bloqué" dans l'ennemi
      const push = 20;
      this.x += this.x < other.x ? -push : push;
      this.y += this.y < other.y ? -push : push;
    }
  }

  // Application des dégâts et effets visuels
  takeDamage(amount) {
    if (this.hp <= 0 || this.isPainFlashing) return;

    this.hp -= amount;
    window.game.engine.shake(6, 150); // Feedback d'impact

    if (this.hp <= 0) return this.die();

    this.isPainFlashing = true;

    // Knockback basé sur la direction actuelle
    const knock = 45;
    if (this.facing === UP) this.y += knock;
    if (this.facing === DOWN) this.y -= knock;
    if (this.facing === LEFT) this.x += knock;
    if (this.facing === RIGHT) this.x -= knock;

    setTimeout(() => this.isPainFlashing = false, 400);
  }

  setSkin(skinId) {
    this.skinId = skinId;
    // On recrée la SpriteSheet avec le nouvel ID (ex: "LINK2")
    this.spriteSheet = new SpriteSheet(this.skinId, 5, 4, 16, 16);
    console.log("Mon skin local a été mis à jour :", skinId);
  }

  die() {
    this.isDead = true;
    this.visible = false;
    this.collider = false;
    const ui = document.getElementById("game-over-ui");
    if (ui) ui.style.display = "block";
    console.log("Game Over");
  }

  update(delta) {
    if (this.isDead) return;

    // Si une action (attaque) est en cours, elle prend la priorité
    if (this.actionAnimation) {
      this.actionAnimation.work?.(delta);
      return;
    }

    this.handleMovement();

    // Mise à jour de l'animation de marche
    if (this.velX !== 0 || this.velY !== 0) {
      this.animations[this.facing].update(delta);
    } else {
      this.animations[this.facing].reset();
    }

    super.update(delta);
  }

  handleMovement() {
    const { inputs } = window.game;
    this.velX = 0;
    this.velY = 0;

    // Lecture des touches de direction
    if (inputs.isHeld("ArrowLeft")) { this.velX = -this.speed; this.facing = LEFT; }
    else if (inputs.isHeld("ArrowRight")) { this.velX = this.speed; this.facing = RIGHT; }

    if (inputs.isHeld("ArrowUp")) { this.velY = -this.speed; this.facing = UP; }
    else if (inputs.isHeld("ArrowDown")) { this.velY = this.speed; this.facing = DOWN; }

    // Normalisation pour éviter d'aller plus vite en diagonale (160 * 0.707)
    if (this.velX !== 0 && this.velY !== 0) {
      this.velX *= 0.7071;
      this.velY *= 0.7071;
    }

    // Déclenchement des actions
    if (inputs.isHeld("KeyZ")) this.actions.actionSwingSword();
    if (inputs.isHeld("KeyX")) this.actions.actionShootArrow();
  }

  draw(ctx) {
    if (!this.visible) return;

    const row = { [DOWN]: 0, [UP]: 5, [LEFT]: 10, [RIGHT]: 15 }[this.facing];
    let frame = 0;

    if (this.isPainFlashing) {
      frame = row + 4; // Sprite de dégât
    } else if (this.actionAnimation) {
      frame = row + (this.actionAnimation.frameIdx ?? 2);
    } else {
      frame = this.animations[this.facing].frame;
    }

    this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, 2);
  }
}