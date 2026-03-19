/**
 * @file swamp_west.js
 * @description Zone Ouest - Marais. Quete: trouver la cle du coffre pour le Fragment 2.
 * Sortie : Est (village)
 */
import { generateBorder } from './mapUtils.js';

const walls = generateBorder({ east: true });

const interior = [
    // Grands lacs de marais (eau)
    // Lac nord-ouest
    { x: 96, y: 64, type: 'WATER' },
    { x: 128, y: 64, type: 'WATER' },
    { x: 160, y: 64, type: 'WATER' },
    { x: 96, y: 96, type: 'WATER' },
    { x: 128, y: 96, type: 'WATER' },
    { x: 160, y: 96, type: 'WATER' },
    { x: 96, y: 128, type: 'WATER' },
    { x: 128, y: 128, type: 'WATER' },
    { x: 160, y: 128, type: 'WATER' },

    // Lac centre
    { x: 288, y: 224, type: 'WATER' },
    { x: 320, y: 224, type: 'WATER' },
    { x: 352, y: 224, type: 'WATER' },
    { x: 384, y: 224, type: 'WATER' },
    { x: 288, y: 256, type: 'WATER' },
    { x: 320, y: 256, type: 'WATER' },
    { x: 352, y: 256, type: 'WATER' },
    { x: 384, y: 256, type: 'WATER' },
    { x: 288, y: 288, type: 'WATER' },
    { x: 320, y: 288, type: 'WATER' },
    { x: 352, y: 288, type: 'WATER' },
    { x: 384, y: 288, type: 'WATER' },

    // Lac sud
    { x: 128, y: 384, type: 'WATER' },
    { x: 160, y: 384, type: 'WATER' },
    { x: 192, y: 384, type: 'WATER' },
    { x: 128, y: 416, type: 'WATER' },
    { x: 160, y: 416, type: 'WATER' },
    { x: 192, y: 416, type: 'WATER' },
    { x: 128, y: 448, type: 'WATER' },
    { x: 160, y: 448, type: 'WATER' },
    { x: 192, y: 448, type: 'WATER' },

    // Lac est
    { x: 512, y: 320, type: 'WATER' },
    { x: 544, y: 320, type: 'WATER' },
    { x: 576, y: 320, type: 'WATER' },
    { x: 512, y: 352, type: 'WATER' },
    { x: 544, y: 352, type: 'WATER' },
    { x: 576, y: 352, type: 'WATER' },

    // Arbres de marais
    { x: 64, y: 224, type: 'TREE' },
    { x: 192, y: 192, type: 'TREE' },
    { x: 448, y: 128, type: 'TREE' },
    { x: 576, y: 128, type: 'TREE' },
    { x: 448, y: 416, type: 'TREE' },
    { x: 320, y: 416, type: 'TREE' },
    { x: 576, y: 448, type: 'TREE' },

    // Buissons
    { x: 256, y: 128, type: 'BUSH' },
    { x: 448, y: 256, type: 'BUSH' },
    { x: 224, y: 320, type: 'BUSH' },
    { x: 480, y: 448, type: 'BUSH' },
    { x: 352, y: 128, type: 'BUSH' },

    // Chemins de sable (passerelles)
    { x: 224, y: 224, type: 'SAND' },
    { x: 224, y: 256, type: 'SAND' },
    { x: 224, y: 288, type: 'SAND' },
    { x: 416, y: 224, type: 'SAND' },
    { x: 416, y: 256, type: 'SAND' },
    { x: 416, y: 288, type: 'SAND' },

];

export const zoneData = {
    id: 'swamp_west',
    name: 'Marais Sombre',
    bgColor: '#0f1f1a',
    mapData: { walls: [...walls, ...interior] },
    enemies: { moblins: 2, octoroks: 2 },
    connections: { east: 'village' },
    npcs: [
        {
            name: 'Ermite du Marais',
            x: 640, y: 160,
            color: '#2a6a6a',
            skinColor: '#d8b888',
            dialogues: [
                "Le marais cache bien des secrets... et un coffre tres ancien.",
                "Trouve la cle cachee quelque part dans cette zone et ouvre le coffre.",
                "Le Fragment de Cristal est a l'interieur. Fais attention aux creatures !"
            ],
            questDialogues: {
                questId: 'swamp_chest',
                active: [
                    "Tu as la cle ? Bien ! Cherche le coffre, il est quelque part dans le marais.",
                    "Ouvre-le et le Fragment sera a toi !"
                ],
                completed: [
                    "Tu as trouve le Fragment du marais ! Excellent !",
                    "Continue ta quete, heros. D'autres fragments t'attendent."
                ]
            }
        }
    ]
};
