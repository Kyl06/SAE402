/**
 * @file Moblin.js
 * @description Classe représentant l'ennemi de base (Moblin).
 * Note : Dans une partie multijoueur, SEUL l'Hôte exécute cette instance réelle.
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
        this.enemyType = 'MOBLIN'; // Utilisé par NetworkUpdater pour le sync type

        this.hp = 3;
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

    think() {
        const players = window.game.engine.entities.filter((e) => e.hasTag("PLAYER") && !e.isDead);
        let closest = null;
        let minDist = 200;

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
        if (this.target) {
            this.chaseTarget();
        } else {
            this.roam(delta);
        }
    }

    chaseTarget() {
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            this.velX = dx > 0 ? this.chaseSpeed : -this.chaseSpeed;
            this.velY = 0;
            this.facing = dx > 0 ? "RIGHT" : "LEFT";
        } else {
            this.velX = 0;
            this.velY = dy > 0 ? this.chaseSpeed : -this.chaseSpeed;
            this.facing = dy > 0 ? "DOWN" : "UP";
        }
    }

    roam(delta) {
        this.stateTimer -= delta;
        if (this.stateTimer <= 0) {
            this.state = (this.state === "IDLE") ? "WALK" : "IDLE";
            this.stateTimer = 1000 + Math.random() * 1000;

            if (this.state === "WALK") {
                this.chooseRoamDirection();
            } else {
                this.velX = 0;
                this.velY = 0;
            }
        }
    }

    chooseRoamDirection() {
        const distToAnchorX = this.anchor.x - this.x;
        const distToAnchorY = this.anchor.y - this.y;

        if (Math.abs(distToAnchorX) > this.roamRadius || Math.abs(distToAnchorY) > this.roamRadius) {
            this.facing = Math.abs(distToAnchorX) > Math.abs(distToAnchorY)
                ? (distToAnchorX > 0 ? "RIGHT" : "LEFT")
                : (distToAnchorY > 0 ? "DOWN" : "UP");
        } else {
            this.facing = ["UP", "DOWN", "LEFT", "RIGHT"][Math.floor(Math.random() * 4)];
        }

        this.velX = this.facing === "LEFT" ? -this.speed : (this.facing === "RIGHT" ? this.speed : 0);
        this.velY = this.facing === "UP" ? -this.speed : (this.facing === "DOWN" ? this.speed : 0);
    }

    takeDamage(direction) {
        if (this.painState || this.toRemove) return;

        this.hp--;
        if (this.hp <= 0) {
            this.die();
            return;
        }

        const force = 250;
        const kx = direction === "LEFT" ? -force : (direction === "RIGHT" ? force : 0);
        const ky = direction === "UP" ? -force : (direction === "DOWN" ? force : 0);

        this.painState = { msLeft: 150, velX: kx, velY: ky };
    }

    handlePain(delta) {
        this.x += this.painState.velX * (delta / 1000);
        this.y += this.painState.velY * (delta / 1000);
        this.painState.msLeft -= delta;
        if (this.painState.msLeft <= 0) this.painState = null;
    }

    onCollision(other) {
        if (other.hasTag("PLAYER")) other.takeDamage?.(1);
        if (other instanceof Moblin) {
            this.x += this.x < other.x ? -1.5 : 1.5;
            this.y += this.y < other.y ? -1.5 : 1.5;
        }
    }

    /**
     * Mort du Moblin
     */
    die() {
        // 1. Créer l'explosion visuelle (Hôte + envoi au P2)
        if (window.game.network) {
            window.game.network.sendExplosion(this.x, this.y);
        }

        // 2. Générer le loot (Emeraude)
        this.spawnLoot();

        this.toRemove = true;
    }

    spawnLoot() {
        // 1. On récupère l'engine de manière sécurisée
        const engine = this.engine || window.game.engine;

        if (!engine) {
            console.error("Moteur de jeu introuvable pour spawn le loot !");
            return;
        }

        // 2. Création de l'émeraude
        const emerald = new Emerald(this.x, this.y);

        // 3. Attribution d'un ID réseau (crucial pour le P2)
        emerald.netId = 'item_' + Math.random().toString(36).slice(2, 9);

        // 4. Ajout au moteur de jeu (Pour que le P1 la voie)
        engine.add(emerald);

        // 5. Envoi au serveur pour que le P2 la voie aussi
        if (window.game.network && window.game.network.isHost) {
            window.game.network.socket.emit('item_spawn', {
                id: emerald.netId,
                x: emerald.x,
                y: emerald.y,
                type: 'EMERALD'
            });
        }
    }

    draw(ctx) {
        const row = { DOWN: 0, UP: 4, LEFT: 8, RIGHT: 12 }[this.facing];
        const isMoving = Math.abs(this.velX) > 0.1 || Math.abs(this.velY) > 0.1;
        const walkCycle = isMoving ? (Math.floor(Date.now() / 150) % 2) : 0;

        const frame = this.painState
            ? (row + 2 + (Math.floor(Date.now() / 50) % 2))
            : (row + walkCycle);

        this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, 2);
    }
}