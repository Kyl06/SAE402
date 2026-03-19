/**
 * @file ShopMenu.js
 * @description Menu d'achat du marchand retro style NES/Zelda.
 * Navigation avec fleches haut/bas, achat avec E, fermer avec Escape.
 */

import { Entity } from '../engine/Entity.js';
import { Assets } from '../engine/Assets.js';

const SHOP_ITEMS = [
    { id: 'potion',  name: 'Potion de soin',  price: 3,  desc: 'Restaure 2 coeurs',     oneTime: false, icon: 'POTION' },
    { id: 'sword',   name: 'Epee en fer',      price: 10, desc: '+1 degat par coup',      oneTime: true,  icon: 'EPEE_FER' },
    { id: 'bow',     name: 'Arc long',          price: 8,  desc: 'Fleches plus rapides',   oneTime: true,  icon: 'ARC_LONG' },
    { id: 'shield',  name: 'Bouclier',          price: 7,  desc: 'Reduit les degats de 1', oneTime: true,  icon: 'BOUCLIER' },
    { id: 'arrows',  name: '5 Fleches',         price: 2,  desc: '+5 fleches',             oneTime: false, icon: 'ARROW' },
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
        this.animTimer = 0;
    }

    open() {
        this.active = true;
        this.selectedIndex = 0;
        this.feedbackText = '';
        this.feedbackTimer = 0;
        this.animTimer = 0;
        this.keyEWas = true; // Ignorer le E encore enfonce du dialogue
        window.game.dialogueActive = true;
    }

    close() {
        this.active = false;
        window.game.dialogueActive = false;
    }

    update(delta) {
        if (!this.active) return;

        this.animTimer += delta * 0.004;
        if (this.feedbackTimer > 0) this.feedbackTimer -= delta;

        const inputs = window.game.inputs;

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

        const eDown = inputs.isHeld('KeyE') || inputs.isHeld('Enter');
        if (eDown && !this.keyEWas) {
            this.tryBuy(SHOP_ITEMS[this.selectedIndex]);
        }
        this.keyEWas = eDown;

        const escDown = inputs.isHeld('Escape');
        if (escDown && !this.keyEscWas) {
            this.close();
        }
        this.keyEscWas = escDown;
    }

    tryBuy(item) {
        const player = window.game.player;
        if (!player) return;

        if (item.oneTime) {
            if (item.id === 'sword' && player.swordLevel > 0) { this.showFeedback('Deja achete !'); return; }
            if (item.id === 'bow' && player.bowLevel > 0) { this.showFeedback('Deja achete !'); return; }
            if (item.id === 'shield' && player.hasShield) { this.showFeedback('Deja achete !'); return; }
        }

        if (!player.adminMode && (player.emeralds || 0) < item.price) { this.showFeedback('Pas assez d\'emeraudes !'); return; }

        if (!player.adminMode) player.emeralds -= item.price;

        switch (item.id) {
            case 'potion': player.potions++; this.showFeedback('Potion achetee !'); break;
            case 'sword': player.swordLevel = 1; this.showFeedback('Epee en fer equipee !'); break;
            case 'bow': player.bowLevel = 1; this.showFeedback('Arc long equipe !'); break;
            case 'shield': player.hasShield = true; this.showFeedback('Bouclier equipe !'); break;
            case 'arrows': player.arrows = (player.arrows || 0) + 5; this.showFeedback('+5 fleches !'); break;
        }

        const qm = window.game.questManager;
        if (qm) qm.save();
    }

    showFeedback(text) {
        this.feedbackText = text;
        this.feedbackTimer = 1500;
    }

    _drawRetroBox(ctx, x, y, w, h) {
        ctx.fillStyle = '#0a0a18';
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = '#f0f0f0';
        ctx.lineWidth = 3;
        ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);
        ctx.strokeStyle = '#8888aa';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 5, y + 5, w - 10, h - 10);
        ctx.fillStyle = '#f0f0f0';
        const cs = 4;
        ctx.fillRect(x + 2, y + 2, cs, cs);
        ctx.fillRect(x + w - 2 - cs, y + 2, cs, cs);
        ctx.fillRect(x + 2, y + h - 2 - cs, cs, cs);
        ctx.fillRect(x + w - 2 - cs, y + h - 2 - cs, cs, cs);
    }

    draw(ctx) {
        if (!this.active) return;

        const player = window.game.player;
        const emeralds = player ? (player.emeralds || 0) : 0;

        const boxW = 480;
        const boxH = 360;
        const boxX = (800 - boxW) / 2;
        const boxY = (600 - boxH) / 2;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, 800, 660);

        this._drawRetroBox(ctx, boxX, boxY, boxW, boxH);

        ctx.strokeStyle = '#8888aa';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(boxX + 12, boxY + 50);
        ctx.lineTo(boxX + boxW - 12, boxY + 50);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('BOUTIQUE', boxX + boxW / 2, boxY + 30);

        ctx.fillStyle = '#44ff44';
        ctx.font = 'bold 11px "Press Start 2P", monospace';
        ctx.textAlign = 'right';
        const emDisplay = emeralds === Infinity ? 'INF' : `${emeralds}`;
        ctx.fillText(`${emDisplay} em.`, boxX + boxW - 16, boxY + 30);

        ctx.textAlign = 'left';
        const startY = boxY + 68;
        const lineH = 48;

        for (let i = 0; i < SHOP_ITEMS.length; i++) {
            const item = SHOP_ITEMS[i];
            const y = startY + i * lineH;
            const selected = i === this.selectedIndex;

            if (selected) {
                ctx.fillStyle = 'rgba(240, 240, 240, 0.06)';
                ctx.fillRect(boxX + 10, y - 8, boxW - 20, lineH - 4);
                ctx.strokeStyle = 'rgba(255, 204, 0, 0.3)';
                ctx.lineWidth = 1;
                ctx.strokeRect(boxX + 10, y - 8, boxW - 20, lineH - 4);
            }

            if (selected) {
                const cursorOffset = Math.sin(this.animTimer * 4) * 2;
                ctx.fillStyle = '#ffcc00';
                ctx.font = 'bold 12px "Press Start 2P", monospace';
                ctx.fillText('\u25B6', boxX + 16 + cursorOffset, y + 8);
            }

            let alreadyBought = false;
            if (item.oneTime && player) {
                if (item.id === 'sword' && player.swordLevel > 0) alreadyBought = true;
                if (item.id === 'bow' && player.bowLevel > 0) alreadyBought = true;
                if (item.id === 'shield' && player.hasShield) alreadyBought = true;
            }

            // Icone de l'item
            const iconImg = item.icon ? Assets.get(item.icon) : null;
            const iconSize = 20;
            const textOffsetX = iconImg ? 24 : 0;
            if (iconImg) {
                if (item.id === 'arrows') {
                    // Derniere case 16x16 de arrow.png (16x64)
                    ctx.drawImage(iconImg, 0, 48, 16, 16, boxX + 38, y - 4, iconSize, iconSize);
                } else {
                    ctx.drawImage(iconImg, boxX + 38, y - 4, iconSize, iconSize);
                }
            }

            ctx.fillStyle = alreadyBought ? '#555566' : '#ffffff';
            ctx.font = 'bold 11px "Press Start 2P", monospace';
            ctx.fillText(item.name, boxX + 38 + textOffsetX, y + 8);

            const canAfford = emeralds >= item.price;
            ctx.fillStyle = alreadyBought ? '#555566' : (canAfford ? '#44ff44' : '#ff4444');
            ctx.font = 'bold 11px "Press Start 2P", monospace';
            ctx.textAlign = 'right';
            ctx.fillText(`${item.price} em.`, boxX + boxW - 18, y + 8);
            ctx.textAlign = 'left';

            ctx.fillStyle = alreadyBought ? '#333344' : '#aaaacc';
            ctx.font = 'bold 8px "Press Start 2P", monospace';
            ctx.fillText(alreadyBought ? '[possede]' : item.desc, boxX + 38 + textOffsetX, y + 28);
        }

        ctx.strokeStyle = '#8888aa';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(boxX + 12, boxY + boxH - 42);
        ctx.lineTo(boxX + boxW - 12, boxY + boxH - 42);
        ctx.stroke();

        if (this.feedbackTimer > 0) {
            ctx.fillStyle = '#ffcc00';
            ctx.font = 'bold 10px "Press Start 2P", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.feedbackText, boxX + boxW / 2, boxY + boxH - 30);
        }

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 7px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('\u25B2\u25BC Naviguer   E Acheter   Echap Fermer', boxX + boxW / 2, boxY + boxH - 12);
        ctx.textAlign = 'left';
    }
}
