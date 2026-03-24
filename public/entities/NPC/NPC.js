// PNJ : affichage, detection de proximite, declenchement de dialogues

import { Entity } from '../../engine/Entity.js';
import { Assets } from '../../engine/Assets.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';
import { Animator } from '../../engine/Animator.js';
import { SCALE } from '../../constants.js';

export class NPC extends Entity {
    constructor(x, y, config = {}) {
        super(x, y, 16, 16);

        this.npcName = config.name || 'PNJ';
        this.dialogues = config.dialogues || ['...'];
        this.postDefeatDialogues = config.postDefeatDialogues || null;
        this.questDialogues = config.questDialogues || null;
        this.isShop = config.isShop || false;
        this.interactRange = config.interactRange || 50;
        this.z = config.z ?? 10;
        this.collider = true;
        this.addTag('NPC');
        this.addTag('SOLID');

        this.color = config.color || '#8844aa';
        this.skinColor = config.skinColor || '#f0c8a0';

        this.spriteAsset = config.sprite || null;
        this.staticFrame = config.spriteFrame ?? null;
        this.invisibleBody = config.invisibleBody || false;
        if (this.spriteAsset) {
            const cols = config.spriteColumns || 2;
            const rows = config.spriteRows || 1;
            const spriteW = config.spriteW || 16;
            const spriteH = config.spriteH || 16;
            this.spriteSheet = new SpriteSheet(this.spriteAsset, cols, rows, spriteW, spriteH);
            if (this.staticFrame === null) {
                this.animator = new Animator([0, 1], 500);
            }
        }
        this.spriteScale = config.spriteScale ?? SCALE;

        this.spriteRealH = this.spriteAsset ? (config.spriteH || 16) * this.spriteScale : 16 * SCALE;

        this.hitboxOffsetX = config.hitboxOffsetX || 0;
        this.hitboxOffsetY = config.hitboxOffsetY || 0;
        this.hitboxW = config.hitboxW || this.width;
        this.hitboxH = config.hitboxH || this.height;

        this.playerInRange = false;
        this.isTalking = false;
        this.interactKeyWasDown = false;

        this.indicatorBounce = 0;
    }

    getCollisionBox() {
        return {
            x: this.x + this.hitboxOffsetX,
            y: this.y + this.hitboxOffsetY,
            w: this.hitboxW,
            h: this.hitboxH
        };
    }

    // Collision AABB : empeche le joueur de traverser le PNJ
    onCollision(other) {
        if (!other.collider || other.hasTag('NPC')) return;
        if (other.hasTag('PLAYER_WEAPON') || other.hasTag('ITEM')) return;

        const box = this.getCollisionBox();
        const otherBox = other.getCollisionBox ? other.getCollisionBox() : { x: other.x, y: other.y, w: other.width, h: other.height };
        const dx = (box.x + box.w / 2) - (otherBox.x + otherBox.w / 2);
        const dy = (box.y + box.h / 2) - (otherBox.y + otherBox.h / 2);
        const overlapX = (box.w + otherBox.w) / 2 - Math.abs(dx);
        const overlapY = (box.h + otherBox.h) / 2 - Math.abs(dy);

        if (overlapX > 0 && overlapY > 0) {
            if (overlapX < overlapY) {
                other.x += dx > 0 ? -overlapX : overlapX;
            } else {
                other.y += dy > 0 ? -overlapY : overlapY;
            }
        }
    }

    update(delta) {
        const player = window.game.player;
        if (!player || player.isDead) {
            this.playerInRange = false;
            return;
        }

        if (this.animator) {
            this.animator.update(delta);
        }

        this.indicatorBounce += delta * 0.005;

        // Detection centree sur le milieu visuel du sprite
        const cx = this.x + this.width / 2;
        const cy = this.y + this.spriteRealH / 2;
        const dx = cx - (player.x + player.width / 2);
        const dy = cy - (player.y + player.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        this.playerInRange = dist < this.interactRange;

        // Front montant touche E
        const keyDown = window.game.inputs.isHeld('KeyE');
        if (this.playerInRange && keyDown && !this.interactKeyWasDown && !this.isTalking) {
            if (!window.game.dialogueActive) {
                this.startDialogue();
            }
        }
        this.interactKeyWasDown = keyDown;
    }

    // Retourne les dialogues selon l'etat de la quete
    getCurrentDialogues() {
        const qm = window.game.questManager;

        // Priorite : Maldrek vaincu → dialogues de victoire
        if (qm?.maldrekDefeated && this.postDefeatDialogues) {
            return this.postDefeatDialogues;
        }

        if (!this.questDialogues) return this.dialogues;
        if (!qm) return this.dialogues;

        const quest = qm.getQuest(this.questDialogues.questId);
        if (!quest) return this.dialogues;

        if (quest.state === 'completed' && this.questDialogues.completed) {
            return this.questDialogues.completed;
        }
        if ((quest.state === 'active') && this.questDialogues.active) {
            return this.questDialogues.active;
        }
        return this.dialogues;
    }

    startDialogue() {
        const dialogueBox = window.game.dialogueBox;
        if (!dialogueBox) return;

        this.isTalking = true;
        const lines = this.getCurrentDialogues();
        dialogueBox.show(this.npcName, lines, () => {
            this.isTalking = false;
            this.onDialogueEnd();
        });
    }

    // Callback fin de dialogue (ouvre le shop si marchand)
    onDialogueEnd() {
        if (this.isShop && window.game.shopMenu) {
            window.game.shopMenu.open();
        }
    }

    draw(ctx) {
        if (this.visible === false) return;

        if (!this.invisibleBody) {
            if (this.spriteAsset && this.spriteSheet) {
                const frame = this.staticFrame !== null ? this.staticFrame : (this.animator ? this.animator.frame : 0);
                const drawH = this.spriteSheet.spriteH * this.spriteScale;
                const drawY = this.y + this.height * SCALE - drawH;
                this.spriteSheet.drawFrame(ctx, frame, this.x, drawY, this.spriteScale);
            } else {
                this.drawGenericNPC(ctx);
            }
        }

        if (this.playerInRange && !this.isTalking) {
            this.drawIndicator(ctx);
        }
    }

    // PNJ generique dessine avec des formes simples
    drawGenericNPC(ctx) {
        const s = SCALE;
        const px = this.x;
        const py = this.y;

        ctx.fillStyle = this.color;
        ctx.fillRect(px + 2 * s, py + 6 * s, 12 * s, 10 * s);

        ctx.fillStyle = this.skinColor;
        ctx.fillRect(px + 4 * s, py + 1 * s, 8 * s, 7 * s);

        ctx.fillStyle = '#000';
        ctx.fillRect(px + 5 * s, py + 4 * s, 2 * s, 2 * s);
        ctx.fillRect(px + 9 * s, py + 4 * s, 2 * s, 2 * s);
    }

    // Indicateur [E] au-dessus du PNJ
    drawIndicator(ctx) {
        const bounceY = Math.sin(this.indicatorBounce * 3) * 3;
        const cx = this.x + (this.spriteAsset ? (this.spriteSheet.spriteW * this.spriteScale) / 2 : this.width * SCALE / 2);
        const cy = this.y - 10 + bounceY;

        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(cx - 12, cy - 12, 24, 16);
        ctx.strokeStyle = '#ffcc00';
        ctx.lineWidth = 1;
        ctx.strokeRect(cx - 12, cy - 12, 24, 16);

        ctx.fillStyle = '#ffcc00';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('E', cx, cy - 4);
        ctx.textBaseline = 'alphabetic';
    }
}
