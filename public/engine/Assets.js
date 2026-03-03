/**
 * Gestionnaire d'assets pour charger et stocker les images du jeu.
 */
export const Assets = {
    images: {},

    // Charge toutes les images et retourne une promesse globale
    async load(sources) {
        const promises = Object.entries(sources).map(([name, src]) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    this.images[name] = img;
                    resolve(img);
                };
                img.onerror = () => reject(`Erreur chargement asset: ${src}`);
            });
        });
        return Promise.all(promises);
    },

    // Récupère une image chargée par son nom (ex: 'LINK')
    get(name) {
        if (!this.images[name]) console.warn(`Asset introuvable: ${name}`);
        return this.images[name];
    }
};