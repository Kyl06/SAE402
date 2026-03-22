/**
 * @file BottomBar.js
 */

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
        this.heartsUI.draw(ctx, player.hp, 20, this.y + 8);
        this.drawStamina(ctx, player, 140, this.y + 18);
        this.drawEmeralds(ctx, player, 280, this.y + 24);
        this.drawArrows(ctx, player, 420, this.y + 24);

        // --- Ligne du bas : inventaire ---
        const invY = this.y + 58;
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
        this.drawZoneName(ctx, this.y + 24);
    }

    drawStamina(ctx, player, x, y) {
        const barW = 120;
        const barH = 8;
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
        const iconSize = 22;
        const emeraldImg = Assets.get("EMERALD");
        if (emeraldImg) {
            ctx.drawImage(emeraldImg, x, y - iconSize / 2, iconSize, iconSize);
        }
        ctx.fillStyle = "#fff";
        ctx.font = "bold 18px monospace";
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";
        ctx.fillText(`x${player.emeralds || 0}`, x + iconSize + 6, y);
    }

    drawArrows(ctx, player, x, y) {
        const iconSize = 22;
        const arrowImg = Assets.get("ARROW");
        if (arrowImg) {
            // Derniere frame 16x16 de arrow.png (4eme ligne)
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
        // Epee
        if (player.swordLevel > 0) {
            const epeeImg = Assets.get("EPEE_FER");
            if (epeeImg) ctx.drawImage(epeeImg, x, y - 10, 20, 20);
            x += 26;
        }

        // Arc
        if (player.bowLevel > 0) {
            const arcImg = Assets.get("ARC_LONG");
            if (arcImg) ctx.drawImage(arcImg, x, y - 10, 20, 20);
            x += 26;
        }

        // Bouclier
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
