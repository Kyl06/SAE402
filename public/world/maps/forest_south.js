/**
 * @file forest_south.js
 * @description Zone Sud - Foret dense. Quete: tuer les moblins pour le Fragment 1.
 * Sortie : Nord (village)
 */
import { generateBorder } from './mapUtils.js';

const walls = generateBorder({ north: true });

const interior = [
    // Rangee d'arbres haut (laisse passage au centre pour l'entree nord)
    { x: 64, y: 64, type: 'TREE' },
    { x: 128, y: 64, type: 'TREE' },
    { x: 192, y: 64, type: 'TREE' },
    { x: 544, y: 64, type: 'TREE' },
    { x: 608, y: 64, type: 'TREE' },
    { x: 672, y: 64, type: 'TREE' },

    // Foret dense gauche
    { x: 64, y: 160, type: 'TREE' },
    { x: 64, y: 288, type: 'TREE' },
    { x: 64, y: 416, type: 'TREE' },
    { x: 128, y: 224, type: 'TREE' },
    { x: 128, y: 352, type: 'TREE' },
    { x: 192, y: 160, type: 'TREE' },
    { x: 192, y: 352, type: 'TREE' },

    // Foret dense droite
    { x: 672, y: 160, type: 'TREE' },
    { x: 672, y: 288, type: 'TREE' },
    { x: 672, y: 416, type: 'TREE' },
    { x: 608, y: 224, type: 'TREE' },
    { x: 608, y: 352, type: 'TREE' },
    { x: 544, y: 160, type: 'TREE' },
    { x: 544, y: 352, type: 'TREE' },

    // Arbres centraux (creer des couloirs)
    { x: 320, y: 192, type: 'TREE' },
    { x: 448, y: 192, type: 'TREE' },
    { x: 256, y: 320, type: 'TREE' },
    { x: 384, y: 320, type: 'TREE' },
    { x: 512, y: 320, type: 'TREE' },
    { x: 320, y: 448, type: 'TREE' },
    { x: 448, y: 448, type: 'TREE' },

    // Buissons disperses
    { x: 256, y: 160, type: 'BUSH' },
    { x: 480, y: 160, type: 'BUSH' },
    { x: 352, y: 256, type: 'BUSH' },
    { x: 288, y: 416, type: 'BUSH' },
    { x: 480, y: 416, type: 'BUSH' },
    { x: 384, y: 480, type: 'BUSH' },

    // Quelques tuiles d'herbe/sable pour les chemins
    { x: 384, y: 128, type: 'SAND' },
    { x: 384, y: 160, type: 'SAND' },
    { x: 384, y: 224, type: 'SAND' },
    { x: 384, y: 256, type: 'SAND' },
];

export const zoneData = {
    id: 'forest_south',
    name: 'Foret Sombre',
    bgColor: '#0f1f0f',
    mapData: { walls: [...walls, ...interior] },
    enemies: { moblins: 4, octoroks: 1 },
    connections: { north: 'village' },
    npcs: [
        {
            name: 'Garde Forestier',
            x: 384, y: 96,
            color: '#2d6a2d',
            skinColor: '#e8c090',
            dialogues: [
                "Cette foret est infestee de moblins depuis que Maldrek a pris le pouvoir.",
                "Elimine-les tous et je te donnerai le Fragment de Cristal que je garde.",
                "Sois prudent, ils rodent parmi les arbres !"
            ],
            questDialogues: {
                questId: 'forest_moblins',
                active: [
                    "Continue ! Il reste encore des moblins dans cette foret.",
                    "Ne baisse pas ta garde !"
                ],
                completed: [
                    "Bravo, heros ! Tu as elimine tous les moblins !",
                    "Voici le Fragment de Cristal comme promis. Un de moins pour Maldrek !"
                ]
            }
        }
    ]
};
