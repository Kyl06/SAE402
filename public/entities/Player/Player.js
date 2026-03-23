/**
 * Entité Joueur (Héros). 
 * Gère la machine à états de mouvement, l'inventaire, la santé et les interactions physiques.
 */

import { Entity } from "../../engine/Entity.js";
import { PlayerActions } from "./PlayerActions.js";
import { SpriteSheet } from "../../engine/SpriteSheet.js";
import { Animator } from "../../engine/Animator.js";
import { UP, DOWN, LEFT, RIGHT, TAG_PLAYER } from "../../constants.js";

export class Player extends Entity {
    constructor(x, y, skinId) {
        super(x, y, 32, 32); 

        this.hp = 6;                
        this.addTag(TAG_PLAYER);    
        this.skinId = skinId;       
        this.facing = DOWN;         
        this.speed = 160;           
        this.z = 10;                

        this.visible = true;        
        this.isDead = false;        
        this.isPainFlashing = false; 

        // Atlas 16x16 : Marche(0,1), Attaque(2,3), Dégât(4)
        this.spriteSheet = new SpriteSheet(this.skinId, 5, 4, 16, 16);

        this.animations = {
            [DOWN]: new Animator([0, 1], 150),
            [UP]: new Animator([5, 6], 150),
            [LEFT]: new Animator([10, 11], 150),
            [RIGHT]: new Animator([15, 16], 150),
        };

        this.actions = new PlayerActions(this);
        this.actionAnimation = null; // Priorité sur le mouvement libre (Root Motion/Locked State)

        this.emeralds = 0;
        this.arrows = 5;       
        this.potions = 0;
        this.hasShield = false;
        this.swordLevel = 0;   
        this.bowLevel = 0;     
        this.fragments = [false, false, false];

        this.stamina = 100;
        this.maxStamina = 100;
        this.staminaDepleted = false;   
        this.staminaRegenDelay = 0;     

        this.adminMode = false;
        this._adminKeyWas = false;
        this._tpKeyWas = false;
    }

    /** Résolution de collision AABB. */
    onCollision(other) {
        if (this.isDead || this.isPainFlashing) return;

        if (other.hasTag("ENEMY") || other.hasTag("MAGIC_PROJECTILE")) {
            // Direction du vecteur de recul (Knockback) basé sur les centres respectifs.
            const dx = (this.x + this.width/2) - (other.x + other.width/2);
            const dy = (this.y + this.height/2) - (other.y + other.width/2);
            const dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? RIGHT : LEFT) : (dy > 0 ? DOWN : UP);
            this.takeDamage(1, dir);
        }
    }

    /**
     * Traitement des dommages avec feedback sensoriel (Juice).
     * Inclut : Screen Shake, Hitstop (frame freeze), Knockback (recul) et i-frames (clignotement).
     */
    takeDamage(amount, direction) {
        if (this.adminMode || this.hp <= 0 || this.isPainFlashing) return;

        if (this.hasShield && amount > 1) amount -= 1;
        this.hp -= amount;
        
        window.game.engine.shake(8, 200);
        if (this.hp <= 0) return this.die();

        this.isPainFlashing = true;
        const hitDir = direction || (this.facing === UP ? DOWN : this.facing === DOWN ? UP : this.facing === LEFT ? RIGHT : LEFT);
        const knockIntensity = 80;
        const [dirX, dirY] = [hitDir === LEFT ? -1 : hitDir === RIGHT ? 1 : 0, hitDir === UP ? -1 : hitDir === DOWN ? 1 : 0];

        let elapsed = 0;
        const [knockDuration, hitStopDuration] = [180, 60];
        const originalUpdate = this.update.bind(this);
        let hitStopTimer = 0;

        // Injection d'un état temporaire (Override Update) pour le Hitstop/Knockback
        this.update = (delta) => {
            if (hitStopTimer < hitStopDuration) {
                hitStopTimer += delta;
                return; 
            }

            elapsed += delta;
            this.visible = (Math.floor(elapsed / 50) % 2 === 0); // Aliasing temporel pour l'invincibilité

            if (elapsed >= knockDuration) {
                this.update = originalUpdate; 
                this.visible = true; 
                return;
            }

            this.velX = (dirX * knockIntensity) / (knockDuration / 1000);
            this.velY = (dirY * knockIntensity) / (knockDuration / 1000);
            super.update(delta);
        };

        setTimeout(() => {
            this.isPainFlashing = false;
            this.visible = true;
            if (this.update !== originalUpdate) this.update = originalUpdate;
        }, 1200); 
    }

    setSkin(skinId) {
        this.skinId = skinId;
        this.spriteSheet = new SpriteSheet(this.skinId, 5, 4, 16, 16);
    }

    die() {
        this.isDead = true;
        this.visible = false;
        this.collider = false;
        const ui = document.getElementById("game-over-ui");
        if (ui) ui.style.display = "block";
    }

    update(delta) {
        if (this.isDead) return;

        // Logs admin keys (F9/F10)
        this._checkAdminToggle();
        this._checkAdminTeleport();

        if (window.game.dialogueActive) { this.velX = 0; this.velY = 0; return; }

        // Mouvement verrouillé si action (Attaque/Cast) en cours
        if (this.actionAnimation) {
            this.actionAnimation.work?.(delta);
            return;
        }

        // Stamina Recovery Logic
        if (this.staminaRegenDelay > 0) {
            this.staminaRegenDelay -= delta;
        } else {
            this.stamina = Math.min(this.stamina + delta * 0.03, this.maxStamina);
            if (this.staminaDepleted && this.stamina >= this.maxStamina * 0.3) this.staminaDepleted = false;
        }

        this.handleMovement();

        // Feed de l'Animator
        if (this.velX !== 0 || this.velY !== 0) {
            this.animations[this.facing].update(delta);
        } else {
            this.animations[this.facing].reset();
        }

        super.update(delta);
        window.game.zoneManager?.checkTransition(this);
    }

    /** Capture des inputs et normalisation du vecteur de mouvement. */
    handleMovement() {
        const { inputs } = window.game;
        this.velX = 0; this.velY = 0;

        const spd = this.adminMode ? this.speed * 3 : this.speed;
        if (inputs.isHeld("ArrowLeft")) { this.velX = -spd; this.facing = LEFT; }
        else if (inputs.isHeld("ArrowRight")) { this.velX = spd; this.facing = RIGHT; }

        if (inputs.isHeld("ArrowUp")) { this.velY = -spd; this.facing = UP; }
        else if (inputs.isHeld("ArrowDown")) { this.velY = spd; this.facing = DOWN; }

        /** 
         * Normalisation vectorielle ($1/\sqrt{2}$) pour éviter le "Speed Bug" en diagonale 
         * (Théorème de Pythagore : le vecteur diagonale serait de ~1.41 s'il n'était pas bridé).
         */
        if (this.velX !== 0 && this.velY !== 0) {
            this.velX *= 0.7071; 
            this.velY *= 0.7071;
        }

        if (inputs.isHeld("KeyZ")) this.actions.actionSwingSword();
        if (inputs.isHeld("KeyX")) this.actions.actionShootArrow();

        if (inputs.isHeld("KeyP") && !this._potionKeyWas) this.usePotion();
        this._potionKeyWas = inputs.isHeld("KeyP");
    }

    usePotion() {
        if (this.potions <= 0 || this.hp >= 6) return;
        this.potions--;
        this.hp = Math.min(this.hp + 4, 6);
    }

    draw(ctx) {
        if (!this.visible) return;

        const row = { [DOWN]: 0, [UP]: 5, [LEFT]: 10, [RIGHT]: 15 }[this.facing];
        let frame = 0;

        if (this.isPainFlashing) {
            frame = row + 4; 
        } else if (this.actionAnimation) {
            frame = row + (this.actionAnimation.frameIdx ?? 2);
        } else {
            frame = this.animations[this.facing].frame;
        }

        this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, 2);

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

    _checkAdminToggle() {
        const { inputs } = window.game;
        const pressed = inputs.isHeld('F9');
        if (pressed && !this._adminKeyWas) {
            this.adminMode = !this.adminMode;
            this.collider = !this.adminMode;
        }
        this._adminKeyWas = pressed;
    }

    _checkAdminTeleport() {
        if (!this.adminMode) return;
        const { inputs } = window.game;
        const pressed = inputs.isHeld('F10');
        if (pressed && !this._tpKeyWas) {
            window.game.zoneManager?.loadZone('fortress_north', 'south');
        }
        this._tpKeyWas = pressed;
    }
}