/**
 * @file Maldek.js
 * @description Boss Maldek.
 * Flotte au-dessus du joueur et attaque avec un Kamehameha.
 */

import { Entity } from "../../engine/Entity.js";
import { SpriteSheet } from "../../engine/SpriteSheet.js";
import { Explosion } from "../Effects/Explosion.js";
import { Heart } from "../Items/Heart.js";
import { Emerald } from "../Items/Emerald.js";
import { UP, DOWN, LEFT, RIGHT } from "../../constants.js";
import { MaldekBeam } from "./MaldekBeam.js";

export class Maldek extends Entity {
    constructor(x, y) {
        super(x, y, 70, 70); // Grande hitbox de boss

        this.netId = 'mal_' + Math.random().toString(36).slice(2, 11);
        this.enemyType = 'MALDEK';

        this.hp = 20; // Points de vie de boss
        this.speed = 60;
        this.addTag("ENEMY");

        this.state = "IDLE";
        this.stateTimer = 2000;
        this.facing = "DOWN";
        this.target = null;
        this.painState = null;

        this.chargeTimer = 0;
        this.chargeDuration = 1500; // 1.5s de charge

        // Spritesheet Maldek : 240x142, frames 32x35. 240/32 = 7.5 => 7 colonnes.
        this.spriteSheet = new SpriteSheet("MALDEK", 7, 4, 32, 35);
    }

    update(delta) {
        if (this.painState) {
            this.handlePain(delta);
        } else {
            this.think();
            this.move(delta);
            this.attackLogic(delta);
        }
        super.update(delta);
    }

    think() {
        const players = window.game.engine.entities.filter((e) => e.hasTag("PLAYER") && !e.isDead);
        let closest = null;
        let minDist = 1000;

        players.forEach(p => {
            const d = Math.hypot(p.x - this.x, p.y - this.y);
            if (d < minDist) {
                minDist = d;
                closest = p;
            }
        });
        this.target = closest;
    }

    move(delta) {
        if (!this.target || this.state === "CHARGING") {
            this.velX = 0;
            this.velY = 0;
            return;
        }

        // Objectif : être ~80 pixels AU-DESSUS du joueur
        const targetX = this.target.x;
        const targetY = this.target.y - 80;

        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 5) {
            this.velX = (dx / dist) * this.speed;
            this.velY = (dy / dist) * this.speed;
        } else {
            this.velX = 0;
            this.velY = 0;
        }

        this.facing = dx > 0 ? "RIGHT" : "LEFT";
        if (Math.abs(dy) > Math.abs(dx)) {
            this.facing = dy > 0 ? "DOWN" : "UP";
        }
    }

    attackLogic(delta) {
        if (!this.target) return;

        if (this.state === "IDLE") {
            this.stateTimer -= delta;
            if (this.stateTimer <= 0) {
                // Aligné horizontalement ?
                if (Math.abs(this.x - this.target.x) < 40 && this.y < this.target.y) {
                    this.state = "CHARGING";
                    this.chargeTimer = 0;
                    this.velX = 0;
                    this.velY = 0;
                    this.facing = "DOWN"; // Toujours attaquer vers le bas
                } else {
                    this.stateTimer = 500; // Réessayer bientôt
                }
            }
        } else if (this.state === "CHARGING") {
            this.chargeTimer += delta;
            if (this.chargeTimer >= this.chargeDuration) {
                this.fireBeam();
                this.state = "IDLE";
                this.stateTimer = 2500; // Cooldown après attaque
            }
        }
    }

    fireBeam() {
        const beam = new MaldekBeam(this.x + 8, this.y + 32, 0, 250, this.netId);
        window.game.engine.add(beam);
        
        if (window.game.network?.socket) {
            window.game.network.socket.emit('projectile', {
                x: beam.x, y: beam.y, vx: 0, vy: 250, id: beam.netId, ownerId: this.netId, type: 'BEAM'
            });
        }
    }

<<<<<<< HEAD
    takeDamage(direction) {
        if (this.painState || this.toRemove) return;
        this.hp--;
=======
    takeDamage(direction, damage = 1) {
        if (this.painState || this.toRemove) return;
        this.hp -= damage;
>>>>>>> d0e8611ba67ebeb154b2d2e7217de151c55a9bca
        if (this.hp <= 0) return this.die();

        this.painState = { msLeft: 200, velX: 0, velY: 0 }; // Pas de knockback pour le boss, juste un flash
    }

    handlePain(delta) {
        this.painState.msLeft -= delta;
        if (this.painState.msLeft <= 0) this.painState = null;
    }

    onCollision(other) {
        // On laisse le Player gérer ses propres dégâts pour un recul calculé depuis son centre.
    }

    die() {
        const engine = this.engine || window.game.engine;
        if (engine) {
            for(let i=0; i<5; i++) {
                setTimeout(() => {
                    engine.add(new Explosion(this.x + (Math.random()-0.5)*60, this.y + (Math.random()-0.5)*60));
                }, i * 200);
            }
        }
        if (window.game.network) {
            window.game.network.sendExplosion(this.x, this.y);
        }
        this.spawnLoot();
        this.toRemove = true;
    }

    spawnLoot() {
        const engine = window.game.engine;
        for (let i = 0; i < 5; i++) {
            const loot = new Emerald(this.x + (Math.random()-0.5)*40, this.y + (Math.random()-0.5)*40);
            engine.add(loot);
        }
    }

    draw(ctx) {
        // Avec 7 colonnes : DOWN=0, UP=7, LEFT=14, RIGHT=21
        const row = { DOWN: 0, UP: 7, LEFT: 14, RIGHT: 21 }[this.facing] || 0;
        const isMoving = Math.abs(this.velX) > 0.1 || Math.abs(this.velY) > 0.1;
        
        let frame;
        if (this.state === "CHARGING") {
            // Frames de charge à partir de la 4ème colonne (index 3+row)
            frame = row + 3 + (Math.floor(Date.now() / 100) % 2);
        } else if (this.painState) {
            // Frame de dégâts à la 3ème colonne (index 2+row)
            frame = row + 2;
        } else {
            const walkCycle = isMoving ? (Math.floor(Date.now() / 150) % 2) : 0;
            frame = row + walkCycle;
        }

        this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, 2.5);
    }
}
