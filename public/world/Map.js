/**
 * @file Map.js
 * @description Gestionnaire de niveau.
 * Charge les données de carte et génère les entités de décor correspondantes.
 */

import { Entity } from '../engine/Entity.js';
import { Floor } from './Floor.js';

export class Map extends Entity {
    constructor(engine) {
        super(0, 0, 800, 608);
        this.engine = engine;
        this.z = -10;
    }

    load(mapData) {
        if (!mapData || !mapData.walls) return;

        mapData.walls.forEach(tile => {
            // On crée un Floor pour chaque tuile, le constructeur gère le reste
            const block = new Floor(tile.x, tile.y, tile.type);
            this.engine.add(block);
        });

        this.engine.add(this);
    }

    draw(ctx) {
        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(0, 0, 800, 600);
    }
}