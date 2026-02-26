const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// On sert les fichiers qui sont dans le dossier public
app.use(express.static(path.join(__dirname, '../public')));

let players = {};

io.on('connection', (socket) => {
    // 1. LIMITE DE JOUEURS : On compte combien il y a de gens connectés
    const count = Object.keys(players).length;

    if (count >= 4) {
        console.log("Refusé : Le serveur est plein (4/4)");
        socket.emit('error', 'Le serveur est plein, réessaie plus tard !');
        socket.disconnect(); // On coupe la connexion proprement
        return;
    }

    // 2. CRÉATION DU JOUEUR : On lui donne un rôle (P1, P2, P3 ou P4)
    const role = 'P' + (count + 1);
    console.log(`Joueur connecté : ${socket.id} (Rôle: ${role})`);

    // Position de départ selon le rôle pour éviter qu'ils soient tous l'un sur l'autre
    players[socket.id] = { 
        x: 50 + (count * 100), 
        y: 150, 
        role: role,
        anim: { fX: 0, fY: 0, state: 'walk' } 
    };

    // 3. RÉCEPTION DES MOUVEMENTS : On met à jour les données du joueur
    socket.on('move', (data) => {
        if (players[socket.id]) {
            players[socket.id].x = data.x;
            players[socket.id].y = data.y;
            players[socket.id].anim = data.anim;
        }
    });

    // 4. DÉCONNEXION : On prévient les autres pour qu'ils effacent le perso
    socket.on('disconnect', () => {
        console.log(`Joueur déconnecté : ${socket.id}`);
        delete players[socket.id];
        io.emit('playerLeft', socket.id);
    });
});

// Envoi de la position de tout le monde à tous les clients (60 fois par seconde)
setInterval(() => {
    io.emit('worldUpdate', players);
}, 1000 / 60);

// Lancement du serveur
const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`--- SERVEUR MINISH CAP DÉMARRÉ ---`);
    console.log(`Joueurs max : 4`);
    console.log(`Local : http://localhost:${PORT}`);
});