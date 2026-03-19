/**
 * @file IntroCutscene.js
 * @description Cinematique d'introduction : Maldrek vole la Relique Sacree du village.
 */

import { Entity } from '../engine/Entity.js';
import { SCALE } from '../constants.js';

export class IntroCutscene extends Entity {
    constructor(onComplete) {
        super(0, 0, 800, 660);
        this.z = 997; // Au-dessus du jeu, sous la DialogueBox
        this.collider = false;
        this.onComplete = onComplete;

        this.time = 0;
        this.phase = 0; // 0=fade in, 1=calme, 2=maldrek arrive, 3=vol, 4=fuite, 5=dialogue, 6=fade out
        this.phaseTimer = 0;
        this.done = false;

        // Positions
        this.relicX = 400;
        this.relicY = 240;
        this.relicAlpha = 1;
        this.relicScale = 1;

        this.maldrekX = 400;
        this.maldrekY = -60;
        this.maldrekAlpha = 0;
        this.hasRelic = false;

        // Villageois (positions autour de la relique)
        this.villagers = [
            { x: 320, y: 280, color: '#6633aa' },
            { x: 480, y: 280, color: '#2266aa' },
            { x: 350, y: 310, color: '#aa6633' },
            { x: 450, y: 310, color: '#33aa66' },
            { x: 300, y: 260, color: '#aa3366' },
            { x: 500, y: 260, color: '#3366aa' },
        ];
        this.villagersScatter = false;
        this.scatterTime = 0;

        // Overlay
        this.fadeAlpha = 1;

        // Textes
        this.subtitleText = '';
        this.subtitleAlpha = 0;

        // Flash d'eclat
        this.flashAlpha = 0;

        // Ecouteur pour passer la cinematique
        this._skipHandler = (e) => {
            if (e.code === 'Escape' || e.code === 'Space' || e.code === 'Enter') {
                this.skip();
            }
        };
        window.addEventListener('keydown', this._skipHandler);
    }

    skip() {
        if (this.done) return;
        this.done = true;
        window.removeEventListener('keydown', this._skipHandler);
        this.kill();
        if (this.onComplete) this.onComplete();
    }

    update(delta) {
        if (this.done) return;
        this.time += delta;
        this.phaseTimer += delta;

        switch (this.phase) {
            case 0: // Fade in sur la scene
                this.fadeAlpha = Math.max(0, 1 - this.phaseTimer / 1000);
                this.subtitleText = 'Village Koumbou - Avant l\'attaque...';
                this.subtitleAlpha = Math.min(1, this.phaseTimer / 1000);
                if (this.phaseTimer > 2000) this.nextPhase();
                break;

            case 1: // Scene calme, villageois autour de la relique
                this.subtitleText = 'La Relique Sacree protege le village depuis des siecles.';
                this.subtitleAlpha = Math.min(1, this.phaseTimer / 500);
                this.relicScale = 1 + Math.sin(this.time * 0.003) * 0.1;
                if (this.phaseTimer > 3000) this.nextPhase();
                break;

            case 2: // Maldrek apparait (teleportation)
                this.subtitleText = '';
                this.maldrekAlpha = Math.min(1, this.phaseTimer / 800);
                this.maldrekX = 400;
                this.maldrekY = 160;
                // Tremblement
                if (this.phaseTimer > 400) {
                    window.game.engine.shake(3, 100);
                }
                if (this.phaseTimer > 1500) {
                    this.subtitleText = '???  -  La relique m\'appartient desormais !';
                    this.subtitleAlpha = 1;
                }
                if (this.phaseTimer > 3500) this.nextPhase();
                break;

            case 3: // Vol de la relique - flash + relique disparait
                if (this.phaseTimer < 300) {
                    this.flashAlpha = 1 - this.phaseTimer / 300;
                    window.game.engine.shake(6, 200);
                } else {
                    this.flashAlpha = 0;
                }
                // Maldrek avance vers la relique
                if (!this.hasRelic && this.phaseTimer > 100) {
                    this.hasRelic = true;
                    this.villagersScatter = true;
                    this.scatterTime = 0;
                }
                this.relicAlpha = Math.max(0, 1 - this.phaseTimer / 200);
                this.subtitleText = 'Maldrek  -  Personne ne peut m\'arreter ! Ha ha ha !';
                this.subtitleAlpha = 1;
                if (this.villagersScatter) {
                    this.scatterTime += delta;
                }
                if (this.phaseTimer > 3000) this.nextPhase();
                break;

            case 4: // Maldrek s'enfuit vers le nord
                this.subtitleText = '';
                this.maldrekY -= delta * 0.12;
                if (this.maldrekY < -80) {
                    this.maldrekAlpha = Math.max(0, this.maldrekAlpha - delta * 0.003);
                }
                if (this.phaseTimer > 2000) this.nextPhase();
                break;

            case 5: // Message final
                this.subtitleText = 'Le village a besoin d\'un heros...';
                this.subtitleAlpha = Math.min(1, this.phaseTimer / 500);
                if (this.phaseTimer > 2500) this.nextPhase();
                break;

            case 6: // Fade out
                this.fadeAlpha = Math.min(1, this.phaseTimer / 800);
                this.subtitleAlpha = Math.max(0, 1 - this.phaseTimer / 400);
                if (this.phaseTimer > 1000) {
                    this.skip();
                }
                break;
        }
    }

    nextPhase() {
        this.phase++;
        this.phaseTimer = 0;
    }

    draw(ctx) {
        if (this.done) return;

        // Le vrai village est deja dessine en dessous (map chargee)

        // Piedestal de la relique (cercle de pierres)
        ctx.strokeStyle = '#554433';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.relicX, this.relicY + 10, 30, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#3a3025';
        ctx.beginPath();
        ctx.arc(this.relicX, this.relicY + 10, 28, 0, Math.PI * 2);
        ctx.fill();

        // Relique sacree (cristal lumineux)
        if (this.relicAlpha > 0) {
            ctx.save();
            ctx.globalAlpha = this.relicAlpha;

            // Halo
            const haloSize = 20 * this.relicScale;
            const gradient = ctx.createRadialGradient(
                this.relicX, this.relicY, 0,
                this.relicX, this.relicY, haloSize
            );
            gradient.addColorStop(0, 'rgba(255, 220, 100, 0.6)');
            gradient.addColorStop(1, 'rgba(255, 220, 100, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(this.relicX - haloSize, this.relicY - haloSize, haloSize * 2, haloSize * 2);

            // Cristal (losange)
            const s = 10 * this.relicScale;
            ctx.fillStyle = '#ffdd44';
            ctx.beginPath();
            ctx.moveTo(this.relicX, this.relicY - s);
            ctx.lineTo(this.relicX + s * 0.6, this.relicY);
            ctx.lineTo(this.relicX, this.relicY + s);
            ctx.lineTo(this.relicX - s * 0.6, this.relicY);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#fff8cc';
            ctx.beginPath();
            ctx.moveTo(this.relicX, this.relicY - s * 0.5);
            ctx.lineTo(this.relicX + s * 0.3, this.relicY);
            ctx.lineTo(this.relicX, this.relicY + s * 0.5);
            ctx.lineTo(this.relicX - s * 0.3, this.relicY);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        }

        // Villageois
        this.villagers.forEach((v, i) => {
            let vx = v.x;
            let vy = v.y;
            if (this.villagersScatter) {
                const angle = (i / this.villagers.length) * Math.PI * 2 + 0.5;
                const dist = Math.min(this.scatterTime * 0.08, 80);
                vx += Math.cos(angle) * dist;
                vy += Math.sin(angle) * dist;
            }
            this.drawVillager(ctx, vx, vy, v.color);
        });

        // Maldrek
        if (this.maldrekAlpha > 0) {
            ctx.save();
            ctx.globalAlpha = this.maldrekAlpha;
            this.drawMaldrek(ctx, this.maldrekX, this.maldrekY);

            // Relique flottante au-dessus de Maldrek apres le vol
            if (this.hasRelic && this.relicAlpha <= 0) {
                const bobY = Math.sin(this.time * 0.005) * 3;
                const rx = this.maldrekX;
                const ry = this.maldrekY - 20 + bobY;
                ctx.fillStyle = '#ffdd44';
                ctx.beginPath();
                ctx.moveTo(rx, ry - 6);
                ctx.lineTo(rx + 4, ry);
                ctx.lineTo(rx, ry + 6);
                ctx.lineTo(rx - 4, ry);
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
        }

        // Flash
        if (this.flashAlpha > 0) {
            ctx.fillStyle = `rgba(255, 255, 200, ${this.flashAlpha})`;
            ctx.fillRect(0, 0, 800, 660);
        }

        // Bande noire cinematique (haut et bas, au-dessus de la BottomBar)
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, 800, 40);
        ctx.fillRect(0, 520, 800, 80);

        // Sous-titre (dans la bande du bas)
        if (this.subtitleText && this.subtitleAlpha > 0) {
            ctx.save();
            ctx.globalAlpha = this.subtitleAlpha;
            ctx.font = '11px "Press Start 2P", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Fond du sous-titre
            const tw = ctx.measureText(this.subtitleText).width;
            ctx.fillStyle = 'rgba(0,0,0,0.85)';
            ctx.fillRect(400 - tw / 2 - 16, 538, tw + 32, 28);

            ctx.fillStyle = '#ffffff';
            ctx.fillText(this.subtitleText, 400, 552);
            ctx.restore();
        }

        // Indication skip
        const skipAlpha = 0.4 + Math.sin(this.time * 0.003) * 0.2;
        ctx.save();
        ctx.globalAlpha = skipAlpha;
        ctx.font = '9px "Press Start 2P", monospace';
        ctx.textAlign = 'right';
        ctx.fillStyle = '#888';
        ctx.fillText('Echap pour passer', 790, 30);
        ctx.restore();

        // Fade overlay
        if (this.fadeAlpha > 0) {
            ctx.fillStyle = `rgba(0, 0, 0, ${this.fadeAlpha})`;
            ctx.fillRect(0, 0, 800, 660);
        }
    }

    drawVillager(ctx, x, y, color) {
        const s = SCALE;
        // Corps
        ctx.fillStyle = color;
        ctx.fillRect(x - 6 * s, y, 12 * s, 10 * s);
        // Tete
        ctx.fillStyle = '#e8c090';
        ctx.fillRect(x - 4 * s, y - 6 * s, 8 * s, 7 * s);
        // Yeux
        ctx.fillStyle = '#000';
        ctx.fillRect(x - 3 * s, y - 3 * s, 2 * s, 2 * s);
        ctx.fillRect(x + 1 * s, y - 3 * s, 2 * s, 2 * s);
    }

    drawMaldrek(ctx, x, y) {
        const s = SCALE;
        // Particules de teleportation
        if (this.phase === 2) {
            for (let i = 0; i < 5; i++) {
                const px = x + (Math.random() - 0.5) * 40;
                const py = y + (Math.random() - 0.5) * 40;
                ctx.fillStyle = `rgba(170, 68, 255, ${0.3 + Math.random() * 0.4})`;
                ctx.fillRect(px, py, 3, 3);
            }
        }

        // Cape / robe
        ctx.fillStyle = '#3a0a5a';
        ctx.fillRect(x - 8 * s, y + 5 * s, 16 * s, 16 * s);
        // Epaules
        ctx.fillStyle = '#2a0a3a';
        ctx.fillRect(x - 10 * s, y + 5 * s, 5 * s, 7 * s);
        ctx.fillRect(x + 5 * s, y + 5 * s, 5 * s, 7 * s);
        // Tete (capuche)
        ctx.fillStyle = '#2a1a3a';
        ctx.fillRect(x - 6 * s, y - 3 * s, 12 * s, 10 * s);
        // Visage
        ctx.fillStyle = '#1a0a2a';
        ctx.fillRect(x - 5 * s, y, 10 * s, 5 * s);
        // Yeux rouges
        ctx.fillStyle = '#ff4400';
        const pulse = Math.sin(this.time * 0.008) * 0.5 + 1.5;
        ctx.fillRect(x - 4 * s, y + 1 * s, pulse * s, 2 * s);
        ctx.fillRect(x + 2 * s, y + 1 * s, pulse * s, 2 * s);
        // Baton
        ctx.fillStyle = '#6a4a2a';
        ctx.fillRect(x - 12 * s, y - 1 * s, 2 * s, 16 * s);
        // Orbe
        ctx.fillStyle = '#aa44ff';
        ctx.beginPath();
        ctx.arc(x - 11 * s, y - 3 * s, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}
