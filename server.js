const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path'); // AJOUTE CETTE LIGNE

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

let players = {};

io.on('connection', (socket) => {
    console.log(`Joueur connecté : ${socket.id}`);
    
    // Position initiale par défaut
    players[socket.id] = { x: 32, y: 32, color: 'blue', id: socket.id };

    // Envoyer la liste des joueurs
    io.emit('updatePlayers', players);

    // Quand un joueur bouge
    socket.on('move', (data) => {
        if (players[socket.id]) {
            players[socket.id].x = data.x;
            players[socket.id].y = data.y;
            players[socket.id].direction = data.direction; // Ajouté direction
            players[socket.id].isAttacking = data.isAttacking; // Ajouté attaque
            socket.broadcast.emit('updatePlayers', players);
        }
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('updatePlayers', players);
    });
});

server.listen(3000, () => console.log("Serveur sur http://localhost:3000"));