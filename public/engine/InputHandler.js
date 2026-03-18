/**
 * @file InputHandler.js
 * @description Capture et stocke l'état des touches du clavier.
 * Permet au jeu de savoir si une touche est maintenue enfoncée à tout moment.
 */

export class InputHandler {
    constructor() {
        // Objet de stockage type { "ArrowUp": true, "KeyZ": false }
        this.keys = {};
        
        // Écouteur pour l'appui sur une touche
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            
            // Désactive les comportements par défaut du navigateur qui gênent le jeu
            // (ex: les flèches qui font défiler la page web)
            if(["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "F9", "F10"].includes(e.code)) {
                e.preventDefault();
            }
        });

        // Écouteur pour le relâchement d'une touche
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    /**
     * Vérifie si une touche spécifique est pressée.
     * @param {string} code - Le code de la touche (ex: "Space", "KeyW", "ArrowLeft")
     * @returns {boolean}
     */
    isHeld(code) { 
        // L'opérateur !! convertit une valeur undefined ou nulle en false
        return !!this.keys[code]; 
    }
}