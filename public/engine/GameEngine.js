export class GameEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.entities = [];
        this.lastTime = 0;
        this._shakeTimer = 0;
        this._shakeIntensity = 0;
    }

    // Ajoute une entité et la trie par profondeur (Z-index)
    add(entity) {
        this.entities.push(entity);
        this.entities.sort((a, b) => (a.z || 0) - (b.z || 0));
    }

    // Marque une entité pour suppression au prochain cycle
    remove(entity) {
        entity.kill();
    }

    // Déclenche un tremblement d'écran (impact, explosion)
    shake(intensity, duration) {
        this._shakeIntensity = intensity;
        this._shakeTimer = duration;
    }

    // Mise à jour logique du jeu
    update(delta) {
        if (this._shakeTimer > 0) this._shakeTimer -= delta;

        // Mise à jour des entités
        this.entities.forEach(entity => entity.update?.(delta));

        // Détection des collisions et nettoyage des morts
        this.checkCollisions();
        this.entities = this.entities.filter(entity => !entity.toRemove);
    }

    // Vérifie si deux entités se touchent (Double boucle optimisée)
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

    // Algorithme AABB simple pour les rectangles
    rectIntersect(a, b) {
        return (a.x < b.x + b.width &&
                a.x + a.width > b.x &&
                a.y < b.y + b.height &&
                a.y + a.height > b.y);
    }

    // Rendu graphique global
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();

        // Application du tremblement d'écran
        if (this._shakeTimer > 0) {
            const dx = (Math.random() - 0.5) * this._shakeIntensity;
            const dy = (Math.random() - 0.5) * this._shakeIntensity;
            this.ctx.translate(dx, dy);
        }

        this.entities.forEach(entity => entity.draw?.(this.ctx));
        this.ctx.restore();
    }

    // Boucle de jeu principale (60 FPS idéalement)
    loop(now) {
        const delta = now - this.lastTime;
        this.lastTime = now;

        this.update(delta);
        this.draw();

        requestAnimationFrame((n) => this.loop(n));
    }

    // Démarre le moteur
    start() {
        requestAnimationFrame((n) => {
            this.lastTime = n;
            this.loop(n);
        });
    }
}