/**
 * @file ShopMenu.js
 * @description Menu d'achat du marchand. S'affiche apres le dialogue.
 * Navigation avec fleches haut/bas, achat avec E, fermer avec Escape.
 */

import { Entity } from '../engine/Entity.js';

const SHOP_ITEMS = [
    { id: 'potion',  name: 'Potion de soin',  price: 3,  desc: 'Restaure 2 coeurs',     oneTime: false },
    { id: 'sword',   name: 'Epee en fer',      price: 10, desc: '+1 degat par coup',      oneTime: true },
    { id: 'bow',     name: 'Arc long',          price: 8,  desc: 'Fleches plus rapides',   oneTime: true },
    { id: 'shield',  name: 'Bouclier',          price: 7,  desc: 'Reduit les degats de 1', oneTime: true },
    { id: 'arrows',  name: '5 Fleches',         price: 2,  desc: '+5 fleches',             oneTime: false },
];

export class ShopMenu extends Entity {
    constructor() {
        super(0, 0, 800, 660);
        this.z = 999;
        this.collider = false;

        this.active = false;
        this.selectedIndex = 0;
        this.keyUpWas = false;
        this.keyDownWas = false;
        this.keyEWas = false;
        this.keyEscWas = false;
        this.feedbackText = '';
        this.feedbackTimer = 0;
    }

    open() {
        this.active = true;
        this.selectedIndex = 0;
        this.feedbackText = '';
        this.feedbackTimer = 0;
        window.game.dialogueActive = true;
    }

    close() {
        this.active = false;
        window.game.dialogueActive = false;
    }

    update(delta) {
        if (!this.active) return;

        if (this.feedbackTimer > 0) this.feedbackTimer -= delta;

        const inputs = window.game.inputs;

        // Navigation haut/bas (front montant)
        const upDown = inputs.isHeld('ArrowUp');
        const downDown = inputs.isHeld('ArrowDown');
        if (upDown && !this.keyUpWas) {
            this.selectedIndex = (this.selectedIndex - 1 + SHOP_ITEMS.length) % SHOP_ITEMS.length;
        }
        if (downDown && !this.keyDownWas) {
            this.selectedIndex = (this.selectedIndex + 1) % SHOP_ITEMS.length;
        }
        this.keyUpWas = upDown;
        this.keyDownWas = downDown;

        // Achat (E)
        const eDown = inputs.isHeld('KeyE') || inputs.isHeld('Enter');
        if (eDown && !this.keyEWas) {
            this.tryBuy(SHOP_ITEMS[this.selectedIndex]);
        }
        this.keyEWas = eDown;

        // Fermer (Escape)
        const escDown = inputs.isHeld('Escape');
        if (escDown && !this.keyEscWas) {
            this.close();
        }
        this.keyEscWas = escDown;
    }

    tryBuy(item) {
        const player = window.game.player;
        if (!player) return;

        // Verifier si deja achete (oneTime)
        if (item.oneTime) {
            if (item.id === 'sword' && player.swordLevel > 0) {
                this.showFeedback('Deja achete !');
                return;
            }
            if (item.id === 'bow' && player.bowLevel > 0) {
                this.showFeedback('Deja achete !');
                return;
            }
            if (item.id === 'shield' && player.hasShield) {
                this.showFeedback('Deja achete !');
                return;
            }
        }

        // Verifier les emeraudes
        if ((player.emeralds || 0) < item.price) {
            this.showFeedback('Pas assez d\'emeraudes !');
            return;
        }

        // Acheter
        player.emeralds -= item.price;

        switch (item.id) {
            case 'potion':
                player.potions++;
                this.showFeedback('Potion achetee !');
                break;
            case 'sword':
                player.swordLevel = 1;
                this.showFeedback('Epee en fer equipee !');
                break;
            case 'bow':
                player.bowLevel = 1;
                this.showFeedback('Arc long equipe !');
                break;
            case 'shield':
                player.hasShield = true;
                this.showFeedback('Bouclier equipe !');
                break;
            case 'arrows':
                player.arrows = (player.arrows || 0) + 5;
                this.showFeedback('+5 fleches !');
                break;
        }

        // Sauvegarde automatique apres achat
        const qm = window.game.questManager;
        if (qm) qm.save();
    }

    showFeedback(text) {
        this.feedbackText = text;
        this.feedbackTimer = 1500;
    }

    draw(ctx) {
        if (!this.active) return;

        const player = window.game.player;
        const emeralds = player ? (player.emeralds || 0) : 0;

        const boxW = 400;
        const boxH = 280;
        const boxX = (800 - boxW) / 2;
        const boxY = (600 - boxH) / 2;

        // Fond
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(boxX, boxY, boxW, boxH);
        ctx.strokeStyle = '#ffcc00';
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        // Titre
        ctx.fillStyle = '#ffcc00';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('BOUTIQUE', boxX + boxW / 2, boxY + 22);

        // Emeraudes du joueur
        ctx.fillStyle = '#44ff44';
        ctx.font = '14px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`Emeraudes: ${emeralds}`, boxX + boxW - 16, boxY + 22);

        // Items
        ctx.textAlign = 'left';
        const startY = boxY + 52;
        const lineH = 38;

        for (let i = 0; i < SHOP_ITEMS.length; i++) {
            const item = SHOP_ITEMS[i];
            const y = startY + i * lineH;
            const selected = i === this.selectedIndex;

            // Surlignage
            if (selected) {
                ctx.fillStyle = 'rgba(255, 204, 0, 0.15)';
                ctx.fillRect(boxX + 8, y - 10, boxW - 16, lineH - 4);
            }

            // Curseur
            if (selected) {
                ctx.fillStyle = '#ffcc00';
                ctx.font = 'bold 14px monospace';
                ctx.fillText('>', boxX + 14, y + 4);
            }

            // Verifier si deja achete
            let alreadyBought = false;
            if (item.oneTime && player) {
                if (item.id === 'sword' && player.swordLevel > 0) alreadyBought = true;
                if (item.id === 'bow' && player.bowLevel > 0) alreadyBought = true;
                if (item.id === 'shield' && player.hasShield) alreadyBought = true;
            }

            // Nom
            ctx.fillStyle = alreadyBought ? '#666' : '#fff';
            ctx.font = 'bold 14px monospace';
            ctx.fillText(item.name, boxX + 30, y + 4);

            // Prix
            const canAfford = emeralds >= item.price;
            ctx.fillStyle = alreadyBought ? '#666' : (canAfford ? '#44ff44' : '#ff4444');
            ctx.font = '12px monospace';
            ctx.fillText(`${item.price} em.`, boxX + boxW - 80, y + 4);

            // Description
            ctx.fillStyle = alreadyBought ? '#444' : '#aaa';
            ctx.font = '11px monospace';
            ctx.fillText(alreadyBought ? '(possede)' : item.desc, boxX + 30, y + 20);
        }

        // Feedback d'achat
        if (this.feedbackTimer > 0) {
            ctx.fillStyle = '#ffcc00';
            ctx.font = 'bold 14px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.feedbackText, boxX + boxW / 2, boxY + boxH - 24);
        }

        // Instructions
        ctx.fillStyle = '#888';
        ctx.font = '11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Fleches: naviguer | E: acheter | Echap: fermer', boxX + boxW / 2, boxY + boxH - 8);
        ctx.textAlign = 'left';
    }
}
