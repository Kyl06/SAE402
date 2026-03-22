/**
 * @file maison_bleu_interior.js
 * @description Interieur de la maison bleue.
 * Sortie : porte au sud → retour au village
 */

const mapTiles = [
    {
      "x": 384,
      "y": 352,
      "type": "MAIS_73"
    },
    {
      "x": 352,
      "y": 352,
      "type": "MAIS_64"
    },
    {
      "x": 320,
      "y": 352,
      "type": "MAIS_62"
    },
    {
      "x": 288,
      "y": 352,
      "type": "MAIS_62"
    },
    {
      "x": 256,
      "y": 352,
      "type": "MAIS_62"
    },
    {
      "x": 224,
      "y": 352,
      "type": "MAIS_62"
    },
    {
      "x": 192,
      "y": 352,
      "type": "MAIS_62"
    },
    {
      "x": 160,
      "y": 352,
      "type": "MAIS_61"
    },
    {
      "x": 160,
      "y": 320,
      "type": "MAIS_49"
    },
    {
      "x": 160,
      "y": 288,
      "type": "MAIS_49"
    },
    {
      "x": 160,
      "y": 256,
      "type": "MAIS_49"
    },
    {
      "x": 160,
      "y": 224,
      "type": "MAIS_49"
    },
    {
      "x": 160,
      "y": 192,
      "type": "MAIS_49"
    },
    {
      "x": 160,
      "y": 160,
      "type": "MAIS_49"
    },
    {
      "x": 160,
      "y": 128,
      "type": "MAIS_37"
    },
    {
      "x": 192,
      "y": 128,
      "type": "MAIS_38"
    },
    {
      "x": 224,
      "y": 128,
      "type": "MAIS_38"
    },
    {
      "x": 256,
      "y": 128,
      "type": "MAIS_38"
    },
    {
      "x": 288,
      "y": 128,
      "type": "MAIS_38"
    },
    {
      "x": 320,
      "y": 128,
      "type": "MAIS_38"
    },
    {
      "x": 352,
      "y": 128,
      "type": "MAIS_38"
    },
    {
      "x": 384,
      "y": 128,
      "type": "MAIS_38"
    },
    {
      "x": 416,
      "y": 128,
      "type": "MAIS_38"
    },
    {
      "x": 480,
      "y": 128,
      "type": "MAIS_38"
    },
    {
      "x": 512,
      "y": 128,
      "type": "MAIS_38"
    },
    {
      "x": 416,
      "y": 352,
      "type": "MAIS_62"
    },
    {
      "x": 448,
      "y": 352,
      "type": "MAIS_62"
    },
    {
      "x": 480,
      "y": 352,
      "type": "MAIS_62"
    },
    {
      "x": 512,
      "y": 352,
      "type": "MAIS_62"
    },
    {
      "x": 544,
      "y": 352,
      "type": "MAIS_62"
    },
    {
      "x": 576,
      "y": 352,
      "type": "MAIS_63"
    },
    {
      "x": 576,
      "y": 128,
      "type": "MAIS_39"
    },
    {
      "x": 576,
      "y": 160,
      "type": "MAIS_51"
    },
    {
      "x": 576,
      "y": 192,
      "type": "MAIS_51"
    },
    {
      "x": 576,
      "y": 224,
      "type": "MAIS_51"
    },
    {
      "x": 576,
      "y": 256,
      "type": "MAIS_51"
    },
    {
      "x": 576,
      "y": 288,
      "type": "MAIS_51"
    },
    {
      "x": 576,
      "y": 320,
      "type": "MAIS_51"
    },
    {
      "x": 224,
      "y": 320,
      "type": "MAIS_SOL"
    },
    {
      "x": 256,
      "y": 320,
      "type": "MAIS_SOL"
    },
    {
      "x": 288,
      "y": 320,
      "type": "MAIS_SOL"
    },
    {
      "x": 320,
      "y": 320,
      "type": "MAIS_SOL"
    },
    {
      "x": 352,
      "y": 320,
      "type": "MAIS_SOL"
    },
    {
      "x": 384,
      "y": 320,
      "type": "MAIS_SOL"
    },
    {
      "x": 416,
      "y": 320,
      "type": "MAIS_SOL"
    },
    {
      "x": 448,
      "y": 320,
      "type": "MAIS_SOL"
    },
    {
      "x": 544,
      "y": 256,
      "type": "MAIS_SOL"
    },
    {
      "x": 544,
      "y": 192,
      "type": "MAIS_SOL"
    },
    {
      "x": 512,
      "y": 160,
      "type": "MAIS_SOL"
    },
    {
      "x": 480,
      "y": 160,
      "type": "MAIS_SOL"
    },
    {
      "x": 256,
      "y": 160,
      "type": "MAIS_SOL"
    },
    {
      "x": 288,
      "y": 160,
      "type": "MAIS_SOL"
    },
    {
      "x": 320,
      "y": 160,
      "type": "MAIS_SOL"
    },
    {
      "x": 416,
      "y": 160,
      "type": "MAIS_SOL"
    },
    {
      "x": 448,
      "y": 192,
      "type": "MAIS_SOL"
    },
    {
      "x": 416,
      "y": 192,
      "type": "MAIS_SOL"
    },
    {
      "x": 384,
      "y": 192,
      "type": "MAIS_SOL"
    },
    {
      "x": 352,
      "y": 192,
      "type": "MAIS_SOL"
    },
    {
      "x": 320,
      "y": 192,
      "type": "MAIS_SOL"
    },
    {
      "x": 224,
      "y": 192,
      "type": "MAIS_SOL"
    },
    {
      "x": 256,
      "y": 192,
      "type": "MAIS_SOL"
    },
    {
      "x": 288,
      "y": 192,
      "type": "MAIS_SOL"
    },
    {
      "x": 256,
      "y": 224,
      "type": "MAIS_SOL"
    },
    {
      "x": 224,
      "y": 224,
      "type": "MAIS_SOL"
    },
    {
      "x": 224,
      "y": 288,
      "type": "MAIS_SOL"
    },
    {
      "x": 256,
      "y": 256,
      "type": "MAIS_SOL"
    },
    {
      "x": 256,
      "y": 288,
      "type": "MAIS_SOL"
    },
    {
      "x": 288,
      "y": 224,
      "type": "MAIS_SOL"
    },
    {
      "x": 288,
      "y": 288,
      "type": "MAIS_SOL"
    },
    {
      "x": 288,
      "y": 256,
      "type": "MAIS_SOL"
    },
    {
      "x": 352,
      "y": 256,
      "type": "MAIS_SOL"
    },
    {
      "x": 320,
      "y": 256,
      "type": "MAIS_SOL"
    },
    {
      "x": 320,
      "y": 288,
      "type": "MAIS_SOL"
    },
    {
      "x": 352,
      "y": 288,
      "type": "MAIS_SOL"
    },
    {
      "x": 384,
      "y": 288,
      "type": "MAIS_SOL"
    },
    {
      "x": 416,
      "y": 288,
      "type": "MAIS_SOL"
    },
    {
      "x": 512,
      "y": 288,
      "type": "MAIS_SOL"
    },
    {
      "x": 512,
      "y": 256,
      "type": "MAIS_SOL"
    },
    {
      "x": 448,
      "y": 224,
      "type": "MAIS_SOL"
    },
    {
      "x": 480,
      "y": 192,
      "type": "MAIS_SOL"
    },
    {
      "x": 544,
      "y": 224,
      "type": "MAIS_SOL"
    },
    {
      "x": 512,
      "y": 224,
      "type": "MAIS_SOL"
    },
    {
      "x": 512,
      "y": 192,
      "type": "MAIS_SOL"
    },
    {
      "x": 480,
      "y": 224,
      "type": "MAIS_SOL"
    },
    {
      "x": 448,
      "y": 288,
      "type": "MAIS_SOL"
    },
    {
      "x": 480,
      "y": 288,
      "type": "MAIS_SOL"
    },
    {
      "x": 480,
      "y": 256,
      "type": "MAIS_SOL"
    },
    {
      "x": 448,
      "y": 256,
      "type": "MAIS_SOL"
    },
    {
      "x": 416,
      "y": 256,
      "type": "MAIS_SOL"
    },
    {
      "x": 384,
      "y": 256,
      "type": "MAIS_SOL"
    },
    {
      "x": 544,
      "y": 128,
      "type": "MAIS_HautArmoire"
    },
    {
      "x": 544,
      "y": 160,
      "type": "MAIS_BasArmoire"
    },
    {
      "x": 192,
      "y": 160,
      "type": "MAIS_54"
    },
    {
      "x": 192,
      "y": 192,
      "type": "MAIS_66"
    },
    {
      "x": 192,
      "y": 256,
      "type": "MAIS_54"
    },
    {
      "x": 192,
      "y": 288,
      "type": "MAIS_66"
    },
    {
      "x": 224,
      "y": 256,
      "type": "MAIS_52"
    },
    {
      "x": 224,
      "y": 160,
      "type": "MAIS_52"
    },
    {
      "x": 192,
      "y": 224,
      "type": "MAIS_17"
    },
    {
      "x": 192,
      "y": 320,
      "type": "MAIS_17"
    },
    {
      "x": 512,
      "y": 320,
      "type": "MAIS_42"
    },
    {
      "x": 544,
      "y": 320,
      "type": "MAIS_42"
    },
    {
      "x": 544,
      "y": 288,
      "type": "MAIS_42"
    },
    {
      "x": 448,
      "y": 128,
      "type": "MAIS_HautArmoire"
    },
    {
      "x": 448,
      "y": 160,
      "type": "MAIS_BasArmoire"
    },
    {
      "x": 480,
      "y": 320,
      "type": "MAIS_4"
    },
    {
      "x": 416,
      "y": 224,
      "type": "MAIS_7"
    },
    {
      "x": 384,
      "y": 224,
      "type": "MAIS_19"
    },
    {
      "x": 352,
      "y": 224,
      "type": "MAIS_19"
    },
    {
      "x": 320,
      "y": 224,
      "type": "MAIS_78"
    },
    {
      "x": 384,
      "y": 160,
      "type": "MAIS_42"
    },
    {
      "x": 352,
      "y": 160,
      "type": "MAIS_42"
    }
];

export const zoneData = {
    id: 'maison_bleu_interior',
    name: 'Maison Bleue',
    bgColor: '#0a1a2a',
    mapData: { walls: mapTiles },
    enemies: { moblins: 0, octoroks: 0 },
    connections: {},
    doors: [
        { x: 352, y: 352, w: 64, h: 32, target: 'village', spawnX: 576, spawnY: 390 }
    ],
    npcs: []
};
