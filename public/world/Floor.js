/**
 * @file Floor.js
 * @description Représente un bloc de collision solide (mur, arbre, rocher).
 * Gère la séparation physique des entités pour les empêcher de traverser le décor.
 */

import { Entity } from '../engine/Entity.js';

export class Floor extends Entity {
    /**
     * @param {number} x, y - Position du bloc
     * @param {number} width, height - Dimensions du bloc
     */
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.addTag('WALL');  // Identifié comme mur pour les flèches
        this.addTag('SOLID'); // Identifié comme solide pour le mouvement
        this.collider = true;
        this.z = 0;           // Niveau du sol
    }

    /** 
     * Rendu graphique.
     * Note: Dans la version finale, ces rectangles sont invisibles car 
     * l'image de fond (la map) contient déjà le dessin.
     */
    draw(ctx) {
        // Version Debug : Dessine une zone rouge semi-transparente
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'; 
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }


    /**
     * Algorithme de résolution de collision (Repoussement).
     * @param {Entity} other - L'entité (Joueur/Ennemi) qui tente de pénétrer dans le mur.
     */
    onCollision(other) {
        // Seules les entités mobiles et solides sont concernées
        if (!other.collider || other.hasTag('ITEM')) return;

        if (other.hasTag('PLAYER') || other.hasTag('ENEMY')) {
            // 1. Calcul des centres des deux objets
            const midThisX = this.x + this.width / 2;
            const midOtherX = other.x + other.width / 2;
            const midThisY = this.y + this.height / 2;
            const midOtherY = other.y + other.height / 2;

            // 2. Calcul des demi-dimensions combinées
            const combinedHalfWidths = (this.width + other.width) / 2;
            const combinedHalfHeights = (this.height + other.height) / 2;

            // 3. Calcul du chevauchement (overlap) sur chaque axe
            const dx = midThisX - midOtherX;
            const dy = midThisY - midOtherY;
            const overlapX = combinedHalfWidths - Math.abs(dx);
            const overlapY = combinedHalfHeights - Math.abs(dy);

            /**
             * 4. Résolution par l'Axe de Moindre Pénétration :
             * On repousse l'entité sur l'axe où le chevauchement est le plus petit
             * pour éviter des "sauts" brusques.
             */
            if (overlapX < overlapY) {
                if (dx > 0) {
                    other.x = this.x - other.width; // Collision à gauche de l'obstacle
                } else {
                    other.x = this.x + this.width;  // Collision à droite
                }
            } else {
                if (dy > 0) {
                    other.y = this.y - other.height; // Collision en haut
                } else {
                    other.y = this.y + this.height;  // Collision en bas
                }
            }
        }
    }
}