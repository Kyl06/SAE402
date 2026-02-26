export class Input {
    constructor() {
        // Un objet pour stocker l'état de chaque touche (appuyée ou non)
        this.keys = {};

        // On écoute quand une touche est enfoncée
        window.onkeydown = (e) => {
            this.keys[e.key.toLowerCase()] = true;
        };

        // On écoute quand une touche est relâchée
        window.onkeyup = (e) => {
            this.keys[e.key.toLowerCase()] = false;
        };

        // Sécurité : Si on change de fenêtre (Alt+Tab), on reset les touches
        // pour éviter que Link ne marche tout seul à l'infini.
        window.onblur = () => {
            this.keys = {};
        };
    }
}