import { Sword } from '../Weapons/Sword.js';
import { Arrow } from '../Weapons/Arrow.js';
import { SpriteSequence } from '../../engine/SpriteSequence.js';

export class PlayerActions {
    constructor(player) {
        this.player = player;
    }

    // Gère le coup d'épée avec des frames synchronisées
    actionSwingSword() {
        const p = this.player;
        if (p.actionAnimation) return;

        const sword = new Sword(p.x, p.y, p.facing);
        window.game.engine.add(sword);

        // On utilise SpriteSequence pour piloter l'épée et Link
        p.actionAnimation = new SpriteSequence('SWORD', [
            { frame: 2, duration: 50,  callback: () => sword.useFrame(1) },
            { frame: 3, duration: 50,  callback: () => sword.useFrame(2) },
            { frame: 3, duration: 50,  callback: null }
        ], () => {
            p.actionAnimation = null; // Fin de l'attaque
            sword.kill();            // Suppression de l'épée
        });

        p.actionAnimation.actorObject = sword; 
    }

    // Gère le tir à l'arc
    actionShootArrow() {
        const p = this.player;
        if (p.actionAnimation) return;

        p.actionAnimation = { frameIdx: 2 }; // Pose de tir

        const arrow = new Arrow(p.x, p.y, p.facing, p);
        window.game.engine.add(arrow);

        // Délaie de récupération avant de pouvoir bouger/tirer à nouveau
        setTimeout(() => p.actionAnimation = null, 500);
    }

    // Effet visuel de clignotement lors d'un dégât (Async pour la lisibilité)
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