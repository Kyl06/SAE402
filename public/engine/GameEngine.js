/**
 * Kernel de rendu et de physique 2D. 
 * Orchestre le cycle de vie (Update/Draw) des entités et la résolution des collisions.
 */

export class GameEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false; // Pixel-art : désactive l'interpolation bilinéaire.
        this.entities = [];
        this.lastTime = 0;
        
        this._shakeTimer = 0;
        this._shakeIntensity = 0;
    }

    /**
     * Enregistre une entité et réordonne le buffer de rendu selon la profondeur Z.
     */
    add(entity) {
        this.entities.push(entity);
        this.entities.sort((a, b) => (a.z || 0) - (b.z || 0));
    }

    remove(entity) { entity.kill(); }

    /** Trigger un traumatisme temporaire du contexte de rendu (Screen Shake). */
    shake(intensity, duration) {
        this._shakeIntensity = intensity;
        this._shakeTimer = duration;
    }

    /**
     * Mise à jour globale basée sur le Delta Time (indépendance du framerate).
     */
    update(delta) {
        if (this._shakeTimer > 0) this._shakeTimer -= delta;

        const zm = window.game?.zoneManager;
        if (zm) zm.updateFade(delta);

        this.entities.forEach(e => e.update?.(delta));
        this.checkCollisions();

        // Garbage collection : suppression atomique des entités périmées.
        this.entities = this.entities.filter(e => !e.toRemove);
    }

    /**
     * Détection naïve AABB en O(n^2). 
     * Note : Pour des scènes > 500 entités, envisager un Quadtree ou un Spatial Hash.
     */
    checkCollisions() {
        for (let i = 0; i < this.entities.length; i++) {
            for (let j = i + 1; j < this.entities.length; j++) {
                const a = this.entities[i];
                const b = this.entities[j];

                if (a.collider && b.collider && this.rectIntersect(a, b)) {
                    a.onCollision?.(b);
                    b.onCollision?.(a);
                }
            }
        }
    }

    /** Intersection de rectangles alignés (AABB). */
    rectIntersect(a, b) {
        const ab = a.getCollisionBox ? a.getCollisionBox() : { x: a.x, y: a.y, w: a.width, h: a.height };
        const bb = b.getCollisionBox ? b.getCollisionBox() : { x: b.x, y: b.y, w: b.width, h: b.height };
        return (ab.x < bb.x + bb.w && ab.x + ab.w > bb.x &&
                ab.y < bb.y + bb.h && ab.y + ab.h > bb.y);
    }

    /** Rendu graphique sur le buffer principal. */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save(); // Sauvegarde l'état (Transform, Clip, Alpha)

        if (this._shakeTimer > 0) {
            const dx = (Math.random() - 0.5) * this._shakeIntensity;
            const dy = (Math.random() - 0.5) * this._shakeIntensity;
            this.ctx.translate(dx, dy);
        }

        this.entities.forEach(e => e.draw?.(this.ctx));
        this.ctx.restore(); // Restaure le contexte pour isoler les transformations

        const zm = window.game?.zoneManager;
        if (zm) zm.drawFade(this.ctx);
    }

    /** Game loop cadencée par le rafraîchissement d'écran via window.requestAnimationFrame. */
    loop(now) {
        const delta = now - this.lastTime;
        this.lastTime = now;
        this.update(delta);
        this.draw();
        requestAnimationFrame((n) => this.loop(n));
    }

    start() {
        requestAnimationFrame((n) => {
            this.lastTime = n;
            this.loop(n);
        });
    }
}