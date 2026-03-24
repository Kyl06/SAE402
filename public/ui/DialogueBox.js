// Boite de dialogue retro avec texte machine a ecrire, avance avec E

import { Entity } from '../engine/Entity.js';

export class DialogueBox extends Entity {
    constructor() {
        super(0, 0, 800, 660);
        this.z = 998;
        this.collider = false;

        this.active = false;
        this.npcName = '';
        this.lines = [];
        this.currentLine = 0;
        this.displayedText = '';
        this.charIndex = 0;
        this.onComplete = null;

        this.typeSpeed = 40;
        this.keyWasDown = false;
        this.cursorBlink = 0;
    }

    show(name, lines, onComplete) {
        this.active = true;
        this.npcName = name;
        this.lines = lines;
        this.currentLine = 0;
        this.charIndex = 0;
        this.displayedText = '';
        this.onComplete = onComplete;
        this.keyWasDown = true;
        window.game.dialogueActive = true;
    }

    close() {
        this.active = false;
        window.game.dialogueActive = false;
        if (this.onComplete) {
            this.onComplete();
            this.onComplete = null;
        }
    }

    update(delta) {
        if (!this.active) return;

        const line = this.lines[this.currentLine];
        if (this.charIndex < line.length) {
            this.charIndex += this.typeSpeed * (delta / 1000);
            if (this.charIndex > line.length) this.charIndex = line.length;
            this.displayedText = line.substring(0, Math.floor(this.charIndex));
        }

        this.cursorBlink += delta * 0.004;

        const keyDown = window.game.inputs.isHeld('KeyE') || window.game.inputs.isHeld('Enter');
        if (keyDown && !this.keyWasDown) {
            if (this.charIndex < line.length) {
                this.charIndex = line.length;
                this.displayedText = line;
            } else {
                this.currentLine++;
                if (this.currentLine >= this.lines.length) {
                    this.close();
                } else {
                    this.charIndex = 0;
                    this.displayedText = '';
                }
            }
        }
        this.keyWasDown = keyDown;
    }

    _drawRetroBox(ctx, x, y, w, h) {
        ctx.fillStyle = '#0a0a18';
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = '#f0f0f0';
        ctx.lineWidth = 3;
        ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);
        ctx.strokeStyle = '#8888aa';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 5, y + 5, w - 10, h - 10);
        ctx.fillStyle = '#f0f0f0';
        const cs = 4;
        ctx.fillRect(x + 2, y + 2, cs, cs);
        ctx.fillRect(x + w - 2 - cs, y + 2, cs, cs);
        ctx.fillRect(x + 2, y + h - 2 - cs, cs, cs);
        ctx.fillRect(x + w - 2 - cs, y + h - 2 - cs, cs, cs);
    }

    draw(ctx) {
        if (!this.active) return;

        const boxX = 40;
        const boxY = 430;
        const boxW = 720;
        const boxH = 130;
        const padding = 18;

        this._drawRetroBox(ctx, boxX, boxY, boxW, boxH);

        ctx.font = 'bold 12px "Press Start 2P", monospace';
        const nameWidth = ctx.measureText(this.npcName).width;
        const nameBoxW = nameWidth + 28;
        const nameBoxH = 28;
        const nameBoxX = boxX + padding;
        const nameBoxY = boxY - nameBoxH / 2;

        ctx.fillStyle = '#0a0a18';
        ctx.fillRect(nameBoxX, nameBoxY, nameBoxW, nameBoxH);
        ctx.strokeStyle = '#f0f0f0';
        ctx.lineWidth = 2;
        ctx.strokeRect(nameBoxX, nameBoxY, nameBoxW, nameBoxH);

        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.npcName, nameBoxX + 12, nameBoxY + nameBoxH / 2 + 1);

        ctx.font = 'bold 11px "Press Start 2P", monospace';
        ctx.fillStyle = '#ffffff';

        const maxWidth = boxW - padding * 2 - 10;
        const lineHeight = 24;
        const words = this.displayedText.split(' ');
        let currentDrawLine = '';
        let drawY = boxY + 32;

        for (const word of words) {
            const testLine = currentDrawLine + (currentDrawLine ? ' ' : '') + word;
            if (ctx.measureText(testLine).width > maxWidth && currentDrawLine) {
                ctx.fillText(currentDrawLine, boxX + padding + 4, drawY);
                currentDrawLine = word;
                drawY += lineHeight;
            } else {
                currentDrawLine = testLine;
            }
        }
        ctx.fillText(currentDrawLine, boxX + padding + 4, drawY);

        const line = this.lines[this.currentLine];
        if (this.charIndex >= line.length) {
            const blink = Math.sin(this.cursorBlink * 3) > 0;
            if (blink) {
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 9px "Press Start 2P", monospace';
                ctx.textAlign = 'right';
                const label = this.currentLine < this.lines.length - 1 ? '\u25BC Suivant' : '\u25BC Fermer';
                ctx.fillText(label, boxX + boxW - padding - 4, boxY + boxH - 16);
                ctx.textAlign = 'left';
            }
        }
    }
}
