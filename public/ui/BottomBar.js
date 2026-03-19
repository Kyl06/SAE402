/**
 * @file BottomBar.js
 */

import { Entity } from '../engine/Entity.js';
import { Hearts } from './Hearts.js';
import { Assets } from '../engine/Assets.js';

export class BottomBar extends Entity {
    constructor() {
        super(0, 600, 800, 60);
        this.collider = false;
        this.z = 999;
        this.heartsUI = new Hearts();
    }

    draw(ctx) {
        // 1. Fond noir opaque
        ctx.fillStyle = "#000";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // 2. Bordure blanche rétro
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 4;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        const player = window.game.player;
        if (!player) return;

        // --- Ligne du haut : coeurs + stamina + emeraudes + fleches ---
        this.heartsUI.draw(ctx, player.hp, 20, this.y + 6);
        this.drawStamina(ctx, player, 130, this.y + 12);
        this.drawEmeralds(ctx, player, 260, this.y + 18);
        this.drawArrows(ctx, player, 380, this.y + 18);

        // --- Ligne du bas : inventaire ---
        const invY = this.y + 42;
        let cursorX = 20;

        // Fragments de cristal
        cursorX = this.drawFragments(ctx, cursorX, invY);

        // Separateur
        cursorX += 15;

        // Potions
        cursorX = this.drawPotions(ctx, player, cursorX, invY);

        // Equipement
        cursorX += 15;
        cursorX = this.drawEquipment(ctx, player, cursorX, invY);

        // Zone courante (affichee a droite)
        this.drawZoneName(ctx, this.y + 22);
    }

    drawStamina(ctx, player, x, y) {
        const barW = 100;
        const barH = 6;
        const ratio = player.stamina / player.maxStamina;

        // Fond
        ctx.fillStyle = '#333';
        ctx.fillRect(x, y, barW, barH);

        // Barre
        ctx.fillStyle = player.staminaDepleted ? '#ff4444' : (ratio < 0.3 ? '#ffaa00' : '#44cc44');
        ctx.fillRect(x, y, barW * ratio, barH);

        // Bordure
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, barW, barH);
    }

    drawEmeralds(ctx, player, x, y) {
        const iconSize = 18;
        const emeraldImg = Assets.get("EMERALD");
        if (emeraldImg) {
            ctx.drawImage(emeraldImg, x, y - iconSize / 2, iconSize, iconSize);
        }
        ctx.fillStyle = "#fff";
        ctx.font = "bold 16px monospace";
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";
        const emText = player.emeralds === Infinity ? 'INF' : `x${player.emeralds || 0}`;
        ctx.fillText(emText, x + iconSize + 4, y);
    }

    drawArrows(ctx, player, x, y) {
        const iconSize = 18;
        const arrowImg = Assets.get("ARROW");
        if (arrowImg) {
            // Derniere case 16x16 de arrow.png (16x64 => 4 cases, derniere a sy=48)
            ctx.drawImage(arrowImg, 0, 48, 16, 16, x, y - iconSize / 2, iconSize, iconSize);
        }
        const count = player.arrows || 0;
        ctx.fillStyle = count > 0 ? "#fff" : "#666";
        ctx.font = "bold 16px monospace";
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";
        ctx.fillText(`x${count}`, x + iconSize + 4, y);
    }

    drawFragments(ctx, x, y) {
        const qm = window.game.questManager;
        if (!qm) return x;

        ctx.font = "bold 12px monospace";
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";

        for (let i = 0; i < 3; i++) {
            const has = qm.fragments[i];
            // Losange de cristal
            const cx = x + 8;
            const cy = y;

            ctx.beginPath();
            ctx.moveTo(cx, cy - 7);
            ctx.lineTo(cx + 6, cy);
            ctx.lineTo(cx, cy + 7);
            ctx.lineTo(cx - 6, cy);
            ctx.closePath();

            if (has) {
                const colors = ['#ff4444', '#44ff44', '#4488ff'];
                ctx.fillStyle = colors[i];
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                ctx.stroke();
            } else {
                ctx.fillStyle = '#333';
                ctx.fill();
                ctx.strokeStyle = '#555';
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            x += 18;
        }

        return x;
    }

    drawPotions(ctx, player, x, y) {
        if (player.potions <= 0) return x;

        const potionImg = Assets.get("POTION");
        if (potionImg) {
            ctx.drawImage(potionImg, x, y - 10, 20, 20);
        }

        ctx.fillStyle = "#fff";
        ctx.font = "bold 12px monospace";
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";
        ctx.fillText(`x${player.potions}`, x + 24, y + 2);

        return x + 48;
    }

    drawEquipment(ctx, player, x, y) {
        ctx.font = "10px monospace";
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";

        // Epee
        if (player.swordLevel > 0) {
            const epeeImg = Assets.get("EPEE_FER");
            if (epeeImg) {
                ctx.drawImage(epeeImg, x, y - 8, 16, 16);
            }
            x += 22;
        }

        // Arc
        if (player.bowLevel > 0) {
            const arcImg = Assets.get("ARC_LONG");
            if (arcImg) {
                ctx.drawImage(arcImg, x, y - 8, 16, 16);
            }
            x += 22;
        }

        // Bouclier
        if (player.hasShield) {
            const bouclierImg = Assets.get("BOUCLIER");
            if (bouclierImg) {
                ctx.drawImage(bouclierImg, x, y - 8, 16, 16);
            }
            x += 22;
        }

        return x;
    }

    drawZoneName(ctx, y) {
        const zm = window.game.zoneManager;
        if (!zm || !zm.currentZoneData) return;

        ctx.fillStyle = "#aaa";
        ctx.font = "12px monospace";
        ctx.textBaseline = "middle";
        ctx.textAlign = "right";
        ctx.fillText(zm.currentZoneData.name, 780, y);
        ctx.textAlign = "left";
    }
}
