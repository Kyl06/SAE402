/**
 * @file map-converter.js
 * @description Script utilitaire pour convertir des coordonnées de tuiles (grid) 
 * en coordonnées de pixels pour le moteur de jeu.
 * Il génère les fichiers JavaScript de définition de maps dans public/world/maps/.
 */

const fs = require('fs');

/**
 * Convertit un tableau d'objets (tuiles) en objets de murs (pixels).
 * @param {Array} mapData - Tableau d'objets { x, y, w, h } en unités de tuiles (32px).
 * @returns {Array} - Tableau d'objets { x, y, width, height } en pixels.
 */
function convert(mapData) {
  return mapData.map(w => ({
    x: w.x * 32,      // Position X en pixels
    y: w.y * 32,      // Position Y en pixels
    width: w.w * 32,  // Largeur en pixels
    height: w.h * 32  // Hauteur en pixels
  }));
}

// ── CONFIGURATION MAP INDOOR (L'intérieur) ──────────────────────────────────
const mapIndoorWalls = [
  { x: 2, y: 2, w: 13, h: 1 },
  { x: 14, y: 3, w: 3, h: 1 },
  { x: 16, y: 4, w: 2, h: 1 },
  { x: 17, y: 5, w: 1, h: 8 },
  { x: 15, y: 12, w: 2, h: 8 },
  { x: 2, y: 3, w: 1, h: 9 },
  { x: 3, y: 11, w: 2, h: 9 },
  { x: 4, y: 20, w: 12, h: 1 },
  { x: 7, y: 12, w: 5, h: 5 },
];

const indoorCode = `export const Map_Indoor = {
  imageName: "MAP_INDOOR",
  walls: ${JSON.stringify(convert(mapIndoorWalls), null, 4)},
  moblinPoints: [
    { x: 140, y: 250 },
    { x: 340, y: 250 },
    { x: 300, y: 150 },
    { x: 190, y: 380 },
  ],
  playerSpawns: [
    [200, 225],
    [450, 225],
    [300, 325],
    [450, 325],
  ]
};`;
fs.writeFileSync('d:/SAE402/public/world/maps/Map_Indoor.js', indoorCode);

// ── CONFIGURATION MAP MOB CAVE (La grotte) ──────────────────────────────────
const mapMobCaveWalls = [
  { x: 3, y: 2, w: 14, h: 1 },
  { x: 2, y: 3, w: 2, h: 1 },
  { x: 2, y: 4, w: 1, h: 9 },
  { x: 2, y: 13, w: 2, h: 1 },
  { x: 6, y: 15, w: 1, h: 1 },
  { x: 3, y: 14, w: 4, h: 1 },
  { x: 6, y: 16, w: 11, h: 1 },
  { x: 16, y: 3, w: 1, h: 1 },
  { x: 17, y: 3, w: 1, h: 11 },
  { x: 16, y: 13, w: 1, h: 3 },
];

const mobCaveCode = `export const Map_MobCave = {
  imageName: "MAP_MOBCAVE",
  walls: ${JSON.stringify(convert(mapMobCaveWalls), null, 4)},
  moblinPoints: [
    { x: 140, y: 250 },
    { x: 340, y: 250 },
    { x: 300, y: 150 },
    { x: 190, y: 380 },
  ],
  playerSpawns: [
    [200, 400],
    [300, 400],
    [400, 400],
    [475, 400],
  ]
};`;
fs.writeFileSync('d:/SAE402/public/world/maps/Map_MobCave.js', mobCaveCode);

// ── CONFIGURATION MAP OUTDOOR (L'extérieur) ─────────────────────────────────
const mapOutdoorWalls = [
  { x: 1, y: 5, w: 1, h: 12 },
  { x: 2, y: 5, w: 1, h: 1 },
  { x: 3, y: 5, w: 6, h: 4 },
  { x: 8, y: 4, w: 6, h: 1 },
  { x: 13, y: 5, w: 7, h: 4 },
  { x: 19, y: 9, w: 1, h: 5 },
  { x: 18, y: 13, w: 1, h: 5 },
  { x: 2, y: 17, w: 16, h: 1 },
];

const outdoorCode = `export const Map_Outdoor = {
  imageName: "MAP_OUTDOOR",
  walls: ${JSON.stringify(convert(mapOutdoorWalls), null, 4)},
  moblinPoints: [
    { x: 140, y: 350 },
    { x: 340, y: 250 },
    { x: 400, y: 450 },
    { x: 290, y: 420 },
  ],
  playerSpawns: [
    [200, 400],
    [350, 400],
    [400, 400],
    [475, 400],
  ]
};`;
fs.writeFileSync('d:/SAE402/public/world/maps/Map_Outdoor.js', outdoorCode);

console.log("Conversion des maps terminée avec succès !");
