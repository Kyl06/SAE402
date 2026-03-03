export class SpriteSequence {
    constructor(type, frames, onEnd) {
        this.type = type; // Nom de l'action (ex: 'SWORD')
        this.frames = frames; // [{ frame: 0, duration: 100, callback: func }]
        this.onEnd = onEnd; // Action à la fin (ex: supprimer l'épée)
        this.currentIndex = 0;
        this.elapsed = 0;
        this.actorObject = null; // Référence vers un objet lié (ex: l'épée)
    }

    // Gère le passage des frames et les callbacks d'actions
    work(delta) {
        if (!this.frames[this.currentIndex]) {
            this.onEnd?.(this.actorObject);
            return;
        }

        this.elapsed += delta;
        const currentFrame = this.frames[this.currentIndex];

        if (this.elapsed >= currentFrame.duration) {
            this.elapsed = 0;
            this.currentIndex++;

            // Si fini, on ferme. Sinon, on exécute le callback de la nouvelle frame.
            if (this.currentIndex >= this.frames.length) {
                this.onEnd?.(this.actorObject);
            } else {
                const nextFrame = this.frames[this.currentIndex];
                if (nextFrame.callback && this.actorObject) {
                    nextFrame.callback(this.actorObject);
                }
            }
        }
    }

    // Renvoie l'index de sprite actuel pour le dessin
    get frameIdx() {
        return this.frames[this.currentIndex]?.frame ?? 0;
    }
}