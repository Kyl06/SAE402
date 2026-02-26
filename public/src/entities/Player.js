export class Player {
    constructor(id, x, y, isLocal, role) {
        // Infos de base et position de départ
        this.id = id;
        this.x = x;
        this.y = y;
        this.isLocal = isLocal;
        this.role = role;
        this.speed = 150;

        // Santé et endurance (3 cœurs = 6 HP)
        this.maxHp = 6;
        this.hp = 6;
        this.maxStamina = 100;
        this.stamina = 100;
        this.staminaRegen = 20; 
        this.attackCost = 30;

        // Chargement du perso (Link)
        this.img = new Image();
        this.img.src = '/assets/link.png';
        this.loaded = false;
        this.img.onload = () => { this.loaded = true; };

        // Gestion de l'état et des animations
        this.currentState = 'walk'; // Est-ce qu'il marche ou attaque ?
        this.dir = 'down';          // Regarde en bas par défaut
        this.frameX = 0;
        this.frameY = 0;
        this.flipX = false;
        this.animTimer = 0;
    }

    // On calcule où il veut aller sans le déplacer tout de suite (pour les murs)
    getNextPosition(dt, input) {
        if (!this.isLocal || !input || this.currentState === 'attack') {
            return { x: this.x, y: this.y };
        }

        let nx = this.x;
        let ny = this.y;
        let moving = false;

        // On gère les touches ZSQD
        if (input.keys['s']) { 
            ny += this.speed * dt;
            this.frameY = 0; // Ligne "bas"
            this.dir = 'down';
            moving = true;
        } else if (input.keys['z']) { 
            ny -= this.speed * dt;
            this.frameY = 2; // Ligne "haut"
            this.dir = 'up';
            moving = true;
        }

        if (input.keys['q']) { 
            nx -= this.speed * dt;
            this.frameY = 1; // Ligne "côté"
            this.flipX = true; // On retourne l'image
            this.dir = 'side';
            moving = true;
        } else if (input.keys['d']) { 
            nx += this.speed * dt;
            this.frameY = 1; 
            this.flipX = false;
            this.dir = 'side';
            moving = true;
        }

        // Petit timer pour alterner les jambes pendant la marche
        if (moving) {
            this.animTimer += dt;
            if (this.animTimer > 0.12) {
                this.frameX = (this.frameX === 0) ? 1 : 0;
                this.animTimer = 0;
            }
        } else {
            this.frameX = 0; // Pieds joints à l'arrêt
        }

        return { x: nx, y: ny };
    }

    // Mise à jour de l'endurance et de l'attaque
    update(dt, input) {
        if (!this.isLocal || !input) return;
    
        // La stamina remonte toute seule
        if (this.stamina < this.maxStamina) {
            this.stamina = Math.min(this.maxStamina, this.stamina + this.staminaRegen * dt);
        }
    
        // Si on appuie sur Espace, on lance l'attaque
        if (input.keys[' '] && this.currentState !== 'attack' && this.stamina >= this.attackCost) {
            this.currentState = 'attack';
            this.stamina -= this.attackCost;
            this.frameX = 0;
            this.animTimer = 0;
        }

        // On fait défiler les images de l'attaque
        if (this.currentState === 'attack') {
            this.animTimer += dt;
            if (this.animTimer > 0.08) {
                this.frameX++;
                this.animTimer = 0;
                if (this.frameX > 3) { // Fin de l'attaque après 4 frames
                    this.currentState = 'walk';
                    this.frameX = 0;
                }
            }
        }
    }

    // Dessin du perso sur le canvas
    draw(ctx) {
        if (this.loaded) {
            ctx.save();
            ctx.imageSmoothingEnabled = false; // Pour garder l'effet Pixel Art
            const s = 16;   // Taille d'un carré sur l'image
            const zoom = 3; // On l'affiche en 48x48 (16*3)
            
            if (this.flipX && this.dir === 'side') {
                // On inverse le dessin pour regarder à gauche
                ctx.translate(Math.round(this.x) + s * zoom, Math.round(this.y));
                ctx.scale(-1, 1);
                ctx.drawImage(this.img, this.frameX * s, this.frameY * s, s, s, 0, 0, s * zoom, s * zoom);
            } else {
                ctx.drawImage(this.img, this.frameX * s, this.frameY * s, s, s, Math.round(this.x), Math.round(this.y), s * zoom, s * zoom);
            }
            ctx.restore();
        } else {
            // Si l'image bug, on dessine un carré (pratique pour débugger)
            ctx.fillStyle = (this.currentState === 'attack') ? 'red' : '#00FF00';
            ctx.fillRect(this.x, this.y, 40, 40);
        }
    }
}