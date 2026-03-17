/**
 * @file ruins_east.js
 * @description Zone Est - Ruines anciennes. Quete: eliminer le mini-boss pour le Fragment 3.
 * Sortie : Ouest (village)
 */
import { generateBorder } from './mapUtils.js';

const walls = generateBorder({ west: true });

const interior = [
    // Ruines : fragments de murs formant des structures brisees

    // Structure ruine nord-ouest
    { x: 128, y: 64, type: 'WALL_DOWN' },
    { x: 160, y: 64, type: 'WALL_DOWN' },
    { x: 192, y: 64, type: 'WALL_DOWN' },
    { x: 128, y: 96, type: 'WALL_RIGHT' },
    { x: 192, y: 96, type: 'WALL_LEFT' },
    { x: 128, y: 128, type: 'WALL_UP' },
    { x: 160, y: 128, type: 'WALL_UP' },

    // Structure ruine centre
    { x: 320, y: 192, type: 'WALL_DOWN' },
    { x: 352, y: 192, type: 'WALL_DOWN' },
    { x: 384, y: 192, type: 'WALL_DOWN' },
    { x: 416, y: 192, type: 'WALL_DOWN' },
    { x: 320, y: 224, type: 'WALL_RIGHT' },
    { x: 416, y: 224, type: 'WALL_LEFT' },
    { x: 320, y: 256, type: 'WALL_RIGHT' },
    { x: 416, y: 256, type: 'WALL_LEFT' },
    { x: 320, y: 288, type: 'WALL_UP' },
    { x: 352, y: 288, type: 'WALL_UP' },

    // Structure ruine sud-est
    { x: 544, y: 352, type: 'WALL_DOWN' },
    { x: 576, y: 352, type: 'WALL_DOWN' },
    { x: 608, y: 352, type: 'WALL_DOWN' },
    { x: 544, y: 384, type: 'WALL_RIGHT' },
    { x: 608, y: 384, type: 'WALL_LEFT' },
    { x: 544, y: 416, type: 'WALL_UP' },
    { x: 576, y: 416, type: 'WALL_UP' },
    { x: 608, y: 416, type: 'WALL_UP' },

    // Murs brises isoles
    { x: 480, y: 96, type: 'WALL_DOWN' },
    { x: 512, y: 96, type: 'WALL_DOWN' },
    { x: 160, y: 352, type: 'WALL_RIGHT' },
    { x: 160, y: 384, type: 'WALL_RIGHT' },
    { x: 640, y: 160, type: 'WALL_LEFT' },
    { x: 640, y: 192, type: 'WALL_LEFT' },

    // Sol de sable (ruines = sol sec)
    { x: 224, y: 192, type: 'SAND' },
    { x: 256, y: 192, type: 'SAND' },
    { x: 288, y: 192, type: 'SAND' },
    { x: 224, y: 224, type: 'SAND' },
    { x: 256, y: 224, type: 'SAND' },
    { x: 288, y: 224, type: 'SAND' },
    { x: 448, y: 288, type: 'SAND' },
    { x: 480, y: 288, type: 'SAND' },
    { x: 512, y: 288, type: 'SAND' },
    { x: 352, y: 320, type: 'SAND' },
    { x: 384, y: 320, type: 'SAND' },
    { x: 416, y: 320, type: 'SAND' },

    // Quelques arbres (vegetation reprenant ses droits)
    { x: 64, y: 192, type: 'TREE' },
    { x: 576, y: 128, type: 'TREE' },
    { x: 256, y: 384, type: 'TREE' },
    { x: 448, y: 448, type: 'TREE' },

    // Buissons
    { x: 288, y: 128, type: 'BUSH' },
    { x: 448, y: 352, type: 'BUSH' },
    { x: 128, y: 416, type: 'BUSH' },
    { x: 608, y: 128, type: 'BUSH' },

];

export const zoneData = {
    id: 'ruins_east',
    name: 'Ruines Anciennes',
    bgColor: '#2a2015',
    mapData: { walls: [...walls, ...interior] },
    enemies: { moblins: 3, octoroks: 2 },
    connections: { west: 'village' },
    npcs: [
        {
            name: 'Archeologue',
            x: 80, y: 288,
            color: '#8a6a3a',
            skinColor: '#e0c098',
            dialogues: [
                "Ces ruines abritent une creature puissante, un gardien ancien.",
                "Defais-le et le Fragment de Cristal qu'il protege sera a toi.",
                "Attention, il est bien plus fort que les monstres ordinaires !"
            ],
            questDialogues: {
                questId: 'ruins_boss',
                active: [
                    "Le Gardien Ancien rode toujours dans les ruines...",
                    "Il charge quand il est proche, esquive et frappe quand il est etourdi !"
                ],
                completed: [
                    "Incroyable ! Tu as vaincu le Gardien Ancien !",
                    "Le dernier Fragment de Cristal est a toi. La forteresse de Maldrek t'attend !"
                ]
            }
        }
    ]
};
