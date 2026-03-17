/**
 * @file mapUtils.js
 * @description Utilitaires pour la generation procedurale des bordures de zones.
 */

const T = 32; // Taille d'une tuile en pixels (16 * SCALE=2)
const COLS = 25; // 800 / 32
const ROWS = 18; // ~576 / 32
const GAP = 4; // Largeur de sortie en tuiles
const H_GAP_START = Math.floor((COLS - GAP) / 2); // Col 10
const V_GAP_START = Math.floor((ROWS - GAP) / 2); // Row 7

/**
 * Genere les murs de bordure d'une zone avec des ouvertures pour les sorties.
 * @param {Object} exits - { north, south, east, west } (boolean)
 * @returns {Array} Tableau de tuiles {x, y, type}
 */
export function generateBorder(exits = {}) {
    const walls = [];

    // Bordure haute
    for (let c = 0; c < COLS; c++) {
        if (exits.north && c >= H_GAP_START && c < H_GAP_START + GAP) continue;
        walls.push({ x: c * T, y: 0, type: 'WALL_DOWN' });
    }

    // Bordure basse
    for (let c = 0; c < COLS; c++) {
        if (exits.south && c >= H_GAP_START && c < H_GAP_START + GAP) continue;
        walls.push({ x: c * T, y: (ROWS - 1) * T, type: 'WALL_UP' });
    }

    // Bordure gauche
    for (let r = 1; r < ROWS - 1; r++) {
        if (exits.west && r >= V_GAP_START && r < V_GAP_START + GAP) continue;
        walls.push({ x: 0, y: r * T, type: 'WALL_RIGHT' });
    }

    // Bordure droite
    for (let r = 1; r < ROWS - 1; r++) {
        if (exits.east && r >= V_GAP_START && r < V_GAP_START + GAP) continue;
        walls.push({ x: (COLS - 1) * T, y: r * T, type: 'WALL_LEFT' });
    }

    return walls;
}

export { T, COLS, ROWS };
