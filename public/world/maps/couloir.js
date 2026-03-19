/**
 * @file couloir.js
 * @description Zone avant la forteresse
 * Sorties : Nord (forteresse), Sud (village).
 */

const mapTiles =[
    {
      "x": 416,
      "y": 544,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 384,
      "y": 544,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 352,
      "y": 544,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 320,
      "y": 544,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 288,
      "y": 544,
      "type": "FORT_BAS_3"
    },
    {
      "x": 448,
      "y": 544,
      "type": "FORT_BAS_3"
    },
    {
      "x": 480,
      "y": 544,
      "type": "FORT_BAS_4"
    },
    {
      "x": 256,
      "y": 544,
      "type": "FORT_BAS_2"
    },
    {
      "x": 480,
      "y": 512,
      "type": "FORT_DECO_4"
    },
    {
      "x": 256,
      "y": 512,
      "type": "FORT_DECO_2"
    },
    {
      "x": 256,
      "y": 480,
      "type": "FORT_SOL_2"
    },
    {
      "x": 288,
      "y": 480,
      "type": "FORT_SOL_3"
    },
    {
      "x": 448,
      "y": 480,
      "type": "FORT_SOL_3"
    },
    {
      "x": 480,
      "y": 480,
      "type": "FORT_SOL_4"
    },
    {
      "x": 256,
      "y": 448,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 256,
      "y": 416,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 256,
      "y": 384,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 256,
      "y": 352,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 256,
      "y": 320,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 256,
      "y": 288,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 256,
      "y": 256,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 256,
      "y": 224,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 256,
      "y": 192,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 256,
      "y": 160,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 256,
      "y": 128,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 256,
      "y": 96,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 480,
      "y": 96,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 480,
      "y": 128,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 480,
      "y": 160,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 480,
      "y": 192,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 480,
      "y": 224,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 480,
      "y": 256,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 480,
      "y": 288,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 480,
      "y": 320,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 480,
      "y": 352,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 480,
      "y": 384,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 480,
      "y": 416,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 480,
      "y": 448,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 256,
      "y": 64,
      "type": "FORT_MUR_BLEU_2"
    },
    {
      "x": 480,
      "y": 64,
      "type": "FORT_BARREAUX_4"
    },
    {
      "x": 448,
      "y": 64,
      "type": "FORT_SOL_2"
    },
    {
      "x": 288,
      "y": 64,
      "type": "FORT_SOL_4"
    },
    {
      "x": 288,
      "y": 32,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 288,
      "y": 0,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 448,
      "y": 0,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 448,
      "y": 32,
      "type": "FORT_MUR_GRIS_2"
    },
    {
      "x": 320,
      "y": 512,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 352,
      "y": 512,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 384,
      "y": 512,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 416,
      "y": 512,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 416,
      "y": 480,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 384,
      "y": 480,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 352,
      "y": 480,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 320,
      "y": 480,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 320,
      "y": 352,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 352,
      "y": 352,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 384,
      "y": 352,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 416,
      "y": 352,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 320,
      "y": 256,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 352,
      "y": 256,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 384,
      "y": 256,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 416,
      "y": 256,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 320,
      "y": 64,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 320,
      "y": 32,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 320,
      "y": 0,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 352,
      "y": 0,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 352,
      "y": 32,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 352,
      "y": 64,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 384,
      "y": 64,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 384,
      "y": 32,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 384,
      "y": 0,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 416,
      "y": 0,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 416,
      "y": 32,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 416,
      "y": 64,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 320,
      "y": 288,
      "type": "FORT_SOL_BLEU"
    },
    {
      "x": 320,
      "y": 320,
      "type": "FORT_SOL_BLEU"
    },
    {
      "x": 352,
      "y": 288,
      "type": "FORT_SOL_BLEU"
    },
    {
      "x": 352,
      "y": 320,
      "type": "FORT_SOL_BLEU"
    },
    {
      "x": 384,
      "y": 320,
      "type": "FORT_SOL_BLEU"
    },
    {
      "x": 384,
      "y": 288,
      "type": "FORT_SOL_BLEU"
    },
    {
      "x": 416,
      "y": 320,
      "type": "FORT_SOL_BLEU"
    },
    {
      "x": 416,
      "y": 288,
      "type": "FORT_SOL_BLEU"
    },
    {
      "x": 288,
      "y": 288,
      "type": "FORT_SOL_BLEU"
    },
    {
      "x": 448,
      "y": 288,
      "type": "FORT_SOL_BLEU"
    },
    {
      "x": 288,
      "y": 256,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 448,
      "y": 256,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 448,
      "y": 352,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 288,
      "y": 352,
      "type": "FORT_MUR_BLEU"
    },
    {
      "x": 288,
      "y": 416,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 320,
      "y": 448,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 352,
      "y": 448,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 384,
      "y": 448,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 416,
      "y": 448,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 416,
      "y": 384,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 384,
      "y": 384,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 352,
      "y": 384,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 320,
      "y": 384,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 320,
      "y": 416,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 352,
      "y": 416,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 384,
      "y": 416,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 416,
      "y": 416,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 448,
      "y": 416,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 288,
      "y": 160,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 288,
      "y": 128,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 320,
      "y": 96,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 352,
      "y": 96,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 384,
      "y": 96,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 416,
      "y": 96,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 448,
      "y": 128,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 448,
      "y": 160,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 416,
      "y": 224,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 384,
      "y": 224,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 352,
      "y": 224,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 320,
      "y": 224,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 320,
      "y": 192,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 320,
      "y": 160,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 320,
      "y": 128,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 352,
      "y": 128,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 384,
      "y": 128,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 416,
      "y": 192,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 416,
      "y": 128,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 416,
      "y": 160,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 384,
      "y": 160,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 384,
      "y": 192,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 352,
      "y": 192,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 352,
      "y": 160,
      "type": "FORT_MUR_GRIS"
    },
    {
      "x": 288,
      "y": 512,
      "type": "FORT_BAS_8"
    },
    {
      "x": 448,
      "y": 512,
      "type": "FORT_BAS_8"
    },
    {
      "x": 288,
      "y": 224,
      "type": "FORT_BARREAUX_1"
    },
    {
      "x": 288,
      "y": 192,
      "type": "FORT_BARREAUX_1"
    },
    {
      "x": 448,
      "y": 192,
      "type": "FORT_BARREAUX_1"
    },
    {
      "x": 448,
      "y": 224,
      "type": "FORT_BARREAUX_1"
    },
    {
      "x": 288,
      "y": 320,
      "type": "FORT_BARREAUX_2"
    },
    {
      "x": 448,
      "y": 320,
      "type": "FORT_BARREAUX_2"
    },
    {
      "x": 288,
      "y": 448,
      "type": "FORT_BARREAUX_1"
    },
    {
      "x": 448,
      "y": 448,
      "type": "FORT_BARREAUX_1"
    },
    {
      "x": 288,
      "y": 384,
      "type": "FORT_BARREAUX_2"
    },
    {
      "x": 448,
      "y": 384,
      "type": "FORT_BARREAUX_2"
    },
    {
      "x": 288,
      "y": 96,
      "type": "FORT_BARREAUX_2"
    },
    {
      "x": 448,
      "y": 96,
      "type": "FORT_BARREAUX_2"
    }
];

export const zoneData = {
    id: 'Couloir_Forteresse',
    name: 'Couloir de la forteresse',
    bgColor: '#101010',
    mapData: { walls: mapTiles },
    enemies: { moblins: 0, octoroks: 0 },
    connections: { north: 'fortress_north', south: 'village'},
};
