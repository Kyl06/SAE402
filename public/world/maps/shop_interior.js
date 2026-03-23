/**
 * @file shop_interior.js
 * @description Interieur de la boutique du marchand.
 * Sortie : porte au sud → retour au village
 */

const mapTiles = [
  {
    x: 352,
    y: 352,
    type: "SHOP_SOL",
  },
  {
    x: 352,
    y: 320,
    type: "SHOP_SOL",
  },
  {
    x: 384,
    y: 352,
    type: "SHOP_SOL",
  },
  {
    x: 384,
    y: 320,
    type: "SHOP_SOL",
  },
  {
    x: 448,
    y: 288,
    type: "SHOP_SOL",
  },
  {
    x: 448,
    y: 256,
    type: "SHOP_SOL",
  },
  {
    x: 448,
    y: 224,
    type: "SHOP_SOL",
  },
  {
    x: 448,
    y: 192,
    type: "SHOP_SOL",
  },
  {
    x: 384,
    y: 160,
    type: "SHOP_SOL",
  },
  {
    x: 352,
    y: 160,
    type: "SHOP_SOL",
  },
  {
    x: 352,
    y: 192,
    type: "SHOP_SOL",
  },
  {
    x: 384,
    y: 192,
    type: "SHOP_SOL",
  },
  {
    x: 416,
    y: 192,
    type: "SHOP_SOL",
  },
  {
    x: 416,
    y: 256,
    type: "SHOP_SOL",
  },
  {
    x: 384,
    y: 256,
    type: "SHOP_SOL",
  },
  {
    x: 352,
    y: 256,
    type: "SHOP_SOL",
  },
  {
    x: 320,
    y: 256,
    type: "SHOP_SOL",
  },
  {
    x: 288,
    y: 224,
    type: "SHOP_SOL",
  },
  {
    x: 288,
    y: 256,
    type: "SHOP_SOL",
  },
  {
    x: 288,
    y: 288,
    type: "SHOP_SOL",
  },
  {
    x: 320,
    y: 288,
    type: "SHOP_SOL",
  },
  {
    x: 352,
    y: 288,
    type: "SHOP_SOL",
  },
  {
    x: 384,
    y: 288,
    type: "SHOP_SOL",
  },
  {
    x: 416,
    y: 288,
    type: "SHOP_SOL",
  },
  {
    x: 416,
    y: 160,
    type: "SHOP_VASE",
  },
  {
    x: 448,
    y: 160,
    type: "SHOP_VASE",
  },
  {
    x: 288,
    y: 160,
    type: "SHOP_VASE",
  },
  {
    x: 288,
    y: 320,
    type: "SHOP_VASE",
  },
  {
    x: 448,
    y: 320,
    type: "SHOP_VASE",
  },
  {
    x: 320,
    y: 320,
    type: "SHOP_STATUE",
  },
  {
    x: 416,
    y: 320,
    type: "SHOP_STATUE",
  },
  {
    x: 480,
    y: 128,
    type: "MAIS_39",
  },
  {
    x: 256,
    y: 128,
    type: "MAIS_37",
  },
  {
    x: 288,
    y: 128,
    type: "MAIS_38",
  },
  {
    x: 320,
    y: 128,
    type: "MAIS_38",
  },
  {
    x: 352,
    y: 128,
    type: "MAIS_38",
  },
  {
    x: 384,
    y: 128,
    type: "MAIS_38",
  },
  {
    x: 416,
    y: 128,
    type: "MAIS_38",
  },
  {
    x: 448,
    y: 128,
    type: "MAIS_38",
  },
  {
    x: 256,
    y: 160,
    type: "MAIS_49",
  },
  {
    x: 256,
    y: 192,
    type: "MAIS_49",
  },
  {
    x: 256,
    y: 224,
    type: "MAIS_49",
  },
  {
    x: 256,
    y: 256,
    type: "MAIS_49",
  },
  {
    x: 256,
    y: 288,
    type: "MAIS_49",
  },
  {
    x: 256,
    y: 320,
    type: "MAIS_49",
  },
  {
    x: 256,
    y: 352,
    type: "MAIS_61",
  },
  {
    x: 288,
    y: 352,
    type: "MAIS_62",
  },
  {
    x: 320,
    y: 352,
    type: "MAIS_62",
  },
  {
    x: 416,
    y: 352,
    type: "MAIS_62",
  },
  {
    x: 448,
    y: 352,
    type: "MAIS_62",
  },
  {
    x: 480,
    y: 352,
    type: "MAIS_63",
  },
  {
    x: 480,
    y: 320,
    type: "MAIS_51",
  },
  {
    x: 384,
    y: 224,
    type: "MAIS_19",
  },
  {
    x: 352,
    y: 224,
    type: "MAIS_19",
  },
  {
    x: 416,
    y: 224,
    type: "MAIS_7",
  },
  {
    x: 320,
    y: 224,
    type: "MAIS_78",
  },
  {
    x: 320,
    y: 192,
    type: "SHOP_SOL",
  },
  {
    x: 480,
    y: 288,
    type: "MAIS_51",
  },
  {
    x: 480,
    y: 256,
    type: "MAIS_51",
  },
  {
    x: 480,
    y: 224,
    type: "MAIS_51",
  },
  {
    x: 480,
    y: 192,
    type: "MAIS_51",
  },
  {
    x: 480,
    y: 160,
    type: "MAIS_51",
  },
  {
    x: 288,
    y: 192,
    type: "SHOP_VASE",
  },
  {
    x: 320,
    y: 160,
    type: "MAIS_17",
  },
];

export const zoneData = {
  id: "shop_interior",
  name: "Boutique",
  bgColor: "#2a1a0a",
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
      spawnX: 576,
      spawnY: 250,
    },
  ],
  npcs: [
    {
      name: "Marchand",
      x: 368,
      y: 192,
      sprite: "VENDEUR",
      spriteColumns: 2,
      spriteW: 16,
      spriteH: 32,
      z: 2,
      isShop: true,
      interactRange: 80,
      dialogues: ["Bienvenue ! Que veux-tu acheter ?"],
    },
  ],
};
