/**
 * @file GameEngine.js
 * @description Le "cerveau" du jeu. 
 * Responsable de la boucle principale, de la gestion des entités, du rendu et des collisions.
 */

export class GameEngine {
    /**
     * @param {string} canvasId - L'ID de l'élément HTML <canvas>
     */
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Liste active de tous les objets du jeu
        this.entities = [];
        
        // Timestamp de la frame précédente pour le calcul du Delta Time
        this.lastTime = 0;
        
        // Paramètres pour l'effet de tremblement d'écran (impact/explosion)
        this._shakeTimer = 0;
        this._shakeIntensity = 0;
    }

    /**
     * Ajoute une entité au jeu et trie la liste par profondeur d'affichage (Z-index).
     * @param {Entity} entity 
     */
    add(entity) {
        this.entities.push(entity);
        // On trie pour que les entités avec un Z plus élevé soient dessinées par-dessus
        this.entities.sort((a, b) => (a.z || 0) - (b.z || 0));
    }

    /**
     * Marque une entité pour destruction.
     * @param {Entity} entity 
     */
    remove(entity) {
        entity.kill();
    }

    /**
     * Déclenche un effet visuel de vibration de l'écran.
     * @param {number} intensity - Force de la vibration en pixels
     * @param {number} duration - Durée en millisecondes
     */
    shake(intensity, duration) {
        this._shakeIntensity = intensity;
        this._shakeTimer = duration;
    }

    /**
     * Étape de mise à jour logique (Physique, IA, État).
     * @param {number} delta - Temps écoulé en ms
     */
    update(delta) {
        // Décompte du tremblement
        if (this._shakeTimer > 0) this._shakeTimer -= delta;

        // Mise a jour du fondu de transition
        const zm = window.game?.zoneManager;
        if (zm) zm.updateFade(delta);

        // On demande à chaque entité de se mettre à jour
        this.entities.forEach(entity => entity.update?.(delta));

        // Résolution des collisions (Dégâts, Obstacles)
        this.checkCollisions();

        // Nettoyage : On ne garde que les entités qui ne sont PAS marquées 'toRemove'
        this.entities = this.entities.filter(entity => !entity.toRemove);
    }

    /**
     * Détection des collisions entre tous les objets actifs.
     * Optimisée par une double boucle (Compare A avec B sans doublons).
     */
    checkCollisions() {
        for (let i = 0; i < this.entities.length; i++) {
            for (let j = i + 1; j < this.entities.length; j++) {
                const a = this.entities[i];
                const b = this.entities[j];

                // On ne teste que si les deux possèdent un moteur de collision actif
                if (a.collider && b.collider && this.rectIntersect(a, b)) {
                    // Si ça touche, on avertit les deux objets
                    a.onCollision?.(b);
                    b.onCollision?.(a);
                }
            }
        }
    }

    /**
     * Test géométrique d'intersection entre deux rectangles (AABB).
     * @returns {boolean}
     */
    rectIntersect(a, b) {
        return (a.x < b.x + b.width &&
                a.x + a.width > b.x &&
                a.y < b.y + b.height &&
                a.y + a.height > b.y);
    }

    /**
     * Étape de rendu graphique (Dessin).
     */
    draw() {
        // Efface l'écran avant de redessiner
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Sauvegarde l'état du canvas pour restaurer après d'éventuels tremblements/rotations
        this.ctx.save();

        // Simulation du tremblement par translation aléatoire du contexte
        if (this._shakeTimer > 0) {
            const dx = (Math.random() - 0.5) * this._shakeIntensity;
            const dy = (Math.random() - 0.5) * this._shakeIntensity;
            this.ctx.translate(dx, dy);
        }

        // On demande à chaque entité de s'afficher
        this.entities.forEach(entity => entity.draw?.(this.ctx));

        this.ctx.restore(); // Annule la translation de tremblement pour la frame suivante

        // Overlay de transition (fondu noir) par-dessus tout
        const zm = window.game?.zoneManager;
        if (zm) zm.drawFade(this.ctx);
    }

    /**
     * Boucle principale infinie.
     * Tentative de tourner à 60 FPS via RequestAnimationFrame.
     * @param {number} now - Temps actuel fourni par le navigateur
     */
    loop(now) {
        const delta = now - this.lastTime;
        this.lastTime = now;

        this.update(delta);
        this.draw();

        // Rappelle la boucle au prochain rafraîchissement d'écran
        requestAnimationFrame((n) => this.loop(n));
    }

    /** Lance l'exécution du moteur. */
    start() {
        requestAnimationFrame((n) => {
            this.lastTime = n;
            this.loop(n);
        });
    }
}