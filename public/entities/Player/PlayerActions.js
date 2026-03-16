/**
 * @file PlayerActions.js
 * @description Gère les actions complexes du joueur qui nécessitent des séquences d'animations
 * ou des déclenchements synchronisés (épée, flèches, flash de douleur).
 */

import { Sword } from '../Weapons/Sword.js';
import { Arrow } from '../Weapons/Arrow.js';
import { SpriteSequence } from '../../engine/SpriteSequence.js';
import { UP, DOWN, LEFT, RIGHT } from '../../constants.js';

export class PlayerActions {
    /**
     * @param {Player} player - Référence au joueur local
     */
    constructor(player) {
        this.player = player;
    }

    /**
     * Déclenche un coup d'épée.
     * Crée une entité Sword et suit une séquence de frames pour l'animation.
     */
    actionSwingSword() {
        const p = this.player;
        if (p.actionAnimation) return;

        const sword = new Sword(p.x, p.y, p.facing);
        window.game.engine.add(sword);

        window.game.network?.sendPlayerAction('SWORD', p.facing);

        /**
         * Séquence d'attaque en 3 temps (Start, Swing, End)
         */
        p.actionAnimation = new SpriteSequence('SWORD_ACTION', [
            { frame: 2, duration: 60, callback: () => { sword.updateFollow(p.x, p.y); sword.useFrame(0); } },
            { frame: 3, duration: 60, callback: () => { sword.updateFollow(p.x, p.y); sword.useFrame(1); } },
            { frame: 3, duration: 60, callback: () => { sword.updateFollow(p.x, p.y); sword.useFrame(2); } }
        ], () => {
            p.actionAnimation = null;
            sword.kill();
        });

        p.actionAnimation.actorObject = sword;
    }

    /**
     * Déclenche un tir à l'arc.
     */
    /**
 * Déclenche un tir à l'arc.
 */
actionShootArrow() {
    const p = this.player;
    if (p.actionAnimation) return;
    
    // Vérifie s'il reste des flèches
    if (p.arrows <= 0) {
        // Optionnel : jouer un son d'erreur ou afficher un message
        return;
    }

    // Frame fixe de Link pendant le tir (Frame d'attaque 2)
    p.actionAnimation = { frameIdx: 2 };

    // Création du projectile
    const arrow = new Arrow(p.x, p.y, p.facing, p);
    window.game.engine.add(arrow);

    // Décrémente le compteur de flèches
    p.arrows--;

    // DIFFUSION RÉSEAU : On informe les autres qu'on tire une flèche
    window.game.network?.sendPlayerAction('ARROW', p.facing);

    /**
     * Délai de récupération (Cooldown). 
     * bloque les contrôles de Link pendant 500ms après le tir.
     */
    setTimeout(() => p.actionAnimation = null, 500);
}

    /**
     * Effet visuel de clignotement lors d'un dégât.
     * Utilise async/await pour gérer les timers de visibilité facilement.
     */
    async flashSeries() {
        const p = this.player;
        if (p.isPainFlashing) return;

        p.isPainFlashing = true;
        // 5 cycles de "caché -> visible" pour simuler un clignotement rapide
        for (let i = 0; i < 5; i++) {
            p.visible = false;
            await new Promise(r => setTimeout(r, 80));
            p.visible = true;
            await new Promise(r => setTimeout(r, 80));
        }
        p.isPainFlashing = false;
    }
}