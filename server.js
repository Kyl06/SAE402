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
const fs = require('fs');

const SAVE_FILE = path.join(__dirname, 'save.json');

// Sert les fichiers du dossier 'public' - desactive le cache pour les .js
app.use(express.static(path.join(__dirname, 'public'), {
    etag: false,
    lastModified: false,
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
        }
    }
}));
app.use(express.json());

function loadSave() {
    try {
        if (fs.existsSync(SAVE_FILE)) {
            return JSON.parse(fs.readFileSync(SAVE_FILE, 'utf8'));
        }
    } catch (e) {
        console.log('[Save] Erreur de lecture:', e.message);
    }
    return null;
}

function writeSave(data) {
    try {
        fs.writeFileSync(SAVE_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
        console.log('[Save] Erreur d\'ecriture:', e.message);
    }
}

// API de sauvegarde
app.get('/api/save', (req, res) => {
    const data = loadSave();
    res.json(data || { exists: false });
});

app.post('/api/save', (req, res) => {
    writeSave(req.body);
    console.log('[Save] Partie sauvegardee');
    res.json({ ok: true });
});

app.delete('/api/save', (req, res) => {
    try {
        if (fs.existsSync(SAVE_FILE)) fs.unlinkSync(SAVE_FILE);
    } catch (e) { /* ignore */ }
    console.log('[Save] Nouvelle partie');
    res.json({ ok: true });
});

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

    socket.on('zone_change', (data) => {
        socket.broadcast.emit('network_zone_change', data);
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
    console.log(`--- SERVEUR ZELDA LANCÉ SUR http://localhost:${PORT} ---`);
});