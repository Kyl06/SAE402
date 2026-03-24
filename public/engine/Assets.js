// Gestionnaire d'assets : chargement parallèle des images
export const Assets = {
    images: {},

    // Charge toutes les images en parallèle
    async load(sources) {
        const promises = Object.entries(sources).map(([name, src]) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    this.images[name] = img;
                    resolve(img);
                };
                img.onerror = () => reject(`Asset Failure: "${name}" (${src})`);
            });
        });

        return Promise.all(promises);
    },

    get(name) {
        if (!this.images[name]) console.error(`Asset Manager : Missing image "${name}"`);
        return this.images[name];
    }
};
