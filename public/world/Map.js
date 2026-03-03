import { Floor } from './Floor.js';

export class Map {
    constructor(engine) {
        this.engine = engine;
    }

    load(mapData) {
        if (!mapData || !mapData.walls) {
            console.error("Données de carte invalides !");
            return;
        }

        // Transformation des données brutes en instances de Floor (murs/solides)
        mapData.walls.forEach(w => {
            // Sécurité : on ne crée l'objet que si les dimensions sont valides
            if (w.width > 0 && w.height > 0) {
                const wall = new Floor(w.x, w.y, w.width, w.height);
                this.engine.add(wall);
            }
        });

        console.log(`${mapData.walls.length} obstacles chargés sur la carte.`);
    }
}