/**
 * @file Map.js
 * @description Gère l'affichage du décor et l'instanciation des collisions (murs).
 */

import { Entity } from '../engine/Entity.js';
import { Floor } from './Floor.js';
import { Assets } from '../engine/Assets.js';

export class Map extends Entity {
    /**
     * @param {GameEngine} engine - Référence du moteur pour injecter les murs
     */
    constructor(engine) {
        super(0, 0, 800, 660); // Dimensions par défaut de la fenêtre de jeu
        this.engine = engine;
        this.z = -10;          // S'affiche TOUJOURS derrière les joueurs (Background)
        this.collider = false; // La map elle-même n'est pas un obstacle, ses enfants Floor le sont.
        this.imageName = null; // Nom de l'asset d'image de fond
    }

    /**
     * Charge une définition de niveau et crée les entités physiques associées.
     * @param {Object} mapData - Objet contenant { imageName, walls: [] }
     */
    load(mapData) {
        if (!mapData || !mapData.walls) {
            console.error("Map Loader : Données de carte corrompues !");
            return;
        }

        this.imageName = mapData.imageName || null;

        // On parcourt la liste des murs définis dans le fichier de map
        mapData.walls.forEach(w => {
            if (w.width > 0 && w.height > 0) {
                // Création d'un bloc solide invisible
                const wall = new Floor(w.x, w.y, w.width, w.height);
                this.engine.add(wall);
            }
        });

        // On s'ajoute au moteur pour dessiner l'image de fond
        this.engine.add(this);

        console.log(`[Map] Niveau chargé : ${this.imageName} (${mapData.walls.length} obstacles)`);
    }

    /**
     * Rendu de l'image de fond.
     */
    draw(ctx) {
        if (this.imageName) {
            const img = Assets.get(this.imageName);
            if (img) {
                /** 
                 * Dessine l'image de fond étirée au scale 2 pour 
                 * correspondre aux sprites des personnages.
                 */
                ctx.drawImage(img, 0, 0, img.width * 2, img.height * 2);
            }
        }
    }
}