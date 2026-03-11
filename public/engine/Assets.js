/**
 * @file Assets.js
 * @description Gestionnaire central de ressources.
 * Charge les images de manière asynchrone et les stocke pour un accès rapide.
 */

export const Assets = {
    // Dictionnaire stockant les objets Image HTML chargés
    images: {},

    /**
     * Charge une liste d'images.
     * @param {Object} sources - Un objet de type { NomAsset: "chemin/vers/image.png" }
     * @returns {Promise} - Une promesse résolue quand TOUTES les images sont en mémoire.
     */
    async load(sources) {
        // On transforme chaque entrée du dictionnaire en une promesse de chargement
        const promises = Object.entries(sources).map(([name, src]) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                
                // Callback de succès
                img.onload = () => {
                    this.images[name] = img;
                    resolve(img);
                };
                
                // Callback d'échec
                img.onerror = () => reject(`Erreur critique : Impossible de charger l'asset "${name}" à l'adresse : ${src}`);
            });
        });

        // Attend que le tableau entier de promesses soit terminé
        return Promise.all(promises);
    },

    /**
     * Récupère une image précédemment chargée.
     * @param {string} name - Le nom défini lors de l'appel à load()
     * @returns {HTMLImageElement|null}
     */
    get(name) {
        if (!this.images[name]) {
            console.error(`Asset Manager : L'image "${name}" n'a pas été chargée !`);
        }
        return this.images[name];
    }
};