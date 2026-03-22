/**
 * @file main.js
 * @description Point d'entree principal du client.
 * Initialise le moteur, gere le menu de demarrage, charge les assets et lance la boucle de jeu.
 */

import { GameEngine } from "./engine/GameEngine.js";
import { Assets } from "./engine/Assets.js";
import { InputHandler } from "./engine/InputHandler.js";
import { Player } from "./entities/Player/Player.js";
import { Moblin } from "./entities/Enemies/Moblin.js";
import { Octorok } from "./entities/Enemies/Octorok.js";

import { BottomBar } from "./ui/BottomBar.js";
import { NetworkUpdater } from "./engine/NetworkUpdater.js";
import { ZoneManager } from "./world/ZoneManager.js";
import { DialogueBox } from "./ui/DialogueBox.js";
import { QuestManager } from "./engine/QuestManager.js";
import { ShopMenu } from "./ui/ShopMenu.js";
import { IntroCutscene } from "./ui/IntroCutscene.js";

// --- INITIALISATION DU MOTEUR ---
const engine = new GameEngine("gameCanvas");
const inputs = new InputHandler();

/**
 * Creation d'un objet global 'game' pour un acces facile depuis n'importe quelle entite.
 */
window.game = {
    engine: engine,
    inputs: inputs,
    player: null,
    network: null,
    zoneManager: null,
    dialogueBox: null,
    dialogueActive: false,
    questManager: null,
    shopMenu: null
};

/**
 * Fonction de reapparition (Respawn).
 */
window.respawn = function () {
    const player = window.game.player;
    const ui = document.getElementById("game-over-ui");
    if (player) {
        if (ui) ui.style.display = "none";
        player.hp = 6;
        player.emeralds = 0; // Reset inventaire
        player.arrows = 30;   // Reset munitions
        player.isDead = false;
        player.visible = true;
        player.collider = true;
        player.actionAnimation = null;
        player.isPainFlashing = false;

        // Respawn au village
        const zm = window.game.zoneManager;
        if (zm) {
            zm.loadZone('village').then(() => {
                player.x = 380;
                player.y = 280;
            });
        } else {
            player.x = 100;
            player.y = 100;
        }
    }
};


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
    MALDEK: "./assets/maldrekPosition.png",
    HEARTS: "./assets/hearts.png",
    EMERALD: "./assets/emeraude.png",
    EXPLOSION: "./assets/explosion.png",
    SWORD: "./assets/sword.png",
    ARROW: "./assets/arrow.png",
    TILESET: "./assets/map.png",
    VENDEUR: "./assets/vendeur.png",
    COFFRE: "./assets/coffre.png",
    CLE: "./assets/clé.png",
    HERBESOL: "./assets/herbesol.png",
    HERBESOL2: "./assets/herbesol2.png",
    PORTAIL: "./assets/Portail.png",
    BRIQUE: "./assets/brique.png",
    MAISON_ORANGE: "./assets/maisonOrange.png",
    MAISON_BLEU: "./assets/maisonBleu.png",
    MAISON_VIOLETTE: "./assets/maisonViolette.png",
    FORTERESSE: "./assets/forteresse.png",
    CIMETIERE: "./assets/cimetiere.png",
    POTION: "./assets/Potion de soin.png",
    MARAIS: "./assets/marais.png",
    VIEUXNPC: "./assets/vieuxnpc.png",
    ARC_LONG: "./assets/Arc Long.png",
    EPEE_FER: "./assets/EpeeEnFer.png",
    BOUCLIER: "./assets/bouclier.png",
    VILLAGEOIS_BLEU: "./assets/villageoisBleu.png",
    MAISON_BLEU: "./assets/maisonBleu.png",
    MAISON_ORANGE: "./assets/maisonOrange.png",
    MAISON_VIOLETTE: "./assets/maisonViolette.png",
    POTEAU_MAISON: "./assets/poteauMaison.png",
    TUILES_VIOLETS: "./assets/tuilesViolets.png",
    SHOP_SHEET: "./assets/shop.png",
    FEE_MARAIS: "./assets/fee_marais.png",
    MAISON_TILESET: "./assets/maisonTileset.png",
    DIAMANT_ROUGE: "./assets/diamantRouge.png",
    DIAMANT_VERT: "./assets/diamantVert.png",
    DIAMANT_BLEU: "./assets/diamantBleu.png",
    DIAMANT_VIDE: "./assets/diamantVide.png",
    DESERT: "./assets/desert.png",
    SCIE: "./assets/scie.png",
    CREUSE: "./assets/creuse.png",
}).then(async () => {
    // 1. Attendre le choix du role
    const role = await waitForPlayerSelection();
    const forceHost = (role === 1);

    // 2. Creer le heros local
    const hero = new Player(380, 280, forceHost ? "LINK" : "LINK2");
    window.game.player = hero;
    engine.add(hero);

    // 3. Initialisation du reseau
    const network = new NetworkUpdater(hero, engine, forceHost);
    window.game.network = network;


    // 4. Initialiser le gestionnaire de quetes
    const questManager = new QuestManager();
    window.game.questManager = questManager;

    // 5. Initialiser le gestionnaire de zones
    const zoneManager = new ZoneManager(engine);
    window.game.zoneManager = zoneManager;

    // 5b. Charger la sauvegarde si elle existe
    const saveData = await questManager.load();
    let startZone = 'village';
    if (saveData && saveData.player) {
        hero.emeralds = saveData.player.emeralds || 0;
        hero.arrows = saveData.player.arrows || 5;
        hero.potions = saveData.player.potions || 0;
        hero.hasShield = saveData.player.hasShield || false;
        hero.swordLevel = saveData.player.swordLevel || 0;
        hero.bowLevel = saveData.player.bowLevel || 0;
        hero.hp = saveData.player.hp || 6;
        // Force le chargement dans le village pour eviter de spawn au milieu des ennemis
        startZone = 'village';
        console.log('[Save] Partie chargee (Apparition forcee au village)');
    }

    // Logique spécifique au rôle
    if (forceHost) {
        console.log("[Main] Master Mode: Je gère les monstres et le loot.");
    } else {
        console.log("[Main] Client Mode: Synchronisation avec l'Hôte.");
    }

    // 5c. Charger la zone de depart
    await zoneManager.loadZone(startZone);
    hero.x = 380;
    hero.y = 280;

    // 6. Interface HUD
    engine.add(new BottomBar());

    // 6b. Boite de dialogue (singleton)
    const dialogueBox = new DialogueBox();
    window.game.dialogueBox = dialogueBox;
    engine.add(dialogueBox);

    // 6c. Menu du shop (singleton)
    const shopMenu = new ShopMenu();
    window.game.shopMenu = shopMenu;
    engine.add(shopMenu);

    // 7. Boucle de synchronisation reseau (~33 FPS)
    setInterval(() => network.sendUpdate(), 30);

    // 8. Demarrage de la boucle de jeu
    engine.start();

    // 9. Cacher le menu
    if (typeof window.hideMenu === 'function') {
        window.hideMenu();
    }

    // 10. Cinematique d'introduction (nouvelle partie uniquement)
    const isNewGame = !saveData || !saveData.player;
    if (isNewGame && startZone === 'village') {
        hero.visible = false;
        hero.collider = false;
        window.game.dialogueActive = true; // Bloquer le joueur

        // Cacher les NPCs pendant la cinematique
        const npcs = engine.entities.filter(e => e.hasTag && e.hasTag('NPC'));
        npcs.forEach(npc => npc.visible = false);

        const intro = new IntroCutscene(() => {
            hero.visible = true;
            hero.collider = true;
            hero.x = 380;
            hero.y = 280;
            window.game.dialogueActive = false;
            npcs.forEach(npc => npc.visible = true);
        });
        engine.add(intro);
    }
});
