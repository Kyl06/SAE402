/**
 * @file shop_interior.js
 * @description Interieur de la boutique du marchand.
 * Sortie : porte au sud → retour au village
 */

const W = 32;
// Piece agrandie pour le marchand 16x32 : 8 tuiles de large, 8 de haut
const OX = 272;
const OY = 128;
const COLS = 8;
const ROWS = 8;

const interior = [];

// Mur du haut
for (let c = 0; c < COLS; c++) {
    interior.push({ x: OX + c * W, y: OY, type: 'WALL_DOWN' });
}

// Murs gauche et droit
for (let r = 1; r < ROWS - 1; r++) {
    interior.push({ x: OX, y: OY + r * W, type: 'WALL_RIGHT' });
    interior.push({ x: OX + (COLS - 1) * W, y: OY + r * W, type: 'WALL_LEFT' });
}

// Mur du bas avec ouverture porte (colonnes 3 et 4)
for (let c = 0; c < COLS; c++) {
    if (c === 3 || c === 4) continue;
    interior.push({ x: OX + c * W, y: OY + (ROWS - 1) * W, type: 'WALL_UP' });
}

// Sol normal (sable)
for (let r = 1; r < ROWS - 1; r++) {
    for (let c = 1; c < COLS - 1; c++) {
        interior.push({ x: OX + c * W, y: OY + r * W, type: 'SAND' });
    }
}

// Comptoir (rangee 3, colonnes 2-5) — plus bas pour laisser de la place au marchand
for (let c = 2; c <= 5; c++) {
    interior.push({ x: OX + c * W, y: OY + 3 * W, type: 'ORANGE_BLOCK' });
}

export const zoneData = {
    id: 'shop_interior',
    name: 'Boutique',
    bgColor: '#2a1a0a',
    mapData: { walls: interior },
    enemies: { moblins: 0, octoroks: 0 },
    connections: {},
    doors: [
        // Sortie : quand le joueur passe la porte au sud de la boutique
        { x: OX + 3 * W, y: OY + (ROWS - 1) * W, w: 2 * W, h: W, target: 'village', spawnX: 576, spawnY: 230 }
    ],
    npcs: [
        {
            name: 'Marchand',
            // Positionne en rangee 1.5 : le sprite 32x64px s'etend de y=176 a y=240
            // Le comptoir a y=224 (OY+3*W) cache le bas du sprite
            x: OX + 3.5 * W,
            y: OY + 1.5 * W,
            sprite: 'VENDEUR',
            spriteColumns: 2,
            spriteW: 16,
            spriteH: 32,
            z: 2,
            isShop: true,
            interactRange: 80,
            dialogues: [
                "Bienvenue ! Que veux-tu acheter ?"
            ]
        }
    ]
};
