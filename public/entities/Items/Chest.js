// Coffre interactif, s'ouvre avec touche E (necessite parfois une cle)

import { Entity } from '../../engine/Entity.js';
import { Assets } from '../../engine/Assets.js';
import { SCALE } from '../../constants.js';

export class Chest extends Entity {
    constructor(x, y, config = {}) {
        super(x, y, 20, 16);
        this.z = 5;
        this.collider = true;
        this.addTag('SOLID');
        this.addTag('CHEST');

        this.opened = false;
        this.interactRange = 40;
        this.keyWasDown = false;
        this.indicatorBounce = 0;
        this.playerInRange = false;

        this.requireKey = config.requireKey !== undefined ? config.requireKey : true;
        this.emeralds = config.emeralds || 0;
        this.customMessages = config.messages || null;
        this.saveId = config.saveId || null;

        // Verifier si deja ouvert via saveId
        if (this.saveId) {
            const qm = window.game.questManager;
            if (qm && qm.getQuest(this.saveId) && qm.getQuest(this.saveId).opened) {
                this.opened = true;
            }
        }

        this.drawSize = 32;
    }

    onCollision(other) {
        if (!other.collider || other.hasTag('ITEM')) return;
        if (other.hasTag('PLAYER_WEAPON')) return;

        const dx = (this.x + this.width / 2) - (other.x + other.width / 2);
        const dy = (this.y + this.height / 2) - (other.y + other.height / 2);
        const overlapX = (this.width + other.width) / 2 - Math.abs(dx);
        const overlapY = (this.height + other.height) / 2 - Math.abs(dy);

        if (overlapX > 0 && overlapY > 0) {
            if (overlapX < overlapY) {
                other.x += dx > 0 ? -overlapX : overlapX;
            } else {
                other.y += dy > 0 ? -overlapY : overlapY;
            }
        }
    }

    update(delta) {
        if (this.opened) return;

        this.indicatorBounce += delta * 0.005;

        const player = window.game.player;
        if (!player || player.isDead) {
            this.playerInRange = false;
            return;
        }

        const dx = (this.x + this.width / 2) - (player.x + player.width / 2);
        const dy = (this.y + this.height / 2) - (player.y + player.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        this.playerInRange = dist < this.interactRange;

        const keyDown = window.game.inputs.isHeld('KeyE');
        if (this.playerInRange && keyDown && !this.keyWasDown) {
            this.tryOpen();
        }
        this.keyWasDown = keyDown;
    }

    tryOpen() {
        const qm = window.game.questManager;
        if (!qm) return;

        if (this.requireKey) {
            const quest = qm.getQuest('swamp_chest');
            if (!quest.hasKey) {
                const db = window.game.dialogueBox;
                if (db && !window.game.dialogueActive) {
                    db.show('Coffre', ["Ce coffre est verrouille. Il faut trouver la cle..."], null);
                }
                return;
            }

            if (qm.openChest()) {
                this.opened = true;
                const db = window.game.dialogueBox;
                if (db) {
                    db.show('Coffre', [
                        "Le coffre s'ouvre !",
                        "Tu obtiens le Fragment de Cristal !"
                    ], null);
                }
            }
        } else {
            this.opened = true;

            if (this.emeralds > 0) {
                const player = window.game.player;
                if (player) {
                    player.emeralds = (player.emeralds || 0) + this.emeralds;
                }
            }

            if (this.saveId) {
                const quest = qm.getQuest(this.saveId);
                quest.opened = true;
            }

            const db = window.game.dialogueBox;
            if (db) {
                const msgs = this.customMessages || ["Le coffre s'ouvre !"];
                db.show('Coffre', msgs, null);
            }
        }
    }

    draw(ctx) {
        const image = Assets.get('COFFRE');
        if (!image) return;

        // 2 frames cote a cote (gauche = ferme, droite = ouvert)
        const frameW = image.width / 2;
        const frameH = image.height;
        const sx = this.opened ? frameW : 0;
        const dw = this.drawSize;
        const dh = this.drawSize * (frameH / frameW);

        // Ancre par le bas : le couvercle ouvert depasse vers le haut
        const dy = this.y + this.drawSize - dh;

        ctx.drawImage(
            image,
            sx, 0, frameW, frameH,
            Math.floor(this.x), Math.floor(dy),
            dw, dh
        );

        if (this.playerInRange && !this.opened) {
            const bounceY = Math.sin(this.indicatorBounce * 3) * 3;
            ctx.fillStyle = '#ffcc00';
            ctx.font = 'bold 16px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('?', this.x + dw / 2, this.y - 8 + bounceY);
            ctx.textAlign = 'left';
        }
    }
}
