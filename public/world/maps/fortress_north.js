/**
 * @file fortress_north.js
 * @description Zone Finale - Forteresse de Maldrek. Boss final.
 * Sortie : Sud (village) - bloquee par la barriere magique jusqu'a 3 fragments
 */

const interior = [
  {
    x: 96,
    y: 416,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 96,
    y: 160,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 64,
    y: 192,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 96,
    y: 192,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 64,
    y: 224,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 96,
    y: 224,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 32,
    y: 224,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 64,
    y: 256,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 96,
    y: 256,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 32,
    y: 256,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 64,
    y: 288,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 96,
    y: 288,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 32,
    y: 288,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 64,
    y: 320,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 96,
    y: 320,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 32,
    y: 320,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 64,
    y: 352,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 96,
    y: 352,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 32,
    y: 352,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 64,
    y: 384,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 96,
    y: 384,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 128,
    y: 416,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 160,
    y: 416,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 128,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 192,
    y: 416,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 160,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 224,
    y: 416,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 192,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 160,
    y: 480,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 224,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 192,
    y: 480,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 256,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 224,
    y: 480,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 288,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 256,
    y: 480,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 224,
    y: 512,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 320,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 288,
    y: 480,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 256,
    y: 512,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 352,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 320,
    y: 480,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 288,
    y: 512,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 384,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 352,
    y: 480,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 320,
    y: 512,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 416,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 384,
    y: 480,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 352,
    y: 512,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 448,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 416,
    y: 480,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 384,
    y: 512,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 352,
    y: 544,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 480,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 448,
    y: 480,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 416,
    y: 512,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 384,
    y: 544,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 512,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 480,
    y: 480,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 448,
    y: 512,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 416,
    y: 544,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 544,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 512,
    y: 480,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 480,
    y: 512,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 448,
    y: 544,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 576,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 544,
    y: 480,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 544,
    y: 416,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 512,
    y: 512,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 672,
    y: 96,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 608,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 576,
    y: 480,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 576,
    y: 416,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 544,
    y: 512,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 704,
    y: 96,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 672,
    y: 128,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 640,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 608,
    y: 480,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 608,
    y: 416,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 576,
    y: 512,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 736,
    y: 96,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 704,
    y: 128,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 672,
    y: 160,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 672,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 640,
    y: 480,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 640,
    y: 416,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 608,
    y: 512,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 736,
    y: 128,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 704,
    y: 160,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 672,
    y: 192,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 704,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 672,
    y: 480,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 672,
    y: 416,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 704,
    y: 480,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 704,
    y: 416,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 672,
    y: 384,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 672,
    y: 256,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 736,
    y: 416,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 704,
    y: 384,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 672,
    y: 352,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 672,
    y: 288,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 736,
    y: 384,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 704,
    y: 352,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 672,
    y: 320,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 704,
    y: 288,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 704,
    y: 320,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 672,
    y: 224,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 256,
    y: 320,
    type: "FORT_BARREAUX_4",
  },
  {
    x: 480,
    y: 544,
    type: "FORT_SOL_3",
  },
  {
    x: 512,
    y: 544,
    type: "FORT_SOL_3",
  },
  {
    x: 544,
    y: 544,
    type: "FORT_SOL_3",
  },
  {
    x: 576,
    y: 544,
    type: "FORT_SOL_3",
  },
  {
    x: 608,
    y: 544,
    type: "FORT_SOL_3",
  },
  {
    x: 640,
    y: 544,
    type: "FORT_SOL_3",
  },
  {
    x: 672,
    y: 544,
    type: "FORT_SOL_3",
  },
  {
    x: 704,
    y: 544,
    type: "FORT_SOL_3",
  },
  {
    x: 736,
    y: 544,
    type: "FORT_SOL_3",
  },
  {
    x: 224,
    y: 320,
    type: "FORT_BARREAUX_3",
  },
  {
    x: 192,
    y: 320,
    type: "FORT_BARREAUX_3",
  },
  {
    x: 160,
    y: 320,
    type: "FORT_BARREAUX_3",
  },
  {
    x: 544,
    y: 320,
    type: "FORT_BARREAUX_3",
  },
  {
    x: 576,
    y: 320,
    type: "FORT_BARREAUX_3",
  },
  {
    x: 608,
    y: 320,
    type: "FORT_BARREAUX_3",
  },
  {
    x: 768,
    y: 32,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 768,
    y: 64,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 768,
    y: 96,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 768,
    y: 128,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 768,
    y: 160,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 768,
    y: 192,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 768,
    y: 224,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 768,
    y: 256,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 768,
    y: 288,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 768,
    y: 320,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 768,
    y: 352,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 768,
    y: 384,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 768,
    y: 416,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 768,
    y: 448,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 768,
    y: 480,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 768,
    y: 512,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 0,
    y: 32,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 0,
    y: 64,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 0,
    y: 96,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 0,
    y: 128,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 0,
    y: 160,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 0,
    y: 192,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 0,
    y: 224,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 0,
    y: 256,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 0,
    y: 288,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 0,
    y: 320,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 0,
    y: 352,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 0,
    y: 384,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 0,
    y: 416,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 0,
    y: 448,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 0,
    y: 480,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 0,
    y: 512,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 128,
    y: 288,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 128,
    y: 256,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 128,
    y: 224,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 128,
    y: 192,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 640,
    y: 288,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 640,
    y: 224,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 640,
    y: 192,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 640,
    y: 256,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 512,
    y: 320,
    type: "FORT_MUR_BLEU_2",
  },
  {
    x: 128,
    y: 320,
    type: "FORT_SOL_2",
  },
  {
    x: 640,
    y: 320,
    type: "FORT_SOL_4",
  },
  {
    x: 0,
    y: 544,
    type: "FORT_SOL_2",
  },
  {
    x: 768,
    y: 544,
    type: "FORT_SOL_4",
  },
  {
    x: 256,
    y: 352,
    type: "FORT_SOL_1",
  },
  {
    x: 256,
    y: 384,
    type: "FORT_DECO_1",
  },
  {
    x: 256,
    y: 416,
    type: "FORT_BAS_1",
  },
  {
    x: 512,
    y: 352,
    type: "FORT_SOL_1",
  },
  {
    x: 512,
    y: 384,
    type: "FORT_DECO_1",
  },
  {
    x: 512,
    y: 416,
    type: "FORT_BAS_1",
  },
  {
    x: 128,
    y: 352,
    type: "FORT_DECO_2",
  },
  {
    x: 160,
    y: 352,
    type: "FORT_DECO_3",
  },
  {
    x: 224,
    y: 352,
    type: "FORT_DECO_3",
  },
  {
    x: 544,
    y: 352,
    type: "FORT_DECO_3",
  },
  {
    x: 608,
    y: 352,
    type: "FORT_DECO_3",
  },
  {
    x: 640,
    y: 352,
    type: "FORT_DECO_4",
  },
  {
    x: 128,
    y: 384,
    type: "FORT_BAS_2",
  },
  {
    x: 160,
    y: 384,
    type: "FORT_BAS_3",
  },
  {
    x: 192,
    y: 384,
    type: "FORT_BAS_3",
  },
  {
    x: 224,
    y: 384,
    type: "FORT_BAS_3",
  },
  {
    x: 544,
    y: 384,
    type: "FORT_BAS_3",
  },
  {
    x: 576,
    y: 384,
    type: "FORT_BAS_3",
  },
  {
    x: 608,
    y: 384,
    type: "FORT_BAS_3",
  },
  {
    x: 640,
    y: 384,
    type: "FORT_BAS_4",
  },
  {
    x: 288,
    y: 416,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 320,
    y: 416,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 352,
    y: 416,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 384,
    y: 416,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 416,
    y: 416,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 448,
    y: 416,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 480,
    y: 416,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 480,
    y: 384,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 448,
    y: 384,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 416,
    y: 384,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 384,
    y: 384,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 352,
    y: 384,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 320,
    y: 384,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 288,
    y: 384,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 288,
    y: 352,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 320,
    y: 352,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 480,
    y: 352,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 352,
    y: 256,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 448,
    y: 256,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 384,
    y: 256,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 416,
    y: 288,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 352,
    y: 288,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 384,
    y: 288,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 448,
    y: 288,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 480,
    y: 288,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 480,
    y: 256,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 448,
    y: 224,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 416,
    y: 256,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 416,
    y: 224,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 416,
    y: 192,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 384,
    y: 224,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 384,
    y: 192,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 352,
    y: 224,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 352,
    y: 192,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 320,
    y: 224,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 320,
    y: 192,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 288,
    y: 192,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 288,
    y: 224,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 192,
    y: 96,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 224,
    y: 96,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 256,
    y: 96,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 192,
    y: 352,
    type: "FORT_BAS_10",
  },
  {
    x: 576,
    y: 352,
    type: "FORT_BAS_10",
  },
  {
    x: 320,
    y: 544,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 640,
    y: 160,
    type: "FORT_BARREAUX_4",
  },
  {
    x: 192,
    y: 64,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 224,
    y: 64,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 256,
    y: 64,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 288,
    y: 64,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 288,
    y: 96,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 320,
    y: 96,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 352,
    y: 96,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 384,
    y: 96,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 416,
    y: 96,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 448,
    y: 96,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 480,
    y: 96,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 480,
    y: 64,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 448,
    y: 64,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 416,
    y: 64,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 384,
    y: 64,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 352,
    y: 64,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 320,
    y: 64,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 128,
    y: 0,
    type: "FORT_BAS_10",
  },
  {
    x: 256,
    y: 0,
    type: "FORT_BAS_10",
  },
  {
    x: 384,
    y: 0,
    type: "FORT_BAS_10",
  },
  {
    x: 512,
    y: 0,
    type: "FORT_BAS_10",
  },
  {
    x: 640,
    y: 0,
    type: "FORT_BAS_10",
  },
  {
    x: 32,
    y: 0,
    type: "FORT_DECO_3",
  },
  {
    x: 64,
    y: 0,
    type: "FORT_DECO_3",
  },
  {
    x: 96,
    y: 0,
    type: "FORT_DECO_3",
  },
  {
    x: 160,
    y: 0,
    type: "FORT_DECO_3",
  },
  {
    x: 192,
    y: 0,
    type: "FORT_DECO_3",
  },
  {
    x: 224,
    y: 0,
    type: "FORT_DECO_3",
  },
  {
    x: 288,
    y: 0,
    type: "FORT_DECO_3",
  },
  {
    x: 320,
    y: 0,
    type: "FORT_DECO_3",
  },
  {
    x: 352,
    y: 0,
    type: "FORT_DECO_3",
  },
  {
    x: 416,
    y: 0,
    type: "FORT_DECO_3",
  },
  {
    x: 448,
    y: 0,
    type: "FORT_DECO_3",
  },
  {
    x: 480,
    y: 0,
    type: "FORT_DECO_3",
  },
  {
    x: 544,
    y: 0,
    type: "FORT_DECO_3",
  },
  {
    x: 576,
    y: 0,
    type: "FORT_DECO_3",
  },
  {
    x: 608,
    y: 0,
    type: "FORT_DECO_3",
  },
  {
    x: 672,
    y: 0,
    type: "FORT_DECO_3",
  },
  {
    x: 704,
    y: 0,
    type: "FORT_DECO_3",
  },
  {
    x: 736,
    y: 0,
    type: "FORT_DECO_3",
  },
  {
    x: 0,
    y: 0,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 768,
    y: 0,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 32,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 64,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 96,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 128,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 160,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 192,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 224,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 256,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 288,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 320,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 352,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 384,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 416,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 448,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 480,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 512,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 544,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 576,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 608,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 640,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 672,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 704,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 736,
    y: 32,
    type: "FORT_BAS_3",
  },
  {
    x: 128,
    y: 160,
    type: "FORT_MUR_BLEU_2",
  },
  {
    x: 192,
    y: 128,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 224,
    y: 128,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 256,
    y: 128,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 288,
    y: 128,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 320,
    y: 128,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 352,
    y: 128,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 384,
    y: 128,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 416,
    y: 128,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 448,
    y: 128,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 480,
    y: 128,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 512,
    y: 128,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 544,
    y: 128,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 576,
    y: 128,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 608,
    y: 128,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 640,
    y: 128,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 160,
    y: 160,
    type: "FORT_BARREAUX_3",
  },
  {
    x: 192,
    y: 160,
    type: "FORT_BARREAUX_3",
  },
  {
    x: 224,
    y: 160,
    type: "FORT_BARREAUX_3",
  },
  {
    x: 256,
    y: 160,
    type: "FORT_BARREAUX_3",
  },
  {
    x: 288,
    y: 160,
    type: "FORT_BARREAUX_3",
  },
  {
    x: 320,
    y: 160,
    type: "FORT_BARREAUX_3",
  },
  {
    x: 352,
    y: 160,
    type: "FORT_BARREAUX_3",
  },
  {
    x: 384,
    y: 160,
    type: "FORT_BARREAUX_3",
  },
  {
    x: 416,
    y: 160,
    type: "FORT_BARREAUX_3",
  },
  {
    x: 448,
    y: 160,
    type: "FORT_BARREAUX_3",
  },
  {
    x: 480,
    y: 160,
    type: "FORT_BARREAUX_3",
  },
  {
    x: 512,
    y: 160,
    type: "FORT_BARREAUX_3",
  },
  {
    x: 544,
    y: 160,
    type: "FORT_BARREAUX_3",
  },
  {
    x: 576,
    y: 160,
    type: "FORT_BARREAUX_3",
  },
  {
    x: 608,
    y: 160,
    type: "FORT_BARREAUX_3",
  },
  {
    x: 288,
    y: 544,
    type: "FORT_SOL_3",
  },
  {
    x: 256,
    y: 544,
    type: "FORT_SOL_3",
  },
  {
    x: 224,
    y: 544,
    type: "FORT_SOL_3",
  },
  {
    x: 192,
    y: 544,
    type: "FORT_SOL_3",
  },
  {
    x: 160,
    y: 544,
    type: "FORT_SOL_3",
  },
  {
    x: 128,
    y: 544,
    type: "FORT_SOL_3",
  },
  {
    x: 96,
    y: 544,
    type: "FORT_SOL_3",
  },
  {
    x: 64,
    y: 544,
    type: "FORT_SOL_3",
  },
  {
    x: 32,
    y: 544,
    type: "FORT_SOL_3",
  },
  {
    x: 160,
    y: 224,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 160,
    y: 192,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 192,
    y: 192,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 192,
    y: 224,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 192,
    y: 256,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 224,
    y: 288,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 224,
    y: 224,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 224,
    y: 192,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 256,
    y: 192,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 256,
    y: 224,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 256,
    y: 256,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 224,
    y: 256,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 32,
    y: 96,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 64,
    y: 96,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 96,
    y: 128,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 96,
    y: 96,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 96,
    y: 64,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 128,
    y: 64,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 128,
    y: 96,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 128,
    y: 128,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 160,
    y: 128,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 160,
    y: 96,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 160,
    y: 64,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 736,
    y: 160,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 704,
    y: 256,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 704,
    y: 224,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 704,
    y: 192,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 736,
    y: 192,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 736,
    y: 224,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 736,
    y: 256,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 736,
    y: 288,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 736,
    y: 320,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 736,
    y: 352,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 160,
    y: 512,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 128,
    y: 512,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 64,
    y: 480,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 64,
    y: 448,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 32,
    y: 416,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 32,
    y: 384,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 640,
    y: 512,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 672,
    y: 512,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 576,
    y: 256,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 544,
    y: 224,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 576,
    y: 224,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 576,
    y: 192,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 608,
    y: 192,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 608,
    y: 224,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 608,
    y: 256,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 192,
    y: 288,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 160,
    y: 288,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 160,
    y: 256,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 256,
    y: 288,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 288,
    y: 288,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 288,
    y: 256,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 320,
    y: 256,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 320,
    y: 288,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 576,
    y: 64,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 544,
    y: 64,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 512,
    y: 64,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 512,
    y: 96,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 544,
    y: 96,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 576,
    y: 96,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 736,
    y: 480,
    type: "FORT_BARREAUX_2",
  },
  {
    x: 736,
    y: 512,
    type: "FORT_BARREAUX_1",
  },
  {
    x: 704,
    y: 512,
    type: "FORT_BARREAUX_1",
  },
  {
    x: 736,
    y: 448,
    type: "FORT_BARREAUX_2",
  },
  {
    x: 736,
    y: 64,
    type: "FORT_BARREAUX_2",
  },
  {
    x: 704,
    y: 64,
    type: "FORT_BARREAUX_2",
  },
  {
    x: 32,
    y: 64,
    type: "FORT_BARREAUX_1",
  },
  {
    x: 64,
    y: 64,
    type: "FORT_BARREAUX_1",
  },
  {
    x: 32,
    y: 512,
    type: "FORT_BARREAUX_1",
  },
  {
    x: 32,
    y: 480,
    type: "FORT_BARREAUX_1",
  },
  {
    x: 32,
    y: 448,
    type: "FORT_BARREAUX_1",
  },
  {
    x: 64,
    y: 512,
    type: "FORT_BARREAUX_2",
  },
  {
    x: 96,
    y: 512,
    type: "FORT_BARREAUX_2",
  },
  {
    x: 64,
    y: 416,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 96,
    y: 448,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 96,
    y: 480,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 128,
    y: 480,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 192,
    y: 512,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 32,
    y: 128,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 32,
    y: 160,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 64,
    y: 160,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 64,
    y: 128,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 32,
    y: 192,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 640,
    y: 96,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 608,
    y: 96,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 608,
    y: 64,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 672,
    y: 64,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 640,
    y: 64,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 544,
    y: 192,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 512,
    y: 192,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 480,
    y: 224,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 512,
    y: 224,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 512,
    y: 256,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 544,
    y: 256,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 608,
    y: 288,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 576,
    y: 288,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 480,
    y: 192,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 448,
    y: 192,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 512,
    y: 288,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 544,
    y: 288,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 288,
    y: 320,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 320,
    y: 320,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 352,
    y: 320,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 384,
    y: 320,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 416,
    y: 320,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 448,
    y: 320,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 480,
    y: 320,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 352,
    y: 352,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 384,
    y: 352,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 416,
    y: 352,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 448,
    y: 352,
    type: "FORT_MUR_BLEU",
  },
];

export const zoneData = {
  id: "fortress_north",
  name: "Forteresse de Maldrek",
  bgColor: "#101010",
  mapData: { walls: interior },
  enemies: { moblins: 5, octoroks: 0 },
  connections: { south: "Couloir_Forteresse" },
};
