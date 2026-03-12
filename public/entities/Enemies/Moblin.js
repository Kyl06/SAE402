/**
 * @file Moblin.js
 * @description Classe représentant l'ennemi de base (Moblin).
 * Gère une IA autonome d'attaque et de patrouille.
 * Note : Dans une partie multijoueur, SEUL l'Hôte (Joueur 1) exécute cette instance réelle.
 */

import { Entity } from "../../engine/Entity.js";
import { SpriteSheet } from "../../engine/SpriteSheet.js";
import { Explosion } from "../Effects/Explosion.js";
import { Heart } from "../Items/Heart.js";
import { Emerald } from "../Items/Emerald.js";

export class Moblin extends Entity {
    /**
     * @param {number} x, y - Position de départ
     * @param {number} roamRadius - Rayon maximum de patrouille autour du départ
     */
    constructor(x, y, roamRadius = 120) {
        super(x, y, 32, 32); // Taille de collision agrandie pour les monstres
        
        // Identifiant unique pour la synchronisation réseau
        this.netId = 'mob_' + Math.random().toString(36).slice(2, 11);
        
        this.hp = 3;             // Points de vie (3 coups d'épée)
        this.speed = 40;         // Vitesse en patrouille calme
        this.chaseSpeed = 70;    // Vitesse en poursuite agressive
        this.addTag("ENEMY");    // Identifié comme ennemi par les armes du joueur

        // Zone de patrouille
        this.anchor = { x, y };  // Point de retour
        this.roamRadius = roamRadius;

        // États de l'IA
        this.state = "IDLE";     // IDLE (arrêt) ou WALK (marche)
        this.stateTimer = 1000;  // Temps restant avant de changer d'état (ms)
        this.facing = "DOWN";
        this.target = null;      // Cible actuelle (Joueur le plus proche)
        this.painState = null;   // État de recul lors d'un dégât

        // Spritesheet du Moblin (4 colonnes x 4 lignes)
        this.spriteSheet = new SpriteSheet("MOBLIN", 4, 4, 16, 16);
    }

    /** Mise à jour logique. */
    update(delta) {
        if (this.painState) {
            this.handlePain(delta); // Si blessé, on recule sans réfléchir
        } else {
            this.think();            // Cherche un joueur à proximité
            this.move(delta);        // Exécute le déplacement (poursuite ou patrouille)
        }
        super.update(delta);
    }

    /**
     * Analyse l'environnement pour trouver le joueur le plus proche.
     */
    think() {
        // Filtrage des entités vivantes ayant le tag "PLAYER"
        const players = window.game.engine.entities.filter((e) => e.hasTag("PLAYER") && !e.isDead);
        
        let closest = null;
        let minDist = 200; // Rayon de vision du Moblin (200 pixels)

        players.forEach(p => {
            const d = Math.hypot(p.x - this.x, p.y - this.y);
            if (d < minDist) {
                minDist = d;
                closest = p;
            }
        });

        this.target = closest; // Si trouvé, le Moblin passera en mode CHASE
    }

    /** Gère la transition entre Poursuite et Patrouille. */
    move(delta) {
        if (this.target) {
            this.chaseTarget(); // Foncer vers le joueur
        } else {
            this.roam(delta);    // Se promener autour de l'ancre
        }
    }

    /** Dirige le Moblin vers la cible (mouvement orthogonal : X puis Y). */
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

    /** Logique de patrouille aléatoire avec pauses. */
    roam(delta) {
        this.stateTimer -= delta;
        if (this.stateTimer <= 0) {
            // Basculement entre Marche et Arrêt
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

    /** Choisit une direction aléatoire, tout en restant proche de son ancre. */
    chooseRoamDirection() {
        const distToAnchorX = this.anchor.x - this.x;
        const distToAnchorY = this.anchor.y - this.y;

        // Si on s'est trop éloigné de la zone de garde, on revient vers le centre
        if (Math.abs(distToAnchorX) > this.roamRadius || Math.abs(distToAnchorY) > this.roamRadius) {
            this.facing = Math.abs(distToAnchorX) > Math.abs(distToAnchorY)
                ? (distToAnchorX > 0 ? "RIGHT" : "LEFT")
                : (distToAnchorY > 0 ? "DOWN" : "UP");
        } else {
            // Sinon, direction totalement aléatoire
            this.facing = ["UP", "DOWN", "LEFT", "RIGHT"][Math.floor(Math.random() * 4)];
        }

        this.velX = this.facing === "LEFT" ? -this.speed : (this.facing === "RIGHT" ? this.speed : 0);
        this.velY = this.facing === "UP" ? -this.speed : (this.facing === "DOWN" ? this.speed : 0);
    }

    /**
     * Subit des dégâts.
     * @param {string} direction - Direction d'où vient le coup pour calculer le recul
     */
    takeDamage(direction) {
        if (this.painState || this.toRemove) return;
        
        this.hp--;
        if (this.hp <= 0) return this.die();

        // Calcul du vecteur de recul (Impact)
        const force = 250;
        const kx = direction === "LEFT" ? -force : (direction === "RIGHT" ? force : 0);
        const ky = direction === "UP" ? -force : (direction === "DOWN" ? force : 0);
        
        this.painState = { msLeft: 150, velX: kx, velY: ky };
    }

    /** Applique le déplacement de recul lors de la douleur. */
    handlePain(delta) {
        this.x += this.painState.velX * (delta / 1000);
        this.y += this.painState.velY * (delta / 1000);
        this.painState.msLeft -= delta;
        if (this.painState.msLeft <= 0) this.painState = null;
    }

    /** Gestion des collisions : inflige des dégâts au joueur s'il est touché. */
    onCollision(other) {
        if (other.hasTag("PLAYER")) other.takeDamage?.(1);

        // Repousse les autres ennemis pour éviter qu'ils ne se superposent
        if (other instanceof Moblin) {
            this.x += this.x < other.x ? -1.5 : 1.5;
            this.y += this.y < other.y ? -1.5 : 1.5;
        }
    }

    /** Mort du Moblin : explosion, drop d'item et signalement réseau. */
    die() {
        // Effet visuel immédiat pour l'hôte + code d'apparition d'émeraude à la fin de l'explosion
        const spawnEmerald = () => {
            window.game.engine.add(new Emerald(this.x, this.y));
        };

        window.game.engine.add(new Explosion(this.x, this.y, spawnEmerald));
        
        // SIGNAL RÉSEAU : Prévient les clients pour qu'ils affichent l'explosion aussi
        window.game.network?.sendExplosion(this.x, this.y);
        
        // Chance de faire apparaître un cœur si le joueur local est blessé
        if (window.game.player?.hp < 6 && Math.random() < 0.4) {
            window.game.engine.add(new Heart(this.x, this.y));
        }

        // L'émeraude apparaîtra après l'explosion (voir callback spawnEmerald)
        this.kill(); // Supprime l'entité du moteur (Hôte)
    }

    /** Rendu graphique. */
    draw(ctx) {
        const row = { DOWN: 0, UP: 4, LEFT: 8, RIGHT: 12 }[this.facing];
        const isMoving = Math.abs(this.velX) > 0.1 || Math.abs(this.velY) > 0.1;
        
        // Animation simple de marche alternant entre frame 0 et frame 1
        const walkCycle = isMoving ? (Math.floor(Date.now() / 150) % 2) : 0;

        // Choix de la frame : frames 2-3 pour la douleur, sinon marche
        const frame = this.painState 
            ? (row + 2 + (Math.floor(Date.now() / 50) % 2)) 
            : (row + walkCycle);
            
        this.spriteSheet.drawFrame(ctx, frame, this.x, this.y, 2);
    }
}