/**
 * @file MagicBarrier.js
 * @description Barriere magique bloquant l'acces a la forteresse nord.
 * Disparait quand les 3 fragments de cristal sont reunis.
 */

import { Entity } from '../../engine/Entity.js';

export class MagicBarrier extends Entity {
    constructor() {
        // Barre horizontale en haut de la map (passage nord)
        super(256, 16, 288, 32);
        this.collider = true;
        this.addTag('SOLID');
        this.z = 15;
        this.time = 0;
        this.dissolved = false;
    }

    update(delta) {
        this.time += delta * 0.001;

        const qm = window.game.questManager;
        if (qm && qm.allFragmentsCollected() && !this.dissolved) {
            this.dissolved = true;
            this.collider = false;
            this.removeTag('SOLID');
            // Disparition apres animation
            setTimeout(() => this.kill(), 1500);
        }
    }

    onCollision(other) {
        if (!this.collider || !other.collider || other.hasTag('ITEM')) return;

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

    draw(ctx) {
        if (this.dissolved) {
            // Animation de dissolution
            ctx.globalAlpha = Math.max(0, 1 - (this.time % 2));
        }

        // Effet de barriere energetique
        const shimmer = Math.sin(this.time * 3) * 0.2 + 0.8;

        // Fond translucide violet
        ctx.fillStyle = `rgba(120, 40, 200, ${0.3 * shimmer})`;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Lignes verticales energetiques
        for (let i = 0; i < 9; i++) {
            const lx = this.x + i * 32 + 16;
            const waveY = Math.sin(this.time * 4 + i) * 4;

            ctx.strokeStyle = `rgba(180, 100, 255, ${0.6 * shimmer})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(lx, this.y + waveY);
            ctx.lineTo(lx, this.y + this.height + waveY);
            ctx.stroke();
        }

        // Particules scintillantes
        for (let i = 0; i < 5; i++) {
            const px = this.x + ((this.time * 50 + i * 60) % this.width);
            const py = this.y + Math.sin(this.time * 2 + i * 1.5) * 12 + 16;
            const size = 2 + Math.sin(this.time * 5 + i) * 1;

            ctx.fillStyle = `rgba(255, 200, 255, ${0.7 * shimmer})`;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
        }

        if (this.dissolved) {
            ctx.globalAlpha = 1;
        }
    }
}
