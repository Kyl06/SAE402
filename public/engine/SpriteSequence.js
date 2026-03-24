// Séquence d'animation temporelle (ex: attaque épée)
export class SpriteSequence {
    constructor(type, frames, onEnd) {
        this.type = type;
        this.frames = frames;
        this.onEnd = onEnd;
        this.currentIndex = 0;
        this.elapsed = 0;
        this.actorObject = null;
    }

    work(delta) {
        if (!this.frames[this.currentIndex]) {
            this.onEnd?.(this.actorObject);
            return;
        }

        // Callback initial au début de la séquence
        if (this.elapsed === 0 && this.currentIndex === 0) {
            const firstStep = this.frames[0];
            if (firstStep.callback && this.actorObject) {
                firstStep.callback(this.actorObject);
            }
        }

        this.elapsed += delta;
        const currentStep = this.frames[this.currentIndex];

        if (this.elapsed >= currentStep.duration) {
            this.elapsed = 0;
            this.currentIndex++;

            if (this.currentIndex >= this.frames.length) {
                this.onEnd?.(this.actorObject);
            } else {
                const nextStep = this.frames[this.currentIndex];
                if (nextStep.callback && this.actorObject) {
                    nextStep.callback(this.actorObject);
                }
            }
        }
    }

    get frameIdx() {
        return this.frames[this.currentIndex]?.frame ?? 0;
    }
}
