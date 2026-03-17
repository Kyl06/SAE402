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
import { Octorok } from "./entities/Enemies/Octorok.js";
import { Maldek } from "./entities/Enemies/Maldek.js";
import { BottomBar } from "./ui/BottomBar.js";
import { NetworkUpdater } from "./engine/NetworkUpdater.js";
import { Map } from "./world/Map.js";
import { level1 } from "./world/maps/level2.js";

// --- INITIALISATION DU MOTEUR ---
const engine = new GameEngine("gameCanvas");
const inputs = new InputHandler();

/**
 * Création d'un objet global 'game' pour un accès facile depuis n'importe quelle entité.
 * On y stocke l'engine pour que Moblin.js puisse faire window.game.engine.add() sans erreur.
 */
window.game = { 
    engine: engine, 
    inputs: inputs, 
    player: null,
    network: null 
};

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
        player.emeralds = 0; // Reset inventaire
        player.arrows = 30;   // Reset munitions
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
 */
function spawnEnemyGroup(moblinCount = 3, octorokCount = 2, maldekCount = 1) {
    // Spawn des Moblins
    for (let i = 0; i < moblinCount; i++) {
        const x = 200 + Math.random() * 400;
        const y = 200 + Math.random() * 300;
        engine.add(new Moblin(x, y, 120));
    }
    
    // Spawn des Octoroks
    for (let i = 0; i < octorokCount; i++) {
        const x = 300 + Math.random() * 300;
        const y = 300 + Math.random() * 250;
        engine.add(new Octorok(x, y, 100));
    }

    // Spawn des Maldeks
    for (let i = 0; i < maldekCount; i++) {
        const x = 400 + Math.random() * 200;
        const y = 400 + Math.random() * 200;
        engine.add(new Maldek(x, y, 150));
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
    OCTOROK: "./assets/octorok.png",
    MALDEK: "./assets/maldek.png",
    HEARTS: "./assets/hearts.png",    
    EMERALD: "./assets/emeraude.png", 
    EXPLOSION: "./assets/explosion.png", 
    SWORD: "./assets/sword.png",      
    ARROW: "./assets/arrow.png",      
    TILESET: "./assets/map.png",  
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
    
    // ⑤ Logique spécifique au rôle
    if (forceHost) {
        spawnEnemyGroup(0, 0, 1);
        console.log("[Main] Master Mode: Je gère les monstres et le loot.");
    } else {
        console.log("[Main] Client Mode: Synchronisation avec l'Hôte.");
    }

    // ⑥ Interface HUD
    engine.add(new BottomBar());

    // ⑦ Boucle de synchronisation réseau (~33 FPS)
    setInterval(() => network.sendUpdate(), 30);

    // ⑧ Démarrage de la boucle de jeu
    engine.start();

    // ⑨ Cacher le menu
    if (typeof window.hideMenu === 'function') {
        window.hideMenu();
    }
});