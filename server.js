/**
 * @file server.js
 * @description Serveur Node.js pour le jeu Zelda Coop.
 * Gère la distribution des fichiers statiques et la synchronisation multijoueur via Socket.io.
 */

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');

// Configuration du dossier 'public' pour servir les assets (images, scripts, html)
app.use(express.static(path.join(__dirname, 'public')));

/**
 * État global des rôles du jeu.
 * player1: ID du socket de l'hôte (Link vert)
 * player2: ID du socket du client (Link bleu)
 */
let roles = { player1: null, player2: null };

/**
 * Diffuse l'état actuel de disponibilité des rôles à tous les clients.
 * Cela permet de griser ou désactiver les options dans le menu de démarrage.
 */
function broadcastRoles() {
    io.emit('roles_update', {
        player1Taken: roles.player1 !== null,
        player2Taken: roles.player2 !== null,
    });
}

// Gestion des connexions Socket.io
io.on('connection', (socket) => {
    console.log(`[Network] Nouvelle connexion : ${socket.id}`);

    // Dès qu'un client se connecte, on lui envoie l'état des rôles disponibles
    socket.emit('roles_update', {
        player1Taken: roles.player1 !== null,
        player2Taken: roles.player2 !== null,
    });

    /**
     * Événement de sélection de rôle (déclenché depuis le menu HTML).
     * @param {string} role - 'player1' ou 'player2'
     */
    socket.on('select_role', (role) => {
        // Tentative de devenir le Joueur 1 (Hôte)
        if (role === 'player1' && !roles.player1) {
            roles.player1 = socket.id;
            socket.emit('role_confirmed', { role: 'player1', skin: 'LINK', isHost: true });
            broadcastRoles();
            console.log(`[Network] ${socket.id} est maintenant Joueur 1 (Hôte)`);
        } 
        // Tentative de devenir le Joueur 2 (Client)
        else if (role === 'player2' && !roles.player2) {
            roles.player2 = socket.id;
            socket.emit('role_confirmed', { role: 'player2', skin: 'LINK2', isHost: false });
            broadcastRoles();
            console.log(`[Network] ${socket.id} est maintenant Joueur 2 (Client)`);
        } 
        // Si le rôle est déjà pris entre temps
        else {
            socket.emit('role_denied', { reason: 'Rôle déjà pris par un autre joueur.' });
        }
    });

    /**
     * Mise à jour de la position et de l'état du joueur.
     * Les données sont relayées à tous les autres clients.
     */
    socket.on('player_update', (data) => {
        socket.broadcast.emit('network_update', { id: socket.id, data });
    });

    /**
     * Signalement d'une action de combat (coup d'épée, tir à l'arc).
     */
    socket.on('player_action', (data) => {
        socket.broadcast.emit('network_player_action', { id: socket.id, ...data });
    });

    /**
     * Synchronisation des ennemis (uniquement envoyé par l'Hôte).
     * L'Hôte est le seul maître du déplacement et de la vie des monstres.
     */
    socket.on('enemies_update', (enemiesData) => {
        socket.broadcast.emit('network_enemies', enemiesData);
    });

    /**
     * Signalement d'un coup porté à un ennemi.
     * Envoyé par n'importe quel joueur, relayé pour validation (habituellement par l'Hôte).
     */
    socket.on('enemy_hit', (data) => {
        socket.broadcast.emit('network_enemy_hit', data);
    });

    /**
     * Signalement d'une explosion (mort d'un ennemi).
     * L'Hôte notifie tout le monde pour afficher l'effet visuel.
     */
    socket.on('explosion', (data) => {
        socket.broadcast.emit('network_explosion', data);
    });

    /**
     * Gestion de la déconnexion.
     * Libère le rôle précédemment occupé pour permettre à un autre joueur de le prendre.
     */
    socket.on('disconnect', () => {
        console.log(`[Network] Joueur déconnecté : ${socket.id}`);
        if (roles.player1 === socket.id) roles.player1 = null;
        if (roles.player2 === socket.id) roles.player2 = null;
        
        // On informe les autres qu'un joueur est parti
        io.emit('player_disconnected', socket.id);
        // On met à jour la disponibilité des rôles pour le menu
        broadcastRoles();
    });
});

// Démarrage du serveur sur le port spécifié ou 3000 par défaut
const PORT = process.env.PORT || 3000;

server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.error(`❌ Erreur : Le port ${PORT} est déjà utilisé par une autre application.`);
        console.error(`👉 Solutions :`);
        console.error(`   1. Ferme tes autres consoles ou onglets qui pourraient faire tourner le jeu.`);
        console.error(`   2. Utilise la commande : npx kill-port ${PORT} (si disponible).`);
        console.log('--- FERMETURE DU SERVEUR ---');
        process.exit(1);
    }
});

server.listen(PORT, () => {
    console.log('--- LE SERVEUR ZELDA COOP EST LANCÉ ---');
    console.log(`Lien local : http://localhost:${PORT}`);
});