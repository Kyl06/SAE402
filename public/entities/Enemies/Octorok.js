/**
 * @file Octorok.js
 * @description Ennemi Octorok - Tire des projectiles à distance
 */

import { Entity } from "../../engine/Entity.js";
import { SpriteSheet } from "../../engine/SpriteSheet.js";
import { Explosion } from "../Effects/Explosion.js";
import { Heart } from "../Items/Heart.js";
import { OctorokProjectile } from "./OctorokProjectile.js";

export class Octorok extends Entity {
    constructor(x, y, roamRadius = 100) {
        super(x, y, 28, 28);
        
        this.netId = 'octo_' + Math.random().toString(36).slice(2, 11);
        this.hp = 2;
        this.speed = 35;
        this.chaseSpeed = 60;
        this.addTag("ENEMY");

        this.anchor = { x, y };
        this.roamRadius = roamRadius;

        this.state = "IDLE";
        this.stateTimer = 1500;
        this.facing = "DOWN";
        this.target = null;
        this.painState = null;

        // Tir
        this.shootRange = 140;
        this.shootCooldown = 2500;
        this.lastShot = 0;
        this.aimTime = 0;

        // SpriteSheet 4x4 (comme Moblin)
        this.spriteSheet = new SpriteSheet("OCTOROK", 4, 4, 16, 16);
    }

    update(delta) {
        if (this.painState) {
            this.handlePain(delta);
        } else {
            this.think();
            this.move(delta);
            this.shootLogic(delta);
        }
        super.update(delta);
    }

    think() {
        const players = window.game.engine.entities.filter((e) => 
            e.hasTag("PLAYER") && !e.isDead
        );
        
        let closest = null;
        let minDist = this.shootRange;

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
        if (this.target && this.state !== "AIM") {
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
            this.stateTimer = 1000 + Math.random() * 1500;

            if (this.state === "WALK") {
                this.chooseRoamDirection();
            } else {
                this.velX = 0;
                this.velY = 0;
            }
        }
    }

    chooseRoamDirection() {
        const distX = this.anchor.x - this.x;
        const distY = this.anchor.y - this.y;

        if (Math.abs(distX) > this.roamRadius || Math.abs(distY) > this.roamRadius) {
            this.facing = Math.abs(distX) > Math.abs(distY)
                ? (distX > 0 ? "RIGHT" : "LEFT")
                : (distY > 0 ? "DOWN" : "UP");
        } else {
            const directions = ["UP", "DOWN", "LEFT", "RIGHT"];
            this.facing = directions[Math.floor(Math.random() * 4)];
        }

        this.velX = this.facing === "LEFT" ? -this.speed : 
                   (this.facing === "RIGHT" ? this.speed : 0);
        this.velY = this.facing === "UP" ? -this.speed : 
                   (this.facing === "DOWN" ? this.speed : 0);
    }

    shootLogic(delta) {
        if (this.target && !this.painState) {
            const dist = Math.hypot(this.target.x - this.x, this.target.y - this.y);
            
            if (dist <= this.shootRange && Date.now() - this.lastShot >= this.shootCooldown) {
                this.state = "AIM";
                this.aimTime += delta;
                this.velX = 0;
                this.velY = 0;
                
                const dx = this.target.x - this.x;
                const dy = this.target.y - this.y;
                if (Math.abs(dx) > Math.abs(dy)) {
                    this.facing = dx > 0 ? "RIGHT" : "LEFT";
                } else {
                    this.facing = dy > 0 ? "DOWN" : "UP";
                }
                
                if (this.aimTime >= 600) {
                    this.fireProjectile();
                    this.lastShot = Date.now();
                    this.aimTime = 0;
                    this.state = "IDLE";
                }
                return;
            }
        }
        
        if (this.state === "AIM") {
            this.state = "IDLE";
            this.aimTime = 0;
        }
    }

    fireProjectile() {
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const dist = Math.hypot(dx, dy) || 1;
        
        const speed = 100;
        const vx = (dx / dist) * speed;
        const vy = (dy / dist) * speed;
        
        const projectile = new OctorokProjectile(
            this.x + (dx / dist) * 20,
            this.y + (dy / dist) * 20,
            vx,
            vy,
            this.netId
        );
        
        window.game.engine.add(projectile);
        
        // Sync réseau
        if (window.game.network && window.game.network.socket) {
            window.game.network.socket.emit('projectile', {
                x: projectile.x,
                y: projectile.y,
                vx: vx,
                vy: vy,
                id: projectile.netId,
                ownerId: this.netId
            });
        }
    }

    takeDamage(direction) {
        if (this.painState || this.toRemove) return;
        
        this.hp--;
        if (this.hp <= 0) return this.die();

        const force = 200;
        const kx = direction === "LEFT" ? -force : 
                  (direction === "RIGHT" ? force : 0);
        const ky = direction === "UP" ? -force : 
                  (direction === "DOWN" ? force : 0);
        
        this.painState = { msLeft: 120, velX: kx, velY: ky };
        this.state = "IDLE";
        this.aimTime = 0;
    }

    handlePain(delta) {
        this.x += this.painState.velX * (delta / 1000);
        this.y += this.painState.velY * (delta / 1000);
        this.painState.msLeft -= delta;
        if (this.painState.msLeft <= 0) this.painState = null;
    }

    onCollision(other) {
        if (other.hasTag("PLAYER")) {
            other.takeDamage?.(1);
        }
    }

    die() {
        window.game.engine.add(new Explosion(this.x, this.y));
        
        if (window.game.network && window.game.network.socket) {
            window.game.network.socket.emit('explosion', {
                x: this.x,
                y: this.y
            });
        }
        
        if (window.game.player?.hp < 6 && Math.random() < 0.25) {
            window.game.engine.add(new Heart(this.x, this.y));
        }
        
        this.kill();
    }

    draw(ctx) {
        if (this.toRemove) return;
        
        const row = { DOWN: 0, UP: 4, LEFT: 8, RIGHT: 12 }[this.facing] || 0;
        const isMoving = Math.abs(this.velX) > 0.1 || Math.abs(this.velY) > 0.1;
        const walkCycle = isMoving ? (Math.floor(Date.now() / 150) % 2) : 0;
        
        let frame;
        if (this.state === "AIM") {
            frame = row + 2;
        } else if (this.painState) {
            frame = row + (Math.floor(Date.now() / 50) % 2);
        } else {
            frame = row + walkCycle;
        }
        
        this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, 2);
    }
}