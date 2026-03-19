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

        // Stocke l'action en cours (si différent de null, bloque le mouvement libre)
        this.actionAnimation = null;

        // Inventaire
        this.emeralds = 0;
        this.arrows = 5;       // Nombre de fleches disponibles
        this.potions = 0;
        this.hasShield = false;
        this.swordLevel = 0;   // 0 = base, 1 = epee en fer
        this.bowLevel = 0;     // 0 = base, 1 = arc long
        this.fragments = [false, false, false];

        // Stamina
        this.stamina = 100;
        this.maxStamina = 100;
        this.staminaDepleted = false;   // true = epuise, doit attendre regen complete
        this.staminaRegenDelay = 0;     // delai avant regen apres une attaque

        // Admin mode
        this.adminMode = false;
        this._adminKeyWas = false;
        this._tpKeyWas = false;
    }

    /**
     * Callback de collision du GameEngine.
     * @param {Entity} other - L'entité touchée
     */
    onCollision(other) {
        if (this.isDead || this.isPainFlashing) return;

        // Si on touche un ennemi, on prend des dégâts
        if (other.hasTag("ENEMY")) {
            // Calcul du centre de chaque entité pour une direction plus précise
            const centerX = this.x + this.width / 2;
            const centerY = this.y + this.height / 2;
            const otherCenterX = other.x + other.width / 2;
            const otherCenterY = other.y + other.height / 2;

            const dx = centerX - otherCenterX;
            const dy = centerY - otherCenterY;
            
            let direction;
            if (Math.abs(dx) > Math.abs(dy)) {
                direction = dx > 0 ? RIGHT : LEFT;
            } else {
                direction = dy > 0 ? DOWN : UP;
            }

            // Degats bonus si le MiniBoss/boss est en charge
            const dmg = (other.state === 'CHARGE') ? 2 : 1;
            this.takeDamage(dmg, direction);
        }
    }

    /**
     * Applique des dégâts et gère le feedback visuel.
     * @param {number} amount - Nombre de demi-coeurs à retirer
     */
    takeDamage(amount, direction) {
        if (this.adminMode) return;
        if (this.hp <= 0 || this.isPainFlashing) return;

        // Le bouclier reduit les degats de 1 (minimum 1)
        if (this.hasShield && amount > 1) {
            amount -= 1;
        }

        this.hp -= amount;

        // Nettoyer l'animation en cours (epee orpheline)
        if (this.actionAnimation) {
            if (this.actionAnimation.actorObject) {
                this.actionAnimation.actorObject.kill();
            }
            this.actionAnimation = null;
        }


        // Tremblement d'écran retro (un peu plus fort pour l'impact)
        window.game.engine.shake(8, 200);

        if (this.hp <= 0) return this.die();

        this.isPainFlashing = true;

        // Si direction n'est pas fournie, on utilise l'opposé du regard (recul par défaut)
        const hitDir = direction || (this.facing === UP ? DOWN : this.facing === DOWN ? UP : this.facing === LEFT ? RIGHT : LEFT);

        const knockIntensity = 80;
        const dirX = hitDir === LEFT ? -1 : hitDir === RIGHT ? 1 : 0;
        const dirY = hitDir === UP ? -1 : hitDir === DOWN ? 1 : 0;

        let elapsed = 0;
        const knockDuration = 180; // ms
        const hitStopDuration = 60; // Petit gel de l'image pour l'impact (ms)
        const originalUpdate = this.update.bind(this);

        // Effet Hitstop : On bloque tout mouvement pendant une fraction de seconde
        let hitStopTimer = 0;

        // On surcharge temporairement update() pour animer le recul et le clignotement
        this.update = (delta) => {
            // Gestion du Hitstop
            if (hitStopTimer < hitStopDuration) {
                hitStopTimer += delta;
                return; // On ne fait rien pendant le hitstop
            }

            elapsed += delta;
            
            // Effet de clignotement retro (visible/invisible toutes les 50ms)
            this.visible = (Math.floor(elapsed / 50) % 2 === 0);

            if (elapsed >= knockDuration) {
                this.update = originalUpdate; // Restaure le comportement normal
                this.visible = true; // S'assure d'être visible à la fin
                return;
            }

            // Déplacement de recul
            this.velX = (dirX * knockIntensity) / (knockDuration / 1000);
            this.velY = (dirY * knockIntensity) / (knockDuration / 1000);
            
            // On appelle Entity.update pour la physique des collisions
            super.update(delta);
        };

        // On s'assure que l'état d'invulnérabilité dure un peu plus longtemps que le recul
        setTimeout(() => {
            this.isPainFlashing = false;
            this.visible = true;
            if (this.update !== originalUpdate) this.update = originalUpdate;
        }, 1200); // 1.2 seconde d'invulnérabilité (clignotement inclus via update)
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
    _checkAdminToggle() {
        const { inputs } = window.game;
        const pressed = inputs.isHeld('F9');
        if (pressed && !this._adminKeyWas) {
            this.adminMode = !this.adminMode;
            this.collider = !this.adminMode;
            if (this.adminMode) {
                this._emeraldsBeforeAdmin = this.emeralds;
                this.emeralds = Infinity;
            } else {
                this.emeralds = this._emeraldsBeforeAdmin || 0;
            }
            console.log(`[ADMIN] Mode admin ${this.adminMode ? 'ACTIVE' : 'DESACTIVE'}`);
        }
        this._adminKeyWas = pressed;
    }

    _checkAdminTeleport() {
        if (!this.adminMode) return;
        const { inputs } = window.game;
        const pressed = inputs.isHeld('F10');
        if (pressed && !this._tpKeyWas) {
            const zm = window.game.zoneManager;
            if (zm) {
                zm.loadZone('fortress_north', 'south');
                console.log('[ADMIN] Teleportation vers la forteresse');
            }
        }
        this._tpKeyWas = pressed;
    }

    update(delta) {
        if (this.isDead) return;

        this._checkAdminToggle();
        this._checkAdminTeleport();

        // Bloquer le mouvement pendant un dialogue
        if (window.game.dialogueActive) {
            this.velX = 0;
            this.velY = 0;
            return;
        }

        // Si une animation d'attaque est en cours, elle a la priorité sur le mouvement
        if (this.actionAnimation) {
            this.actionAnimation.work?.(delta);
            return;
        }

        // Regeneration de la stamina
        if (this.staminaRegenDelay > 0) {
            this.staminaRegenDelay -= delta;
        } else {
            this.stamina = Math.min(this.stamina + delta * 0.03, this.maxStamina);
            if (this.staminaDepleted && this.stamina >= this.maxStamina * 0.3) {
                this.staminaDepleted = false;
            }
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

        // Verification de transition de zone
        if (window.game.zoneManager) {
            window.game.zoneManager.checkTransition(this);
        }
    }

    /**
     * Lit les entrées clavier (window.game.inputs) et définit la vélocité.
     */
    handleMovement() {
        const { inputs } = window.game;
        this.velX = 0;
        this.velY = 0;

        // Directions prioritaires
        const spd = this.adminMode ? this.speed * 3 : this.speed;
        if (inputs.isHeld("ArrowLeft")) { this.velX = -spd; this.facing = LEFT; }
        else if (inputs.isHeld("ArrowRight")) { this.velX = spd; this.facing = RIGHT; }

        if (inputs.isHeld("ArrowUp")) { this.velY = -spd; this.facing = UP; }
        else if (inputs.isHeld("ArrowDown")) { this.velY = spd; this.facing = DOWN; }

        // Normalisation de la vitesse en diagonale (Pythagore)
        // Évite que Link aille plus vite en courant de travers
        if (this.velX !== 0 && this.velY !== 0) {
            this.velX *= 0.7071; // 1 / racine(2)
            this.velY *= 0.7071;
        }

        // Vérification des touches d'action
        if (inputs.isHeld("KeyZ")) this.actions.actionSwingSword();
        if (inputs.isHeld("KeyX")) this.actions.actionShootArrow();

        // Utiliser une potion (touche P, front montant)
        if (inputs.isHeld("KeyP") && !this._potionKeyWas) {
            this.usePotion();
        }
        this._potionKeyWas = inputs.isHeld("KeyP");
    }

    /**
     * Utilise une potion pour restaurer 2 coeurs (4 HP).
     */
    usePotion() {
        if (this.potions <= 0 || this.hp >= 6) return;
        this.potions--;
        this.hp = Math.min(this.hp + 4, 6);
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

        // Indicateur admin
        if (this.adminMode) {
            ctx.fillStyle = '#ff0000';
            ctx.font = 'bold 14px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('MOD ADMIN', 400, 10);
            ctx.textAlign = 'left';
            ctx.textBaseline = 'alphabetic';
        }
    }
}