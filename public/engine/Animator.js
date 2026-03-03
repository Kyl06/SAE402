export class Animator {
    constructor(frames = [0], frameDuration = 100) {
        this.frames = frames; // Liste des indices de sprites
        this.duration = frameDuration; // Temps entre chaque image (ms)
        this.timer = 0;
        this.currentFrameIdx = 0;
    }

    update(delta) {
        if (this.frames.length <= 1) return; // Pas d'animation si une seule frame
        this.timer += delta;
        if (this.timer >= this.duration) {
            this.currentFrameIdx = (this.currentFrameIdx + 1) % this.frames.length;
            this.timer = 0;
        }
    }

    get frame() {
        return this.frames[this.currentFrameIdx]; // Renvoie la frame actuelle à dessiner
    }

    reset() {
        this.currentFrameIdx = 0; // Remet l'animation au début
        this.timer = 0;
    }
}