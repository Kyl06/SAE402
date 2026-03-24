// Cinematique d'introduction : Maldrek vole la Relique Sacree

import { Entity } from '../engine/Entity.js';
import { SCALE } from '../constants.js';
import { SpriteSheet } from '../engine/SpriteSheet.js';
import { Assets } from '../engine/Assets.js';

export class IntroCutscene extends Entity {
    constructor(onComplete) {
        super(0, 0, 800, 660);
        this.z = 997;
        this.collider = false;
        this.onComplete = onComplete;

        this.time = 0;
        this.phase = 0; // 0=fade in, 1=calme, 2=maldrek arrive, 3=vol, 4=fuite, 5=dialogue, 6=fade out
        this.phaseTimer = 0;
        this.done = false;

        this.relicX = 382;
        this.relicY = 240;
        this.relicAlpha = 1;
        this.relicScale = 1;

        this.maldrekX = 400;
        this.maldrekY = -60;
        this.maldrekAlpha = 0;
        this.hasRelic = false;
        this.maldrekSheet = new SpriteSheet('MALDEK', 3, 4, 32, 36);

        this.villagers = [
            { x: 320, y: 280, sheet: new SpriteSheet('VIEUXNPC', 1, 1, 63, 66), frame: 0, scale: 0.58 },
            { x: 450, y: 270, sheet: new SpriteSheet('PNJ1', 2, 1, 92, 105), frame: 0, scale: 0.4 },
            { x: 350, y: 310, sheet: new SpriteSheet('PNJ2', 2, 1, 92, 105), frame: 0, scale: 0.4 },
            { x: 450, y: 310, sheet: new SpriteSheet('PNJFemme', 2, 1, 92, 105), frame: 0, scale: 0.35 },
            { x: 270, y: 260, sheet: new SpriteSheet('PNJPUIT', 1, 1, 63, 86), frame: 0, scale: 0.5 },
            { x: 500, y: 260, sheet: new SpriteSheet('VENDEUR', 2, 1, 16, 32), frame: 0, scale: 1.8 },
            { x: 210, y: 280, sheet: new SpriteSheet('STEEVE', 1, 1, 63, 86), frame: 0, scale: 0.48 },
        ];

        // Placer les villageois sur des cases marchables
        this.villagers = this.villagers.map(v => {
            const pos = this._snapToWalkable(v.x, v.y);
            return { ...v, x: pos.x, y: pos.y };
        });

        const maldrekPos = this._snapToWalkable(this.maldrekX, 160);
        this.maldrekX = maldrekPos.x;

        this.villagersScatter = false;
        this.scatterTime = 0;

        this.fadeAlpha = 1;

        this.subtitleText = '';
        this.subtitleAlpha = 0;

        this.flashAlpha = 0;

        // Relique animee (16 frames de 32x34, separees de 1px)
        this.relicSheet = null;
        this.relicFrameCount = 16;
        this.relicFrameW = 32;
        this.relicFrameH = 34;
        this.relicFrameGap = 1;

        this._skipHandler = (e) => {
            if (e.code === 'Escape' || e.code === 'Space' || e.code === 'Enter') {
                this.skip();
            }
        };
        window.addEventListener('keydown', this._skipHandler);
    }

    // Cherche la position libre la plus proche en spirale
    _snapToWalkable(x, y, w = 32, h = 32) {
        const isBlocked = (tx, ty) => {
            const entities = window.game?.engine?.entities || [];
            for (const e of entities) {
                if (!e.collider || !e.hasTag('SOLID')) continue;
                const box = e.getCollisionBox();
                if (tx < box.x + box.w && tx + w > box.x && ty < box.y + box.h && ty + h > box.y) return true;
            }
            return false;
        };
        if (!isBlocked(x, y)) return { x, y };
        for (let r = 16; r <= 128; r += 16) {
            const steps = Math.max(4, Math.round((2 * Math.PI * r) / 16));
            for (let s = 0; s < steps; s++) {
                const angle = (s / steps) * Math.PI * 2;
                const tx = Math.round(x + Math.cos(angle) * r);
                const ty = Math.round(y + Math.sin(angle) * r);
                if (!isBlocked(tx, ty)) return { x: tx, y: ty };
            }
        }
        return { x, y };
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
            case 0:
                this.fadeAlpha = Math.max(0, 1 - this.phaseTimer / 1000);
                this.subtitleText = 'Village Koumbou - Avant l\'attaque...';
                this.subtitleAlpha = Math.min(1, this.phaseTimer / 1000);
                if (this.phaseTimer > 2000) this.nextPhase();
                break;

            case 1:
                this.subtitleText = 'La Relique Sacree protege le village depuis des siecles.';
                this.subtitleAlpha = Math.min(1, this.phaseTimer / 500);
                this.relicScale = 1 + Math.sin(this.time * 0.003) * 0.1;
                if (this.phaseTimer > 3000) this.nextPhase();
                break;

            case 2:
                this.subtitleText = '';
                this.maldrekAlpha = Math.min(1, this.phaseTimer / 800);
                this.maldrekX = 382;
                this.maldrekY = 160;
                if (this.phaseTimer > 400) {
                    window.game.engine.shake(3, 100);
                }
                if (this.phaseTimer > 1500) {
                    this.subtitleText = '???  -  La relique m\'appartient desormais !';
                    this.subtitleAlpha = 1;
                }
                if (this.phaseTimer > 3500) this.nextPhase();
                break;

            case 3:
                if (this.phaseTimer < 300) {
                    this.flashAlpha = 1 - this.phaseTimer / 300;
                    window.game.engine.shake(6, 200);
                } else {
                    this.flashAlpha = 0;
                }
                if (!this.hasRelic && this.phaseTimer > 100) {
                    this.hasRelic = true;
                    this.villagersScatter = true;
                    this.scatterTime = 0;

                    // Precalculer des destinations de fuite sur cases walkables
                    this.villagers.forEach((v, i) => {
                        const angle = (i / this.villagers.length) * Math.PI * 2 + 0.5;
                        const targetX = v.x + Math.cos(angle) * 80;
                        const targetY = v.y + Math.sin(angle) * 80;
                        const safe = this._snapToWalkable(targetX, targetY);
                        v.scatterTargetX = safe.x;
                        v.scatterTargetY = safe.y;
                    });
                }
                this.relicAlpha = Math.max(0, 1 - this.phaseTimer / 200);
                this.subtitleText = 'Maldrek  -  Personne ne peut m\'arreter ! Ha ha ha !';
                this.subtitleAlpha = 1;
                if (this.villagersScatter) {
                    this.scatterTime += delta;
                }
                if (this.phaseTimer > 3000) this.nextPhase();
                break;

            case 4:
                this.subtitleText = '';
                this.maldrekY -= delta * 0.12;
                if (this.maldrekY < -80) {
                    this.maldrekAlpha = Math.max(0, this.maldrekAlpha - delta * 0.003);
                }
                if (this.phaseTimer > 2000) this.nextPhase();
                break;

            case 5:
                this.subtitleText = 'Le village a besoin d\'un heros...';
                this.subtitleAlpha = Math.min(1, this.phaseTimer / 500);
                if (this.phaseTimer > 2500) this.nextPhase();
                break;

            case 6:
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

        // Relique sacree (sprite anime)
        if (this.relicAlpha > 0) {
            ctx.save();
            ctx.globalAlpha = this.relicAlpha;

            const haloSize = 20 * this.relicScale;
            const gradient = ctx.createRadialGradient(
                this.relicX, this.relicY, 0,
                this.relicX, this.relicY, haloSize
            );
            gradient.addColorStop(0, 'rgba(255, 220, 100, 0.6)');
            gradient.addColorStop(1, 'rgba(255, 220, 100, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(this.relicX - haloSize, this.relicY - haloSize, haloSize * 2, haloSize * 2);

            const rImg = Assets.get('RELIQUE');
            if (rImg) {
                const frameIdx = Math.floor(this.time / 80) % this.relicFrameCount;
                const sx = frameIdx * (this.relicFrameW + this.relicFrameGap);
                const scale = this.relicScale;
                const dw = this.relicFrameW * scale;
                const dh = this.relicFrameH * scale;
                ctx.drawImage(rImg, sx, 0, this.relicFrameW, this.relicFrameH,
                    this.relicX - dw / 2, this.relicY - dh / 2, dw, dh);
            }

            ctx.restore();
        }

        this.villagers.forEach((v) => {
            let vx = v.x;
            let vy = v.y;
            if (this.villagersScatter && v.scatterTargetX !== undefined) {
                const t = Math.min(this.scatterTime / 1000, 1);
                vx = v.x + (v.scatterTargetX - v.x) * t;
                vy = v.y + (v.scatterTargetY - v.y) * t;
            }
            this.drawVillager(ctx, vx, vy, v);
        });

        if (this.maldrekAlpha > 0) {
            ctx.save();
            ctx.globalAlpha = this.maldrekAlpha;
            this.drawMaldrek(ctx, this.maldrekX, this.maldrekY);

            // Relique flottante au-dessus de Maldrek apres le vol
            if (this.hasRelic && this.relicAlpha <= 0) {
                const bobY = Math.sin(this.time * 0.005) * 3;
                const rx = this.maldrekX;
                const ry = this.maldrekY - 24 + bobY;
                const rImg = Assets.get('RELIQUE');
                if (rImg) {
                    const frameIdx = Math.floor(this.time / 80) % this.relicFrameCount;
                    const sx = frameIdx * (this.relicFrameW + this.relicFrameGap);
                    ctx.drawImage(rImg, sx, 0, this.relicFrameW, this.relicFrameH,
                        rx - this.relicFrameW / 2, ry - this.relicFrameH / 2,
                        this.relicFrameW, this.relicFrameH);
                }
            }
            ctx.restore();
        }

        if (this.flashAlpha > 0) {
            ctx.fillStyle = `rgba(255, 255, 200, ${this.flashAlpha})`;
            ctx.fillRect(0, 0, 800, 660);
        }

        // Bandes noires cinematiques
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, 800, 40);
        ctx.fillRect(0, 520, 800, 80);

        if (this.subtitleText && this.subtitleAlpha > 0) {
            ctx.save();
            ctx.globalAlpha = this.subtitleAlpha;
            ctx.font = '11px "Press Start 2P", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const tw = ctx.measureText(this.subtitleText).width;
            ctx.fillStyle = 'rgba(0,0,0,0.85)';
            ctx.fillRect(400 - tw / 2 - 16, 538, tw + 32, 28);

            ctx.fillStyle = '#ffffff';
            ctx.fillText(this.subtitleText, 400, 552);
            ctx.restore();
        }

        const skipAlpha = 0.4 + Math.sin(this.time * 0.003) * 0.2;
        ctx.save();
        ctx.globalAlpha = skipAlpha;
        ctx.font = '9px "Press Start 2P", monospace';
        ctx.textAlign = 'right';
        ctx.fillStyle = '#888';
        ctx.fillText('Echap pour passer', 790, 30);
        ctx.restore();

        if (this.fadeAlpha > 0) {
            ctx.fillStyle = `rgba(0, 0, 0, ${this.fadeAlpha})`;
            ctx.fillRect(0, 0, 800, 660);
        }
    }

    drawVillager(ctx, x, y, villager) {
        if (villager.sheet) {
            villager.sheet.drawFrame(ctx, villager.frame, x, y, villager.scale);
        }
    }

    drawMaldrek(ctx, x, y) {
        // Particules de teleportation
        if (this.phase === 2) {
            for (let i = 0; i < 5; i++) {
                const px = x + (Math.random() - 0.5) * 40;
                const py = y + (Math.random() - 0.5) * 40;
                ctx.fillStyle = `rgba(170, 68, 255, ${0.3 + Math.random() * 0.4})`;
                ctx.fillRect(px, py, 3, 3);
            }
        }
        // Phase 4 = fuite vers le nord (de dos), sinon de face
        let frame;
        if (this.phase === 4) {
            frame = 3 + (Math.floor(Date.now() / 150) % 2);
        } else {
            frame = 0;
        }
        this.maldrekSheet.drawFrame(ctx, frame, x - 32, y - 36, 2);
    }
}
