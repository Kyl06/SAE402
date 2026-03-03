const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');

// Configuration du dossier des fichiers statiques (ton client)
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log(`[Network] Nouveau joueur connecté : ${socket.id}`);

    // Diffusion des mouvements : 
    // On reçoit les données d'un joueur et on les renvoie à TOUS les autres (broadcast)
    socket.on('player_update', (data) => {
        socket.broadcast.emit('network_update', { 
            id: socket.id, 
            data: data 
        });
    });

    // Nettoyage : quand un joueur quitte, on avertit les autres pour supprimer son sprite
    socket.on('disconnect', () => {
        console.log(`[Network] Joueur déconnecté : ${socket.id}`);
        io.emit('player_disconnected', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('--- SERVEUR ZELDA COOP PRÊT ---');
    console.log(`Accès local : http://localhost:${PORT}`);
});