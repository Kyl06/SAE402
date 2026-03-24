// Gère le défilement cyclique des frames d'animation
export class Animator {
    constructor(frames = [0], frameDuration = 100) {
        this.frames = frames;
        this.duration = frameDuration;
        this.timer = 0;
        this.currentFrameIdx = 0;
    }

    update(delta) {
        if (this.frames.length <= 1) return;
        this.timer += delta;
        if (this.timer >= this.duration) {
            this.currentFrameIdx = (this.currentFrameIdx + 1) % this.frames.length;
            this.timer = 0;
        }
    }

    get frame() {
        return this.frames[this.currentFrameIdx];
    }

    reset() {
        this.currentFrameIdx = 0;
        this.timer = 0;
    }
}
