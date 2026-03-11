/**
 * @file constants.js
 * @description Centralise toutes les constantes partagées du jeu.
 * Utiliser des constantes permet d'éviter les erreurs de frappe (ex: "up" vs "UP")
 * et facilite la maintenance globale du projet.
 */

// ── DIRECTIONS ───────────────────────────────────────────────────────────
export const UP    = 'UP';
export const DOWN  = 'DOWN';
export const LEFT  = 'LEFT';
export const RIGHT = 'RIGHT';

// ── TAGS D'ENTITÉS (Utilisés pour la détection de collision et l'IA) ─────
export const TAG_PLAYER        = 'PLAYER';        // Joueur local ou distant
export const TAG_ENEMY         = 'ENEMY';         // Moblins et autres monstres
export const TAG_PLAYER_WEAPON = 'PLAYER_WEAPON';  // Épées, flèches, etc.
export const TAG_WALL          = 'WALL';          // Obstacles du décor

// ── RENDU ────────────────────────────────────────────────────────────────
/**
 * Facteur de mise à l'échelle (zoom). 
 * 2 signifie que chaque pixel du sprite original (16x16) est rendu sur 2x2 pixels.
 */
export const SCALE = 2;