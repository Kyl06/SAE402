/**
 * @file server.js
 * @description Serveur Node.js pour le jeu Zelda Coop.
 * Gère la distribution des fichiers statiques et la synchronisation multijoueur.
 */

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');

// Sert les fichiers du dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

/**
 * État global des rôles
 */
let roles = { player1: null, player2: null };

function broadcastRoles() {
    io.emit('roles_update', {
        player1Taken: roles.player1 !== null,
        player2Taken: roles.player2 !== null,
    });
}

io.on('connection', (socket) => {
    console.log(`[Network] Connexion : ${socket.id}`);

    // Initialisation
    socket.emit('roles_update', {
        player1Taken: roles.player1 !== null,
        player2Taken: roles.player2 !== null,
    });

    // Sélection du rôle
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

    // --- RELAIS DES PROJECTILES ---
    socket.on('projectile', (data) => {
        // L'hôte tire -> on prévient le P2 pour qu'il affiche le projectile
        socket.broadcast.emit('network_projectile_spawn', data);
    });

    // --- RELAIS DU LOOT (ÉMERAUDES) ---
    socket.on('item_spawn', (data) => {
        // L'hôte crée un item -> on le fait apparaître chez le P2
        socket.broadcast.emit('network_item_spawn', data);
    });

    socket.on('item_collected', (data) => {
        // L'item est ramassé -> on demande à TOUT LE MONDE de le supprimer
        io.emit('network_item_remove', { id: data.id });
    });

    socket.on('item_pickup_request', (data) => {
        // Le P2 demande à ramasser -> on valide en demandant la suppression globale
        io.emit('network_item_remove', { id: data.itemId });
    });

    // --- SYNCHRO JOUEURS ET ACTIONS ---
    socket.on('player_update', (data) => {
        socket.broadcast.emit('network_update', { id: socket.id, data });
    });

    socket.on('player_action', (data) => {
        socket.broadcast.emit('network_player_action', { id: socket.id, ...data });
    });

    // --- SYNCHRO ENNEMIS (HOST ONLY) ---
    socket.on('enemies_update', (enemiesData) => {
        socket.broadcast.emit('network_enemies', enemiesData);
    });

    socket.on('enemy_hit', (data) => {
        socket.broadcast.emit('network_enemy_hit', data);
    });

    socket.on('explosion', (data) => {
        socket.broadcast.emit('network_explosion', data);
    });

    // Déconnexion
    socket.on('disconnect', () => {
        if (roles.player1 === socket.id) roles.player1 = null;
        if (roles.player2 === socket.id) roles.player2 = null;
        io.emit('player_disconnected', socket.id);
        broadcastRoles();
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`--- SERVEUR ZELDA LANCÉ SUR LE PORT ${PORT} ---`);
});