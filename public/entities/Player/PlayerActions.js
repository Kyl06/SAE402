// Actions du joueur : attaque épée et tir à l'arc
import { Sword } from '../Weapons/Sword.js';
import { Arrow } from '../Weapons/Arrow.js';
import { SpriteSequence } from '../../engine/SpriteSequence.js';
import { UP, DOWN, LEFT, RIGHT } from '../../constants.js';

export class PlayerActions {
    constructor(player) {
        this.player = player;
    }

    // Attaque épée : verrouille le mouvement et instancie une hitbox
    actionSwingSword() {
        const p = this.player;
        if (p.actionAnimation) return;

        if (p.staminaDepleted || p.stamina < 20) {
            if (p.stamina < 20) p.staminaDepleted = true;
            return;
        }

        p.stamina -= 20;
        p.staminaRegenDelay = 500;
        if (p.stamina <= 0) { p.stamina = 0; p.staminaDepleted = true; }

        const sword = new Sword(p.x, p.y, p.facing);
        window.game.engine.add(sword);
        window.game.network?.sendPlayerAction('SWORD', p.facing);

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

    // Tir à l'arc
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

        p.actionAnimation = { frameIdx: 2 };

        const arrow = new Arrow(p.x, p.y, p.facing, p);
        window.game.engine.add(arrow);
        window.game.network?.sendPlayerAction('ARROW', p.facing);

        setTimeout(() => p.actionAnimation = null, 500);
    }

    // @deprecated - remplacé par Player.takeDamage
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
