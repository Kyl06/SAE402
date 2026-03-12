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
import { BottomBar } from "./ui/BottomBar.js";
import { NetworkUpdater } from "./engine/NetworkUpdater.js";
import { Map } from "./world/Map.js";
import { level1 } from "./world/maps/level1.js";

// --- INITIALISATION DU MOTEUR ---
const engine = new GameEngine("gameCanvas"); // Crée le moteur lié au canvas HTML
const inputs = new InputHandler();             // Initialise l'écoute du clavier

// Création d'un objet global 'game' pour un accès facile depuis n'importe quelle entité
window.game = { engine, inputs, player: null };

/**
 * Fonction de réapparition (Respawn).
 * Réinitialise l'état du joueur local sans recharger la page.
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
 * @param {number} count - Nombre d'ennemis à créer.
 */
function spawnEnemyGroup(count) {
    for (let i = 0; i < count; i++) {
        const x = 200 + Math.random() * 400; // Position X entre 200 et 600
        const y = 200 + Math.random() * 300; // Position Y entre 200 et 500
        engine.add(new Moblin(x, y, 120));    // Ajoute un Moblin avec un rayon de patrouille de 120px
    }
}

/**
 * Attente asynchrone du choix du joueur dans le menu HTML.
 * @returns {Promise<number>} - Promesse résolue avec le rôle (1 pour Hôte, 2 pour Client).
 */
function waitForPlayerSelection() {
    return new Promise((resolve) => {
        const check = setInterval(() => {
            // window.selectedPlayerRole est modifié par le script dans index.html
            if (window.selectedPlayerRole !== null) {
                clearInterval(check);
                resolve(window.selectedPlayerRole);
            }
        }, 100);
    });
}

// --- CHARGEMENT DES RESSOURCES ET LANCEMENT ---

// Le chargeur d'Assets s'assure que toutes les images sont prêtes AVANT de démarrer
Assets.load({
    LINK: "./assets/link1.png",       // Sprite Link vert (Joueur 1)
    LINK2: "./assets/link2.png",      // Sprite Link bleu (Joueur 2)
    MOBLIN: "./assets/moblin.png",    // Sprite des ennemis
    HEARTS: "./assets/hearts.png",    // HUD Coeurs
    EXPLOSION: "./assets/explosion.png", // Animation de mort
    SWORD: "./assets/sword.png",      // FX Épée
    ARROW: "./assets/arrow.png",      // Projectile Arc
    TILESET: "./assets/map.png",  // Map
}).then(async () => {
    // ① Étape 1 : Attendre que l'utilisateur clique sur une carte dans le menu
    const role = await waitForPlayerSelection();
    const forceHost = (role === 1); // Joueur 1 devient l'Hôte (Master)

    // ② Étape 2 : Charger la carte (murs et collisions)
    const worldMap = new Map(engine);
    worldMap.load(level1);

    // ③ Étape 3 : Créer le héros local avec le bon skin
    const hero = new Player(100, 100, forceHost ? "LINK" : "LINK2");
    window.game.player = hero;
    engine.add(hero);

    // ④ Étape 4 : Initialisation du réseau
    // On passe 'forceHost' pour que le client sache immédiatement s'il doit gérer les mobs
    const network = new NetworkUpdater(hero, engine, forceHost);

    // ⑤ Étape 5 : Logique spécifique au rôle
    if (forceHost) {
        // L'Hôte décide du spawn des monstres
        spawnEnemyGroup(4);
        console.log("[Main] Master Mode: Je gère les monstres.");
    } else {
        console.log("[Main] Client Mode: J'attends les données de l'Hôte.");
    }

    // ⑥ Étape 6 : Ajout de l'interface (HUD)
    engine.add(new BottomBar());

    // ⑦ Étape 7 : Boucle de synchronisation réseau (33 FPS environ)
    setInterval(() => network.sendUpdate(), 30);

    // ⑧ Étape 8 : Démarrage de la boucle de rendu et de mise à jour (RequestAnimationFrame)
    engine.start();

    // ⑨ Étape 9 : On cache le menu de sélection pour révéler le canvas
    window.hideMenu?.();
});