/**
 * @file OctorokProjectile.js
 * @description Projectile de l'Octorok
 */

import { Entity } from "../../engine/Entity.js";

export class OctorokProjectile extends Entity {
    constructor(x, y, vx, vy, ownerNetId = null) {
        super(x, y, 10, 10);
        
        this.netId = 'octo_proj_' + Math.random().toString(36).slice(2, 11);
        this.ownerNetId = ownerNetId;
        
        this.velX = vx;
        this.velY = vy;
        
        this.lifetime = 2500;
        this.age = 0;
        this.active = true;
        this.damage = 1;
        this.color = '#C44536';
    }

    update(delta) {
        if (!this.active) return;
        
        this.age += delta;
        if (this.age >= this.lifetime) {
            this.deactivate();
            return;
        }
        
        this.x += this.velX * (delta / 1000);
        this.y += this.velY * (delta / 1000);
        
        // Collision joueur
        const player = window.game.player;
        if (player && !player.isDead && this.checkCollision(player)) {
            player.takeDamage?.(this.damage);
            this.deactivate();
            return;
        }
        
        // Collision murs
        if (window.game.map?.isSolid) {
            const tileX = Math.floor(this.x / 16);
            const tileY = Math.floor(this.y / 16);
            if (window.game.map.isSolid(tileX, tileY)) {
                this.deactivate();
            }
        }
        
        super.update(delta);
    }

    checkCollision(other) {
        const halfSize = this.width / 2;
        const otherHalfW = other.width / 2;
        const otherHalfH = other.height / 2;
        
        return (
            this.x - halfSize < other.x + otherHalfW &&
            this.x + halfSize > other.x - otherHalfW &&
            this.y - halfSize < other.y + otherHalfH &&
            this.y + halfSize > other.y - otherHalfH
        );
    }

    deactivate() {
        this.active = false;
        this.toRemove = true;
    }

    draw(ctx) {
        if (!this.active) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#FF6B35';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.restore();
    }
}