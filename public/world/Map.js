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
        this.bgColor = '#1a1a1a';
        this.floorEntities = [];
    }

    load(mapData) {
        if (!mapData || !mapData.walls) return;

        mapData.walls.forEach(tile => {
            const block = new Floor(tile.x, tile.y, tile.type, tile);
            this.floorEntities.push(block);
            this.engine.add(block);
        });

        // S'ajouter au moteur si pas deja present
        if (!this.engine.entities.includes(this)) {
            this.engine.add(this);
        }
    }

    unload() {
        this.floorEntities.forEach(f => f.kill());
        // Retirer immediatement du moteur pour eviter les doublons
        const toRemoveSet = new Set(this.floorEntities);
        this.engine.entities = this.engine.entities.filter(e => !toRemoveSet.has(e));
        this.floorEntities = [];
    }

    draw(ctx) {
        ctx.fillStyle = this.bgColor;
        ctx.fillRect(0, 0, 800, 600);
    }
}