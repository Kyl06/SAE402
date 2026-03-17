/**
 * @file Maldrek.js
 * @description Boss final. Humanoide sorcier, plus grand que les ennemis normaux.
 * Patterns : charge epee + projectiles magiques. 3 phases (accelere en perdant de la vie).
 */

import { Entity } from '../../engine/Entity.js';
import { Explosion } from '../Effects/Explosion.js';
import { Emerald } from '../Items/Emerald.js';
import { SCALE } from '../../constants.js';

class MagicProjectile extends Entity {
    constructor(x, y, dirX, dirY, speed) {
        super(x, y, 12, 12);
        this.velX = dirX * speed;
        this.velY = dirY * speed;
        this.addTag('ENEMY');
        this.collider = true;
        this.z = 12;
        this.lifeTime = 3000;
        this.time = 0;
    }

    update(delta) {
        this.time += delta;
        this.lifeTime -= delta;
        if (this.lifeTime <= 0) this.kill();
        super.update(delta);
    }

    onCollision(other) {
        if (other.hasTag('PLAYER') && !other.isDead) {
            other.takeDamage?.(1);
            this.kill();
        }
        if (other.hasTag('SOLID') && !other.hasTag('ENEMY')) {
            this.kill();
        }
    }

    draw(ctx) {
        const pulse = Math.sin(this.time * 0.01) * 3 + 8;
        // Boule magique violette
        ctx.fillStyle = '#aa44ff';
        ctx.beginPath();
        ctx.arc(this.x + 6, this.y + 6, pulse, 0, Math.PI * 2);
        ctx.fill();
        // Coeur lumineux
        ctx.fillStyle = '#ff88ff';
        ctx.beginPath();
        ctx.arc(this.x + 6, this.y + 6, pulse * 0.5, 0, Math.PI * 2);
        ctx.fill();
    }
}

export class Maldrek extends Entity {
    constructor(x, y) {
        super(x, y, 48, 48);

        this.netId = 'maldrek_' + Math.random().toString(36).slice(2, 11);
        this.enemyType = 'MALDREK';

        this.hp = 30;
        this.maxHp = 30;
        this.speed = 35;
        this.chaseSpeed = 60;
        this.chargeSpeed = 200;
        this.addTag('ENEMY');
        this.addTag('BOSS');

        this.state = 'IDLE';   // IDLE, CHASE, CHARGE_WINDUP, CHARGE, STUNNED, CAST, TELEPORT
        this.stateTimer = 2000;
        this.facing = 'DOWN';
        this.target = null;
        this.painState = null;

        // Phase (1, 2, 3)
        this.phase = 1;

        // Charge
        this.chargeDir = { x: 0, y: 0 };
        this.chargeDuration = 0;
        this.chargeCooldown = 0;

        // Projectiles
        this.castCooldown = 0;

        // Animation
        this.animTime = 0;
        this.flashTime = 0;
        this.z = 10;
        this.collider = true;
    }

    update(delta) {
        this.animTime += delta;
        if (this.flashTime > 0) this.flashTime -= delta;
        if (this.chargeCooldown > 0) this.chargeCooldown -= delta;
        if (this.castCooldown > 0) this.castCooldown -= delta;

        // Mise a jour de la phase
        const hpRatio = this.hp / this.maxHp;
        if (hpRatio <= 0.3) this.phase = 3;
        else if (hpRatio <= 0.6) this.phase = 2;

        if (this.painState) {
            this.handlePain(delta);
        } else {
            this.think(delta);
            this.act(delta);
        }
        super.update(delta);
    }

    think() {
        const players = window.game.engine.entities.filter(e => e.hasTag('PLAYER') && !e.isDead);
        let closest = null;
        let minDist = 400;

        players.forEach(p => {
            const d = Math.hypot(p.x - this.x, p.y - this.y);
            if (d < minDist) {
                minDist = d;
                closest = p;
            }
        });
        this.target = closest;
    }

    act(delta) {
        const phaseSpeedMult = 1 + (this.phase - 1) * 0.3;

        switch (this.state) {
            case 'IDLE':
                this.velX = 0;
                this.velY = 0;
                this.stateTimer -= delta;
                if (this.target) {
                    this.state = 'CHASE';
                } else if (this.stateTimer <= 0) {
                    this.stateTimer = 2000;
                }
                break;

            case 'CHASE': {
                if (!this.target) {
                    this.state = 'IDLE';
                    this.velX = 0;
                    this.velY = 0;
                    return;
                }
                this.chase(phaseSpeedMult);

                const dist = Math.hypot(this.target.x - this.x, this.target.y - this.y);

                // Tenter une charge
                if (dist < 150 && this.chargeCooldown <= 0) {
                    this.startCharge();
                    return;
                }

                // Lancer des projectiles
                if (dist > 80 && this.castCooldown <= 0) {
                    this.startCast();
                    return;
                }
                break;
            }

            case 'CHARGE_WINDUP':
                this.velX = 0;
                this.velY = 0;
                this.stateTimer -= delta;
                if (this.stateTimer <= 0) {
                    this.state = 'CHARGE';
                    this.chargeDuration = 500;
                    this.velX = this.chargeDir.x * this.chargeSpeed * phaseSpeedMult;
                    this.velY = this.chargeDir.y * this.chargeSpeed * phaseSpeedMult;
                }
                break;

            case 'CHARGE':
                this.chargeDuration -= delta;
                if (this.chargeDuration <= 0) {
                    this.state = 'STUNNED';
                    this.stateTimer = Math.max(400, 800 - this.phase * 150);
                    this.velX = 0;
                    this.velY = 0;
                    this.chargeCooldown = Math.max(1500, 3000 - this.phase * 500);
                }
                break;

            case 'STUNNED':
                this.velX = 0;
                this.velY = 0;
                this.stateTimer -= delta;
                if (this.stateTimer <= 0) {
                    this.state = 'CHASE';
                }
                break;

            case 'CAST':
                this.velX = 0;
                this.velY = 0;
                this.stateTimer -= delta;
                if (this.stateTimer <= 0) {
                    this.fireProjectiles();
                    this.state = 'CHASE';
                    this.castCooldown = Math.max(1500, 3500 - this.phase * 600);
                }
                break;
        }
    }

    chase(speedMult) {
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const speed = this.chaseSpeed * speedMult;
        if (Math.abs(dx) > Math.abs(dy)) {
            this.velX = dx > 0 ? speed : -speed;
            this.velY = 0;
            this.facing = dx > 0 ? 'RIGHT' : 'LEFT';
        } else {
            this.velX = 0;
            this.velY = dy > 0 ? speed : -speed;
            this.facing = dy > 0 ? 'DOWN' : 'UP';
        }
    }

    startCharge() {
        if (!this.target) return;
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const dist = Math.hypot(dx, dy) || 1;
        this.chargeDir = { x: dx / dist, y: dy / dist };
        this.facing = Math.abs(dx) > Math.abs(dy)
            ? (dx > 0 ? 'RIGHT' : 'LEFT')
            : (dy > 0 ? 'DOWN' : 'UP');
        this.state = 'CHARGE_WINDUP';
        this.stateTimer = Math.max(300, 600 - this.phase * 100);
    }

    startCast() {
        this.state = 'CAST';
        this.stateTimer = 500;
    }

    fireProjectiles() {
        const cx = this.x + this.width / 2;
        const cy = this.y + this.height / 2;
        const count = this.phase + 2; // 3 en phase 1, 4 en phase 2, 5 en phase 3
        const speed = 120 + this.phase * 30;

        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i / count) + this.animTime * 0.001;
            const dx = Math.cos(angle);
            const dy = Math.sin(angle);
            window.game.engine.add(new MagicProjectile(cx, cy, dx, dy, speed));
        }
    }

    takeDamage(direction) {
        if (this.painState || this.toRemove) return;
        this.hp--;
        this.flashTime = 150;
        window.game.engine.shake(5, 120);

        if (this.hp <= 0) {
            this.die();
            return;
        }

        const force = 100;
        this.painState = {
            msLeft: 100,
            velX: direction === 'LEFT' ? -force : (direction === 'RIGHT' ? force : 0),
            velY: direction === 'UP' ? -force : (direction === 'DOWN' ? force : 0)
        };
    }

    handlePain(delta) {
        this.x += this.painState.velX * (delta / 1000);
        this.y += this.painState.velY * (delta / 1000);
        this.painState.msLeft -= delta;
        if (this.painState.msLeft <= 0) this.painState = null;
    }

    onCollision(other) {
        if (other.hasTag('PLAYER') && !other.isDead) {
            const dmg = this.state === 'CHARGE' ? 3 : 2;
            other.takeDamage?.(dmg);
        }
    }

    die() {
        if (this.toRemove) return;
        this.toRemove = true;

        // Explosions multiples
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const ox = this.x + (Math.random() - 0.5) * 60;
                const oy = this.y + (Math.random() - 0.5) * 60;
                window.game.engine.add(new Explosion(ox, oy));
            }, i * 200);
        }

        // Loot
        if (window.game.network?.isHost || !window.game.network) {
            for (let i = 0; i < 10; i++) {
                const em = new Emerald(this.x + (i - 5) * 12, this.y + 30);
                em.netId = 'it_' + Math.random().toString(36).slice(2, 7);
                window.game.engine.add(em);
            }
        }

        // Victoire !
        window.game.engine.shake(15, 500);
        setTimeout(() => {
            const db = window.game.dialogueBox;
            if (db) {
                db.show('Victoire !', [
                    "Maldrek a ete vaincu !",
                    "La Relique Sacree est liberee !",
                    "Le village est sauve. Felicitations, heros !"
                ], null);
            }
        }, 1500);
    }

    draw(ctx) {
        if (this.flashTime > 0 && Math.floor(this.flashTime / 50) % 2 === 0) return;

        const s = SCALE;
        const px = this.x;
        const py = this.y;
        const isCharging = this.state === 'CHARGE';
        const isWindup = this.state === 'CHARGE_WINDUP';
        const isStunned = this.state === 'STUNNED';
        const isCasting = this.state === 'CAST';

        // Cape / robe (plus grande que le mini-boss)
        const robeColor = isCharging ? '#ff2222' : (isStunned ? '#444466' : (isCasting ? '#6622aa' : '#3a0a5a'));
        ctx.fillStyle = robeColor;
        ctx.fillRect(px + 4 * s, py + 10 * s, 16 * s, 16 * s);

        // Col / epaules
        ctx.fillStyle = isCasting ? '#8833cc' : '#2a0a3a';
        ctx.fillRect(px + 2 * s, py + 10 * s, 5 * s, 7 * s);
        ctx.fillRect(px + 17 * s, py + 10 * s, 5 * s, 7 * s);

        // Tete (capuche)
        ctx.fillStyle = '#2a1a3a';
        ctx.fillRect(px + 6 * s, py + 2 * s, 12 * s, 10 * s);

        // Visage sombre
        ctx.fillStyle = '#1a0a2a';
        ctx.fillRect(px + 7 * s, py + 5 * s, 10 * s, 5 * s);

        // Yeux (brillent selon la phase)
        const eyeColors = ['#ff4400', '#ff0000', '#ff00ff'];
        ctx.fillStyle = isStunned ? '#666' : eyeColors[this.phase - 1];
        const eyePulse = Math.sin(this.animTime * 0.008) * 0.5 + 1.5;
        ctx.fillRect(px + 8 * s, py + 6 * s, eyePulse * s, 2 * s);
        ctx.fillRect(px + 14 * s, py + 6 * s, eyePulse * s, 2 * s);

        // Bras tenant un baton (cote gauche)
        ctx.fillStyle = '#6a4a2a';
        ctx.fillRect(px + 1 * s, py + 8 * s, 2 * s, 14 * s);
        // Orbe au bout du baton
        if (isCasting) {
            const orbPulse = Math.sin(this.animTime * 0.01) * 3 + 5;
            ctx.fillStyle = '#aa44ff';
            ctx.beginPath();
            ctx.arc(px + 2 * s, py + 6 * s, orbPulse, 0, Math.PI * 2);
            ctx.fill();
        }

        // Indicateur de windup
        if (isWindup) {
            const shake = Math.sin(this.animTime * 0.05) * 3;
            ctx.fillStyle = '#ff4400';
            ctx.fillRect(px + 4 * s + shake, py - 6, 16 * s, 4);
        }

        // Indicateur de phase (nombre d'etoiles)
        if (this.phase > 1) {
            ctx.fillStyle = '#ffcc00';
            ctx.font = 'bold 10px monospace';
            ctx.textAlign = 'center';
            const stars = this.phase === 3 ? '***' : '**';
            ctx.fillText(stars, px + this.width / 2, py - 14);
        }

        // Barre de vie
        const barW = 56;
        const barH = 5;
        const barX = px + (this.width - barW) / 2;
        const barY = py - 8;
        ctx.fillStyle = '#333';
        ctx.fillRect(barX, barY, barW, barH);
        const hpRatio = this.hp / this.maxHp;
        ctx.fillStyle = hpRatio > 0.6 ? '#cc22aa' : (hpRatio > 0.3 ? '#ff4400' : '#ff0000');
        ctx.fillRect(barX, barY, barW * hpRatio, barH);
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, barW, barH);

        // Nom
        ctx.fillStyle = '#ff88cc';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('MALDREK', px + this.width / 2, barY - 4);
        ctx.textAlign = 'left';
    }
}
