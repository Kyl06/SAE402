export class MapManager {
    constructor() {
        // Notre niveau : 1 = Mur, 0 = Sol, 3 = Objectif (jaune)
        this.grid = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,1,1,0,0,0,1,1,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,3,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        ];
        this.tileSize = 48; // Taille de chaque carré en pixels
    }

    // On dessine la map en bouclant sur le tableau grid
    draw(ctx) {
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                const tile = this.grid[y][x];

                // Choix de la couleur selon le chiffre dans la grille
                if (tile === 1) {
                    ctx.fillStyle = "#34495e"; // Mur (Bleu gris)
                } else if (tile === 3) {
                    ctx.fillStyle = "#f1c40f"; // Objectif (Jaune)
                } else {
                    ctx.fillStyle = "#2c3e50"; // Sol (Sombre)
                }

                // Dessin du carré
                ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                
                // Petit contour discret pour voir la grille
                ctx.strokeStyle = "rgba(0,0,0,0.1)";
                ctx.strokeRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    }

    // Vérifie si une position (x,y) touche un mur
    isWall(x, y) {
        // On convertit les pixels en coordonnées de grille (ex: 96px -> index 2)
        // Le +16 sert à ajuster la collision au centre du personnage
        const gx = Math.floor((x + 16) / this.tileSize);
        const gy = Math.floor((y + 16) / this.tileSize);

        // Si la case existe et que c'est un 1, alors c'est un mur
        return this.grid[gy] && this.grid[gy][gx] === 1;
    }
}