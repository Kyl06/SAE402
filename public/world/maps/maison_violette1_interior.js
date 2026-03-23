/**
 * @file maison_violette1_interior.js
 * @description Interieur de la maison violette (en haut a gauche).
 * Sortie : porte au sud → retour au village
 */

const mapTiles = [
  {
    x: 352,
    y: 352,
    type: "MAIS_40",
  },
  {
    x: 384,
    y: 352,
    type: "MAIS_41",
  },
  {
    x: 320,
    y: 352,
    type: "MAIS_62",
  },
  {
    x: 288,
    y: 352,
    type: "MAIS_62",
  },
  {
    x: 256,
    y: 352,
    type: "MAIS_61",
  },
  {
    x: 256,
    y: 320,
    type: "MAIS_49",
  },
  {
    x: 256,
    y: 288,
    type: "MAIS_49",
  },
  {
    x: 256,
    y: 256,
    type: "MAIS_49",
  },
  {
    x: 256,
    y: 224,
    type: "MAIS_49",
  },
  {
    x: 256,
    y: 192,
    type: "MAIS_37",
  },
  {
    x: 288,
    y: 192,
    type: "MAIS_38",
  },
  {
    x: 320,
    y: 192,
    type: "MAIS_38",
  },
  {
    x: 352,
    y: 192,
    type: "MAIS_38",
  },
  {
    x: 384,
    y: 192,
    type: "MAIS_38",
  },
  {
    x: 480,
    y: 192,
    type: "MAIS_39",
  },
  {
    x: 480,
    y: 224,
    type: "MAIS_51",
  },
  {
    x: 480,
    y: 256,
    type: "MAIS_51",
  },
  {
    x: 480,
    y: 288,
    type: "MAIS_51",
  },
  {
    x: 480,
    y: 320,
    type: "MAIS_51",
  },
  {
    x: 480,
    y: 352,
    type: "MAIS_63",
  },
  {
    x: 448,
    y: 352,
    type: "MAIS_62",
  },
  {
    x: 416,
    y: 352,
    type: "MAIS_62",
  },
  {
    x: 288,
    y: 320,
    type: "MAIS_42",
  },
  {
    x: 448,
    y: 320,
    type: "MAIS_42",
  },
  {
    x: 320,
    y: 320,
    type: "MAIS_SOL",
  },
  {
    x: 352,
    y: 320,
    type: "MAIS_SOL",
  },
  {
    x: 384,
    y: 320,
    type: "MAIS_SOL",
  },
  {
    x: 416,
    y: 320,
    type: "MAIS_SOL",
  },
  {
    x: 384,
    y: 288,
    type: "MAIS_SOL",
  },
  {
    x: 352,
    y: 288,
    type: "MAIS_SOL",
  },
  {
    x: 320,
    y: 288,
    type: "MAIS_SOL",
  },
  {
    x: 288,
    y: 288,
    type: "MAIS_SOL",
  },
  {
    x: 320,
    y: 256,
    type: "MAIS_SOL",
  },
  {
    x: 352,
    y: 256,
    type: "MAIS_SOL",
  },
  {
    x: 384,
    y: 256,
    type: "MAIS_SOL",
  },
  {
    x: 416,
    y: 256,
    type: "MAIS_SOL",
  },
  {
    x: 448,
    y: 256,
    type: "MAIS_SOL",
  },
  {
    x: 352,
    y: 224,
    type: "MAIS_SOL",
  },
  {
    x: 320,
    y: 224,
    type: "MAIS_SOL",
  },
  {
    x: 288,
    y: 224,
    type: "MAIS_54",
  },
  {
    x: 288,
    y: 256,
    type: "MAIS_66",
  },
  {
    x: 448,
    y: 192,
    type: "MAIS_HautArmoire",
  },
  {
    x: 448,
    y: 224,
    type: "MAIS_BasArmoire",
  },
  {
    x: 416,
    y: 224,
    type: "MAIS_BasArmoire",
  },
  {
    x: 416,
    y: 192,
    type: "MAIS_HautArmoire",
  },
  {
    x: 448,
    y: 288,
    type: "MAIS_7",
  },
  {
    x: 416,
    y: 288,
    type: "MAIS_78",
  },
  {
    x: 384,
    y: 224,
    type: "MAIS_42",
  },
];

export const zoneData = {
  id: "maison_violette1_interior",
  name: "Maison Violette",
  bgColor: "#1a0a2a",
  mapData: { walls: mapTiles },
  enemies: { moblins: 0, octoroks: 0 },
  connections: {},
  doors: [
    {
      x: 352,
      y: 352,
      w: 64,
      h: 32,
      target: "village",
      spawnX: 96,
      spawnY: 280,
    },
  ],
  npcs: [],
};
