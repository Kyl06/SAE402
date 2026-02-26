import { Player } from './entities/Player.js';
import { MapManager } from './MapManager.js';

export class Engine {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.map = new MapManager();
        this.localPlayer = null;
        
        // On remplace "remotePlayer" par une Map pour en avoir plusieurs
        this.remotePlayers = new Map(); 
        
        this.lastTime = 0;
        this.input = null;
        this.network = null;
    }

    start() { 
        requestAnimationFrame((t) => this.loop(t)); 
    }

    loop(t) {
        const dt = (t - this.lastTime) / 1000;
        this.lastTime = t;
        this.update(dt);
        this.render();
        requestAnimationFrame((t) => this.loop(t));
    }

    update(dt) {
        if (!this.localPlayer || !this.input) return;

        this.localPlayer.update(dt, this.input); 

        const next = this.localPlayer.getNextPosition(dt, this.input);
        if (!this.map.isWall(next.x, next.y)) {
            this.localPlayer.x = next.x;
            this.localPlayer.y = next.y;
        }

        this.network.sendMove(this.localPlayer.x, this.localPlayer.y, {
            fX: this.localPlayer.frameX,
            fY: this.localPlayer.frameY,
            state: this.localPlayer.currentState 
        });
    }

    // Gestion de TOUS les autres joueurs
    updateRemote(serverPlayers) {
        for (let id in serverPlayers) {
            const sP = serverPlayers[id];
            
            // Si c'est moi
            if (id === this.network.socket.id) {
                if (!this.localPlayer) {
                    this.localPlayer = new Player(id, sP.x, sP.y, true, sP.role);
                }
            } 
            // Si c'est un des autres (jusqu'à 3 autres)
            else {
                // Si on ne connaît pas encore ce joueur, on le crée
                if (!this.remotePlayers.has(id)) {
                    this.remotePlayers.set(id, new Player(id, sP.x, sP.y, false, sP.role));
                }
                
                // On met à jour ses infos
                const p = this.remotePlayers.get(id);
                p.x = sP.x;
                p.y = sP.y;
                if (sP.anim) {
                    p.frameX = sP.anim.fX || 0;
                    p.frameY = sP.anim.fY || 0;
                    p.currentState = sP.anim.state || 'walk';
                }
            }
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.map) this.map.draw(this.ctx);

        // On dessine TOUS les joueurs distants
        this.remotePlayers.forEach(player => {
            player.draw(this.ctx);
        });
        
        // On se dessine nous par-dessus
        if (this.localPlayer) this.localPlayer.draw(this.ctx);

        this.drawHUD(this.ctx); 
    }

    // On oublie pas de nettoyer quand quelqu'un part !
    removePlayer(id) {
        this.remotePlayers.delete(id);
    }

    drawHUD(ctx) {
        const p = this.localPlayer;
        if (!p) return;

        // HUD identique (cœurs + stamina)
        for (let i = 0; i < 3; i++) {
            let x = 20 + (i * 35);
            let y = 20;
            let heartValue = p.hp - (i * 2);
            ctx.fillStyle = heartValue >= 2 ? "red" : (heartValue === 1 ? "orange" : "#330000");
            ctx.fillRect(x, y, 25, 25); 
        }
    
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(20, 55, 100, 10);
        let staminaWidth = (p.stamina / p.maxStamina) * 100;
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(20, 55, staminaWidth, 10);
    }
}