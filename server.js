const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// Liste des IDs connectés pour savoir qui est le 1er, 2ème, etc.
let connectedPlayers = [];

io.on('connection', (socket) => {
    connectedPlayers.push(socket.id);

    // Attribution du skin selon l'index
    // Joueur 1 (index 0) -> LINK | Joueur 2 (index 1) -> LINK2
    const playerIndex = connectedPlayers.indexOf(socket.id);
    const assignedSkin = (playerIndex % 2 === 0) ? "LINK" : "LINK2";

    console.log(`[Network] Joueur ${socket.id} connecté (Skin: ${assignedSkin})`);

    // On envoie au joueur son skin assigné dès la connexion
    socket.emit('init_player', {
        skin: assignedSkin,
        isHost: (playerIndex === 0)
    });

    socket.on('player_update', (data) => {
        // "data" contient maintenant aussi le skin utilisé pour que les autres sachent quoi dessiner
        socket.broadcast.emit('network_update', {
            id: socket.id,
            data: data
        });
    });

    socket.on('disconnect', () => {
        console.log(`[Network] Joueur déconnecté : ${socket.id}`);
        connectedPlayers = connectedPlayers.filter(id => id !== socket.id);
        io.emit('player_disconnected', socket.id);
    });

    socket.on('enemies_update', (enemiesData) => {
        // Le Host envoie la liste de tous les ennemis, on la renvoie aux autres
        socket.broadcast.emit('network_enemies', enemiesData);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('--- SERVEUR ZELDA COOP PRÊT ---');
    console.log(`Accès local : http://localhost:${PORT}`);
});