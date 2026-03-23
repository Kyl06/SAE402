/**
 * @file couloir.js
 * @description Zone avant la forteresse
 * Sorties : Nord (forteresse), Sud (village).
 */

const mapTiles = [
  {
    x: 416,
    y: 544,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 384,
    y: 544,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 352,
    y: 544,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 320,
    y: 544,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 288,
    y: 544,
    type: "FORT_BAS_3",
  },
  {
    x: 448,
    y: 544,
    type: "FORT_BAS_3",
  },
  {
    x: 480,
    y: 544,
    type: "FORT_BAS_4",
  },
  {
    x: 256,
    y: 544,
    type: "FORT_BAS_2",
  },
  {
    x: 480,
    y: 512,
    type: "FORT_DECO_4",
  },
  {
    x: 256,
    y: 512,
    type: "FORT_DECO_2",
  },
  {
    x: 256,
    y: 480,
    type: "FORT_SOL_2",
  },
  {
    x: 288,
    y: 480,
    type: "FORT_SOL_3",
  },
  {
    x: 448,
    y: 480,
    type: "FORT_SOL_3",
  },
  {
    x: 480,
    y: 480,
    type: "FORT_SOL_4",
  },
  {
    x: 256,
    y: 448,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 256,
    y: 416,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 256,
    y: 384,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 256,
    y: 352,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 256,
    y: 320,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 256,
    y: 288,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 256,
    y: 256,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 256,
    y: 224,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 256,
    y: 192,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 256,
    y: 160,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 256,
    y: 128,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 256,
    y: 96,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 480,
    y: 96,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 480,
    y: 128,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 480,
    y: 160,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 480,
    y: 192,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 480,
    y: 224,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 480,
    y: 256,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 480,
    y: 288,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 480,
    y: 320,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 480,
    y: 352,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 480,
    y: 384,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 480,
    y: 416,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 480,
    y: 448,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 256,
    y: 64,
    type: "FORT_MUR_BLEU_2",
  },
  {
    x: 480,
    y: 64,
    type: "FORT_BARREAUX_4",
  },
  {
    x: 448,
    y: 64,
    type: "FORT_SOL_2",
  },
  {
    x: 288,
    y: 64,
    type: "FORT_SOL_4",
  },
  {
    x: 288,
    y: 32,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 288,
    y: 0,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 448,
    y: 0,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 448,
    y: 32,
    type: "FORT_MUR_GRIS_2",
  },
  {
    x: 320,
    y: 512,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 352,
    y: 512,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 384,
    y: 512,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 416,
    y: 512,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 416,
    y: 480,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 384,
    y: 480,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 352,
    y: 480,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 320,
    y: 480,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 320,
    y: 352,
    type: "FORT_MUR_BLEU",
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
    x: 320,
    y: 256,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 352,
    y: 256,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 384,
    y: 256,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 416,
    y: 256,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 320,
    y: 64,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 320,
    y: 32,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 320,
    y: 0,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 352,
    y: 0,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 352,
    y: 32,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 352,
    y: 64,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 384,
    y: 64,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 384,
    y: 32,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 384,
    y: 0,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 416,
    y: 0,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 416,
    y: 32,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 416,
    y: 64,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 320,
    y: 288,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 320,
    y: 320,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 352,
    y: 288,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 352,
    y: 320,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 384,
    y: 320,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 384,
    y: 288,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 416,
    y: 320,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 416,
    y: 288,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 288,
    y: 288,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 448,
    y: 288,
    type: "FORT_SOL_BLEU",
  },
  {
    x: 288,
    y: 256,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 448,
    y: 256,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 448,
    y: 352,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 288,
    y: 352,
    type: "FORT_MUR_BLEU",
  },
  {
    x: 288,
    y: 416,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 320,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 352,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 384,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 416,
    y: 448,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 416,
    y: 384,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 384,
    y: 384,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 352,
    y: 384,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 320,
    y: 384,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 320,
    y: 416,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 352,
    y: 416,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 384,
    y: 416,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 416,
    y: 416,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 448,
    y: 416,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 288,
    y: 160,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 288,
    y: 128,
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
    y: 128,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 448,
    y: 160,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 416,
    y: 224,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 384,
    y: 224,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 352,
    y: 224,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 320,
    y: 224,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 320,
    y: 192,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 320,
    y: 160,
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
    y: 192,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 416,
    y: 128,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 416,
    y: 160,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 384,
    y: 160,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 384,
    y: 192,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 352,
    y: 192,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 352,
    y: 160,
    type: "FORT_MUR_GRIS",
  },
  {
    x: 288,
    y: 512,
    type: "FORT_BAS_8",
  },
  {
    x: 448,
    y: 512,
    type: "FORT_BAS_8",
  },
  {
    x: 288,
    y: 224,
    type: "FORT_BARREAUX_1",
  },
  {
    x: 288,
    y: 192,
    type: "FORT_BARREAUX_1",
  },
  {
    x: 448,
    y: 192,
    type: "FORT_BARREAUX_1",
  },
  {
    x: 448,
    y: 224,
    type: "FORT_BARREAUX_1",
  },
  {
    x: 288,
    y: 320,
    type: "FORT_BARREAUX_2",
  },
  {
    x: 448,
    y: 320,
    type: "FORT_BARREAUX_2",
  },
  {
    x: 288,
    y: 448,
    type: "FORT_BARREAUX_1",
  },
  {
    x: 448,
    y: 448,
    type: "FORT_BARREAUX_1",
  },
  {
    x: 288,
    y: 384,
    type: "FORT_BARREAUX_2",
  },
  {
    x: 448,
    y: 384,
    type: "FORT_BARREAUX_2",
  },
  {
    x: 288,
    y: 96,
    type: "FORT_BARREAUX_2",
  },
  {
    x: 448,
    y: 96,
    type: "FORT_BARREAUX_2",
  },
  {
    x: 608,
    y: 160,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 192,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 224,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 256,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 288,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 320,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 352,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 384,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 416,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 448,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 480,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 512,
    type: "CIM_STRUCT_4",
  },
  {
    x: 576,
    y: 512,
    type: "CIM_STRUCT_4",
  },
  {
    x: 576,
    y: 544,
    type: "CIM_STRUCT_4",
  },
  {
    x: 576,
    y: 160,
    type: "CIM_STRUCT_4",
  },
  {
    x: 576,
    y: 128,
    type: "CIM_STRUCT_4",
  },
  {
    x: 576,
    y: 96,
    type: "CIM_STRUCT_4",
  },
  {
    x: 576,
    y: 64,
    type: "CIM_STRUCT_4",
  },
  {
    x: 576,
    y: 32,
    type: "CIM_STRUCT_4",
  },
  {
    x: 576,
    y: 0,
    type: "CIM_STRUCT_4",
  },
  {
    x: 544,
    y: 0,
    type: "CIM_STRUCT_4",
  },
  {
    x: 704,
    y: 256,
    type: "CIM_ROSE_11",
  },
  {
    x: 768,
    y: 352,
    type: "CIM_ROSE_11",
  },
  {
    x: 736,
    y: 288,
    type: "CIM_ROSE_11",
  },
  {
    x: 768,
    y: 128,
    type: "CIM_ROSE_4",
  },
  {
    x: 736,
    y: 160,
    type: "CIM_ROSE_4",
  },
  {
    x: 768,
    y: 160,
    type: "CIM_STRUCT_2",
  },
  {
    x: 768,
    y: 288,
    type: "CIM_STRUCT_2",
  },
  {
    x: 768,
    y: 256,
    type: "CIM_STRUCT_2",
  },
  {
    x: 736,
    y: 256,
    type: "CIM_STRUCT_2",
  },
  {
    x: 736,
    y: 192,
    type: "CIM_STRUCT_2",
  },
  {
    x: 704,
    y: 224,
    type: "CIM_ROSE_6",
  },
  {
    x: 768,
    y: 320,
    type: "CIM_ROSE_6",
  },
  {
    x: 704,
    y: 192,
    type: "CIM_ROSE_4",
  },
  {
    x: 736,
    y: 480,
    type: "CIM_ROSE_8",
  },
  {
    x: 640,
    y: 544,
    type: "CIM_ROSE_8",
  },
  {
    x: 640,
    y: 320,
    type: "CIM_ROSE_8",
  },
  {
    x: 704,
    y: 96,
    type: "CIM_ROSE_8",
  },
  {
    x: 704,
    y: 64,
    type: "CIM_ROSE_1",
  },
  {
    x: 640,
    y: 288,
    type: "CIM_ROSE_1",
  },
  {
    x: 736,
    y: 448,
    type: "CIM_ROSE_1",
  },
  {
    x: 640,
    y: 512,
    type: "CIM_ROSE_1",
  },
  {
    x: 736,
    y: 416,
    type: "CIM_ROSE_9",
  },
  {
    x: 768,
    y: 416,
    type: "CIM_ROSE_10",
  },
  {
    x: 768,
    y: 384,
    type: "CIM_ROSE_3",
  },
  {
    x: 736,
    y: 384,
    type: "CIM_ROSE_2",
  },
  {
    x: 672,
    y: 0,
    type: "CIM_MUR_14",
  },
  {
    x: 704,
    y: 0,
    type: "CIM_MUR_14",
  },
  {
    x: 736,
    y: 0,
    type: "CIM_MUR_14",
  },
  {
    x: 640,
    y: 0,
    type: "CIM_MUR_13",
  },
  {
    x: 768,
    y: 0,
    type: "CIM_MUR_16",
  },
  {
    x: 768,
    y: 480,
    type: "CIM_MUR_9",
  },
  {
    x: 768,
    y: 512,
    type: "CIM_MUR_9",
  },
  {
    x: 768,
    y: 544,
    type: "CIM_MUR_13",
  },
  {
    x: 768,
    y: 448,
    type: "CIM_MUR_5",
  },
  {
    x: 704,
    y: 544,
    type: "CIM_SOL_1",
  },
  {
    x: 672,
    y: 544,
    type: "CIM_TOMBE_HG",
  },
  {
    x: 640,
    y: 416,
    type: "CIM_SOL_16",
  },
  {
    x: 768,
    y: 96,
    type: "CIM_SOL_16",
  },
  {
    x: 704,
    y: 512,
    type: "CIM_SOL_16",
  },
  {
    x: 608,
    y: 544,
    type: "CIM_SOL_17",
  },
  {
    x: 672,
    y: 480,
    type: "CIM_SOL_17",
  },
  {
    x: 672,
    y: 224,
    type: "CIM_SOL_17",
  },
  {
    x: 672,
    y: 128,
    type: "CIM_SOL_17",
  },
  {
    x: 608,
    y: 32,
    type: "CIM_SOL_15",
  },
  {
    x: 672,
    y: 384,
    type: "CIM_SOL_15",
  },
  {
    x: 736,
    y: 320,
    type: "CIM_SOL_15",
  },
  {
    x: 640,
    y: 480,
    type: "CIM_SOL_19",
  },
  {
    x: 640,
    y: 192,
    type: "CIM_SOL_19",
  },
  {
    x: 608,
    y: 0,
    type: "CIM_SOL_19",
  },
  {
    x: 736,
    y: 64,
    type: "CIM_SOL_20",
  },
  {
    x: 704,
    y: 416,
    type: "CIM_SOL_20",
  },
  {
    x: 640,
    y: 448,
    type: "CIM_STRUCT_4",
  },
  {
    x: 672,
    y: 416,
    type: "CIM_STRUCT_4",
  },
  {
    x: 672,
    y: 192,
    type: "CIM_STRUCT_4",
  },
  {
    x: 672,
    y: 160,
    type: "CIM_STRUCT_4",
  },
  {
    x: 640,
    y: 224,
    type: "CIM_STRUCT_4",
  },
  {
    x: 640,
    y: 256,
    type: "CIM_STRUCT_4",
  },
  {
    x: 672,
    y: 256,
    type: "CIM_STRUCT_4",
  },
  {
    x: 672,
    y: 288,
    type: "CIM_STRUCT_4",
  },
  {
    x: 672,
    y: 320,
    type: "CIM_STRUCT_4",
  },
  {
    x: 672,
    y: 352,
    type: "CIM_STRUCT_4",
  },
  {
    x: 704,
    y: 352,
    type: "CIM_STRUCT_4",
  },
  {
    x: 736,
    y: 352,
    type: "CIM_STRUCT_4",
  },
  {
    x: 704,
    y: 160,
    type: "CIM_STRUCT_4",
  },
  {
    x: 640,
    y: 128,
    type: "CIM_STRUCT_4",
  },
  {
    x: 672,
    y: 96,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 64,
    type: "CIM_STRUCT_4",
  },
  {
    x: 640,
    y: 32,
    type: "CIM_STRUCT_4",
  },
  {
    x: 736,
    y: 32,
    type: "CIM_STRUCT_4",
  },
  {
    x: 768,
    y: 64,
    type: "CIM_STRUCT_4",
  },
  {
    x: 768,
    y: 32,
    type: "CIM_STRUCT_4",
  },
  {
    x: 736,
    y: 128,
    type: "CIM_STRUCT_4",
  },
  {
    x: 736,
    y: 96,
    type: "CIM_STRUCT_4",
  },
  {
    x: 704,
    y: 128,
    type: "CIM_STRUCT_4",
  },
  {
    x: 704,
    y: 384,
    type: "CIM_STRUCT_4",
  },
  {
    x: 704,
    y: 288,
    type: "CIM_STRUCT_4",
  },
  {
    x: 672,
    y: 448,
    type: "CIM_STRUCT_4",
  },
  {
    x: 640,
    y: 160,
    type: "CIM_STRUCT_4",
  },
  {
    x: 736,
    y: 512,
    type: "CIM_STRUCT_4",
  },
  {
    x: 704,
    y: 480,
    type: "CIM_STRUCT_4",
  },
  {
    x: 704,
    y: 448,
    type: "CIM_STRUCT_4",
  },
  {
    x: 672,
    y: 512,
    type: "CIM_STRUCT_4",
  },
  {
    x: 736,
    y: 544,
    type: "CIM_MUR_17",
  },
  {
    x: 736,
    y: 224,
    type: "CIM_MUR_17",
  },
  {
    x: 768,
    y: 192,
    type: "CIM_MUR_17",
  },
  {
    x: 768,
    y: 224,
    type: "CIM_MUR_17",
  },
  {
    x: 704,
    y: 320,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 128,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 96,
    type: "CIM_STRUCT_4",
  },
  {
    x: 640,
    y: 96,
    type: "CIM_STRUCT_4",
  },
  {
    x: 640,
    y: 64,
    type: "CIM_STRUCT_4",
  },
  {
    x: 672,
    y: 64,
    type: "CIM_STRUCT_4",
  },
  {
    x: 672,
    y: 32,
    type: "CIM_STRUCT_4",
  },
  {
    x: 704,
    y: 32,
    type: "CIM_STRUCT_4",
  },
  {
    x: 640,
    y: 352,
    type: "CIM_STRUCT_4",
  },
  {
    x: 640,
    y: 384,
    type: "CIM_STRUCT_4",
  },
  {
    x: 480,
    y: 32,
    type: "MAIS_14",
  },
  {
    x: 480,
    y: 0,
    type: "MAIS_14",
  },
  {
    x: 512,
    y: 0,
    type: "MAIS_14",
  },
  {
    x: 512,
    y: 32,
    type: "MAIS_14",
  },
  {
    x: 512,
    y: 64,
    type: "MAIS_14",
  },
  {
    x: 544,
    y: 32,
    type: "MAIS_14",
  },
  {
    x: 544,
    y: 64,
    type: "MAIS_14",
  },
  {
    x: 544,
    y: 96,
    type: "MAIS_14",
  },
  {
    x: 576,
    y: 192,
    type: "MAIS_14",
  },
  {
    x: 576,
    y: 224,
    type: "MAIS_14",
  },
  {
    x: 576,
    y: 256,
    type: "MAIS_14",
  },
  {
    x: 576,
    y: 288,
    type: "MAIS_14",
  },
  {
    x: 576,
    y: 320,
    type: "MAIS_14",
  },
  {
    x: 576,
    y: 352,
    type: "MAIS_14",
  },
  {
    x: 576,
    y: 384,
    type: "MAIS_14",
  },
  {
    x: 576,
    y: 416,
    type: "MAIS_14",
  },
  {
    x: 576,
    y: 448,
    type: "MAIS_14",
  },
  {
    x: 576,
    y: 480,
    type: "MAIS_14",
  },
  {
    x: 544,
    y: 480,
    type: "MAIS_14",
  },
  {
    x: 544,
    y: 448,
    type: "MAIS_14",
  },
  {
    x: 544,
    y: 416,
    type: "MAIS_14",
  },
  {
    x: 544,
    y: 384,
    type: "MAIS_14",
  },
  {
    x: 544,
    y: 352,
    type: "MAIS_14",
  },
  {
    x: 544,
    y: 320,
    type: "MAIS_14",
  },
  {
    x: 544,
    y: 288,
    type: "MAIS_14",
  },
  {
    x: 544,
    y: 256,
    type: "MAIS_14",
  },
  {
    x: 544,
    y: 224,
    type: "MAIS_14",
  },
  {
    x: 544,
    y: 192,
    type: "MAIS_14",
  },
  {
    x: 544,
    y: 160,
    type: "MAIS_14",
  },
  {
    x: 544,
    y: 128,
    type: "MAIS_14",
  },
  {
    x: 512,
    y: 96,
    type: "MAIS_14",
  },
  {
    x: 512,
    y: 128,
    type: "MAIS_14",
  },
  {
    x: 512,
    y: 160,
    type: "MAIS_14",
  },
  {
    x: 512,
    y: 192,
    type: "MAIS_14",
  },
  {
    x: 512,
    y: 224,
    type: "MAIS_14",
  },
  {
    x: 512,
    y: 256,
    type: "MAIS_14",
  },
  {
    x: 512,
    y: 288,
    type: "MAIS_14",
  },
  {
    x: 512,
    y: 320,
    type: "MAIS_14",
  },
  {
    x: 512,
    y: 352,
    type: "MAIS_14",
  },
  {
    x: 512,
    y: 384,
    type: "MAIS_14",
  },
  {
    x: 512,
    y: 416,
    type: "MAIS_14",
  },
  {
    x: 512,
    y: 448,
    type: "MAIS_14",
  },
  {
    x: 512,
    y: 480,
    type: "MAIS_14",
  },
  {
    x: 512,
    y: 512,
    type: "MAIS_14",
  },
  {
    x: 512,
    y: 544,
    type: "MAIS_14",
  },
  {
    x: 544,
    y: 544,
    type: "MAIS_14",
  },
  {
    x: 544,
    y: 512,
    type: "MAIS_14",
  },
  {
    x: 128,
    y: 512,
    type: "MAR_SOMBRE_10",
  },
  {
    x: 128,
    y: 448,
    type: "MAR_SOMBRE_10",
  },
  {
    x: 128,
    y: 416,
    type: "MAR_SOMBRE_10",
  },
  {
    x: 128,
    y: 384,
    type: "MAR_SOMBRE_10",
  },
  {
    x: 128,
    y: 352,
    type: "MAR_SOMBRE_10",
  },
  {
    x: 128,
    y: 320,
    type: "MAR_SOMBRE_10",
  },
  {
    x: 128,
    y: 288,
    type: "MAR_SOMBRE_10",
  },
  {
    x: 160,
    y: 224,
    type: "MAR_SOMBRE_10",
  },
  {
    x: 160,
    y: 192,
    type: "MAR_SOMBRE_10",
  },
  {
    x: 160,
    y: 160,
    type: "MAR_SOMBRE_10",
  },
  {
    x: 160,
    y: 128,
    type: "MAR_SOMBRE_10",
  },
  {
    x: 160,
    y: 256,
    type: "MAR_PLANCHE_3",
  },
  {
    x: 160,
    y: 544,
    type: "MAR_PLANCHE_1",
  },
  {
    x: 128,
    y: 544,
    type: "MAR_PONT_3",
  },
  {
    x: 224,
    y: 544,
    type: "MAR_EXTRA_3",
  },
  {
    x: 224,
    y: 512,
    type: "MAR_EXTRA_3",
  },
  {
    x: 224,
    y: 480,
    type: "MAR_EXTRA_3",
  },
  {
    x: 224,
    y: 448,
    type: "MAR_EXTRA_3",
  },
  {
    x: 224,
    y: 416,
    type: "MAR_EXTRA_3",
  },
  {
    x: 224,
    y: 384,
    type: "MAR_EXTRA_3",
  },
  {
    x: 224,
    y: 352,
    type: "MAR_EXTRA_3",
  },
  {
    x: 224,
    y: 320,
    type: "MAR_EXTRA_3",
  },
  {
    x: 224,
    y: 288,
    type: "MAR_EXTRA_3",
  },
  {
    x: 224,
    y: 256,
    type: "MAR_EXTRA_3",
  },
  {
    x: 224,
    y: 224,
    type: "MAR_EXTRA_3",
  },
  {
    x: 224,
    y: 192,
    type: "MAR_EXTRA_3",
  },
  {
    x: 224,
    y: 160,
    type: "MAR_EXTRA_3",
  },
  {
    x: 224,
    y: 128,
    type: "MAR_EXTRA_3",
  },
  {
    x: 224,
    y: 96,
    type: "MAR_EXTRA_3",
  },
  {
    x: 224,
    y: 64,
    type: "MAR_EXTRA_3",
  },
  {
    x: 224,
    y: 32,
    type: "MAR_EXTRA_3",
  },
  {
    x: 256,
    y: 32,
    type: "MAR_EXTRA_3",
  },
  {
    x: 256,
    y: 0,
    type: "MAR_EXTRA_3",
  },
  {
    x: 224,
    y: 0,
    type: "MAR_EXTRA_3",
  },
  {
    x: 192,
    y: 64,
    type: "MAR_EXTRA_3",
  },
  {
    x: 192,
    y: 96,
    type: "MAR_EXTRA_3",
  },
  {
    x: 192,
    y: 128,
    type: "MAR_EXTRA_3",
  },
  {
    x: 192,
    y: 160,
    type: "MAR_EXTRA_3",
  },
  {
    x: 192,
    y: 192,
    type: "MAR_EXTRA_3",
  },
  {
    x: 192,
    y: 224,
    type: "MAR_EXTRA_3",
  },
  {
    x: 192,
    y: 256,
    type: "MAR_EXTRA_3",
  },
  {
    x: 192,
    y: 288,
    type: "MAR_EXTRA_3",
  },
  {
    x: 192,
    y: 320,
    type: "MAR_EXTRA_3",
  },
  {
    x: 192,
    y: 352,
    type: "MAR_EXTRA_3",
  },
  {
    x: 192,
    y: 384,
    type: "MAR_EXTRA_3",
  },
  {
    x: 192,
    y: 416,
    type: "MAR_EXTRA_3",
  },
  {
    x: 192,
    y: 448,
    type: "MAR_EXTRA_3",
  },
  {
    x: 192,
    y: 480,
    type: "MAR_EXTRA_3",
  },
  {
    x: 192,
    y: 512,
    type: "MAR_EXTRA_3",
  },
  {
    x: 192,
    y: 544,
    type: "MAR_EXTRA_3",
  },
  {
    x: 160,
    y: 512,
    type: "MAR_EXTRA_3",
  },
  {
    x: 160,
    y: 480,
    type: "MAR_EXTRA_3",
  },
  {
    x: 160,
    y: 448,
    type: "MAR_EXTRA_3",
  },
  {
    x: 160,
    y: 416,
    type: "MAR_EXTRA_3",
  },
  {
    x: 160,
    y: 384,
    type: "MAR_EXTRA_3",
  },
  {
    x: 160,
    y: 352,
    type: "MAR_EXTRA_3",
  },
  {
    x: 160,
    y: 320,
    type: "MAR_EXTRA_3",
  },
  {
    x: 160,
    y: 288,
    type: "MAR_EXTRA_3",
  },
  {
    x: 96,
    y: 384,
    type: "MAR_PONT_3",
  },
  {
    x: 96,
    y: 352,
    type: "MAR_PONT_3",
  },
  {
    x: 96,
    y: 288,
    type: "MAR_PONT_3",
  },
  {
    x: 96,
    y: 256,
    type: "MAR_PONT_3",
  },
  {
    x: 128,
    y: 256,
    type: "MAR_PONT_3",
  },
  {
    x: 128,
    y: 224,
    type: "MAR_PONT_3",
  },
  {
    x: 128,
    y: 192,
    type: "MAR_PONT_3",
  },
  {
    x: 128,
    y: 128,
    type: "MAR_PONT_3",
  },
  {
    x: 128,
    y: 96,
    type: "MAR_PONT_3",
  },
  {
    x: 128,
    y: 64,
    type: "MAR_PONT_4",
  },
  {
    x: 96,
    y: 0,
    type: "MAR_PONT_4",
  },
  {
    x: 128,
    y: 0,
    type: "MAR_PONT_4",
  },
  {
    x: 160,
    y: 0,
    type: "MAR_PONT_4",
  },
  {
    x: 64,
    y: 0,
    type: "MAR_PONT_4",
  },
  {
    x: 64,
    y: 32,
    type: "MAR_PONT_4",
  },
  {
    x: 96,
    y: 32,
    type: "MAR_PONT_4",
  },
  {
    x: 128,
    y: 32,
    type: "MAR_PONT_4",
  },
  {
    x: 160,
    y: 64,
    type: "MAR_PONT_4",
  },
  {
    x: 160,
    y: 32,
    type: "MAR_PONT_4",
  },
  {
    x: 192,
    y: 32,
    type: "MAR_PONT_4",
  },
  {
    x: 192,
    y: 0,
    type: "MAR_PONT_4",
  },
  {
    x: 64,
    y: 384,
    type: "MAR_SOMBRE_3",
  },
  {
    x: 64,
    y: 352,
    type: "MAR_SOMBRE_3",
  },
  {
    x: 64,
    y: 320,
    type: "MAR_SOMBRE_3",
  },
  {
    x: 64,
    y: 288,
    type: "MAR_SOMBRE_3",
  },
  {
    x: 64,
    y: 256,
    type: "MAR_SOMBRE_3",
  },
  {
    x: 64,
    y: 224,
    type: "MAR_SOMBRE_3",
  },
  {
    x: 64,
    y: 192,
    type: "MAR_SOMBRE_3",
  },
  {
    x: 64,
    y: 160,
    type: "MAR_SOMBRE_3",
  },
  {
    x: 32,
    y: 384,
    type: "MAR_EAU_TEAL",
  },
  {
    x: 32,
    y: 352,
    type: "MAR_EAU_TEAL",
  },
  {
    x: 0,
    y: 352,
    type: "MAR_EAU_TEAL",
  },
  {
    x: 0,
    y: 384,
    type: "MAR_EAU_TEAL",
  },
  {
    x: 64,
    y: 64,
    type: "MAR_HERBE",
  },
  {
    x: 32,
    y: 32,
    type: "MAR_HERBE",
  },
  {
    x: 32,
    y: 64,
    type: "MAR_EAU_TEAL",
  },
  {
    x: 0,
    y: 64,
    type: "MAR_EAU_TEAL",
  },
  {
    x: 0,
    y: 96,
    type: "MAR_EAU_TEAL",
  },
  {
    x: 32,
    y: 96,
    type: "MAR_EAU_TEAL",
  },
  {
    x: 32,
    y: 128,
    type: "MAR_EAU_TEAL",
  },
  {
    x: 0,
    y: 128,
    type: "MAR_EAU_TEAL",
  },
  {
    x: 64,
    y: 128,
    type: "MAR_SOMBRE_3",
  },
  {
    x: 64,
    y: 96,
    type: "MAR_SOMBRE_3",
  },
  {
    x: 0,
    y: 32,
    type: "MAR_EAU_TEAL",
  },
  {
    x: 0,
    y: 0,
    type: "MAR_HERBE",
  },
  {
    x: 32,
    y: 0,
    type: "MAR_SOUCHE",
  },
  {
    x: 96,
    y: 64,
    type: "MAR_TROU",
  },
  {
    x: 0,
    y: 192,
    type: "MAR_SOMBRE_2",
  },
  {
    x: 0,
    y: 224,
    type: "MAR_SORTIE",
  },
  {
    x: 0,
    y: 160,
    type: "MAR_SOMBRE_1",
  },
  {
    x: 0,
    y: 288,
    type: "MAR_CHAMPI",
  },
  {
    x: 0,
    y: 256,
    type: "MAR_MARECAGE_10",
  },
  {
    x: 32,
    y: 192,
    type: "MAR_BOUE_3",
  },
  {
    x: 32,
    y: 224,
    type: "MAR_BOUE_3",
  },
  {
    x: 32,
    y: 256,
    type: "MAR_BOUE_3",
  },
  {
    x: 32,
    y: 288,
    type: "MAR_BOUE_3",
  },
  {
    x: 32,
    y: 320,
    type: "MAR_CHEMIN_HD",
  },
  {
    x: 0,
    y: 320,
    type: "MAR_BOUE_2",
  },
  {
    x: 32,
    y: 160,
    type: "MAR_CHEMIN_BD",
  },
  {
    x: 96,
    y: 224,
    type: "MAR_PLANCHE_2",
  },
  {
    x: 96,
    y: 544,
    type: "MAR_BOUE_7",
  },
  {
    x: 96,
    y: 512,
    type: "MAR_BOUE_7",
  },
  {
    x: 96,
    y: 480,
    type: "MAR_BOUE_7",
  },
  {
    x: 96,
    y: 448,
    type: "MAR_BOUE_7",
  },
  {
    x: 96,
    y: 416,
    type: "MAR_MARECAGE_7",
  },
  {
    x: 64,
    y: 416,
    type: "MAR_BOUE_10",
  },
  {
    x: 32,
    y: 416,
    type: "MAR_BOUE_10",
  },
  {
    x: 0,
    y: 416,
    type: "MAR_BOUE_10",
  },
  {
    x: 0,
    y: 512,
    type: "MAR_PONT_3",
  },
  {
    x: 0,
    y: 544,
    type: "MAR_PONT_3",
  },
  {
    x: 64,
    y: 448,
    type: "MAR_TERRE_1",
  },
  {
    x: 64,
    y: 480,
    type: "MAR_TERRE_1",
  },
  {
    x: 0,
    y: 448,
    type: "MAR_PLANCHE_1",
  },
  {
    x: 32,
    y: 512,
    type: "MAR_PLANCHE_1",
  },
  {
    x: 0,
    y: 480,
    type: "MAR_SOMBRE_10",
  },
  {
    x: 32,
    y: 544,
    type: "MAR_SOMBRE_10",
  },
  {
    x: 64,
    y: 544,
    type: "MAR_MARECAGE_10",
  },
  {
    x: 64,
    y: 512,
    type: "MAR_SOUCHE",
  },
  {
    x: 32,
    y: 448,
    type: "MAR_CHAMPI",
  },
  {
    x: 32,
    y: 480,
    type: "MAR_MARECAGE_10",
  },
  {
    x: 96,
    y: 320,
    type: "MAR_PONT_4",
  },
  {
    x: 128,
    y: 160,
    type: "MAR_PONT_4",
  },
  {
    x: 96,
    y: 192,
    type: "MAR_CHAMPI",
  },
  {
    x: 96,
    y: 160,
    type: "MAR_MARECAGE_10",
  },
  {
    x: 96,
    y: 128,
    type: "MAR_MARECAGE_10",
  },
  {
    x: 96,
    y: 96,
    type: "MAR_MARECAGE_10",
  },
  {
    x: 128,
    y: 480,
    type: "MAR_PONT_4",
  },
  {
    x: 160,
    y: 96,
    type: "MAR_PONT_4",
  },
];

export const zoneData = {
  id: "Couloir_Forteresse",
  name: "Couloir de la forteresse",
  bgColor: "#101010",
  mapData: { walls: mapTiles },
  enemies: { moblins: 0, octoroks: 0 },
  obstacles: [
    { type: "SCIE", x: 368, y: 440, range: 48, speed: 120 },
    { type: "SCIE", x: 368, y: 280, range: 48, speed: -160 },
    { type: "SCIE", x: 368, y: 120, range: 48, speed: 200 },
  ],
  connections: { north: "fortress_north", south: "village" },
};
