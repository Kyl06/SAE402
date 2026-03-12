/**
 * @file server.js
 */

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: { origin: "*" } // Sécurité pour éviter les blocages de navigateur
});
const path = require('path');

// Sert les fichiers du dossier 'public' (assure-toi que tes fichiers .js/.png sont dedans)
app.use(express.static(path.join(__dirname, 'public')));

let roles = { player1: null, player2: null };

function broadcastRoles() {
    io.emit('roles_update', {
        player1Taken: roles.player1 !== null,
        player2Taken: roles.player2 !== null,
    });
}

io.on('connection', (socket) => {
    console.log(`[Network] Connexion : ${socket.id}`);

    socket.emit('roles_update', {
        player1Taken: roles.player1 !== null,
        player2Taken: roles.player2 !== null,
    });

    socket.on('select_role', (role) => {
        if (role === 'player1' && !roles.player1) {
            roles.player1 = socket.id;
            socket.emit('role_confirmed', { role: 'player1', skin: 'LINK', isHost: true });
            broadcastRoles();
        } else if (role === 'player2' && !roles.player2) {
            roles.player2 = socket.id;
            socket.emit('role_confirmed', { role: 'player2', skin: 'LINK2', isHost: false });
            broadcastRoles();
        } else {
            socket.emit('role_denied', { reason: 'Rôle déjà pris.' });
        }
    });

    socket.on('projectile', (data) => {
        socket.broadcast.emit('network_projectile_spawn', data);
    });

    socket.on('item_spawn', (data) => {
        socket.broadcast.emit('network_item_spawn', data);
    });

    socket.on('item_collected', (data) => {
        io.emit('network_item_remove', { id: data.id });
    });

    socket.on('player_update', (data) => {
        socket.broadcast.emit('network_update', { id: socket.id, data });
    });

    socket.on('player_action', (data) => {
        socket.broadcast.emit('network_player_action', { id: socket.id, ...data });
    });

    socket.on('enemies_update', (enemiesData) => {
        socket.broadcast.emit('network_enemies', enemiesData);
    });

    socket.on('enemy_hit', (data) => {
        socket.broadcast.emit('network_enemy_hit', data);
    });

    socket.on('explosion', (data) => {
        socket.broadcast.emit('network_explosion', data);
    });

    socket.on('disconnect', () => {
        if (roles.player1 === socket.id) roles.player1 = null;
        if (roles.player2 === socket.id) roles.player2 = null;
        io.emit('player_disconnected', socket.id);
        broadcastRoles();
    });
});

// --- LANCEMENT DU SERVEUR ---
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`\x1b[32m%s\x1b[0m`, `--- SERVEUR ZELDA LANCÉ SUR http://localhost:${PORT} ---`);
});