/**
 * Abstraction du clavier. Stocke l'état binaire (appuyé/relâché) des touches.
 * Empêche le "scroll" et les raccourcis système interférant avec le gameplay.
 */

export class InputHandler {
    constructor() {
        this.keys = {};
        
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            
            // Prévention du comportement par défaut pour les touches de navigation.
            if(["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "F9", "F10"].includes(e.code)) {
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    /** Vérifie la pression continue d'une touche via son KeyboardEvent.code. */
    isHeld(code) { 
        return !!this.keys[code]; 
    }
}