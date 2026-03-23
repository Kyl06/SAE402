/**
 * Ennemi de base (Moblin). 
 * S'exécute sous le régime de l'Autorité Hôte : l'Hôte gère l'IA, la collision et le Loot.
 */

import { Entity } from "../../engine/Entity.js";
import { SpriteSheet } from "../../engine/SpriteSheet.js";
import { Explosion } from "../Effects/Explosion.js";
import { Heart } from "../Items/Heart.js";
import { Emerald } from "../Items/Emerald.js";

export class Moblin extends Entity {
    constructor(x, y, roamRadius = 120) {
        super(x, y, 32, 32);

        this.netId = 'mob_' + Math.random().toString(36).slice(2, 11);
        this.enemyType = 'MOBLIN'; 

        this.hp = 7;
        this.speed = 40;
        this.chaseSpeed = 70;
        this.addTag("ENEMY");

        this.anchor = { x, y };
        this.roamRadius = roamRadius;

        this.state = "IDLE";
        this.stateTimer = 1000;
        this.facing = "DOWN";
        this.target = null;
        this.painState = null;

        this.spriteSheet = new SpriteSheet("MOBLIN", 4, 4, 16, 16);
    }

    update(delta) {
        if (this.painState) {
            this.handlePain(delta);
        } else {
            this.think();
            this.move(delta);
        }
        super.update(delta);
    }

    /** Analyse radar pour cibler le joueur le plus proche (Raycasting-free AABB check). */
    think() {
        const players = window.game.engine.entities.filter((e) => e.hasTag("PLAYER") && !e.isDead);
        let closest = null, minDist = 200;

        players.forEach(p => {
            const d = Math.hypot(p.x - this.x, p.y - this.y);
            if (d < minDist) { minDist = d; closest = p; }
        });
        this.target = closest;
    }

    move(delta) {
        if (this.target) this.chaseTarget();
        else this.roam(delta);
    }

    /** Simple Collision Lookahead pour l'IA. */
    isBlocked(dirX, dirY) {
        const step = 10;
        const [testX, testY] = [this.x + dirX * step, this.y + dirY * step];
        const entities = window.game.engine.entities;
        for (let e of entities) {
            if (!e.collider || !e.hasTag('SOLID')) continue;
            const box = e.getCollisionBox();
            if (testX < box.x + box.w && testX + this.width > box.x &&
                testY < box.y + box.h && testY + this.height > box.y) return true;
        }
        return false;
    }

    /** Poursuite directionnelle avec évitement rudimentaire d'obstacles. */
    chaseTarget() {
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;

        let [primX, primY, secX, secY] = Math.abs(dx) > Math.abs(dy) 
            ? [Math.sign(dx), 0, 0, Math.sign(dy) || 1] 
            : [0, Math.sign(dy), Math.sign(dx) || 1, 0];

        if (!this.isBlocked(primX, primY)) {
            this.velX = primX * this.chaseSpeed;
            this.velY = primY * this.chaseSpeed;
        } else if (!this.isBlocked(secX, secY)) {
            this.velX = secX * this.chaseSpeed;
            this.velY = secY * this.chaseSpeed;
        } else {
            this.velX = 0; this.velY = 0;
        }

        if (Math.abs(this.velX) > Math.abs(this.velY)) this.facing = this.velX > 0 ? "RIGHT" : "LEFT";
        else if (Math.abs(this.velY) > 0) this.facing = this.velY > 0 ? "DOWN" : "UP";
    }

    /** Patrouille aléatoire autour du point d'ancrage. */
    roam(delta) {
        this.stateTimer -= delta;
        if (this.stateTimer <= 0) {
            this.state = (this.state === "IDLE") ? "WALK" : "IDLE";
            this.stateTimer = 1000 + Math.random() * 1000;

            if (this.state === "WALK") {
                const distToX = this.anchor.x - this.x;
                const distToY = this.anchor.y - this.y;
                if (Math.abs(distToX) > this.roamRadius || Math.abs(distToY) > this.roamRadius) {
                    this.facing = Math.abs(distToX) > Math.abs(distToY) ? (distToX > 0 ? "RIGHT" : "LEFT") : (distToY > 0 ? "DOWN" : "UP");
                } else {
                    this.facing = ["UP", "DOWN", "LEFT", "RIGHT"][Math.floor(Math.random() * 4)];
                }
                this.velX = this.facing === "LEFT" ? -this.speed : (this.facing === "RIGHT" ? this.speed : 0);
                this.velY = this.facing === "UP" ? -this.speed : (this.facing === "DOWN" ? this.speed : 0);
            } else {
                this.velX = 0; this.velY = 0;
            }
        }
    }

    takeDamage(amount, direction) {
        if (typeof amount === "string") {
            direction = amount;
            amount = 1;
        }
        if (this.painState || this.toRemove) return;
        this.hp -= (amount || 1);
        if (this.hp <= 0) return this.die();

        const force = 250;
        const [kx, ky] = [
            direction === "LEFT" ? -force : (direction === "RIGHT" ? force : 0),
            direction === "UP" ? -force : (direction === "DOWN" ? force : 0)
        ];
        this.painState = { msLeft: 150, velX: kx, velY: ky };
    }

    /** Simulation physique du recul. */
    handlePain(delta) {
        this.x += this.painState.velX * (delta / 1000);
        this.y += this.painState.velY * (delta / 1000);
        this.painState.msLeft -= delta;
        if (this.painState?.msLeft <= 0) this.painState = null;
    }

    onCollision(other) {
        // Séparation rudimentaire entre entités de même type (Avoidance).
        if (other instanceof Moblin) {
            this.x += this.x < other.x ? -1.5 : 1.5;
            this.y += this.y < other.y ? -1.5 : 1.5;
        }
    }

    /** Orchestration de la mort : FX, Réseau, Loot et Progression de quête. */
    die() {
        const engine = window.game.engine;
        engine.add(new Explosion(this.x, this.y));
        window.game.network?.sendExplosion(this.x, this.y);

        this.spawnLoot();

        const zm = window.game.zoneManager;
        if (zm?.currentZone === 'forest_south') window.game.questManager?.registerMoblinKill();

        this.toRemove = true;
    }

    /** 
     * Génération de Loot pondérée. 
     * Favorise les cœurs si un joueur est blessé (Smart Drop).
     */
    spawnLoot() {
        const engine = window.game.engine;
        const rand = Math.random();
        if (rand < 0.2) return; 

        let type = 'EMERALD';
        const anyoneInjured = engine.entities.filter(e => e.hasTag("PLAYER")).some(p => p.hp < (p.maxHp || 6));

        if (rand > 0.8 && anyoneInjured) type = 'HEART';
        
        const isPickpocket = window.game.player && window.game.player.bowLevel > 0;
        const count = (type === 'EMERALD' && isPickpocket) ? 2 : 1;

        const mod = (type === 'HEART') ? import("../Items/Heart.js") : import("../Items/Emerald.js");
        mod.then(m => {
            const ItemClass = m[type.charAt(0) + type.slice(1).toLowerCase()];
            for (let i = 0; i < count; i++) {
                const loot = new ItemClass(this.x + (i*10), this.y); // Petit offset pour pas qu'elles soient parfaitement superposées
                loot.netId = 'item_' + Math.random().toString(36).slice(2, 9);
                engine.add(loot);
                if (window.game.network?.isHost) {
                    window.game.network.socket.emit('item_spawn', { id: loot.netId, x: loot.x, y: loot.y, type });
                }
            }
        });
    }

    draw(ctx) {
        const row = { DOWN: 0, UP: 4, LEFT: 8, RIGHT: 12 }[this.facing];
        const isMoving = Math.abs(this.velX) > 0.1 || Math.abs(this.velY) > 0.1;
        const walkCycle = isMoving ? (Math.floor(Date.now() / 150) % 2) : 0;
        const frame = this.painState ? (row + 2 + (Math.floor(Date.now() / 50) % 2)) : (row + walkCycle);
        this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, 2);
    }
}