export class Network {
    constructor(engine) {
        this.engine = engine;
        this.socket = io(); // Connexion au serveur Socket.io
    }

    // On branche les écouteurs d'événements réseau
    connect() {
        // On reçoit la mise à jour de tous les joueurs (positions, animations...)
        this.socket.on('worldUpdate', (players) => {
            this.engine.updateRemote(players);
        });
        
        // Quand un joueur se déconnecte, on demande à l'Engine de le supprimer de la liste
        this.socket.on('playerLeft', (id) => {
            this.engine.removePlayer(id);
        });

        // Optionnel : Alerte si le serveur est plein
        this.socket.on('error', (msg) => {
            alert(msg);
        });
    }

    // On envoie nos coordonnées et notre état d'animation au serveur
    sendMove(x, y, animData) {
        this.socket.emit('move', { 
            x: x, 
            y: y, 
            anim: animData 
        });
    }
}