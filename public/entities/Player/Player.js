/**
 * @file Player.js
 * @description Classe représentant le héros (Link).
 * Gère les contrôles clavier, le mouvement, les PV, les dégâts et l'affichage.
 */

import { Entity } from "../../engine/Entity.js";
import { PlayerActions } from "./PlayerActions.js";
import { SpriteSheet } from "../../engine/SpriteSheet.js";
import { Animator } from "../../engine/Animator.js";
import { UP, DOWN, LEFT, RIGHT, TAG_PLAYER } from "../../constants.js";

export class Player extends Entity {
    /**
     * @param {number} x, y - Position de départ
     * @param {string} skinId - "LINK" (vert) ou "LINK2" (bleu)
     */
    constructor(x, y, skinId) {
        super(x, y, 32, 32); // Hitbox de 16x16

        this.hp = 6;                // Points de vie (3 coeurs complets)
        this.addTag(TAG_PLAYER);    // Identifié comme un joueur par les monstres
        this.skinId = skinId;       // Stocke le nom de l'asset utilisé
        this.facing = DOWN;         // Direction actuelle (utilisée par draw et actions)
        this.speed = 160;           // Vitesse de marche (pixels/seconde)
        this.z = 10;                // Profondeur (dessiné par-dessus les monstres)

        this.visible = true;        // Utilisé pour l'effet de clignotement lors d'un dégât
        this.isDead = false;        // État de mort
        this.isPainFlashing = false; // Indique si le joueur est en train de subir un dégât

        // Initialisation de la SpriteSheet (5 colonnes pour 4 lignes)
        // Marche(0,1), Attaque(2,3), Dégât(4) par ligne (direction)
        this.spriteSheet = new SpriteSheet(this.skinId, 5, 4, 16, 16);

        // Configuration des animateurs pour chaque direction
        this.animations = {
            [DOWN]: new Animator([0, 1], 150),
            [UP]: new Animator([5, 6], 150),
            [LEFT]: new Animator([10, 11], 150),
            [RIGHT]: new Animator([15, 16], 150),
        };

        // Module externe gérant les attaques et les effets spéciaux
        this.actions = new PlayerActions(this);

        // Inventaire initial
        this.emeralds = 0;
        this.arrows = 30; // On commence avec quelques flèches pour le test

        // Stocke l'action en cours (si différent de null, bloque le mouvement libre)
        this.actionAnimation = null;
    }

    /**
     * Callback de collision du GameEngine.
     * @param {Entity} other - L'entité touchée
     */
    onCollision(other) {
        if (this.isDead || this.isPainFlashing) return;

        // Si on touche un ennemi, on prend des dégâts
        if (other.hasTag("ENEMY")) {
            // Calcul de la direction de l'attaque (du ennemi vers le joueur)
            const dx = this.x - other.x;
            const dy = this.y - other.y;
            let direction;
            if (Math.abs(dx) > Math.abs(dy)) {
                direction = dx > 0 ? RIGHT : LEFT;
            } else {
                direction = dy > 0 ? DOWN : UP;
            }

            this.takeDamage(1, direction);

            // Recul immédiat (Knockback) pour sortir de la collision
            const push = 20;
            this.x += this.x < other.x ? -push : push;
            this.y += this.y < other.y ? -push : push;
        }
    }

    /**
     * Applique des dégâts et gère le feedback visuel.
     * @param {number} amount - Nombre de demi-coeurs à retirer
     * @param {string} direction - Direction du recul (UP, DOWN, LEFT, RIGHT)
     */
    takeDamage(amount) {
    if (this.hp <= 0 || this.isPainFlashing) return;

    this.hp -= amount;
    window.game.engine.shake(6, 150);

    if (this.hp <= 0) return this.die();

    this.isPainFlashing = true;

    const knock = 45;
    const dirX = this.facing === LEFT ? 1 : this.facing === RIGHT ? -1 : 0;
    const dirY = this.facing === UP   ? 1 : this.facing === DOWN  ? -1 : 0;

    let elapsed = 0;
    const duration = 150; // ms
    const originalUpdate = this.update.bind(this);

    // On surcharge temporairement update() pour animer le recul
    this.update = (delta) => {
        elapsed += delta;
        if (elapsed >= duration) {
            this.update = originalUpdate; // Restaure le comportement normal
            return;
        }
        // Déplacement petit à petit → les collisions auront le temps de réagir
        this.velX = (dirX * knock) / (duration / 1000);
        this.velY = (dirY * knock) / (duration / 1000);
        super.update(delta); // appelle Entity.update() pour bouger + déclencher les collisions
    };

    setTimeout(() => {
        this.isPainFlashing = false;
        if (this.update !== originalUpdate) this.update = originalUpdate;
    }, 400);
}

    /** Permet de changer de personnage dynamiquement (ex: passage à Link2). */
    setSkin(skinId) {
        this.skinId = skinId;
        this.spriteSheet = new SpriteSheet(this.skinId, 5, 4, 16, 16);
    }

    /** Gère l'état de défaite. */
    die() {
        this.isDead = true;
        this.visible = false;
        this.collider = false;

        // Affiche l'écran de Game Over HTML
        const ui = document.getElementById("game-over-ui");
        if (ui) ui.style.display = "block";
    }

    /**
     * Mise à jour logique à chaque frame.
     */
    update(delta) {
        if (this.isDead) return;

        // Si une animation d'attaque est en cours, elle a la priorité sur le mouvement
        if (this.actionAnimation) {
            this.actionAnimation.work?.(delta);
            return;
        }

        // Lecture clavier et mouvement physique
        this.handleMovement();

        // Animation de marche : on n'anime que si le joueur se déplace
        if (this.velX !== 0 || this.velY !== 0) {
            this.animations[this.facing].update(delta);
        } else {
            this.animations[this.facing].reset();
        }

        // Appel de la physique de base (Entity.update)
        super.update(delta);
    }

    /**
     * Lit les entrées clavier (window.game.inputs) et définit la vélocité.
     */
    handleMovement() {
        const { inputs } = window.game;
        this.velX = 0;
        this.velY = 0;

        // Directions prioritaires
        if (inputs.isHeld("ArrowLeft")) { this.velX = -this.speed; this.facing = LEFT; }
        else if (inputs.isHeld("ArrowRight")) { this.velX = this.speed; this.facing = RIGHT; }

        if (inputs.isHeld("ArrowUp")) { this.velY = -this.speed; this.facing = UP; }
        else if (inputs.isHeld("ArrowDown")) { this.velY = this.speed; this.facing = DOWN; }

        // Normalisation de la vitesse en diagonale (Pythagore)
        // Évite que Link aille plus vite en courant de travers
        if (this.velX !== 0 && this.velY !== 0) {
            this.velX *= 0.7071; // 1 / racine(2)
            this.velY *= 0.7071;
        }

        // Vérification des touches d'action
        if (inputs.isHeld("KeyZ")) this.actions.actionSwingSword();
        if (inputs.isHeld("KeyX")) this.actions.actionShootArrow();
    }

    /**
     * Rendu graphique de Link.
     */
    draw(ctx) {
        if (!this.visible) return;

        const row = { [DOWN]: 0, [UP]: 5, [LEFT]: 10, [RIGHT]: 15 }[this.facing];
        let frame = 0;

        if (this.isPainFlashing) {
            frame = row + 4; // Sprite de "douleur" (Link clignote ou change de couleur)
        } else if (this.actionAnimation) {
            // Utilise la frame fixée par l'animation en cours (SpriteSequence)
            frame = row + (this.actionAnimation.frameIdx ?? 2);
        } else {
            // Utilise la frame de marche calculée par l'Animator
            frame = this.animations[this.facing].frame;
        }

        // Dessine sur le canvas via la SpriteSheet
        this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, 2);
    }
}