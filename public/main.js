import { GameEngine } from "./engine/GameEngine.js";
import { Assets } from "./engine/Assets.js";
import { InputHandler } from "./engine/InputHandler.js";
import { Player } from "./entities/Player/Player.js";
import { Moblin } from "./entities/Enemies/Moblin.js";
import { BottomBar } from "./ui/BottomBar.js";
import { NetworkUpdater } from "./engine/NetworkUpdater.js";
import { Map } from "./world/Map.js";
import { level1 } from "./world/maps/level1.js";

// --- Configuration Initiale ---
const engine = new GameEngine("gameCanvas");
const inputs = new InputHandler();

// Exposition globale pour faciliter l'accès entre les classes
window.game = { engine, inputs, player: null };

/**
 * Fonction de réapparition (appelée depuis l'UI HTML)
 */
window.respawn = function () {
    const player = window.game.player;
    const ui = document.getElementById("game-over-ui");

    if (player) {
        if (ui) ui.style.display = "none";

        // Réinitialisation complète de l'état du héros
        player.x = 100;
        player.y = 100;
        player.hp = 6;
        player.isDead = false;
        player.visible = true;
        player.collider = true;
        player.actionAnimation = null;
        player.isPainFlashing = false;

        console.log("Héros réanimé ! Prêt pour le combat.");
    }
};

/**
 * Génère un groupe d'ennemis sur la carte
 */
function spawnEnemyGroup(count) {
    for (let i = 0; i < count; i++) {
        // Spawn aléatoire dans une zone sécurisée
        const x = 200 + Math.random() * 400; 
        const y = 200 + Math.random() * 300;
        engine.add(new Moblin(x, y, 120)); 
    }
}

// --- Chargement des Ressources et Démarrage ---
Assets.load({
    LINK: "./assets/link.png",
    MOBLIN: "./assets/moblin.png",
    HEARTS: "./assets/hearts.png",
    EXPLOSION: "./assets/explosion.png",
    SWORD: "./assets/sword.png",
    ARROW: "./assets/arrow.png",
}).then(() => {
    // 1. Initialisation du Monde
    const worldMap = new Map(engine);
    worldMap.load(level1);

    // 2. Initialisation du Joueur
    const hero = new Player(100, 100, "LINK");
    window.game.player = hero;
    engine.add(hero);

    // 3. Peuplement de la zone
    spawnEnemyGroup(4);

    // 4. Interface et Synchronisation Réseau
    engine.add(new BottomBar());
    
    const network = new NetworkUpdater(hero);
    setInterval(() => network.sendUpdate(), 50); // 20 updates par seconde (standard)

    // 5. Lancement du moteur
    engine.start();
});