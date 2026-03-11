/**
 * @file SpriteSequence.js
 * @description Une machine à état simple pour gérer des séquences d'animations temporelles.
 * Utilisée pour synchroniser les frames du joueur avec des actions (ex: attaquer à l'épée).
 */

export class SpriteSequence {
    /**
     * @param {string} type - Nom de l'action (ex: 'SWORD')
     * @param {Array<Object>} frames - Liste d'étapes { frame: index, duration: ms, callback: fonction }
     * @param {Function} onEnd - Fonction appelée quand la séquence est finie
     */
    constructor(type, frames, onEnd) {
        this.type = type;
        this.frames = frames;
        this.onEnd = onEnd;
        this.currentIndex = 0;
        this.elapsed = 0;
        
        // Optionnel : un objet de référence sur lequel agir lors des callbacks (ex: l'épée)
        this.actorObject = null;
    }

    /**
     * Met à jour le timer de la séquence.
     * @param {number} delta - Temps écoulé en ms
     */
    work(delta) {
        // Sécurité si on appelle work sur une séquence vide ou terminée
        if (!this.frames[this.currentIndex]) {
            this.onEnd?.(this.actorObject);
            return;
        }

        this.elapsed += delta;
        const currentStep = this.frames[this.currentIndex];

        // Si le temps de la frame actuelle est dépassé, on passe à la suivante
        if (this.elapsed >= currentStep.duration) {
            this.elapsed = 0;
            this.currentIndex++;

            // Fin de la séquence
            if (this.currentIndex >= this.frames.length) {
                this.onEnd?.(this.actorObject);
            } 
            // Sinon, exécution du callback de la nouvelle étape si défini
            else {
                const nextStep = this.frames[this.currentIndex];
                if (nextStep.callback && this.actorObject) {
                    nextStep.callback(this.actorObject);
                }
            }
        }
    }

    /** 
     * Retourne l'index de sprite que l'acteur (ex: Link) doit afficher.
     * @returns {number} 
     */
    get frameIdx() {
        return this.frames[this.currentIndex]?.frame ?? 0;
    }
}