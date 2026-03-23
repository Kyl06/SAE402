/**
 * @file Floor.js
 * @description Gère les éléments du décor (sol, arbres, murs).
 * Détermine les zones marchables et les obstacles solides.
 */

import { Entity } from "../engine/Entity.js";
import { Assets } from "../engine/Assets.js";
import { SCALE } from "../constants.js";

export class Floor extends Entity {
  constructor(x, y, type = "GRASS", options = {}) {
    // Définition de la taille source
    let srcSize = 16;
    if (["TREE", "ORANGE_TREE", "DOOR", "BUSH_BIG"].includes(type))
      srcSize = 32;
    if (type === "SHOP") srcSize = 48;
    if (["MAISON_ORANGE", "MAISON_BLEU", "MAISON_VIOLETTE"].includes(type))
      srcSize = 48;

    // TAILLE RÉELLE DANS LE JEU (ex: 16 * SCALE)

    const realSize = srcSize * SCALE;

    super(x, y, realSize, realSize);

    this.type = type;
    // On ajuste le Z pour les objets hauts et les objets de décor
    const decors = [
      "OWL",
      "EGGS",
      "SIGN",
      "CHEST",
      "STONE",
      "VERT_TOP",
      "HORI_TOP",
      "STATUE",
      "BARREL",
      "LANTERN",
      "CAULDRON",
      "OWL_STATUE",
      "CRYSTAL",
    ];
    this.z =
      srcSize > 16 || decors.includes(type)
        ? 10
        : ["ORANGE_BLOCK"].includes(type)
          ? 5
          : 0;

    // Système de collision : Solide par défaut sauf pour les sols

    const walkables = [
      "GRASS",
      "SAND",
      "ORANGE_GROUND",
      "ORANGE_PLANT",
      "YELLOW_GROUND",
      "BLUE_GROUND",
      "TULIP",
      "LIGHT_BLUE_GROUND",
      "LEAF_GROUND",
      "ORANGE_PATH",
      "FLOWERS",
      "DIRT",
      "DIRT_BRIGHT",
      "SHOP",
      "BRIDGE_H_LEFT",
      "BRIDGE_H_RIGHT",
      "HERBESOL",
      "HERBESOL2",
      "PORTAIL",
      "SHOP_SOL",
      "FORT_SOL_BLEU",
      "MAIS_SOL",
      "FORT_SOL_BLEU_2",
      "FORT_MUR_BLEU",
      "FORT_MUR_GRIS",
      "DES_23",
      "DES_32",
      "DES_33",
      "DES_27",
      "DES_36",
      "DES_38",
      "DES_45",
      "SOL_PUIT",
    ];
    // Bordures CIM solides (murs, tombes, deco, piliers)

    const cimSolid = [
      "CIM_SOL_1",
      "CIM_TOMBE_HD",
      "CIM_TOMBE_HG",
      "CIM_TOMBE_BG",
      "CIM_SOL_8",
      "CIM_TOMBE_BD",
      "CIM_MUR_5",
      "CIM_MUR_8",
      "CIM_DECO_1",
      "CIM_DECO_2",
      "CIM_DECO_3",
      "CIM_DECO_4",
      "CIM_MUR_9",
      "CIM_MUR_12",
      "CIM_DECO_5",
      "CIM_DECO_6",
      "CIM_ROSE_1",
      "CIM_ROSE_2",
      "CIM_ROSE_3",
      "CIM_MUR_13",
      "CIM_MUR_14",
      "CIM_MUR_15",
      "CIM_MUR_16",
      "CIM_ROSE_8",
      "CIM_ROSE_9",
      "CIM_ROSE_10",
      "CIM_MUR_18",
      "CIM_PILIER_5",
      "CIM_MUR_19",
      "CIM_MUR_20",
      "CIM_SOL_15",
      "CIM_SOL_16",
      "CIM_SOL_17",
      "CIM_SOL_19",
      "CIM_SOL_20",
      "CIM_MUR_22",
      "CIM_MUR_23",
      "CIM_MUR_24",
      "CIM_DECO_7",
      "WATER",
    ];
    // Tous les CIM_ sont traversables sauf ceux dans cimSolid
    const isCim = this.type.startsWith("CIM_");
    const isCimWalkable = isCim && !cimSolid.includes(this.type);
    // MAR_ : sols traversables (marecage, herbe, terre, boue, pont, planches, chemin)
    const marWalkable = [
      "MAR_PONT_2",
      "MAR_SOUCHE",
      "MAR_CHAMPI",
      "MAR_PONT_4",
      "MAR_BOIS_3",
      "MAR_PLANCHE_3",
      "MAR_BOIS_2",
      "MAR_MARECAGE_8",
      "MAR_EXTRA_1",
      "MAR_TROU",
      "MAR_MARECAGE_6",
      "MAR_PLANCHE_1",
      "MAR_BOIS_4",
      "MAR_SORTIE",
      "MAR_MARECAGE_10",
      "MAR_PONT_3",
      "MAR_EXTRA_2",
      "MAR_MARECAGE_8",
      "MAR_MARECAGE_6",
    ];
    this.collider = !(
      walkables.includes(this.type) ||
      isCimWalkable ||
      marWalkable.includes(this.type)
    );
    if (this.type === "MAIS_BasArmoire") {
      this.halfCollision = "top";
    }
    if (this.collider) {
      this.addTag("SOLID");
    }

    // Panneau interactif
    this.signText = options.signText || null;
    this.interactRange = 50;
    this.interactKeyWasDown = false;
    this.playerInRange = false;
    this.indicatorBounce = 0;
  }

  getCollisionBox() {
    if (this.halfCollision === "top") {
      return { x: this.x, y: this.y, w: this.width, h: this.height / 2 };
    }
    if (this.type === "CORDE") {
      // Seules les 2 cases du bas sont solides (a partir de y+64)
      return { x: this.x, y: this.y + 64, w: 32, h: 64 };
    }
    return { x: this.x, y: this.y, w: this.width, h: this.height };
  }

  update(delta) {
    // Si c'est une barrière et que tous les fragments sont collectés, on la transforme
    if (this.type.startsWith("BAR_")) {
      const qm = window.game.questManager;
      if (qm && qm.allFragmentsCollected()) {
        // Transformation : seul un point précis devient le portail, le reste devient de l'herbe
        if (this.x === 352 && this.y === 0) {
          this.type = "PORTAIL";
        } else {
          this.type = "HERBESOL";
        }
        this.collider = false;
        this.removeTag?.("SOLID");
        return;
      }
    }

    if (!this.signText) return;
    const player = window.game.player;
    if (!player) return;

    const dx = this.x + this.width / 2 - (player.x + player.width / 2);
    const dy = this.y + this.height / 2 - (player.y + player.height / 2);
    const dist = Math.sqrt(dx * dx + dy * dy);
    this.playerInRange = dist < this.interactRange;

    this.indicatorBounce += delta * 0.005;

    const keyDown = window.game.inputs.isHeld("KeyE");
    if (
      this.playerInRange &&
      keyDown &&
      !this.interactKeyWasDown &&
      !window.game.dialogueActive
    ) {
      const dialogueBox = window.game.dialogueBox;
      if (dialogueBox) {
        dialogueBox.show("Panneau", [this.signText]);
      }
    }
    this.interactKeyWasDown = keyDown;
  }

  draw(ctx) {
    const img = Assets.get("TILESET");
    if (!img) return;

    // Arrondir les positions pour éviter les lignes entre les tiles (sub-pixel seams)
    const dx = Math.round(this.x);
    const dy = Math.round(this.y);
    const dw = Math.round(this.width);
    const dh = Math.round(this.height);

    const mapping = {
      GRASS: { sx: 32, sy: 0, sw: 16, sh: 16 },
      SAND: { sx: 32, sy: 16, sw: 16, sh: 16 },
      TREE: { sx: 0, sy: 0, sw: 32, sh: 32 },
      WATER: { sx: 48, sy: 0, sw: 16, sh: 16 },
      BUSH: { sx: 48, sy: 16, sw: 16, sh: 16 },

      WALL_DOWN: { sx: 64, sy: 0, sw: 16, sh: 16 },
      WALL_UP: { sx: 80, sy: 0, sw: 16, sh: 16 },
      WALL_RIGHT: { sx: 64, sy: 16, sw: 16, sh: 16 },
      WALL_LEFT: { sx: 80, sy: 16, sw: 16, sh: 16 },

      BRIDGE_H_RIGHT: { sx: 96, sy: 0, sw: 16, sh: 16 },
      BRIDGE_H_LEFT: { sx: 112, sy: 0, sw: 16, sh: 16 },
      BRIDGE_V_LEFT: { sx: 96, sy: 16, sw: 16, sh: 16 },
      BRIDGE_V_RIGHT: { sx: 112, sy: 16, sw: 16, sh: 16 },

      ORANGE_GROUND: { sx: 128, sy: 0, sw: 16, sh: 16 },
      ORANGE_PLANT: { sx: 144, sy: 0, sw: 16, sh: 16 },
      YELLOW_GROUND: { sx: 128, sy: 16, sw: 16, sh: 16 },
      BLACK_HOLE: { sx: 144, sy: 16, sw: 16, sh: 16 },

      BLUE_GROUND: { sx: 160, sy: 0, sw: 16, sh: 16 },
      FENCE: { sx: 176, sy: 0, sw: 16, sh: 16 },
      RED_WALL: { sx: 160, sy: 16, sw: 16, sh: 16 },
      BLUE_PLANT: { sx: 176, sy: 16, sw: 16, sh: 16 },

      ORANGE_TREE: { sx: 0, sy: 32, sw: 32, sh: 32 },
      DOOR: { sx: 32, sy: 32, sw: 32, sh: 32 },
      BUSH_BIG: { sx: 64, sy: 32, sw: 32, sh: 32 },

      VERT_TOP: { sx: 96, sy: 32, sw: 16, sh: 16 },
      STONE: { sx: 112, sy: 32, sw: 16, sh: 16 },
      CHEST: { sx: 96, sy: 48, sw: 16, sh: 16 },
      HORI_TOP: { sx: 112, sy: 48, sw: 16, sh: 16 },

      TULIP: { sx: 128, sy: 32, sw: 16, sh: 16 },
      PANELS: { sx: 160, sy: 48, sw: 16, sh: 16 },
      LIGHT_BLUE_GROUND: { sx: 128, sy: 48, sw: 16, sh: 16 },
      LEAF_GROUND: { sx: 144, sy: 48, sw: 16, sh: 16 },

      OWL: { sx: 160, sy: 32, sw: 16, sh: 16 },
      EGGS: { sx: 176, sy: 32, sw: 16, sh: 16 },
      SIGN: { sx: 160, sy: 48, sw: 16, sh: 16 },
      PURPLE_HOLE: { sx: 176, sy: 48, sw: 16, sh: 16 },
      PUIT: { sx: 176, sy: 48, sw: 16, sh: 16 },
      ORANGE_BLOCK: { sx: 128, sy: 0, sw: 16, sh: 16 },

      DUNGEON_WALL_1: { sx: 32, sy: 32, sw: 16, sh: 16 },
      DUNGEON_WALL_2: { sx: 48, sy: 32, sw: 16, sh: 16 },
      DUNGEON_WALL_3: { sx: 32, sy: 48, sw: 16, sh: 16 },
      DUNGEON_WALL_4: { sx: 48, sy: 48, sw: 16, sh: 16 },

      SHOP: { sx: 0, sy: 64, sw: 48, sh: 48 },
    };

    // Tiles avec leur propre asset (pas dans le tileset)
    const standalone = {
      HERBESOL: "HERBESOL",
      HERBESOL2: "HERBESOL2",
      PORTAIL: "PORTAIL",
      BRIQUE: "BRIQUE",
      MAISON_ORANGE: "MAISON_ORANGE",
      MAISON_BLEU: "MAISON_BLEU",
      MAISON_VIOLETTE: "MAISON_VIOLETTE",
      SOL_PUIT: "SOL_PUIT",
      CORDE: "CORDE",
      BAR_1: "BARRIERE",
      BAR_2: "BARRIERE",
      BAR_3: "BARRIERE",
      BAR_4: "BARRIERE",
    };
    if (standalone[this.type]) {
      const sImg = Assets.get(standalone[this.type]);
      if (!sImg) return;
      if (this.type === "PORTAIL") {
        // Portail : 64x32 source, dessine sur 4x2 tiles (128x64 px)
        ctx.drawImage(
          sImg,
          0,
          0,
          sImg.width,
          sImg.height,
          dx,
          dy,
          4 * 32,
          2 * 32,
        );
      } else if (
        this.type === "MAISON_ORANGE" ||
        this.type === "MAISON_BLEU" ||
        this.type === "MAISON_VIOLETTE"
      ) {
        ctx.drawImage(
          sImg,
          0,
          0,
          sImg.width,
          sImg.height,
          dx,
          dy,
          3 * 32,
          3 * 32,
        );
      } else if (this.type === "CORDE") {
        ctx.drawImage(sImg, 0, 0, sImg.width, sImg.height, dx, dy, 32, 128);
      } else if (this.type.startsWith("BAR_")) {
        const barMapping = {
          BAR_1: { sx: 0, sy: 0 },
          BAR_2: { sx: 16, sy: 0 },
          BAR_3: { sx: 32, sy: 0 },
          BAR_4: { sx: 48, sy: 0 },
        };
        const anim = ["BAR_1", "BAR_2", "BAR_3", "BAR_4"];
        const frameIndex = Math.floor(Date.now() / 300) % 4;
        const currentType = anim[frameIndex];
        const bt = barMapping[currentType];
        if (bt) {
          ctx.drawImage(sImg, bt.sx, bt.sy, 16, 16, dx, dy, dw, dh);
        }
      } else {
        ctx.drawImage(sImg, 0, 0, sImg.width, sImg.height, dx, dy, dw, dh);
      }
      return;
    }

    // Tiles depuis la spritesheet shop.png
    if (this.type.startsWith("SHOP_")) {
      const shopImg = Assets.get("SHOP_SHEET");
      if (!shopImg) return;
      const shopMapping = {
        SHOP_VASE: { sx: 0, sy: 0, sw: 47, sh: 48 },
        SHOP_STATUE: { sx: 0, sy: 48, sw: 47, sh: 48 },
        SHOP_SOL: { sx: 0, sy: 96, sw: 47, sh: 48 },
      };
      const st = shopMapping[this.type];
      if (st) {
        ctx.drawImage(shopImg, st.sx, st.sy, st.sw, st.sh, dx, dy, dw, dh);
      }
      return;
    }

    // Tiles depuis la spritesheet forteresse.png
    if (this.type.startsWith("FORT_")) {
      const fortImg = Assets.get("FORTERESSE");
      if (!fortImg) return;
      const fortMapping = {
        FORT_MUR_GRIS: { sx: 0, sy: 0 },
        FORT_MUR_BLEU: { sx: 16, sy: 0 },
        FORT_BARREAUX_1: { sx: 32, sy: 0 },
        FORT_BARREAUX_2: { sx: 48, sy: 0 },
        FORT_SOL_BLEU: { sx: 64, sy: 0 },
        FORT_PIERRE_SOMBRE: { sx: 80, sy: 0 },
        FORT_MUR_LIGNE: { sx: 96, sy: 0 },
        FORT_NOIR: { sx: 112, sy: 0 },
        FORT_COIN_1: { sx: 128, sy: 0 },
        FORT_COIN_2: { sx: 144, sy: 0 },
        FORT_MUR_GRIS_2: { sx: 0, sy: 16 },
        FORT_MUR_BLEU_2: { sx: 16, sy: 16 },
        FORT_BARREAUX_3: { sx: 32, sy: 16 },
        FORT_BARREAUX_4: { sx: 48, sy: 16 },
        FORT_SOL_BLEU_2: { sx: 64, sy: 16 },
        FORT_PIERRE_SOMBRE_2: { sx: 80, sy: 16 },
        FORT_MUR_LIGNE_2: { sx: 96, sy: 16 },
        FORT_NOIR_2: { sx: 112, sy: 16 },
        FORT_COIN_3: { sx: 128, sy: 16 },
        FORT_COIN_4: { sx: 144, sy: 16 },
        FORT_SOL_1: { sx: 0, sy: 32 },
        FORT_SOL_2: { sx: 16, sy: 32 },
        FORT_SOL_3: { sx: 32, sy: 32 },
        FORT_SOL_4: { sx: 48, sy: 32 },
        FORT_SOL_5: { sx: 64, sy: 32 },
        FORT_SOL_6: { sx: 80, sy: 32 },
        FORT_SOL_7: { sx: 96, sy: 32 },
        FORT_SOL_8: { sx: 112, sy: 32 },
        FORT_SOL_9: { sx: 128, sy: 32 },
        FORT_SOL_10: { sx: 144, sy: 32 },
        FORT_DECO_1: { sx: 0, sy: 48 },
        FORT_DECO_2: { sx: 16, sy: 48 },
        FORT_DECO_3: { sx: 32, sy: 48 },
        FORT_DECO_4: { sx: 48, sy: 48 },
        FORT_DECO_5: { sx: 64, sy: 48 },
        FORT_DECO_6: { sx: 80, sy: 48 },
        FORT_DECO_7: { sx: 96, sy: 48 },
        FORT_DECO_8: { sx: 112, sy: 48 },
        FORT_DECO_9: { sx: 128, sy: 48 },
        FORT_DECO_10: { sx: 144, sy: 48 },
        FORT_BAS_1: { sx: 0, sy: 64 },
        FORT_BAS_2: { sx: 16, sy: 64 },
        FORT_BAS_3: { sx: 32, sy: 64 },
        FORT_BAS_4: { sx: 48, sy: 64 },
        FORT_BAS_5: { sx: 64, sy: 64 },
        FORT_BAS_6: { sx: 80, sy: 64 },
        FORT_BAS_7: { sx: 96, sy: 64 },
        FORT_BAS_8: { sx: 112, sy: 64 },
        FORT_BAS_9: { sx: 128, sy: 64 },
        FORT_BAS_10: { sx: 144, sy: 64 },
      };

      let currentType = this.type;
      if (["FORT_BAS_10", "FORT_BAS_9", "FORT_BAS_8"].includes(this.type)) {
        const anim = ["FORT_BAS_10", "FORT_BAS_9", "FORT_BAS_8"];
        const frameIndex = Math.floor(Date.now() / 300) % 3;
        currentType = anim[frameIndex];
      }

      const ft = fortMapping[currentType];
      if (ft) {
        ctx.drawImage(fortImg, ft.sx, ft.sy, 16, 16, dx, dy, dw, dh);
      }

      return;
    }

    // Tiles depuis la spritesheet marais.png
    if (this.type.startsWith("MAR_")) {
      const marImg = Assets.get("MARAIS");
      if (!marImg) return;
      const marMapping = {
        MAR_CHEMIN_HG: { sx: 0, sy: 0 },
        MAR_BUISSON_1: { sx: 16, sy: 0 },
        MAR_BUISSON_2: { sx: 32, sy: 0 },
        MAR_EAU_PROF: { sx: 48, sy: 0 },
        MAR_CHAMPI: { sx: 64, sy: 0 },
        MAR_TERRE_1: { sx: 80, sy: 0 },
        MAR_SOMBRE_1: { sx: 96, sy: 0 },
        MAR_BOUE_1: { sx: 112, sy: 0 },
        MAR_BOUE_2: { sx: 128, sy: 0 },
        MAR_HERBE: { sx: 144, sy: 0 },
        MAR_EXTRA_1: { sx: 160, sy: 0 },
        MAR_CHEMIN_BG: { sx: 0, sy: 16 },
        MAR_MARECAGE_1: { sx: 16, sy: 16 },
        MAR_MARECAGE_2: { sx: 32, sy: 16 },
        MAR_PONT_1: { sx: 48, sy: 16 },
        MAR_PONT_2: { sx: 64, sy: 16 },
        MAR_SOUCHE: { sx: 80, sy: 16 },
        MAR_SOMBRE_2: { sx: 96, sy: 16 },
        MAR_BOUE_3: { sx: 112, sy: 16 },
        MAR_EAU_TEAL: { sx: 128, sy: 16 },
        MAR_SOMBRE_3: { sx: 144, sy: 16 },
        MAR_EXTRA_2: { sx: 160, sy: 16 },
        MAR_CHEMIN_HD: { sx: 0, sy: 32 },
        MAR_MARECAGE_3: { sx: 16, sy: 32 },
        MAR_MARECAGE_4: { sx: 32, sy: 32 },
        MAR_PONT_3: { sx: 48, sy: 32 },
        MAR_PONT_4: { sx: 64, sy: 32 },
        MAR_TROU: { sx: 80, sy: 32 },
        MAR_SORTIE: { sx: 96, sy: 32 },
        MAR_BOUE_4: { sx: 112, sy: 32 },
        MAR_EAU_TEAL_2: { sx: 128, sy: 32 },
        MAR_SOMBRE_5: { sx: 144, sy: 32 },
        MAR_EXTRA_3: { sx: 160, sy: 32 },
        MAR_CHEMIN_BD: { sx: 0, sy: 48 },
        MAR_MARECAGE_5: { sx: 16, sy: 48 },
        MAR_MARECAGE_6: { sx: 32, sy: 48 },
        MAR_PLANCHE_1: { sx: 48, sy: 48 },
        MAR_PLANCHE_2: { sx: 64, sy: 48 },
        MAR_BOIS_2: { sx: 80, sy: 48 },
        MAR_SOMBRE_6: { sx: 96, sy: 48 },
        MAR_BOUE_5: { sx: 112, sy: 48 },
        MAR_BOUE_6: { sx: 128, sy: 48 },
        MAR_SOMBRE_7: { sx: 144, sy: 48 },
        MAR_EXTRA_4: { sx: 160, sy: 48 },
        MAR_TERRE_2: { sx: 0, sy: 64 },
        MAR_MARECAGE_7: { sx: 16, sy: 64 },
        MAR_MARECAGE_8: { sx: 32, sy: 64 },
        MAR_PLANCHE_3: { sx: 48, sy: 64 },
        MAR_PLANCHE_4: { sx: 64, sy: 64 },
        MAR_BOIS_3: { sx: 80, sy: 64 },
        MAR_SOMBRE_8: { sx: 96, sy: 64 },
        MAR_BOUE_7: { sx: 112, sy: 64 },
        MAR_BOUE_8: { sx: 128, sy: 64 },
        MAR_SOMBRE_9: { sx: 144, sy: 64 },
        MAR_EXTRA_5: { sx: 160, sy: 64 },
        MAR_TERRE_3: { sx: 0, sy: 80 },
        MAR_MARECAGE_9: { sx: 16, sy: 80 },
        MAR_MARECAGE_10: { sx: 32, sy: 80 },
        MAR_PLANCHE_5: { sx: 48, sy: 80 },
        MAR_PLANCHE_6: { sx: 64, sy: 80 },
        MAR_BOIS_4: { sx: 80, sy: 80 },
        MAR_SOMBRE_10: { sx: 96, sy: 80 },
        MAR_BOUE_9: { sx: 112, sy: 80 },
        MAR_BOUE_10: { sx: 128, sy: 80 },
        MAR_SOMBRE_11: { sx: 144, sy: 80 },
        MAR_EXTRA_6: { sx: 160, sy: 80 },
      };

      let currentType = this.type;
      if (
        ["MAR_EXTRA_3", "MAR_EXTRA_4", "MAR_EXTRA_5", "MAR_EXTRA_6"].includes(
          this.type,
        )
      ) {
        const anim = [
          "MAR_EXTRA_3",
          "MAR_EXTRA_4",
          "MAR_EXTRA_5",
          "MAR_EXTRA_6",
        ];
        const frameIndex = Math.floor(Date.now() / 300) % 4;
        currentType = anim[frameIndex];
      }

      const mt = marMapping[currentType];
      if (mt) {
        ctx.drawImage(marImg, mt.sx, mt.sy, 16, 16, dx, dy, dw, dh);
      }
      return;
    }

    // Tiles depuis la spritesheet maisonTileset.png
    if (this.type.startsWith("MAIS_")) {
      const maisImg = Assets.get("MAISON_TILESET");
      if (!maisImg) return;
      const maisMapping = {
        // Row 0 (cols 0-6)
        MAIS_1: { sx: 0, sy: 0 },
        MAIS_2: { sx: 16, sy: 0 },
        MAIS_3: { sx: 32, sy: 0 },
        MAIS_4: { sx: 48, sy: 0 },
        MAIS_5: { sx: 64, sy: 0 },
        MAIS_6: { sx: 80, sy: 0 },
        MAIS_7: { sx: 96, sy: 0 },
        // Row 1 (cols 0-6)
        MAIS_13: { sx: 0, sy: 16 },
        MAIS_14: { sx: 16, sy: 16 },
        MAIS_15: { sx: 32, sy: 16 },
        MAIS_16: { sx: 48, sy: 16 },
        MAIS_17: { sx: 64, sy: 16 },
        MAIS_18: { sx: 80, sy: 16 },
        MAIS_19: { sx: 96, sy: 16 },
        // Row 2 (cols 0-5)
        MAIS_25: { sx: 0, sy: 32 },
        MAIS_26: { sx: 16, sy: 32 },
        MAIS_27: { sx: 32, sy: 32 },
        MAIS_28: { sx: 48, sy: 32 },
        MAIS_29: { sx: 64, sy: 32 },
        MAIS_30: { sx: 80, sy: 32 },
        // Row 3 (cols 0-5)
        MAIS_37: { sx: 0, sy: 48 },
        MAIS_38: { sx: 16, sy: 48 },
        MAIS_39: { sx: 32, sy: 48 },
        MAIS_40: { sx: 48, sy: 48 },
        MAIS_41: { sx: 64, sy: 48 },
        MAIS_42: { sx: 80, sy: 48 },
        // Row 4 (cols 0-5)
        MAIS_49: { sx: 0, sy: 64 },
        MAIS_SOL: { sx: 16, sy: 64 },
        MAIS_51: { sx: 32, sy: 64 },
        MAIS_52: { sx: 48, sy: 64 },
        MAIS_HautArmoire: { sx: 64, sy: 64 },
        MAIS_54: { sx: 80, sy: 64 },
        // Row 5 (cols 0-5)
        MAIS_61: { sx: 0, sy: 80 },
        MAIS_62: { sx: 16, sy: 80 },
        MAIS_63: { sx: 32, sy: 80 },
        MAIS_64: { sx: 48, sy: 80 },
        MAIS_BasArmoire: { sx: 64, sy: 80 },
        MAIS_66: { sx: 80, sy: 80 },
        // Row 6 (cols 0-5)
        MAIS_73: { sx: 0, sy: 96 },
        MAIS_74: { sx: 16, sy: 96 },
        MAIS_75: { sx: 32, sy: 96 },
        MAIS_76: { sx: 48, sy: 96 },
        MAIS_77: { sx: 64, sy: 96 },
        MAIS_78: { sx: 80, sy: 96 },
      };
      const mst = maisMapping[this.type];
      if (mst) {
        ctx.drawImage(maisImg, mst.sx, mst.sy, 16, 16, dx, dy, dw, dh);
      }
      return;
    }

    // Tiles depuis la spritesheet cimetiere.png
    if (this.type.startsWith("CIM_")) {
      const cimImg = Assets.get("CIMETIERE");
      if (!cimImg) return;
      const cimMapping = {
        // Row 0
        CIM_TOMBE_HG: { sx: 0, sy: 0 },
        CIM_TOMBE_HD: { sx: 16, sy: 0 },
        CIM_SOL_1: { sx: 32, sy: 0 },
        CIM_SOL_2: { sx: 48, sy: 0 },
        CIM_SOL_3: { sx: 64, sy: 0 },
        CIM_SOL_4: { sx: 80, sy: 0 },
        CIM_SOL_5: { sx: 96, sy: 0 },
        CIM_SOL_6: { sx: 112, sy: 0 },
        CIM_SOL_7: { sx: 128, sy: 0 },
        CIM_MUR_1: { sx: 144, sy: 0 },
        CIM_MUR_2: { sx: 160, sy: 0 },
        CIM_PILIER_1: { sx: 176, sy: 0 },
        CIM_MUR_3: { sx: 192, sy: 0 },
        CIM_MUR_4: { sx: 208, sy: 0 },
        // Row 1
        CIM_TOMBE_BG: { sx: 0, sy: 16 },
        CIM_TOMBE_BD: { sx: 16, sy: 16 },
        CIM_SOL_8: { sx: 32, sy: 16 },
        CIM_SOL_9: { sx: 48, sy: 16 },
        CIM_SOL_10: { sx: 64, sy: 16 },
        CIM_SOL_11: { sx: 80, sy: 16 },
        CIM_SOL_12: { sx: 96, sy: 16 },
        CIM_SOL_13: { sx: 112, sy: 16 },
        CIM_SOL_14: { sx: 128, sy: 16 },
        CIM_MUR_5: { sx: 144, sy: 16 },
        CIM_MUR_6: { sx: 160, sy: 16 },
        CIM_PILIER_2: { sx: 176, sy: 16 },
        CIM_MUR_7: { sx: 192, sy: 16 },
        CIM_MUR_8: { sx: 208, sy: 16 },
        // Row 2
        CIM_DECO_1: { sx: 0, sy: 32 },
        CIM_DECO_2: { sx: 16, sy: 32 },
        CIM_DECO_3: { sx: 32, sy: 32 },
        CIM_DECO_4: { sx: 48, sy: 32 },
        CIM_MOSAIQUE_1: { sx: 64, sy: 32 },
        CIM_MOSAIQUE_2: { sx: 80, sy: 32 },
        CIM_MOSAIQUE_3: { sx: 96, sy: 32 },
        CIM_MOSAIQUE_4: { sx: 112, sy: 32 },
        CIM_MOSAIQUE_5: { sx: 128, sy: 32 },
        CIM_MUR_9: { sx: 144, sy: 32 },
        CIM_MUR_10: { sx: 160, sy: 32 },
        CIM_PILIER_3: { sx: 176, sy: 32 },
        CIM_MUR_11: { sx: 192, sy: 32 },
        CIM_MUR_12: { sx: 208, sy: 32 },
        // Row 3
        CIM_DECO_5: { sx: 0, sy: 48 },
        CIM_DECO_6: { sx: 16, sy: 48 },
        CIM_ROSE_1: { sx: 32, sy: 48 },
        CIM_ROSE_2: { sx: 48, sy: 48 },
        CIM_ROSE_3: { sx: 64, sy: 48 },
        CIM_ROSE_4: { sx: 80, sy: 48 },
        CIM_ROSE_5: { sx: 96, sy: 48 },
        CIM_ROSE_6: { sx: 112, sy: 48 },
        CIM_ROSE_7: { sx: 128, sy: 48 },
        CIM_MUR_13: { sx: 144, sy: 48 },
        CIM_MUR_14: { sx: 160, sy: 48 },
        CIM_PILIER_4: { sx: 176, sy: 48 },
        CIM_MUR_15: { sx: 192, sy: 48 },
        CIM_MUR_16: { sx: 208, sy: 48 },
        // Row 4
        CIM_STRUCT_1: { sx: 0, sy: 64 },
        CIM_STRUCT_2: { sx: 16, sy: 64 },
        CIM_ROSE_8: { sx: 32, sy: 64 },
        CIM_ROSE_9: { sx: 48, sy: 64 },
        CIM_ROSE_10: { sx: 64, sy: 64 },
        CIM_ROSE_11: { sx: 80, sy: 64 },
        CIM_ROSE_12: { sx: 96, sy: 64 },
        CIM_ROSE_13: { sx: 112, sy: 64 },
        CIM_ROSE_14: { sx: 128, sy: 64 },
        CIM_MUR_17: { sx: 144, sy: 64 },
        CIM_MUR_18: { sx: 160, sy: 64 },
        CIM_PILIER_5: { sx: 176, sy: 64 },
        CIM_MUR_19: { sx: 192, sy: 64 },
        CIM_MUR_20: { sx: 208, sy: 64 },
        // Row 5
        CIM_STRUCT_3: { sx: 0, sy: 80 },
        CIM_STRUCT_4: { sx: 16, sy: 80 },
        CIM_SOL_15: { sx: 32, sy: 80 },
        CIM_SOL_16: { sx: 48, sy: 80 },
        CIM_SOL_17: { sx: 64, sy: 80 },
        CIM_SOL_18: { sx: 80, sy: 80 },
        CIM_SOL_19: { sx: 96, sy: 80 },
        CIM_SOL_20: { sx: 112, sy: 80 },
        CIM_SOL_21: { sx: 128, sy: 80 },
        CIM_MUR_21: { sx: 144, sy: 80 },
        CIM_MUR_22: { sx: 160, sy: 80 },
        CIM_DECO_7: { sx: 176, sy: 80 },
        CIM_MUR_23: { sx: 192, sy: 80 },
        CIM_MUR_24: { sx: 208, sy: 80 },
        // Row 6
        CIM_STRUCT_5: { sx: 0, sy: 96 },
        CIM_STRUCT_6: { sx: 16, sy: 96 },
        CIM_SOL_22: { sx: 32, sy: 96 },
        CIM_SOL_23: { sx: 48, sy: 96 },
        CIM_SOL_24: { sx: 64, sy: 96 },
        CIM_SOL_25: { sx: 80, sy: 96 },
        CIM_SOL_26: { sx: 96, sy: 96 },
        CIM_SOL_27: { sx: 112, sy: 96 },
        CIM_SOL_28: { sx: 128, sy: 96 },
        CIM_MUR_25: { sx: 144, sy: 96 },
        CIM_MUR_26: { sx: 160, sy: 96 },
        CIM_DECO_8: { sx: 176, sy: 96 },
        CIM_MUR_27: { sx: 192, sy: 96 },
        CIM_MUR_28: { sx: 208, sy: 96 },
      };
      const ct = cimMapping[this.type];
      if (ct) {
        ctx.drawImage(
          cimImg,
          ct.sx,
          ct.sy,
          16,
          16,
          this.x,
          this.y,
          this.width,
          this.height,
        );
      }
      return;
    }

    // Tiles depuis la spritesheet desert.png
    if (this.type.startsWith("DES_")) {
      const desImg = Assets.get("DESERT");
      if (!desImg) return;
      const desMapping = {
        // Ligne 0
        DES_1: { sx: 0, sy: 0 },
        DES_2: { sx: 16, sy: 0 },
        DES_3: { sx: 32, sy: 0 },
        DES_4: { sx: 48, sy: 0 },
        DES_5: { sx: 64, sy: 0 },
        DES_6: { sx: 80, sy: 0 },
        DES_7: { sx: 96, sy: 0 },
        DES_8: { sx: 112, sy: 0 },
        DES_9: { sx: 128, sy: 0 },
        // Ligne 1
        DES_10: { sx: 0, sy: 16 },
        DES_11: { sx: 16, sy: 16 },
        DES_12: { sx: 32, sy: 16 },
        DES_13: { sx: 48, sy: 16 },
        DES_14: { sx: 64, sy: 16 },
        DES_15: { sx: 80, sy: 16 },
        DES_16: { sx: 96, sy: 16 },
        DES_17: { sx: 112, sy: 16 },
        DES_18: { sx: 128, sy: 16 },
        // Ligne 2
        DES_19: { sx: 0, sy: 32 },
        DES_20: { sx: 16, sy: 32 },
        DES_21: { sx: 32, sy: 32 },
        DES_22: { sx: 48, sy: 32 },
        DES_23: { sx: 64, sy: 32 },
        DES_24: { sx: 80, sy: 32 },
        DES_25: { sx: 96, sy: 32 },
        DES_26: { sx: 112, sy: 32 },
        DES_27: { sx: 128, sy: 32 },
        // Ligne 3
        DES_28: { sx: 0, sy: 48 },
        DES_29: { sx: 16, sy: 48 },
        DES_30: { sx: 32, sy: 48 },
        DES_31: { sx: 48, sy: 48 },
        DES_32: { sx: 64, sy: 48 },
        DES_33: { sx: 80, sy: 48 },
        DES_34: { sx: 96, sy: 48 },
        DES_35: { sx: 112, sy: 48 },
        DES_36: { sx: 128, sy: 48 },
        // Ligne 4
        DES_37: { sx: 0, sy: 64 },
        DES_38: { sx: 16, sy: 64 },
        DES_39: { sx: 32, sy: 64 },
        DES_40: { sx: 48, sy: 64 },
        DES_41: { sx: 64, sy: 64 },
        DES_42: { sx: 80, sy: 64 },
        DES_43: { sx: 96, sy: 64 },
        DES_44: { sx: 112, sy: 64 },
        DES_45: { sx: 128, sy: 64 },
        // Ligne 5
        DES_46: { sx: 0, sy: 80 },
        DES_47: { sx: 16, sy: 80 },
        DES_48: { sx: 32, sy: 80 },
        DES_49: { sx: 48, sy: 80 },
        DES_50: { sx: 64, sy: 80 },
        DES_51: { sx: 80, sy: 80 },
        DES_52: { sx: 96, sy: 80 },
        DES_53: { sx: 112, sy: 80 },
        DES_54: { sx: 128, sy: 80 },
      };
      const dt = desMapping[this.type];
      if (dt) {
        ctx.drawImage(
          desImg,
          dt.sx,
          dt.sy,
          16,
          16,
          this.x,
          this.y,
          this.width,
          this.height,
        );
      }
      return;
    }

    const t = mapping[this.type];
    if (t) {
      // On dessine à la taille calculée dans le constructeur
      ctx.drawImage(img, t.sx, t.sy, t.sw, t.sh, dx, dy, dw, dh);
    }

    // Indicateur [E] si panneau et joueur a portee
    if (this.signText && this.playerInRange && !window.game.dialogueActive) {
      this.drawSignIndicator(ctx);
    }
  }

  drawSignIndicator(ctx) {
    const bounceY = Math.sin(this.indicatorBounce * 3) * 3;
    const cx = this.x + this.width / 2;
    const cy = this.y - 10 + bounceY;

    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(cx - 12, cy - 12, 24, 16);
    ctx.strokeStyle = "#ffcc00";
    ctx.lineWidth = 1;
    ctx.strokeRect(cx - 12, cy - 12, 24, 16);

    ctx.fillStyle = "#ffcc00";
    ctx.font = "bold 11px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("E", cx, cy - 4);
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
  }

  // Système de collision AABB simple
  onCollision(other) {
    if (
      !this.collider ||
      !other.collider ||
      other.hasTag("ITEM") ||
      other.hasTag("NOCLIP")
    )
      return;

    const box = this.getCollisionBox();
    const otherBox = other.getCollisionBox
      ? other.getCollisionBox()
      : { x: other.x, y: other.y, w: other.width, h: other.height };

    const dx = box.x + box.w / 2 - (otherBox.x + otherBox.w / 2);
    const dy = box.y + box.h / 2 - (otherBox.y + otherBox.h / 2);

    const overlapX = (box.w + otherBox.w) / 2 - Math.abs(dx);
    const overlapY = (box.h + otherBox.h) / 2 - Math.abs(dy);

    if (overlapX > 0 && overlapY > 0) {
      // Message de blocage si barrière et joueur
      if (this.type.startsWith("BAR_") && other.hasTag("PLAYER")) {
        this.triggerBarrierDialogue();
      }

      if (overlapX < overlapY) {
        other.x += dx > 0 ? -overlapX : overlapX;
      } else {
        other.y += dy > 0 ? -overlapY : overlapY;
      }
    }
  }

  /** Affiche le dialogue de la barrière avec cooldown. */
  triggerBarrierDialogue() {
    if (window.game.dialogueActive) return;
    const now = Date.now();
    if (this.lastDialogueTime && now - this.lastDialogueTime < 3000) return;
    this.lastDialogueTime = now;

    const db = window.game.dialogueBox;
    if (db) {
      db.show("Barriere Magique", [
        "Une puissante aura magique vous bloque le passage.",
        "Il semblerait que vous ayez besoin des 3 joyaux sacres pour dissiper ce sortilege.",
      ]);
    }
  }
}
