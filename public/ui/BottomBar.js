// Barre de statut en bas : coeurs, stamina, emeraudes, fleches, inventaire

import { Entity } from '../engine/Entity.js';
import { Hearts } from './Hearts.js';
import { Assets } from '../engine/Assets.js';

export class BottomBar extends Entity {
    constructor() {
        super(0, 576, 800, 84);
        this.collider = false;
        this.z = 999;
        this.heartsUI = new Hearts();
    }

    draw(ctx) {
        ctx.fillStyle = "#000";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 4;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        const player = window.game.player;
        if (!player) return;

        const startX = 20;
        const numHearts = Math.ceil(player.maxHp / 2);
        const heartsWidth = numHearts * (this.heartsUI.heartSize + 8);

        this.heartsUI.draw(ctx, player.hp, startX, this.y + 8, player.maxHp);

        const staminaX = Math.max(140, startX + heartsWidth + 10);
        this.drawStamina(ctx, player, staminaX, this.y + 18);

        const emeraldsX = staminaX + 140;
        this.drawEmeralds(ctx, player, emeraldsX, this.y + 24);

        const arrowsX = emeraldsX + 140;
        this.drawArrows(ctx, player, arrowsX, this.y + 24);

        const invY = this.y + 60;
        let cursorX = 20;

        cursorX = this.drawFragments(ctx, cursorX, invY);
        cursorX = this.drawRelic(ctx, cursorX, invY);
        cursorX += 15;
        cursorX = this.drawPotions(ctx, player, cursorX, invY);
        cursorX += 15;
        cursorX = this.drawEquipment(ctx, player, cursorX, invY);

        this.drawZoneName(ctx, this.y + 24);
        this.drawControls(ctx, this.y + 39);
    }

    drawControls(ctx, y) {
        const controls = [
            { label: "← → ↑ ↓", action: "Mouvement" },
            { label: "W", action: "Épée" },
            { label: "X", action: "Arc" },
            { label: "E", action: "Interagir" },
            { label: "P", action: "Potion" }
        ];

        ctx.font = "11px monospace";
        ctx.textBaseline = "top";
        ctx.textAlign = "left";

        const verticalSpacing = 14;
        const rightColumnX = 350;

        const rows = [];
        for (let i = 0; i < controls.length; i += 2) {
            rows.push(controls.slice(i, i + 2));
        }

        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            const row = rows[rowIndex];
            const rowY = y + rowIndex * verticalSpacing;

            const firstControl = row[0];
            const firstLabelText = `[${firstControl.label}]`;
            const firstActionText = ` ${firstControl.action}`;

            const firstX = 500;

            ctx.fillStyle = "#ffdd00";
            ctx.fillText(firstLabelText, firstX, rowY);

            const firstLabelWidth = ctx.measureText(firstLabelText).width;
            const firstActionX = firstX + firstLabelWidth;

            ctx.fillStyle = "#aaa";
            ctx.fillText(firstActionText, firstActionX, rowY);

            if (row.length > 1) {
                const secondControl = row[1];
                const secondLabelText = `[${secondControl.label}]`;
                const secondActionText = ` ${secondControl.action}`;

                ctx.fillStyle = "#ffdd00";
                ctx.fillText(secondLabelText, rightColumnX, rowY);

                const secondLabelWidth = ctx.measureText(secondLabelText).width;
                const secondActionX = rightColumnX + secondLabelWidth;

                ctx.fillStyle = "#aaa";
                ctx.fillText(secondActionText, secondActionX, rowY);
            }
        }
    }

    drawSecondaryControls(ctx, y) {
        const secondaryControls = [
            { label: "E", action: "Interagir" },
            { label: "ECHAP", action: "Quitter" }
        ];

        let x = 20;
        ctx.fillStyle = "#aaa";
        ctx.font = "11px monospace";
        ctx.textBaseline = "top";
        ctx.textAlign = "left";

        for (const { label, action } of secondaryControls) {
            ctx.fillStyle = "#ffdd00";
            ctx.fillText(`[${label}]`, x, y);

            ctx.fillStyle = "#aaa";
            ctx.fillText(` ${action}`, x + (label.length * 6) + 20, y);

            x += 140;
        }
    }

    drawStamina(ctx, player, x, y) {
        const barW = 120;
        const barH = 8;
        const ratio = player.stamina / player.maxStamina;

        ctx.fillStyle = '#333';
        ctx.fillRect(x, y, barW, barH);

        ctx.fillStyle = player.staminaDepleted ? '#ff4444' : (ratio < 0.3 ? '#ffaa00' : '#44cc44');
        ctx.fillRect(x, y, barW * ratio, barH);

        ctx.strokeStyle = '#888';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, barW, barH);
    }

    drawEmeralds(ctx, player, x, y) {
        const iconSize = 22;
        const emeraldImg = Assets.get("EMERALD");
        if (emeraldImg) {
            ctx.drawImage(emeraldImg, x, y - iconSize / 2, iconSize, iconSize);
        }
        if (player.adminMode) {
            ctx.fillStyle = '#ffffffff';
            ctx.font = "bold 14px monospace";
            ctx.textBaseline = "middle";
            ctx.textAlign = "left";
            ctx.fillText('INF', x + iconSize + 6, y);
        } else {
            const emeraldText = `x${player.emeralds || 0}`;
            ctx.fillStyle = '#fff';
            ctx.font = "bold 18px monospace";
            ctx.textBaseline = "middle";
            ctx.textAlign = "left";
            ctx.fillText(emeraldText, x + iconSize + 6, y);
        }
    }

    drawArrows(ctx, player, x, y) {
        const iconSize = 22;
        const arrowImg = Assets.get("ARROW");
        if (arrowImg) {
            ctx.drawImage(arrowImg, 0, 48, 16, 16, x, y - iconSize / 2, iconSize, iconSize);
        }
        const count = player.arrows || 0;
        ctx.fillStyle = count > 0 ? "#fff" : "#666";
        ctx.font = "bold 18px monospace";
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";
        ctx.fillText(`x${count}`, x + iconSize + 6, y);
    }

    drawFragments(ctx, x, y) {
        const qm = window.game.questManager;
        if (!qm) return x;

        const keys = ['DIAMANT_ROUGE', 'DIAMANT_VERT', 'DIAMANT_BLEU'];
        const iconSize = 20;

        for (let i = 0; i < 3; i++) {
            const has = qm.fragments[i];
            const img = has ? Assets.get(keys[i]) : Assets.get('DIAMANT_VIDE');

            if (img) {
                ctx.drawImage(img, x, y - iconSize / 2, iconSize, iconSize);
            }

            x += iconSize + 12;
        }

        return x;
    }

    drawRelic(ctx, x, y) {
        const qm = window.game.questManager;
        if (!qm || !qm.maldrekDefeated) return x;

        const rImg = Assets.get('RELIQUE');
        if (rImg) {
            const frameW = 32;
            const frameH = 34;
            const frameIdx = Math.floor(Date.now() / 80) % 16;
            const sx = frameIdx * (frameW + 1);

            const dw = 20;
            const dh = 20;

            ctx.save();
            ctx.shadowColor = '#ffdd44';
            ctx.shadowBlur = 10;
            ctx.drawImage(rImg, sx, 0, frameW, frameH, x + 5, y - dh / 2 - 2, dw, dh);
            ctx.restore();

            x += dw + 15;
        }

        return x;
    }

    drawPotions(ctx, player, x, y) {
        if (player.potions <= 0) return x;

        const potionImg = Assets.get("POTION");
        if (potionImg) {
            ctx.drawImage(potionImg, x, y - 12, 24, 24);
        }

        ctx.fillStyle = "#fff";
        ctx.font = "bold 14px monospace";
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";
        ctx.fillText(`x${player.potions}`, x + 28, y + 2);

        return x + 56;
    }

    drawEquipment(ctx, player, x, y) {
        if (player.swordLevel > 0) {
            const epeeImg = Assets.get("EPEE_FER");
            if (epeeImg) ctx.drawImage(epeeImg, x, y - 10, 20, 20);
            x += 26;
        }

        if (player.bowLevel > 0) {
            const arcImg = Assets.get("ARC_LONG");
            if (arcImg) ctx.drawImage(arcImg, x, y - 10, 20, 20);
            x += 26;
        }

        if (player.hasShield) {
            const bouclierImg = Assets.get("BOUCLIER");
            if (bouclierImg) ctx.drawImage(bouclierImg, x, y - 10, 20, 20);
            x += 26;
        }

        return x;
    }

    drawZoneName(ctx, y) {
        const zm = window.game.zoneManager;
        if (!zm || !zm.currentZoneData) return;

        ctx.fillStyle = "#aaa";
        ctx.font = "14px monospace";
        ctx.textBaseline = "middle";
        ctx.textAlign = "right";
        ctx.fillText(zm.currentZoneData.name, 780, y);
        ctx.textAlign = "left";
    }
}
