// Gestion clavier : état binaire des touches
export class InputHandler {
    constructor() {
        this.keys = {};

        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            if(["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "F9", "F10"].includes(e.code)) {
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    isHeld(code) {
        return !!this.keys[code];
    }
}
