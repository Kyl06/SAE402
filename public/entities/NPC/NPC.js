/**
 * @file NPC.js
 * @description Classe de base pour les PNJ (Personnages Non Joueurs).
 * Gere l'affichage, la detection de proximite et le declenchement des dialogues.
 */

import { Entity } from '../../engine/Entity.js';
import { Assets } from '../../engine/Assets.js';
import { SpriteSheet } from '../../engine/SpriteSheet.js';
import { Animator } from '../../engine/Animator.js';
import { SCALE } from '../../constants.js';

export class NPC extends Entity {
    /**
     * @param {number} x - Position X
     * @param {number} y - Position Y
     * @param {Object} config - Configuration du PNJ
     * @param {string} config.name - Nom affiche dans la boite de dialogue
     * @param {string[]} config.dialogues - Lignes de dialogue
     * @param {string} [config.sprite] - Nom de l'asset sprite (ex: 'VENDEUR')
     * @param {number} [config.spriteColumns] - Nombre de colonnes dans le sprite sheet
     * @param {string} [config.color] - Couleur de la robe si pas de sprite
     * @param {string} [config.skinColor] - Couleur de peau si pas de sprite
     */
    constructor(x, y, config = {}) {
        super(x, y, 16, 16);

        this.npcName = config.name || 'PNJ';
        this.dialogues = config.dialogues || ['...'];
        this.questDialogues = config.questDialogues || null; // { questId, active: [...], completed: [...] }
        this.isShop = config.isShop || false;
        this.interactRange = config.interactRange || 50;
        this.z = config.z ?? 10;
        this.collider = true;
        this.addTag('NPC');
        this.addTag('SOLID');

        // Apparence
        this.color = config.color || '#8844aa';
        this.skinColor = config.skinColor || '#f0c8a0';

        // Sprite (optionnel)
        this.spriteAsset = config.sprite || null;
        if (this.spriteAsset) {
            const cols = config.spriteColumns || 2;
            const spriteW = config.spriteW || 16;
            const spriteH = config.spriteH || 16;
            this.spriteSheet = new SpriteSheet(this.spriteAsset, cols, 1, spriteW, spriteH);
            this.animator = new Animator([0, 1], 500);
        }

        // Hauteur visuelle reelle du sprite (pour centrer la detection)
        this.spriteRealH = this.spriteAsset ? (config.spriteH || 16) * SCALE : 16 * SCALE;

        // Etat d'interaction
        this.playerInRange = false;
        this.isTalking = false;
        this.interactKeyWasDown = false;

        // Indicateur "!" animation
        this.indicatorBounce = 0;
    }

    /**
     * Collision AABB simple - empeche le joueur de traverser le PNJ.
     */
    onCollision(other) {
        if (!other.collider || other.hasTag('NPC')) return;
        if (other.hasTag('PLAYER_WEAPON') || other.hasTag('ITEM')) return;

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
        const player = window.game.player;
        if (!player || player.isDead) {
            this.playerInRange = false;
            return;
        }

        // Animation sprite
        if (this.animator) {
            this.animator.update(delta);
        }

        // Animation indicateur
        this.indicatorBounce += delta * 0.005;

        // Detection de proximite (centree sur le milieu visuel du sprite, pas la hitbox)
        const cx = this.x + this.width / 2;
        const cy = this.y + this.spriteRealH / 2;
        const dx = cx - (player.x + player.width / 2);
        const dy = cy - (player.y + player.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        this.playerInRange = dist < this.interactRange;

        // Detection appui touche E (front montant)
        const keyDown = window.game.inputs.isHeld('KeyE');
        if (this.playerInRange && keyDown && !this.interactKeyWasDown && !this.isTalking) {
            if (!window.game.dialogueActive) {
                this.startDialogue();
            }
        }
        this.interactKeyWasDown = keyDown;
    }

    /**
     * Demarre le dialogue avec ce PNJ.
     */
    /**
     * Retourne les lignes de dialogue en fonction de l'etat de la quete associee.
     */
    getCurrentDialogues() {
        if (!this.questDialogues) return this.dialogues;

        const qm = window.game.questManager;
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

    /**
     * Callback appele quand le dialogue est termine.
     * Peut etre surcharge pour declencher des actions (quetes, achats, etc.)
     */
    onDialogueEnd() {
        // Ouvrir le shop si c'est un marchand
        if (this.isShop && window.game.shopMenu) {
            window.game.shopMenu.open();
        }
    }

    draw(ctx) {
        if (this.spriteAsset && this.spriteSheet) {
            // Dessin via sprite sheet
            const frame = this.animator ? this.animator.frame : 0;
            this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, SCALE);
        } else {
            // Dessin procedural (PNJ sans sprite)
            this.drawGenericNPC(ctx);
        }

        // Indicateur "!" quand le joueur est a portee
        if (this.playerInRange && !this.isTalking) {
            this.drawIndicator(ctx);
        }
    }

    /**
     * Dessine un PNJ generique avec des formes simples.
     */
    drawGenericNPC(ctx) {
        const s = SCALE;
        const px = this.x;
        const py = this.y;

        // Corps (robe)
        ctx.fillStyle = this.color;
        ctx.fillRect(px + 2 * s, py + 6 * s, 12 * s, 10 * s);

        // Tete
        ctx.fillStyle = this.skinColor;
        ctx.fillRect(px + 4 * s, py + 1 * s, 8 * s, 7 * s);

        // Yeux
        ctx.fillStyle = '#000';
        ctx.fillRect(px + 5 * s, py + 4 * s, 2 * s, 2 * s);
        ctx.fillRect(px + 9 * s, py + 4 * s, 2 * s, 2 * s);
    }

    /**
     * Dessine un indicateur [E] au-dessus du PNJ.
     */
    drawIndicator(ctx) {
        const bounceY = Math.sin(this.indicatorBounce * 3) * 3;
        const cx = this.x + this.width * SCALE / 2;
        const cy = this.y - 10 + bounceY;

        // Fond
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(cx - 12, cy - 12, 24, 16);
        ctx.strokeStyle = '#ffcc00';
        ctx.lineWidth = 1;
        ctx.strokeRect(cx - 12, cy - 12, 24, 16);

        // Texte
        ctx.fillStyle = '#ffcc00';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('E', cx, cy - 4);
        ctx.textBaseline = 'alphabetic';
    }
}
