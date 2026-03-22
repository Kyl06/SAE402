/**
 * @file puit_koumbou.js
 * @description Interieur du Puit de Koumbou. Zone souterraine accessible depuis le village.
 * Sortie : porte au sud → retour au village
 */

const mapTiles = [
    {
      "x": 288,
      "y": 448,
      "type": "SOL_PUIT"
    },
    {
      "x": 320,
      "y": 448,
      "type": "SOL_PUIT"
    },
    {
      "x": 352,
      "y": 448,
      "type": "SOL_PUIT"
    },
    {
      "x": 384,
      "y": 448,
      "type": "SOL_PUIT"
    },
    {
      "x": 416,
      "y": 448,
      "type": "SOL_PUIT"
    },
    {
      "x": 448,
      "y": 448,
      "type": "SOL_PUIT"
    },
    {
      "x": 480,
      "y": 448,
      "type": "SOL_PUIT"
    },
    {
      "x": 512,
      "y": 448,
      "type": "SOL_PUIT"
    },
    {
      "x": 544,
      "y": 448,
      "type": "SOL_PUIT"
    },
    {
      "x": 576,
      "y": 448,
      "type": "SOL_PUIT"
    },
    {
      "x": 576,
      "y": 416,
      "type": "SOL_PUIT"
    },
    {
      "x": 576,
      "y": 384,
      "type": "SOL_PUIT"
    },
    {
      "x": 576,
      "y": 352,
      "type": "SOL_PUIT"
    },
    {
      "x": 576,
      "y": 320,
      "type": "SOL_PUIT"
    },
    {
      "x": 576,
      "y": 288,
      "type": "SOL_PUIT"
    },
    {
      "x": 576,
      "y": 256,
      "type": "SOL_PUIT"
    },
    {
      "x": 576,
      "y": 224,
      "type": "SOL_PUIT"
    },
    {
      "x": 576,
      "y": 192,
      "type": "SOL_PUIT"
    },
    {
      "x": 576,
      "y": 160,
      "type": "SOL_PUIT"
    },
    {
      "x": 544,
      "y": 160,
      "type": "SOL_PUIT"
    },
    {
      "x": 512,
      "y": 160,
      "type": "SOL_PUIT"
    },
    {
      "x": 480,
      "y": 160,
      "type": "SOL_PUIT"
    },
    {
      "x": 448,
      "y": 160,
      "type": "SOL_PUIT"
    },
    {
      "x": 416,
      "y": 160,
      "type": "SOL_PUIT"
    },
    {
      "x": 384,
      "y": 160,
      "type": "SOL_PUIT"
    },
    {
      "x": 352,
      "y": 160,
      "type": "SOL_PUIT"
    },
    {
      "x": 320,
      "y": 160,
      "type": "SOL_PUIT"
    },
    {
      "x": 288,
      "y": 160,
      "type": "SOL_PUIT"
    },
    {
      "x": 256,
      "y": 160,
      "type": "SOL_PUIT"
    },
    {
      "x": 224,
      "y": 160,
      "type": "SOL_PUIT"
    },
    {
      "x": 224,
      "y": 352,
      "type": "SOL_PUIT"
    },
    {
      "x": 224,
      "y": 384,
      "type": "SOL_PUIT"
    },
    {
      "x": 224,
      "y": 416,
      "type": "SOL_PUIT"
    },
    {
      "x": 352,
      "y": 416,
      "type": "SOL_PUIT"
    },
    {
      "x": 416,
      "y": 416,
      "type": "SOL_PUIT"
    },
    {
      "x": 448,
      "y": 416,
      "type": "SOL_PUIT"
    },
    {
      "x": 480,
      "y": 416,
      "type": "SOL_PUIT"
    },
    {
      "x": 544,
      "y": 416,
      "type": "SOL_PUIT"
    },
    {
      "x": 544,
      "y": 384,
      "type": "SOL_PUIT"
    },
    {
      "x": 512,
      "y": 320,
      "type": "SOL_PUIT"
    },
    {
      "x": 544,
      "y": 352,
      "type": "SOL_PUIT"
    },
    {
      "x": 544,
      "y": 320,
      "type": "SOL_PUIT"
    },
    {
      "x": 512,
      "y": 288,
      "type": "SOL_PUIT"
    },
    {
      "x": 544,
      "y": 192,
      "type": "SOL_PUIT"
    },
    {
      "x": 544,
      "y": 224,
      "type": "SOL_PUIT"
    },
    {
      "x": 544,
      "y": 256,
      "type": "SOL_PUIT"
    },
    {
      "x": 544,
      "y": 288,
      "type": "SOL_PUIT"
    },
    {
      "x": 512,
      "y": 256,
      "type": "SOL_PUIT"
    },
    {
      "x": 512,
      "y": 224,
      "type": "SOL_PUIT"
    },
    {
      "x": 512,
      "y": 192,
      "type": "SOL_PUIT"
    },
    {
      "x": 480,
      "y": 192,
      "type": "SOL_PUIT"
    },
    {
      "x": 448,
      "y": 192,
      "type": "SOL_PUIT"
    },
    {
      "x": 416,
      "y": 192,
      "type": "SOL_PUIT"
    },
    {
      "x": 384,
      "y": 192,
      "type": "SOL_PUIT"
    },
    {
      "x": 352,
      "y": 192,
      "type": "SOL_PUIT"
    },
    {
      "x": 320,
      "y": 192,
      "type": "SOL_PUIT"
    },
    {
      "x": 288,
      "y": 192,
      "type": "SOL_PUIT"
    },
    {
      "x": 256,
      "y": 192,
      "type": "SOL_PUIT"
    },
    {
      "x": 288,
      "y": 224,
      "type": "SOL_PUIT"
    },
    {
      "x": 320,
      "y": 224,
      "type": "SOL_PUIT"
    },
    {
      "x": 352,
      "y": 224,
      "type": "SOL_PUIT"
    },
    {
      "x": 480,
      "y": 224,
      "type": "SOL_PUIT"
    },
    {
      "x": 480,
      "y": 320,
      "type": "SOL_PUIT"
    },
    {
      "x": 480,
      "y": 288,
      "type": "SOL_PUIT"
    },
    {
      "x": 480,
      "y": 256,
      "type": "SOL_PUIT"
    },
    {
      "x": 448,
      "y": 256,
      "type": "SOL_PUIT"
    },
    {
      "x": 448,
      "y": 224,
      "type": "SOL_PUIT"
    },
    {
      "x": 416,
      "y": 224,
      "type": "SOL_PUIT"
    },
    {
      "x": 384,
      "y": 256,
      "type": "SOL_PUIT"
    },
    {
      "x": 384,
      "y": 224,
      "type": "SOL_PUIT"
    },
    {
      "x": 352,
      "y": 256,
      "type": "SOL_PUIT"
    },
    {
      "x": 288,
      "y": 256,
      "type": "SOL_PUIT"
    },
    {
      "x": 256,
      "y": 224,
      "type": "SOL_PUIT"
    },
    {
      "x": 256,
      "y": 256,
      "type": "SOL_PUIT"
    },
    {
      "x": 256,
      "y": 288,
      "type": "SOL_PUIT"
    },
    {
      "x": 320,
      "y": 416,
      "type": "SOL_PUIT"
    },
    {
      "x": 288,
      "y": 416,
      "type": "SOL_PUIT"
    },
    {
      "x": 288,
      "y": 352,
      "type": "SOL_PUIT"
    },
    {
      "x": 288,
      "y": 384,
      "type": "SOL_PUIT"
    },
    {
      "x": 256,
      "y": 384,
      "type": "SOL_PUIT"
    },
    {
      "x": 256,
      "y": 416,
      "type": "SOL_PUIT"
    },
    {
      "x": 256,
      "y": 448,
      "type": "SOL_PUIT"
    },
    {
      "x": 224,
      "y": 448,
      "type": "SOL_PUIT"
    },
    {
      "x": 192,
      "y": 448,
      "type": "SOL_PUIT"
    },
    {
      "x": 192,
      "y": 416,
      "type": "SOL_PUIT"
    },
    {
      "x": 192,
      "y": 384,
      "type": "SOL_PUIT"
    },
    {
      "x": 192,
      "y": 352,
      "type": "SOL_PUIT"
    },
    {
      "x": 192,
      "y": 320,
      "type": "SOL_PUIT"
    },
    {
      "x": 192,
      "y": 288,
      "type": "SOL_PUIT"
    },
    {
      "x": 192,
      "y": 256,
      "type": "SOL_PUIT"
    },
    {
      "x": 192,
      "y": 224,
      "type": "SOL_PUIT"
    },
    {
      "x": 192,
      "y": 160,
      "type": "SOL_PUIT"
    },
    {
      "x": 192,
      "y": 192,
      "type": "SOL_PUIT"
    },
    {
      "x": 224,
      "y": 192,
      "type": "SOL_PUIT"
    },
    {
      "x": 224,
      "y": 224,
      "type": "SOL_PUIT"
    },
    {
      "x": 224,
      "y": 256,
      "type": "SOL_PUIT"
    },
    {
      "x": 224,
      "y": 288,
      "type": "SOL_PUIT"
    },
    {
      "x": 224,
      "y": 320,
      "type": "SOL_PUIT"
    },
    {
      "x": 256,
      "y": 352,
      "type": "SOL_PUIT"
    },
    {
      "x": 256,
      "y": 320,
      "type": "SOL_PUIT"
    },
    {
      "x": 288,
      "y": 320,
      "type": "SOL_PUIT"
    },
    {
      "x": 288,
      "y": 288,
      "type": "SOL_PUIT"
    },
    {
      "x": 320,
      "y": 256,
      "type": "SOL_PUIT"
    },
    {
      "x": 320,
      "y": 288,
      "type": "SOL_PUIT"
    },
    {
      "x": 320,
      "y": 320,
      "type": "SOL_PUIT"
    },
    {
      "x": 320,
      "y": 352,
      "type": "SOL_PUIT"
    },
    {
      "x": 320,
      "y": 384,
      "type": "SOL_PUIT"
    },
    {
      "x": 352,
      "y": 288,
      "type": "SOL_PUIT"
    },
    {
      "x": 352,
      "y": 320,
      "type": "SOL_PUIT"
    },
    {
      "x": 352,
      "y": 384,
      "type": "SOL_PUIT"
    },
    {
      "x": 352,
      "y": 352,
      "type": "SOL_PUIT"
    },
    {
      "x": 384,
      "y": 288,
      "type": "SOL_PUIT"
    },
    {
      "x": 416,
      "y": 256,
      "type": "SOL_PUIT"
    },
    {
      "x": 384,
      "y": 416,
      "type": "SOL_PUIT"
    },
    {
      "x": 384,
      "y": 384,
      "type": "SOL_PUIT"
    },
    {
      "x": 384,
      "y": 352,
      "type": "SOL_PUIT"
    },
    {
      "x": 384,
      "y": 320,
      "type": "SOL_PUIT"
    },
    {
      "x": 416,
      "y": 352,
      "type": "SOL_PUIT"
    },
    {
      "x": 416,
      "y": 288,
      "type": "SOL_PUIT"
    },
    {
      "x": 416,
      "y": 320,
      "type": "SOL_PUIT"
    },
    {
      "x": 416,
      "y": 384,
      "type": "SOL_PUIT"
    },
    {
      "x": 448,
      "y": 288,
      "type": "SOL_PUIT"
    },
    {
      "x": 448,
      "y": 320,
      "type": "SOL_PUIT"
    },
    {
      "x": 448,
      "y": 352,
      "type": "SOL_PUIT"
    },
    {
      "x": 448,
      "y": 384,
      "type": "SOL_PUIT"
    },
    {
      "x": 480,
      "y": 352,
      "type": "SOL_PUIT"
    },
    {
      "x": 480,
      "y": 384,
      "type": "SOL_PUIT"
    },
    {
      "x": 512,
      "y": 416,
      "type": "SOL_PUIT"
    },
    {
      "x": 512,
      "y": 352,
      "type": "SOL_PUIT"
    },
    {
      "x": 512,
      "y": 384,
      "type": "SOL_PUIT"
    },
    {
      "x": 192,
      "y": 128,
      "type": "FORT_DECO_3"
    },
    {
      "x": 224,
      "y": 128,
      "type": "FORT_DECO_3"
    },
    {
      "x": 256,
      "y": 128,
      "type": "FORT_DECO_3"
    },
    {
      "x": 288,
      "y": 128,
      "type": "FORT_DECO_3"
    },
    {
      "x": 320,
      "y": 128,
      "type": "FORT_DECO_3"
    },
    {
      "x": 352,
      "y": 128,
      "type": "FORT_DECO_3"
    },
    {
      "x": 384,
      "y": 128,
      "type": "FORT_DECO_3"
    },
    {
      "x": 416,
      "y": 128,
      "type": "FORT_DECO_3"
    },
    {
      "x": 448,
      "y": 128,
      "type": "FORT_DECO_3"
    },
    {
      "x": 480,
      "y": 128,
      "type": "FORT_DECO_3"
    },
    {
      "x": 512,
      "y": 128,
      "type": "FORT_DECO_3"
    },
    {
      "x": 544,
      "y": 128,
      "type": "FORT_DECO_3"
    },
    {
      "x": 576,
      "y": 128,
      "type": "FORT_DECO_3"
    },
    {
      "x": 608,
      "y": 128,
      "type": "FORT_DECO_3"
    },
    {
      "x": 608,
      "y": 160,
      "type": "FORT_DECO_3"
    },
    {
      "x": 608,
      "y": 192,
      "type": "FORT_DECO_3"
    },
    {
      "x": 608,
      "y": 224,
      "type": "FORT_DECO_3"
    },
    {
      "x": 608,
      "y": 256,
      "type": "FORT_DECO_3"
    },
    {
      "x": 608,
      "y": 288,
      "type": "FORT_DECO_3"
    },
    {
      "x": 608,
      "y": 320,
      "type": "FORT_DECO_3"
    },
    {
      "x": 608,
      "y": 352,
      "type": "FORT_DECO_3"
    },
    {
      "x": 608,
      "y": 384,
      "type": "FORT_DECO_3"
    },
    {
      "x": 608,
      "y": 416,
      "type": "FORT_DECO_3"
    },
    {
      "x": 608,
      "y": 448,
      "type": "FORT_DECO_3"
    },
    {
      "x": 608,
      "y": 480,
      "type": "FORT_DECO_3"
    },
    {
      "x": 576,
      "y": 480,
      "type": "FORT_DECO_3"
    },
    {
      "x": 544,
      "y": 480,
      "type": "FORT_DECO_3"
    },
    {
      "x": 512,
      "y": 480,
      "type": "FORT_DECO_3"
    },
    {
      "x": 480,
      "y": 480,
      "type": "FORT_DECO_3"
    },
    {
      "x": 448,
      "y": 480,
      "type": "FORT_DECO_3"
    },
    {
      "x": 416,
      "y": 480,
      "type": "FORT_DECO_3"
    },
    {
      "x": 384,
      "y": 480,
      "type": "FORT_DECO_3"
    },
    {
      "x": 352,
      "y": 480,
      "type": "FORT_DECO_3"
    },
    {
      "x": 320,
      "y": 480,
      "type": "FORT_DECO_3"
    },
    {
      "x": 288,
      "y": 480,
      "type": "FORT_DECO_3"
    },
    {
      "x": 256,
      "y": 480,
      "type": "FORT_DECO_3"
    },
    {
      "x": 224,
      "y": 480,
      "type": "FORT_DECO_3"
    },
    {
      "x": 192,
      "y": 480,
      "type": "FORT_DECO_3"
    },
    {
      "x": 160,
      "y": 480,
      "type": "FORT_DECO_3"
    },
    {
      "x": 160,
      "y": 448,
      "type": "FORT_DECO_3"
    },
    {
      "x": 160,
      "y": 416,
      "type": "FORT_DECO_3"
    },
    {
      "x": 160,
      "y": 384,
      "type": "FORT_DECO_3"
    },
    {
      "x": 160,
      "y": 352,
      "type": "FORT_DECO_3"
    },
    {
      "x": 160,
      "y": 320,
      "type": "FORT_DECO_3"
    },
    {
      "x": 160,
      "y": 288,
      "type": "FORT_DECO_3"
    },
    {
      "x": 160,
      "y": 256,
      "type": "FORT_DECO_3"
    },
    {
      "x": 160,
      "y": 224,
      "type": "FORT_DECO_3"
    },
    {
      "x": 160,
      "y": 192,
      "type": "FORT_DECO_3"
    },
    {
      "x": 160,
      "y": 160,
      "type": "FORT_DECO_3"
    },
    {
      "x": 160,
      "y": 128,
      "type": "FORT_DECO_3"
    },
    {
      "x": 384,
      "y": 96,
      "type": "CORDE"
    }
];

export const zoneData = {
    id: 'puit_koumbou',
    name: 'Puit de Koumbou',
    bgColor: '#0a0a14',
    mapData: { walls: mapTiles },
    spawnArea: { x: 256, y: 224, w: 288, h: 192 },
    enemies: { moblins: 2, octoroks: 0 },
    connections: {},
    doors: [
        { x: 352, y: 192, w: 96, h: 96, target: 'village', spawnX: 160, spawnY: 384, interact: true, indicatorOffsetY: -16 }
    ],
    npcs: []
};
