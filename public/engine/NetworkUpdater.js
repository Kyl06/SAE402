import { NetworkPlayer } from '../entities/Player/NetworkPlayer.js';

export class NetworkUpdater {
    constructor(localPlayer, engine) {
        this.localPlayer = localPlayer;
        this.engine = engine;
        this.remotePlayers = {}; // Liste des joueurs distants
        
        // Initialisation sécurisée de Socket.io
        this.socket = (typeof io !== 'undefined') ? io() : null;
        this.setupListeners();
    }

    setupListeners() {
        if (!this.socket) return;

        // Réception des données d'un autre joueur
        this.socket.on('network_update', ({ id, data }) => {
            const [action, x, y, facing] = data.split('|');

            // Création automatique si le joueur est nouveau
            if (!this.remotePlayers[id]) {
                const newNetPlayer = new NetworkPlayer(parseInt(x), parseInt(y));
                this.remotePlayers[id] = newNetPlayer;
                this.engine.add(newNetPlayer);
                console.log(`Joueur rejoint : ${id}`);
            }

            // Mise à jour de l'état
            const p = this.remotePlayers[id];
            p.x = parseInt(x);
            p.y = parseInt(y);
            p.facing = facing;
            p.currentAction = action; // Stocke l'action (ex: SWORD)
        });

        // Suppression d'un joueur déconnecté
        this.socket.on('player_disconnected', (id) => {
            if (this.remotePlayers[id]) {
                this.remotePlayers[id].kill();
                delete this.remotePlayers[id];
                console.log(`Joueur quitté : ${id}`);
            }
        });
    }

    // Envoi des données locales au serveur
    sendUpdate() {
        if (!this.socket) return;
        const p = this.localPlayer;
        const action = p.actionAnimation?.type || "IDLE";
        const msg = `${action}|${Math.round(p.x)}|${Math.round(p.y)}|${p.facing}`;
        this.socket.emit('player_update', msg);
    }
}