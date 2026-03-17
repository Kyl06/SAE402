/**
 * @file fortress_north.js
 * @description Zone Finale - Forteresse de Maldrek. Boss final.
 * Sortie : Sud (village) - bloquee par la barriere magique jusqu'a 3 fragments
 */
import { generateBorder } from './mapUtils.js';

const walls = generateBorder({ south: true });

const interior = [
    // Murs de la forteresse - couloir d'entree depuis le sud
    { x: 256, y: 416, type: 'WALL_LEFT' },
    { x: 256, y: 384, type: 'WALL_LEFT' },
    { x: 256, y: 352, type: 'WALL_LEFT' },
    { x: 512, y: 416, type: 'WALL_RIGHT' },
    { x: 512, y: 384, type: 'WALL_RIGHT' },
    { x: 512, y: 352, type: 'WALL_RIGHT' },

    // Salle principale - murs lateraux
    { x: 128, y: 320, type: 'WALL_DOWN' },
    { x: 160, y: 320, type: 'WALL_DOWN' },
    { x: 192, y: 320, type: 'WALL_DOWN' },
    { x: 224, y: 320, type: 'WALL_DOWN' },
    { x: 256, y: 320, type: 'WALL_DOWN' },
    { x: 512, y: 320, type: 'WALL_DOWN' },
    { x: 544, y: 320, type: 'WALL_DOWN' },
    { x: 576, y: 320, type: 'WALL_DOWN' },
    { x: 608, y: 320, type: 'WALL_DOWN' },
    { x: 640, y: 320, type: 'WALL_DOWN' },

    // Murs lateraux salle
    { x: 128, y: 288, type: 'WALL_RIGHT' },
    { x: 128, y: 256, type: 'WALL_RIGHT' },
    { x: 128, y: 224, type: 'WALL_RIGHT' },
    { x: 128, y: 192, type: 'WALL_RIGHT' },
    { x: 128, y: 160, type: 'WALL_RIGHT' },
    { x: 128, y: 128, type: 'WALL_RIGHT' },
    { x: 128, y: 96, type: 'WALL_RIGHT' },
    { x: 128, y: 64, type: 'WALL_RIGHT' },

    { x: 640, y: 288, type: 'WALL_LEFT' },
    { x: 640, y: 256, type: 'WALL_LEFT' },
    { x: 640, y: 224, type: 'WALL_LEFT' },
    { x: 640, y: 192, type: 'WALL_LEFT' },
    { x: 640, y: 160, type: 'WALL_LEFT' },
    { x: 640, y: 128, type: 'WALL_LEFT' },
    { x: 640, y: 96, type: 'WALL_LEFT' },
    { x: 640, y: 64, type: 'WALL_LEFT' },

    // Mur du fond (haut de la salle)
    { x: 128, y: 64, type: 'WALL_DOWN' },
    { x: 160, y: 64, type: 'WALL_DOWN' },
    { x: 192, y: 64, type: 'WALL_DOWN' },
    { x: 224, y: 64, type: 'WALL_DOWN' },
    { x: 256, y: 64, type: 'WALL_DOWN' },
    { x: 288, y: 64, type: 'WALL_DOWN' },
    { x: 320, y: 64, type: 'WALL_DOWN' },
    { x: 352, y: 64, type: 'WALL_DOWN' },
    { x: 384, y: 64, type: 'WALL_DOWN' },
    { x: 416, y: 64, type: 'WALL_DOWN' },
    { x: 448, y: 64, type: 'WALL_DOWN' },
    { x: 480, y: 64, type: 'WALL_DOWN' },
    { x: 512, y: 64, type: 'WALL_DOWN' },
    { x: 544, y: 64, type: 'WALL_DOWN' },
    { x: 576, y: 64, type: 'WALL_DOWN' },
    { x: 608, y: 64, type: 'WALL_DOWN' },
    { x: 640, y: 64, type: 'WALL_DOWN' },

    // Piliers dans la salle du boss
    { x: 224, y: 160, type: 'WALL_DOWN' },
    { x: 224, y: 192, type: 'WALL_UP' },
    { x: 544, y: 160, type: 'WALL_DOWN' },
    { x: 544, y: 192, type: 'WALL_UP' },
    { x: 224, y: 256, type: 'WALL_DOWN' },
    { x: 544, y: 256, type: 'WALL_DOWN' },

    // Sol sombre (sable pour le contraste - zone du trone)
    { x: 352, y: 128, type: 'SAND' },
    { x: 384, y: 128, type: 'SAND' },
    { x: 416, y: 128, type: 'SAND' },
    { x: 352, y: 160, type: 'SAND' },
    { x: 384, y: 160, type: 'SAND' },
    { x: 416, y: 160, type: 'SAND' },

];

export const zoneData = {
    id: 'fortress_north',
    name: 'Forteresse de Maldrek',
    bgColor: '#101010',
    mapData: { walls: [...walls, ...interior] },
    enemies: { moblins: 3, octoroks: 2 },
    connections: { south: 'village' }
};
