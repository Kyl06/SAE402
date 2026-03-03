export class InputHandler {
    constructor() {
        this.keys = {}; // Stocke l'état (true/false) de chaque touche
        
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            // Empêche le scroll de la page avec les flèches ou l'espace
            if(["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    // Vérifie si une touche est actuellement maintenue enfoncée
    isHeld(code) { 
        return !!this.keys[code]; 
    }
}