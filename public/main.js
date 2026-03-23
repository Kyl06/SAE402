/**
 * Point d'entrée principal. Orchestre le chargement des ressources, 
 * l'initialisation des singletons (moteur, réseau, quêtes) et le cycle de vie du jeu.
 */

import { GameEngine } from "./engine/GameEngine.js";
import { Assets } from "./engine/Assets.js";
import { InputHandler } from "./engine/InputHandler.js";
import { Player } from "./entities/Player/Player.js";
import { BottomBar } from "./ui/BottomBar.js";
import { NetworkUpdater } from "./engine/NetworkUpdater.js";
import { ZoneManager } from "./world/ZoneManager.js";
import { DialogueBox } from "./ui/DialogueBox.js";
import { QuestManager } from "./engine/QuestManager.js";
import { ShopMenu } from "./ui/ShopMenu.js";
import { IntroCutscene } from "./ui/IntroCutscene.js";

const engine = new GameEngine("gameCanvas");
const inputs = new InputHandler();

/**
 * Registry global 'game' : Singleton accessible par toutes les entités pour éviter le "prop drilling".
 * Permet une communication transverse entre le UI, le réseau et la logique de zone.
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
  shopMenu: null,
};

/**
 * Logique de Respawn. 
 * Note : Le rechargement de zone est évité si on est déjà au village pour préserver l'état des entités.
 */
window.respawn = function () {
  const p = window.game.player;
  const ui = document.getElementById("game-over-ui");
  if (!p) return;

  if (ui) ui.style.display = "none";
  Object.assign(p, {
    hp: 6, emeralds: 0, arrows: 30, isDead: false,
    visible: true, collider: true, actionAnimation: null, isPainFlashing: false
  });

  const zm = window.game.zoneManager;
  if (zm) {
    if (zm.currentZone === "village") {
      p.x = 380; p.y = 280;
    } else {
      zm.loadZone("village").then(() => { p.x = 380; p.y = 280; });
    }
  } else {
    p.x = 100; p.y = 100;
  }
};

/**
 * Proxy asynchrone pour la sélection du rôle dans l'UI HTML.
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

// Configuration des Assets : centralisation du chargement différé.
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
  VIEUXNPC: "./assets/villageoisChauve.png",
  ARC_LONG: "./assets/Arc Long.png",
  EPEE_FER: "./assets/EpeeEnFer.png",
  BOUCLIER: "./assets/bouclier.png",
  VILLAGEOIS_BLEU: "./assets/villageoisBleu.png",
  POTEAU_MAISON: "./assets/poteauMaison.png",
  TUILES_VIOLETS: "./assets/tuilesViolets.png",
  SHOP_SHEET: "./assets/shop.png",
  FEE_MARAIS: "./assets/fee_marais.png",
  PNJDESERT: "./assets/PNJDesert.png",
  SOL_PUIT: "./assets/solPuit.png",
  CORDE: "./assets/corde.png",
  MAISON_TILESET: "./assets/maisonTileset.png",
  DIAMANT_ROUGE: "./assets/diamantRouge.png",
  DIAMANT_VERT: "./assets/diamantVert.png",
  DIAMANT_BLEU: "./assets/diamantBleu.png",
  DIAMANT_VIDE: "./assets/diamantVide.png",
  DESERT: "./assets/desert.png",
  PNJPUIT: "./assets/PNJPuit.png",
  SCIE: "./assets/scie.png",
  CREUSE: "./assets/creuse.png",
  CHOMP: "./assets/chomp.png",
}).then(async () => {
  const role = await waitForPlayerSelection();
  const isHost = role === 1;

  // Initialisation Player et Réseau (Couplage minimal via NetworkUpdater)
  const hero = new Player(380, 280, isHost ? "LINK" : "LINK2");
  window.game.player = hero;
  engine.add(hero);
  
  const network = new NetworkUpdater(hero, engine, isHost);
  window.game.network = network;

  const questManager = new QuestManager();
  window.game.questManager = questManager;

  const zoneManager = new ZoneManager(engine);
  window.game.zoneManager = zoneManager;

  // Hydratation de l'état via sauvegarde
  const saveData = await questManager.load();
  if (saveData?.player) {
    Object.assign(hero, saveData.player);
    console.log("[Save] État restauré au village.");
  }

  console.log(isHost ? "[Net] Mode Hôte : Autorité sur l'état du monde." : "[Net] Mode Client : Réplication de l'Hôte.");

  await zoneManager.loadZone("village");
  hero.x = 380; hero.y = 280;

  // Injection des couches UI (HUD, Dialogues, Boutique)
  engine.add(new BottomBar());
  const dialogueBox = new DialogueBox();
  window.game.dialogueBox = dialogueBox;
  engine.add(dialogueBox);

  const shopMenu = new ShopMenu();
  window.game.shopMenu = shopMenu;
  engine.add(shopMenu);

  // Tick réseau asynchrone (30ms / ~33Hz) indépendant de la boucle de rendu.
  setInterval(() => network.sendUpdate(), 30);
  engine.start();

  if (typeof window.hideMenu === "function") window.hideMenu();

  // Déclenchement de l'introduction si aucune donnée de sauvegarde n'est présente.
  if (!saveData?.player) {
    hero.visible = false;
    hero.collider = false;
    window.game.dialogueActive = true;

    const npcs = engine.entities.filter((e) => e.hasTag?.("NPC"));
    npcs.forEach((npc) => (npc.visible = false));

    engine.add(new IntroCutscene(() => {
      Object.assign(hero, { visible: true, collider: true, x: 380, y: 280 });
      window.game.dialogueActive = false;
      npcs.forEach((npc) => (npc.visible = true));
    }));
  }
});
