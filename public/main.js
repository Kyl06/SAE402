/**
 * @file main.js
 * @description Point d'entrée principal du client.
 * Initialise le moteur, gère le menu de démarrage, charge les assets et lance la boucle de jeu.
 */

import { GameEngine } from "./engine/GameEngine.js";
import { Assets } from "./engine/Assets.js";
import { InputHandler } from "./engine/InputHandler.js";
import { Player } from "./entities/Player/Player.js";
import { Moblin } from "./entities/Enemies/Moblin.js";
import { Octorok } from "./entities/Enemies/Octorok.js";                    // ← AJOUTÉ
import { NetworkOctorok } from "./entities/Enemies/NetworkOctorok.js";     // ← AJOUTÉ
import { BottomBar } from "./ui/BottomBar.js";
import { NetworkUpdater } from "./engine/NetworkUpdater.js";
import { Map } from "./world/Map.js";
import { level1 } from "./world/maps/level1.js";

// --- INITIALISATION DU MOTEUR ---
const engine = new GameEngine("gameCanvas");
const inputs = new InputHandler();

// Création d'un objet global 'game' pour un accès facile depuis n'importe quelle entité
window.game = { engine, inputs, player: null };

/**
 * Fonction de réapparition (Respawn).
 */
window.respawn = function () {
    const player = window.game.player;
    const ui = document.getElementById("game-over-ui");
    if (player) {
        if (ui) ui.style.display = "none";
        player.x = 100;
        player.y = 100;
        player.hp = 6;
        player.isDead = false;
        player.visible = true;
        player.collider = true;
        player.actionAnimation = null;
        player.isPainFlashing = false;
    }
};

/**
 * Génère des ennemis aléatoirement sur la carte.
 * Uniquement appelé par l'Hôte.
 * @param {number} moblinCount - Nombre de Moblins
 * @param {number} octorokCount - Nombre d'Octoroks
 */
function spawnEnemyGroup(moblinCount = 3, octorokCount = 2) {  // ← MODIFIÉ : 2 paramètres
    // Spawn des Moblins
    for (let i = 0; i < moblinCount; i++) {
        const x = 200 + Math.random() * 400;
        const y = 200 + Math.random() * 300;
        engine.add(new Moblin(x, y, 120));
    }
    
    // ← NOUVEAU : Spawn des Octoroks
    for (let i = 0; i < octorokCount; i++) {
        const x = 300 + Math.random() * 300;  // Zone légèrement différente pour varier
        const y = 300 + Math.random() * 250;
        engine.add(new Octorok(x, y, 100));   // Rayon de patrouille 100px
    }
}

/**
 * Attente asynchrone du choix du joueur dans le menu HTML.
 */
function waitForPlayerSelection() {
    return new Promise((resolve) => {
        const check = setInterval(() => {
            if (window.selectedPlayerRole !== null) {
                clearInterval(check);
                resolve(window.selectedPlayerRole);
            }
        }, 100);
    });
}

// --- CHARGEMENT DES RESSOURCES ET LANCEMENT ---

Assets.load({
    LINK: "./assets/link1.png",
    LINK2: "./assets/link2.png",
    MOBLIN: "./assets/moblin.png",
    OCTOROK: "./assets/octorok.png",              // ← AJOUTÉ : Sprite Octorok
    HEARTS: "./assets/hearts.png",
    EXPLOSION: "./assets/explosion.png",
    SWORD: "./assets/sword.png",
    ARROW: "./assets/arrow.png",
}).then(async () => {
    // ① Attendre le choix du rôle
    const role = await waitForPlayerSelection();
    const forceHost = (role === 1);

    // ② Charger la carte
    const worldMap = new Map(engine);
    worldMap.load(level1);

    // ③ Créer le héros local
    const hero = new Player(100, 100, forceHost ? "LINK" : "LINK2");
    window.game.player = hero;
    engine.add(hero);

    // ④ Initialisation du réseau
    const network = new NetworkUpdater(hero, engine, forceHost);
    window.game.network = network;
    
    // ❌ SUPPRIMÉ : registerEntityType n'existe plus, la détection est automatique via enemyType

    // ⑤ Logique spécifique au rôle
    if (forceHost) {
        // L'Hôte spawn les ennemis : 3 Moblins + 2 Octoroks
        spawnEnemyGroup(3, 2);
        console.log("[Main] Master Mode: Je gère les monstres (Moblins + Octoroks).");
    } else {
        console.log("[Main] Client Mode: J'attends les données de l'Hôte.");
    }

    // ⑥ Interface HUD
    engine.add(new BottomBar());

    // ⑦ Boucle de synchronisation réseau (~33 FPS)
    setInterval(() => network.sendUpdate(), 30);

    // ← NOUVEAU : Gestion des projectiles Octorok reçus du réseau (côté client uniquement)
    if (!forceHost && window.game.network?.socket) {
        window.game.network.socket.on('projectile', (data) => {
            // Import dynamique pour éviter les cycles de dépendance
            import('./entities/Enemies/OctorokProjectile.js').then(({ OctorokProjectile }) => {
                const proj = new OctorokProjectile(data.x, data.y, data.vx, data.vy, data.ownerId);
                proj.netId = data.id;
                engine.add(proj);
            });
        });
    }

    // ⑧ Démarrage de la boucle de jeu
    engine.start();

    // ⑨ Cacher le menu
    window.hideMenu?.();
});