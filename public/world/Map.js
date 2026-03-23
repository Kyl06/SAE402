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
            
            if (["MAISON_ORANGE", "MAISON_BLEU", "MAISON_VIOLETTE"].includes(tile.type)) {
                block.collider = false;
                block.removeTag?.("SOLID");

                const top = new Floor(tile.x, tile.y, "INVISIBLE_WALL");
                top.width = 96; top.height = 64; 
                this.floorEntities.push(top); this.engine.add(top);

                const bl = new Floor(tile.x, tile.y + 64, "INVISIBLE_WALL");
                bl.width = 32; bl.height = 32; 
                this.floorEntities.push(bl); this.engine.add(bl);

                const br = new Floor(tile.x + 64, tile.y + 64, "INVISIBLE_WALL");
                br.width = 32; br.height = 32; 
                this.floorEntities.push(br); this.engine.add(br);
            }

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