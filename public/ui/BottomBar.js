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
        this.drawStamina(ctx, player, 20, this.y + 22);
        this.drawEmeralds(ctx, player, 140, this.y + 22);
        this.drawArrows(ctx, player, 250, this.y + 22);

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
        const emeraldImg = Assets.get("EMERALD");
        if (emeraldImg) {
            ctx.drawImage(emeraldImg, x, y - 12, 20, 20);
        }
        ctx.fillStyle = "#fff";
        ctx.font = "bold 16px monospace";
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";
        ctx.fillText(`x${player.emeralds || 0}`, x + 24, y);
    }

    drawArrows(ctx, player, x, y) {
        const arrowImg = Assets.get("ARROW");
        if (arrowImg) {
            ctx.drawImage(arrowImg, x, y - 12, 20, 20);
        }
        const count = player.arrows || 0;
        ctx.fillStyle = count > 0 ? "#fff" : "#666";
        ctx.font = "bold 16px monospace";
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";
        ctx.fillText(`x${count}`, x + 24, y);
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

        // Dessin procedural d'une potion
        ctx.fillStyle = '#ff4466';
        ctx.fillRect(x + 3, y - 3, 8, 10);
        ctx.fillStyle = '#aaa';
        ctx.fillRect(x + 4, y - 6, 6, 4);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 3, y - 3, 8, 10);

        ctx.fillStyle = "#fff";
        ctx.font = "bold 12px monospace";
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";
        ctx.fillText(`x${player.potions}`, x + 16, y + 2);

        return x + 40;
    }

    drawEquipment(ctx, player, x, y) {
        ctx.font = "10px monospace";
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";

        // Epee
        if (player.swordLevel > 0) {
            ctx.fillStyle = '#ccc';
            ctx.fillText('EP+', x, y + 2);
            x += 30;
        }

        // Arc
        if (player.bowLevel > 0) {
            ctx.fillStyle = '#ccc';
            ctx.fillText('ARC+', x, y + 2);
            x += 35;
        }

        // Bouclier
        if (player.hasShield) {
            ctx.fillStyle = '#4488ff';
            ctx.fillText('BOU', x, y + 2);
            x += 30;
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
