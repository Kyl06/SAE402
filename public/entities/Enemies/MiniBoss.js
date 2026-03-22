/**
 * @file MiniBoss.js
 * @description Gardien Ancien des ruines. Mini-boss plus gros et resistant que les Moblins.
 * Dessin procedural (pas de sprite). Patterns : charge + coup rapide.
 */

import { Entity } from '../../engine/Entity.js';
import { Explosion } from '../Effects/Explosion.js';
import { Emerald } from '../Items/Emerald.js';
import { SCALE } from '../../constants.js';

export class MiniBoss extends Entity {
    constructor(x, y) {
        super(x, y, 40, 40);

        this.netId = 'boss_' + Math.random().toString(36).slice(2, 11);
        this.enemyType = 'MINIBOSS';

        this.hp = 12;
        this.maxHp = 12;
        this.speed = 30;
        this.chaseSpeed = 55;
        this.chargeSpeed = 180;
        this.addTag('ENEMY');
        this.addTag('MINIBOSS');

        this.anchor = { x, y };
        this.state = 'IDLE';       // IDLE, WALK, CHASE, CHARGE_WINDUP, CHARGE, STUNNED
        this.stateTimer = 1500;
        this.facing = 'DOWN';
        this.target = null;
        this.painState = null;

        // Charge attack
        this.chargeDir = { x: 0, y: 0 };
        this.chargeDuration = 0;
        this.chargeCooldown = 0;

        // Animation
        this.animTime = 0;
        this.flashTime = 0;
    }

    update(delta) {
        this.animTime += delta;
        if (this.flashTime > 0) this.flashTime -= delta;
        if (this.chargeCooldown > 0) this.chargeCooldown -= delta;

        if (this.painState) {
            this.handlePain(delta);
        } else {
            this.think(delta);
            this.act(delta);
        }
        super.update(delta);
    }

    think(delta) {
        const players = window.game.engine.entities.filter(e => e.hasTag('PLAYER') && !e.isDead);
        let closest = null;
        let minDist = 250;

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
        switch (this.state) {
            case 'IDLE':
            case 'WALK':
                if (this.target) {
                    this.state = 'CHASE';
                    return;
                }
                this.roam(delta);
                break;

            case 'CHASE':
                if (!this.target) {
                    this.state = 'IDLE';
                    this.velX = 0;
                    this.velY = 0;
                    return;
                }
                this.chase();
                // Tenter une charge si assez proche
                const dist = Math.hypot(this.target.x - this.x, this.target.y - this.y);
                if (dist < 120 && this.chargeCooldown <= 0) {
                    this.startCharge();
                }
                break;

            case 'CHARGE_WINDUP':
                this.velX = 0;
                this.velY = 0;
                this.stateTimer -= delta;
                if (this.stateTimer <= 0) {
                    this.state = 'CHARGE';
                    this.chargeDuration = 400;
                    this.velX = this.chargeDir.x * this.chargeSpeed;
                    this.velY = this.chargeDir.y * this.chargeSpeed;
                }
                break;

            case 'CHARGE':
                this.chargeDuration -= delta;
                if (this.chargeDuration <= 0) {
                    this.state = 'STUNNED';
                    this.stateTimer = 800;
                    this.velX = 0;
                    this.velY = 0;
                    this.chargeCooldown = 3000;
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
        this.stateTimer = 600; // Temps de preparation
    }

    isBlocked(dirX, dirY) {
        const step = 14;
        const testX = this.x + dirX * step;
        const testY = this.y + dirY * step;
        const entities = window.game.engine.entities;
        for (let i = 0; i < entities.length; i++) {
            const e = entities[i];
            if (!e.collider || !e.hasTag('SOLID')) continue;
            const box = e.getCollisionBox();
            if (testX < box.x + box.w && testX + this.width > box.x &&
                testY < box.y + box.h && testY + this.height > box.y) {
                return true;
            }
        }
        return false;
    }

    chase() {
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;

        let primX, primY, secX, secY;

        if (Math.abs(dx) > Math.abs(dy)) {
            primX = Math.sign(dx); primY = 0;
            secX = 0; secY = Math.sign(dy) || 1;
        } else {
            primX = 0; primY = Math.sign(dy);
            secX = Math.sign(dx) || 1; secY = 0;
        }

        if (!this.isBlocked(primX, primY)) {
            this.velX = primX * this.chaseSpeed;
            this.velY = primY * this.chaseSpeed;
        } else if (!this.isBlocked(secX, secY)) {
            this.velX = secX * this.chaseSpeed;
            this.velY = secY * this.chaseSpeed;
        } else if (!this.isBlocked(-secX, -secY)) {
            this.velX = -secX * this.chaseSpeed;
            this.velY = -secY * this.chaseSpeed;
        } else {
            this.velX = 0;
            this.velY = 0;
        }

        if (Math.abs(this.velX) > Math.abs(this.velY)) {
            this.facing = this.velX > 0 ? 'RIGHT' : 'LEFT';
        } else if (Math.abs(this.velY) > 0) {
            this.facing = this.velY > 0 ? 'DOWN' : 'UP';
        }
    }

    roam(delta) {
        this.stateTimer -= delta;
        if (this.stateTimer <= 0) {
            this.state = this.state === 'IDLE' ? 'WALK' : 'IDLE';
            this.stateTimer = 1500 + Math.random() * 1500;
            if (this.state === 'WALK') {
                const dirs = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
                this.facing = dirs[Math.floor(Math.random() * 4)];
                this.velX = this.facing === 'LEFT' ? -this.speed : (this.facing === 'RIGHT' ? this.speed : 0);
                this.velY = this.facing === 'UP' ? -this.speed : (this.facing === 'DOWN' ? this.speed : 0);
            } else {
                this.velX = 0;
                this.velY = 0;
            }
        }
    }

    takeDamage(direction) {
        if (this.painState || this.toRemove) return;
        this.hp--;
        this.flashTime = 150;
        window.game.engine.shake(4, 100);

        if (this.hp <= 0) {
            this.die();
            return;
        }

        const force = 150;
        this.painState = {
            msLeft: 120,
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
        if (other.hasTag('PLAYER')) {
            // Note : le Player gère ses propres dégâts via son onCollision.
            // Cependant, le MiniBoss a un bonus de dégâts en CHARGE.
            // Pour ne pas briser cela, on laisse le Player faire, mais on pourrait
            // aussi passer le montant de dégâts ici si on voulait être précis.
            // Dans ce projet, le Player.onCollision appelle takeDamage(1, dir).
            // Si on veut 2 dégâts, on doit quand même appeler takeDamage ici
            // mais direction sera calculée par le Player si on ne la passe pas (ou passée ici).
            
            if (this.state === 'CHARGE') {
                other.takeDamage?.(2); // On guarde l'appel pour le bonus de dégâts
            }
        }
    }

    die() {
        if (this.toRemove) return;
        this.toRemove = true;

        // Explosion
        window.game.engine.add(new Explosion(this.x, this.y));
        window.game.engine.add(new Explosion(this.x + 20, this.y + 10));

        if (window.game.network?.isHost || !window.game.network) {
            // Loot genereux
            for (let i = 0; i < 5; i++) {
                const em = new Emerald(this.x + (i - 2) * 15, this.y + 20);
                em.netId = 'it_' + Math.random().toString(36).slice(2, 7);
                window.game.engine.add(em);
            }
        }

        // Notifier le quest manager
        const qm = window.game.questManager;
        if (qm) {
            qm.defeatBoss();
        }

        // Shake plus fort pour la mort du boss
        window.game.engine.shake(10, 300);
    }

    draw(ctx) {
        // Ne pas dessiner si flash actif (clignotement)
        if (this.flashTime > 0 && Math.floor(this.flashTime / 50) % 2 === 0) return;

        const s = SCALE;
        const px = this.x;
        const py = this.y;
        const isCharging = this.state === 'CHARGE';
        const isWindup = this.state === 'CHARGE_WINDUP';
        const isStunned = this.state === 'STUNNED';

        // Corps principal (armure)
        ctx.fillStyle = isCharging ? '#ff3333' : (isStunned ? '#666688' : '#4a2a6a');
        ctx.fillRect(px + 4 * s, py + 8 * s, 14 * s, 14 * s);

        // Epaulettes
        ctx.fillStyle = isCharging ? '#cc2222' : '#3a1a5a';
        ctx.fillRect(px + 1 * s, py + 8 * s, 5 * s, 6 * s);
        ctx.fillRect(px + 16 * s, py + 8 * s, 5 * s, 6 * s);

        // Tete (casque)
        ctx.fillStyle = '#555577';
        ctx.fillRect(px + 5 * s, py + 1 * s, 12 * s, 9 * s);

        // Visiere
        ctx.fillStyle = '#333355';
        ctx.fillRect(px + 6 * s, py + 4 * s, 10 * s, 3 * s);

        // Yeux rouges
        ctx.fillStyle = isStunned ? '#888' : '#ff0000';
        ctx.fillRect(px + 7 * s, py + 5 * s, 2 * s, 2 * s);
        ctx.fillRect(px + 13 * s, py + 5 * s, 2 * s, 2 * s);

        // Indicateur de windup (tremble)
        if (isWindup) {
            const shake = Math.sin(this.animTime * 0.05) * 2;
            ctx.fillStyle = '#ff6600';
            ctx.fillRect(px + 2 * s + shake, py - 4, 18 * s, 3);
        }

        // Barre de vie au-dessus
        const barW = 40;
        const barH = 4;
        const barX = px + (this.width - barW) / 2;
        const barY = py - 8;
        ctx.fillStyle = '#333';
        ctx.fillRect(barX, barY, barW, barH);
        ctx.fillStyle = this.hp > this.maxHp * 0.3 ? '#ff3333' : '#ff0000';
        ctx.fillRect(barX, barY, barW * (this.hp / this.maxHp), barH);
    }
}
