/**
 * State Machine d'actions complexes. 
 * Orchestre les séquences d'animation verrouillées (épée, tir à l'arc) et la consommation de stamina.
 */

import { Sword } from '../Weapons/Sword.js';
import { Arrow } from '../Weapons/Arrow.js';
import { SpriteSequence } from '../../engine/SpriteSequence.js';
import { UP, DOWN, LEFT, RIGHT } from '../../constants.js';

export class PlayerActions {
    constructor(player) {
        this.player = player;
    }

    /**
     * Exécute un coup d'épée (Melee Attack). 
     * Verrouille le mouvement et instancie une hitbox temporaire (Sword).
     */
    actionSwingSword() {
        const p = this.player;
        if (p.actionAnimation) return;

        // Stamina Tax : Coût binaire avec seuil de tolérance.
        if (p.staminaDepleted || p.stamina < 20) {
            if (p.stamina < 20) p.staminaDepleted = true;
            return;
        }
        
        p.stamina -= 20;
        p.staminaRegenDelay = 500; // Freeze de la régénération pendant l'action + buffer.
        if (p.stamina <= 0) { p.stamina = 0; p.staminaDepleted = true; }

        const sword = new Sword(p.x, p.y, p.facing);
        window.game.engine.add(sword);
        window.game.network?.sendPlayerAction('SWORD', p.facing);

        /**
         * Animation asservie par SpriteSequence (Frames: Start -> Impact -> Recovery).
         */
        p.actionAnimation = new SpriteSequence('SWORD_ACTION', [
            { frame: 2, duration: 60, callback: () => { sword.updateFollow(p.x, p.y); sword.useFrame(0); } },
            { frame: 3, duration: 60, callback: () => { sword.updateFollow(p.x, p.y); sword.useFrame(1); } },
            { frame: 3, duration: 60, callback: () => { sword.updateFollow(p.x, p.y); sword.useFrame(2); } }
        ], () => {
            p.actionAnimation = null; // Libération de l'état "Action Locked"
            sword.kill();
        });

        p.actionAnimation.actorObject = sword;
    }

    /**
     * Exécute un tir de projectile (Ranged Attack).
     */
    actionShootArrow() {
        const p = this.player;
        if (p.actionAnimation || (p.arrows || 0) <= 0) return;

        if (p.staminaDepleted || p.stamina < 15) {
            if (p.stamina < 15) p.staminaDepleted = true;
            return;
        }
        
        p.arrows--;
        p.stamina -= 15;
        p.staminaRegenDelay = 500;
        if (p.stamina <= 0) { p.stamina = 0; p.staminaDepleted = true; }

        p.actionAnimation = { frameIdx: 2 }; // Frame d'attaque fixe

        const arrow = new Arrow(p.x, p.y, p.facing, p);
        window.game.engine.add(arrow);
        window.game.network?.sendPlayerAction('ARROW', p.facing);

        // Désactivation différée du verrouillage d'action (Cooldown de tir)
        setTimeout(() => p.actionAnimation = null, 500);
    }

    /**
     * @deprecated Remplacé par le mécanisme de clignotement dans Player.takeDamage
     * pour une meilleure synchronisation avec le recul physique.
     */
    async flashSeries() {
        const p = this.player;
        if (p.isPainFlashing) return;
        p.isPainFlashing = true;
        for (let i = 0; i < 5; i++) {
            p.visible = false;
            await new Promise(r => setTimeout(r, 80));
            p.visible = true;
            await new Promise(r => setTimeout(r, 80));
        }
        p.isPainFlashing = false;
    }
}