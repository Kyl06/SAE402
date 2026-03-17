/**
 * @file DialogueBox.js
 * @description Boite de dialogue pour les interactions avec les PNJ.
 * Affiche le texte en mode "machine a ecrire" et avance avec la touche E.
 */

import { Entity } from '../engine/Entity.js';

export class DialogueBox extends Entity {
    constructor() {
        super(0, 0, 800, 660);
        this.z = 998;
        this.collider = false;

        // Etat du dialogue
        this.active = false;
        this.npcName = '';
        this.lines = [];
        this.currentLine = 0;
        this.displayedText = '';
        this.charIndex = 0;
        this.onComplete = null;

        // Vitesse du typewriter (caracteres par seconde)
        this.typeSpeed = 40;

        // Detection front montant touche E
        this.keyWasDown = false;

        // Animation curseur clignotant
        this.cursorBlink = 0;
    }

    /**
     * Affiche la boite de dialogue avec les lignes fournies.
     * @param {string} name - Nom du PNJ
     * @param {string[]} lines - Lignes de dialogue
     * @param {Function} onComplete - Callback a la fermeture
     */
    show(name, lines, onComplete) {
        this.active = true;
        this.npcName = name;
        this.lines = lines;
        this.currentLine = 0;
        this.charIndex = 0;
        this.displayedText = '';
        this.onComplete = onComplete;
        this.keyWasDown = true; // Eviter de skip la premiere ligne immediatement
        window.game.dialogueActive = true;
    }

    /**
     * Ferme la boite de dialogue.
     */
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

        // Typewriter : avancer caractere par caractere
        const line = this.lines[this.currentLine];
        if (this.charIndex < line.length) {
            this.charIndex += this.typeSpeed * (delta / 1000);
            if (this.charIndex > line.length) this.charIndex = line.length;
            this.displayedText = line.substring(0, Math.floor(this.charIndex));
        }

        // Animation curseur
        this.cursorBlink += delta * 0.004;

        // Detection touche E (front montant)
        const keyDown = window.game.inputs.isHeld('KeyE') || window.game.inputs.isHeld('Enter');
        if (keyDown && !this.keyWasDown) {
            if (this.charIndex < line.length) {
                // Le texte n'est pas fini : afficher tout d'un coup
                this.charIndex = line.length;
                this.displayedText = line;
            } else {
                // Passer a la ligne suivante ou fermer
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

    draw(ctx) {
        if (!this.active) return;

        const boxX = 40;
        const boxY = 440;
        const boxW = 720;
        const boxH = 120;
        const padding = 16;

        // Fond semi-transparent
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.fillRect(boxX, boxY, boxW, boxH);

        // Bordure
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        // Nom du PNJ (encadre)
        ctx.fillStyle = '#222222';
        ctx.fillRect(boxX + padding, boxY - 14, ctx.measureText(this.npcName).width + 20 || 100, 28);
        ctx.strokeStyle = '#ffcc00';
        ctx.lineWidth = 1;

        ctx.font = 'bold 16px monospace';
        ctx.fillStyle = '#ffcc00';
        ctx.textAlign = 'left';

        // Mesurer et dessiner le cadre du nom
        const nameWidth = ctx.measureText(this.npcName).width;
        ctx.fillStyle = '#111111';
        ctx.fillRect(boxX + padding - 2, boxY - 14, nameWidth + 16, 28);
        ctx.strokeStyle = '#ffcc00';
        ctx.strokeRect(boxX + padding - 2, boxY - 14, nameWidth + 16, 28);

        ctx.fillStyle = '#ffcc00';
        ctx.fillText(this.npcName, boxX + padding + 6, boxY + 6);

        // Texte du dialogue
        ctx.font = '14px monospace';
        ctx.fillStyle = '#ffffff';

        // Word wrap
        const maxWidth = boxW - padding * 2;
        const lineHeight = 20;
        const words = this.displayedText.split(' ');
        let currentDrawLine = '';
        let drawY = boxY + 36;

        for (const word of words) {
            const testLine = currentDrawLine + (currentDrawLine ? ' ' : '') + word;
            if (ctx.measureText(testLine).width > maxWidth && currentDrawLine) {
                ctx.fillText(currentDrawLine, boxX + padding, drawY);
                currentDrawLine = word;
                drawY += lineHeight;
            } else {
                currentDrawLine = testLine;
            }
        }
        ctx.fillText(currentDrawLine, boxX + padding, drawY);

        // Indicateur "appuie sur E"
        const line = this.lines[this.currentLine];
        if (this.charIndex >= line.length) {
            const blink = Math.sin(this.cursorBlink * 3) > 0;
            if (blink) {
                ctx.fillStyle = '#aaaaaa';
                ctx.font = '12px monospace';
                ctx.textAlign = 'right';
                const label = this.currentLine < this.lines.length - 1 ? '[ E ] Suivant' : '[ E ] Fermer';
                ctx.fillText(label, boxX + boxW - padding, boxY + boxH - 12);
                ctx.textAlign = 'left';
            }
        }
    }
}
