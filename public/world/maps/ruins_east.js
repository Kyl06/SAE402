/**
 * @file ruins_east.js
 * @description Zone Est - Ruines Maudites. Quete: eliminer le mini-boss pour le Fragment 3.
 * Sortie : Ouest (village)
 */

const interior = [
  {
    x: 0,
    y: 192,
    type: "CIM_DECO_5",
  },
  {
    x: 0,
    y: 160,
    type: "CIM_DECO_5",
  },
  {
    x: 0,
    y: 128,
    type: "CIM_DECO_5",
  },
  {
    x: 0,
    y: 96,
    type: "CIM_DECO_5",
  },
  {
    x: 0,
    y: 64,
    type: "CIM_DECO_5",
  },
  {
    x: 0,
    y: 32,
    type: "CIM_DECO_5",
  },
  {
    x: 0,
    y: 352,
    type: "CIM_DECO_5",
  },
  {
    x: 0,
    y: 384,
    type: "CIM_DECO_5",
  },
  {
    x: 0,
    y: 416,
    type: "CIM_DECO_5",
  },
  {
    x: 0,
    y: 448,
    type: "CIM_DECO_5",
  },
  {
    x: 0,
    y: 480,
    type: "CIM_DECO_5",
  },
  {
    x: 768,
    y: 32,
    type: "CIM_DECO_6",
  },
  {
    x: 768,
    y: 64,
    type: "CIM_DECO_6",
  },
  {
    x: 768,
    y: 96,
    type: "CIM_DECO_6",
  },
  {
    x: 768,
    y: 128,
    type: "CIM_DECO_6",
  },
  {
    x: 768,
    y: 480,
    type: "CIM_DECO_6",
  },
  {
    x: 768,
    y: 448,
    type: "CIM_DECO_6",
  },
  {
    x: 768,
    y: 416,
    type: "CIM_DECO_6",
  },
  {
    x: 768,
    y: 384,
    type: "CIM_DECO_6",
  },
  {
    x: 768,
    y: 224,
    type: "CIM_DECO_6",
  },
  {
    x: 768,
    y: 192,
    type: "CIM_DECO_6",
  },
  {
    x: 768,
    y: 160,
    type: "CIM_DECO_6",
  },
  {
    x: 0,
    y: 0,
    type: "CIM_TOMBE_HG",
  },
  {
    x: 768,
    y: 0,
    type: "CIM_SOL_1",
  },
  {
    x: 32,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 64,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 96,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 128,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 160,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 192,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 224,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 256,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 288,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 320,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 352,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 384,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 416,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 448,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 480,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 512,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 544,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 576,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 608,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 640,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 672,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 704,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 736,
    y: 0,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 384,
    y: 128,
    type: "CIM_PILIER_4",
  },
  {
    x: 288,
    y: 128,
    type: "CIM_MUR_13",
  },
  {
    x: 480,
    y: 128,
    type: "CIM_MUR_16",
  },
  {
    x: 320,
    y: 128,
    type: "CIM_MUR_14",
  },
  {
    x: 448,
    y: 128,
    type: "CIM_MUR_14",
  },
  {
    x: 288,
    y: 96,
    type: "CIM_MUR_9",
  },
  {
    x: 288,
    y: 64,
    type: "CIM_MUR_9",
  },
  {
    x: 288,
    y: 32,
    type: "CIM_MUR_5",
  },
  {
    x: 480,
    y: 32,
    type: "CIM_MUR_8",
  },
  {
    x: 480,
    y: 96,
    type: "CIM_MUR_12",
  },
  {
    x: 480,
    y: 64,
    type: "CIM_MUR_12",
  },
  {
    x: 320,
    y: 32,
    type: "CIM_ROSE_4",
  },
  {
    x: 448,
    y: 32,
    type: "CIM_ROSE_5",
  },
  {
    x: 320,
    y: 64,
    type: "CIM_ROSE_6",
  },
  {
    x: 448,
    y: 64,
    type: "CIM_ROSE_7",
  },
  {
    x: 448,
    y: 96,
    type: "CIM_ROSE_12",
  },
  {
    x: 320,
    y: 96,
    type: "CIM_ROSE_11",
  },
  {
    x: 352,
    y: 32,
    type: "CIM_ROSE_13",
  },
  {
    x: 384,
    y: 32,
    type: "CIM_ROSE_13",
  },
  {
    x: 416,
    y: 32,
    type: "CIM_ROSE_13",
  },
  {
    x: 352,
    y: 96,
    type: "CIM_ROSE_14",
  },
  {
    x: 384,
    y: 96,
    type: "CIM_ROSE_14",
  },
  {
    x: 416,
    y: 96,
    type: "CIM_ROSE_14",
  },
  {
    x: 352,
    y: 128,
    type: "CIM_PILIER_4",
  },
  {
    x: 416,
    y: 128,
    type: "CIM_PILIER_4",
  },
  {
    x: 352,
    y: 64,
    type: "CIM_STRUCT_2",
  },
  {
    x: 384,
    y: 64,
    type: "CIM_STRUCT_2",
  },
  {
    x: 416,
    y: 64,
    type: "CIM_STRUCT_2",
  },
  {
    x: 96,
    y: 192,
    type: "CIM_STRUCT_4",
  },
  {
    x: 64,
    y: 192,
    type: "CIM_STRUCT_4",
  },
  {
    x: 64,
    y: 224,
    type: "CIM_STRUCT_4",
  },
  {
    x: 96,
    y: 224,
    type: "CIM_STRUCT_4",
  },
  {
    x: 128,
    y: 224,
    type: "CIM_STRUCT_4",
  },
  {
    x: 160,
    y: 224,
    type: "CIM_STRUCT_4",
  },
  {
    x: 192,
    y: 160,
    type: "CIM_STRUCT_4",
  },
  {
    x: 192,
    y: 192,
    type: "CIM_STRUCT_4",
  },
  {
    x: 160,
    y: 192,
    type: "CIM_ROSE_10",
  },
  {
    x: 128,
    y: 192,
    type: "CIM_ROSE_9",
  },
  {
    x: 160,
    y: 160,
    type: "CIM_ROSE_3",
  },
  {
    x: 128,
    y: 160,
    type: "CIM_ROSE_2",
  },
  {
    x: 576,
    y: 128,
    type: "CIM_SOL_19",
  },
  {
    x: 608,
    y: 128,
    type: "CIM_SOL_19",
  },
  {
    x: 640,
    y: 128,
    type: "CIM_SOL_19",
  },
  {
    x: 672,
    y: 128,
    type: "CIM_SOL_19",
  },
  {
    x: 704,
    y: 128,
    type: "CIM_SOL_19",
  },
  {
    x: 736,
    y: 128,
    type: "CIM_SOL_19",
  },
  {
    x: 0,
    y: 224,
    type: "CIM_STRUCT_4",
  },
  {
    x: 32,
    y: 192,
    type: "CIM_STRUCT_4",
  },
  {
    x: 32,
    y: 224,
    type: "CIM_STRUCT_4",
  },
  {
    x: 256,
    y: 96,
    type: "CIM_STRUCT_4",
  },
  {
    x: 224,
    y: 128,
    type: "CIM_STRUCT_4",
  },
  {
    x: 32,
    y: 320,
    type: "CIM_STRUCT_4",
  },
  {
    x: 256,
    y: 128,
    type: "CIM_STRUCT_4",
  },
  {
    x: 224,
    y: 160,
    type: "CIM_STRUCT_4",
  },
  {
    x: 64,
    y: 320,
    type: "CIM_STRUCT_4",
  },
  {
    x: 0,
    y: 320,
    type: "CIM_STRUCT_4",
  },
  {
    x: 32,
    y: 352,
    type: "CIM_STRUCT_4",
  },
  {
    x: 256,
    y: 160,
    type: "CIM_STRUCT_4",
  },
  {
    x: 224,
    y: 192,
    type: "CIM_STRUCT_4",
  },
  {
    x: 96,
    y: 320,
    type: "CIM_STRUCT_4",
  },
  {
    x: 288,
    y: 160,
    type: "CIM_STRUCT_4",
  },
  {
    x: 224,
    y: 224,
    type: "CIM_STRUCT_4",
  },
  {
    x: 128,
    y: 320,
    type: "CIM_STRUCT_4",
  },
  {
    x: 96,
    y: 352,
    type: "CIM_STRUCT_4",
  },
  {
    x: 320,
    y: 160,
    type: "CIM_STRUCT_4",
  },
  {
    x: 288,
    y: 192,
    type: "CIM_STRUCT_4",
  },
  {
    x: 256,
    y: 224,
    type: "CIM_STRUCT_4",
  },
  {
    x: 192,
    y: 224,
    type: "CIM_STRUCT_4",
  },
  {
    x: 128,
    y: 352,
    type: "CIM_STRUCT_4",
  },
  {
    x: 320,
    y: 192,
    type: "CIM_STRUCT_4",
  },
  {
    x: 288,
    y: 224,
    type: "CIM_STRUCT_4",
  },
  {
    x: 192,
    y: 320,
    type: "CIM_STRUCT_4",
  },
  {
    x: 160,
    y: 352,
    type: "CIM_STRUCT_4",
  },
  {
    x: 320,
    y: 224,
    type: "CIM_STRUCT_4",
  },
  {
    x: 192,
    y: 352,
    type: "CIM_STRUCT_4",
  },
  {
    x: 160,
    y: 384,
    type: "CIM_STRUCT_4",
  },
  {
    x: 256,
    y: 320,
    type: "CIM_STRUCT_4",
  },
  {
    x: 224,
    y: 352,
    type: "CIM_STRUCT_4",
  },
  {
    x: 192,
    y: 384,
    type: "CIM_STRUCT_4",
  },
  {
    x: 448,
    y: 160,
    type: "CIM_STRUCT_4",
  },
  {
    x: 288,
    y: 320,
    type: "CIM_STRUCT_4",
  },
  {
    x: 256,
    y: 352,
    type: "CIM_STRUCT_4",
  },
  {
    x: 224,
    y: 384,
    type: "CIM_STRUCT_4",
  },
  {
    x: 192,
    y: 416,
    type: "CIM_STRUCT_4",
  },
  {
    x: 480,
    y: 160,
    type: "CIM_STRUCT_4",
  },
  {
    x: 448,
    y: 192,
    type: "CIM_STRUCT_4",
  },
  {
    x: 320,
    y: 320,
    type: "CIM_STRUCT_4",
  },
  {
    x: 256,
    y: 384,
    type: "CIM_STRUCT_4",
  },
  {
    x: 512,
    y: 160,
    type: "CIM_STRUCT_4",
  },
  {
    x: 480,
    y: 192,
    type: "CIM_STRUCT_4",
  },
  {
    x: 448,
    y: 224,
    type: "CIM_STRUCT_4",
  },
  {
    x: 352,
    y: 320,
    type: "CIM_STRUCT_4",
  },
  {
    x: 320,
    y: 352,
    type: "CIM_STRUCT_4",
  },
  {
    x: 288,
    y: 384,
    type: "CIM_STRUCT_4",
  },
  {
    x: 256,
    y: 416,
    type: "CIM_STRUCT_4",
  },
  {
    x: 544,
    y: 160,
    type: "CIM_STRUCT_4",
  },
  {
    x: 384,
    y: 320,
    type: "CIM_STRUCT_4",
  },
  {
    x: 352,
    y: 352,
    type: "CIM_STRUCT_4",
  },
  {
    x: 320,
    y: 384,
    type: "CIM_STRUCT_4",
  },
  {
    x: 288,
    y: 416,
    type: "CIM_STRUCT_4",
  },
  {
    x: 576,
    y: 160,
    type: "CIM_STRUCT_4",
  },
  {
    x: 512,
    y: 96,
    type: "CIM_STRUCT_4",
  },
  {
    x: 384,
    y: 352,
    type: "CIM_STRUCT_4",
  },
  {
    x: 352,
    y: 384,
    type: "CIM_STRUCT_4",
  },
  {
    x: 320,
    y: 416,
    type: "CIM_STRUCT_4",
  },
  {
    x: 576,
    y: 192,
    type: "CIM_STRUCT_4",
  },
  {
    x: 544,
    y: 224,
    type: "CIM_STRUCT_4",
  },
  {
    x: 512,
    y: 64,
    type: "CIM_STRUCT_4",
  },
  {
    x: 384,
    y: 384,
    type: "CIM_STRUCT_4",
  },
  {
    x: 352,
    y: 416,
    type: "CIM_STRUCT_4",
  },
  {
    x: 640,
    y: 160,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 192,
    type: "CIM_STRUCT_4",
  },
  {
    x: 576,
    y: 96,
    type: "CIM_STRUCT_4",
  },
  {
    x: 544,
    y: 64,
    type: "CIM_STRUCT_4",
  },
  {
    x: 640,
    y: 192,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 224,
    type: "CIM_STRUCT_4",
  },
  {
    x: 576,
    y: 64,
    type: "CIM_STRUCT_4",
  },
  {
    x: 544,
    y: 32,
    type: "CIM_STRUCT_4",
  },
  {
    x: 704,
    y: 160,
    type: "CIM_STRUCT_4",
  },
  {
    x: 672,
    y: 192,
    type: "CIM_STRUCT_4",
  },
  {
    x: 640,
    y: 224,
    type: "CIM_STRUCT_4",
  },
  {
    x: 736,
    y: 160,
    type: "CIM_STRUCT_4",
  },
  {
    x: 704,
    y: 192,
    type: "CIM_STRUCT_4",
  },
  {
    x: 672,
    y: 96,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 32,
    type: "CIM_STRUCT_4",
  },
  {
    x: 672,
    y: 64,
    type: "CIM_STRUCT_4",
  },
  {
    x: 640,
    y: 32,
    type: "CIM_STRUCT_4",
  },
  {
    x: 672,
    y: 32,
    type: "CIM_STRUCT_4",
  },
  {
    x: 576,
    y: 384,
    type: "CIM_STRUCT_4",
  },
  {
    x: 544,
    y: 416,
    type: "CIM_STRUCT_4",
  },
  {
    x: 704,
    y: 32,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 384,
    type: "CIM_STRUCT_4",
  },
  {
    x: 544,
    y: 448,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 416,
    type: "CIM_STRUCT_4",
  },
  {
    x: 640,
    y: 416,
    type: "CIM_STRUCT_4",
  },
  {
    x: 576,
    y: 480,
    type: "CIM_STRUCT_4",
  },
  {
    x: 640,
    y: 448,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 480,
    type: "CIM_STRUCT_4",
  },
  {
    x: 672,
    y: 448,
    type: "CIM_STRUCT_4",
  },
  {
    x: 672,
    y: 480,
    type: "CIM_STRUCT_4",
  },
  {
    x: 704,
    y: 480,
    type: "CIM_STRUCT_4",
  },
  {
    x: 160,
    y: 288,
    type: "CIM_ROSE_1",
  },
  {
    x: 160,
    y: 320,
    type: "CIM_ROSE_8",
  },
  {
    x: 768,
    y: 544,
    type: "CIM_DECO_7",
  },
  {
    x: 768,
    y: 512,
    type: "CIM_SOL_8",
  },
  {
    x: 736,
    y: 512,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 704,
    y: 512,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 672,
    y: 512,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 640,
    y: 512,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 608,
    y: 512,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 576,
    y: 512,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 544,
    y: 512,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 416,
    y: 512,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 384,
    y: 512,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 352,
    y: 512,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 320,
    y: 512,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 288,
    y: 512,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 256,
    y: 512,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 224,
    y: 512,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 192,
    y: 512,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 160,
    y: 512,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 128,
    y: 512,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 96,
    y: 512,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 64,
    y: 512,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 32,
    y: 512,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 0,
    y: 512,
    type: "CIM_TOMBE_BG",
  },
  {
    x: 0,
    y: 544,
    type: "CIM_DECO_1",
  },
  {
    x: 32,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 64,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 96,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 128,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 160,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 192,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 224,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 256,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 288,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 320,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 352,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 384,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 416,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 448,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 512,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 544,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 576,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 608,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 640,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 672,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 704,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 736,
    y: 544,
    type: "CIM_DECO_2",
  },
  {
    x: 0,
    y: 288,
    type: "CIM_ROSE_14",
  },
  {
    x: 32,
    y: 288,
    type: "CIM_ROSE_14",
  },
  {
    x: 64,
    y: 288,
    type: "CIM_ROSE_14",
  },
  {
    x: 96,
    y: 288,
    type: "CIM_ROSE_14",
  },
  {
    x: 128,
    y: 288,
    type: "CIM_ROSE_14",
  },
  {
    x: 192,
    y: 288,
    type: "CIM_ROSE_14",
  },
  {
    x: 224,
    y: 288,
    type: "CIM_ROSE_14",
  },
  {
    x: 256,
    y: 288,
    type: "CIM_ROSE_14",
  },
  {
    x: 288,
    y: 288,
    type: "CIM_ROSE_14",
  },
  {
    x: 320,
    y: 288,
    type: "CIM_ROSE_14",
  },
  {
    x: 352,
    y: 288,
    type: "CIM_ROSE_14",
  },
  {
    x: 384,
    y: 288,
    type: "CIM_ROSE_14",
  },
  {
    x: 416,
    y: 288,
    type: "CIM_ROSE_12",
  },
  {
    x: 0,
    y: 256,
    type: "CIM_ROSE_13",
  },
  {
    x: 32,
    y: 256,
    type: "CIM_ROSE_13",
  },
  {
    x: 64,
    y: 256,
    type: "CIM_ROSE_13",
  },
  {
    x: 96,
    y: 256,
    type: "CIM_ROSE_13",
  },
  {
    x: 128,
    y: 256,
    type: "CIM_ROSE_13",
  },
  {
    x: 160,
    y: 256,
    type: "CIM_ROSE_13",
  },
  {
    x: 192,
    y: 256,
    type: "CIM_ROSE_13",
  },
  {
    x: 224,
    y: 256,
    type: "CIM_ROSE_13",
  },
  {
    x: 256,
    y: 256,
    type: "CIM_ROSE_13",
  },
  {
    x: 288,
    y: 256,
    type: "CIM_ROSE_13",
  },
  {
    x: 320,
    y: 256,
    type: "CIM_ROSE_13",
  },
  {
    x: 352,
    y: 224,
    type: "CIM_ROSE_6",
  },
  {
    x: 352,
    y: 192,
    type: "CIM_ROSE_6",
  },
  {
    x: 352,
    y: 160,
    type: "CIM_ROSE_6",
  },
  {
    x: 416,
    y: 160,
    type: "CIM_ROSE_7",
  },
  {
    x: 416,
    y: 192,
    type: "CIM_ROSE_7",
  },
  {
    x: 416,
    y: 224,
    type: "CIM_ROSE_7",
  },
  {
    x: 416,
    y: 256,
    type: "CIM_ROSE_7",
  },
  {
    x: 384,
    y: 160,
    type: "CIM_STRUCT_2",
  },
  {
    x: 384,
    y: 192,
    type: "CIM_STRUCT_2",
  },
  {
    x: 384,
    y: 224,
    type: "CIM_STRUCT_2",
  },
  {
    x: 384,
    y: 256,
    type: "CIM_STRUCT_2",
  },
  {
    x: 352,
    y: 256,
    type: "CIM_STRUCT_2",
  },
  {
    x: 704,
    y: 224,
    type: "CIM_STRUCT_1",
  },
  {
    x: 672,
    y: 224,
    type: "CIM_STRUCT_1",
  },
  {
    x: 256,
    y: 32,
    type: "CIM_MOSAIQUE_3",
  },
  {
    x: 224,
    y: 64,
    type: "CIM_MOSAIQUE_3",
  },
  {
    x: 96,
    y: 32,
    type: "CIM_SOL_11",
  },
  {
    x: 128,
    y: 32,
    type: "CIM_SOL_12",
  },
  {
    x: 160,
    y: 32,
    type: "CIM_SOL_11",
  },
  {
    x: 224,
    y: 32,
    type: "CIM_SOL_12",
  },
  {
    x: 192,
    y: 32,
    type: "CIM_SOL_12",
  },
  {
    x: 32,
    y: 64,
    type: "CIM_MOSAIQUE_4",
  },
  {
    x: 32,
    y: 32,
    type: "CIM_MOSAIQUE_4",
  },
  {
    x: 64,
    y: 32,
    type: "CIM_MOSAIQUE_4",
  },
  {
    x: 64,
    y: 64,
    type: "CIM_MOSAIQUE_4",
  },
  {
    x: 32,
    y: 96,
    type: "CIM_MOSAIQUE_1",
  },
  {
    x: 64,
    y: 128,
    type: "CIM_MOSAIQUE_1",
  },
  {
    x: 96,
    y: 128,
    type: "CIM_MOSAIQUE_2",
  },
  {
    x: 128,
    y: 128,
    type: "CIM_MOSAIQUE_2",
  },
  {
    x: 160,
    y: 128,
    type: "CIM_MOSAIQUE_3",
  },
  {
    x: 192,
    y: 96,
    type: "CIM_MOSAIQUE_3",
  },
  {
    x: 192,
    y: 64,
    type: "CIM_SOL_11",
  },
  {
    x: 160,
    y: 64,
    type: "CIM_SOL_11",
  },
  {
    x: 160,
    y: 96,
    type: "CIM_SOL_11",
  },
  {
    x: 64,
    y: 96,
    type: "CIM_SOL_11",
  },
  {
    x: 96,
    y: 96,
    type: "CIM_SOL_11",
  },
  {
    x: 128,
    y: 64,
    type: "CIM_SOL_11",
  },
  {
    x: 96,
    y: 64,
    type: "CIM_SOL_12",
  },
  {
    x: 128,
    y: 96,
    type: "CIM_SOL_12",
  },
  {
    x: 192,
    y: 128,
    type: "CIM_SOL_10",
  },
  {
    x: 32,
    y: 128,
    type: "CIM_SOL_10",
  },
  {
    x: 32,
    y: 160,
    type: "CIM_SOL_10",
  },
  {
    x: 64,
    y: 160,
    type: "CIM_SOL_10",
  },
  {
    x: 512,
    y: 512,
    type: "CIM_TOMBE_BG",
  },
  {
    x: 512,
    y: 480,
    type: "CIM_MUR_24",
  },
  {
    x: 512,
    y: 384,
    type: "CIM_MUR_24",
  },
  {
    x: 512,
    y: 352,
    type: "CIM_TOMBE_HG",
  },
  {
    x: 544,
    y: 352,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 576,
    y: 352,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 608,
    y: 352,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 640,
    y: 352,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 672,
    y: 352,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 704,
    y: 352,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 768,
    y: 352,
    type: "CIM_SOL_1",
  },
  {
    x: 736,
    y: 352,
    type: "CIM_TOMBE_HD",
  },
  {
    x: 512,
    y: 416,
    type: "CIM_SOL_9",
  },
  {
    x: 480,
    y: 416,
    type: "CIM_SOL_9",
  },
  {
    x: 448,
    y: 416,
    type: "CIM_SOL_9",
  },
  {
    x: 416,
    y: 416,
    type: "CIM_MUR_17",
  },
  {
    x: 384,
    y: 416,
    type: "CIM_MUR_17",
  },
  {
    x: 416,
    y: 448,
    type: "CIM_MUR_17",
  },
  {
    x: 416,
    y: 480,
    type: "CIM_STRUCT_2",
  },
  {
    x: 384,
    y: 448,
    type: "CIM_STRUCT_2",
  },
  {
    x: 352,
    y: 448,
    type: "CIM_STRUCT_2",
  },
  {
    x: 352,
    y: 480,
    type: "CIM_STRUCT_2",
  },
  {
    x: 384,
    y: 480,
    type: "CIM_STRUCT_4",
  },
  {
    x: 576,
    y: 224,
    type: "CIM_MUR_17",
  },
  {
    x: 448,
    y: 480,
    type: "CIM_MUR_22",
  },
  {
    x: 448,
    y: 512,
    type: "CIM_SOL_8",
  },
  {
    x: 448,
    y: 384,
    type: "CIM_MUR_22",
  },
  {
    x: 448,
    y: 352,
    type: "CIM_MUR_22",
  },
  {
    x: 448,
    y: 320,
    type: "CIM_MUR_22",
  },
  {
    x: 736,
    y: 416,
    type: "CIM_STRUCT_2",
  },
  {
    x: 608,
    y: 448,
    type: "CIM_MUR_17",
  },
  {
    x: 576,
    y: 448,
    type: "CIM_MUR_17",
  },
  {
    x: 576,
    y: 416,
    type: "CIM_MUR_17",
  },
  {
    x: 736,
    y: 448,
    type: "CIM_ROSE_14",
  },
  {
    x: 704,
    y: 448,
    type: "CIM_ROSE_11",
  },
  {
    x: 672,
    y: 416,
    type: "CIM_ROSE_11",
  },
  {
    x: 672,
    y: 384,
    type: "CIM_STRUCT_2",
  },
  {
    x: 704,
    y: 416,
    type: "CIM_STRUCT_2",
  },
  {
    x: 704,
    y: 384,
    type: "CIM_MUR_17",
  },
  {
    x: 544,
    y: 480,
    type: "CIM_SOL_17",
  },
  {
    x: 640,
    y: 480,
    type: "CIM_SOL_17",
  },
  {
    x: 736,
    y: 480,
    type: "CIM_SOL_17",
  },
  {
    x: 544,
    y: 384,
    type: "CIM_SOL_17",
  },
  {
    x: 640,
    y: 384,
    type: "CIM_SOL_17",
  },
  {
    x: 736,
    y: 384,
    type: "CIM_SOL_17",
  },
  {
    x: 544,
    y: 192,
    type: "CIM_SOL_16",
  },
  {
    x: 576,
    y: 32,
    type: "CIM_SOL_16",
  },
  {
    x: 224,
    y: 416,
    type: "CIM_SOL_15",
  },
  {
    x: 672,
    y: 160,
    type: "CIM_SOL_15",
  },
  {
    x: 256,
    y: 192,
    type: "CIM_SOL_15",
  },
  {
    x: 416,
    y: 352,
    type: "CIM_ROSE_1",
  },
  {
    x: 416,
    y: 384,
    type: "CIM_ROSE_8",
  },
  {
    x: 224,
    y: 96,
    type: "CIM_MOSAIQUE_5",
  },
  {
    x: 608,
    y: 160,
    type: "CIM_MOSAIQUE_5",
  },
  {
    x: 480,
    y: 480,
    type: "MAIS_14",
  },
  {
    x: 480,
    y: 512,
    type: "MAIS_14",
  },
  {
    x: 480,
    y: 544,
    type: "MAIS_14",
  },
  {
    x: 480,
    y: 384,
    type: "MAIS_14",
  },
  {
    x: 480,
    y: 352,
    type: "MAIS_14",
  },
  {
    x: 480,
    y: 320,
    type: "MAIS_14",
  },
  {
    x: 512,
    y: 320,
    type: "MAIS_14",
  },
  {
    x: 544,
    y: 320,
    type: "MAIS_14",
  },
  {
    x: 576,
    y: 320,
    type: "MAIS_14",
  },
  {
    x: 608,
    y: 320,
    type: "MAIS_14",
  },
  {
    x: 640,
    y: 320,
    type: "MAIS_14",
  },
  {
    x: 672,
    y: 320,
    type: "MAIS_14",
  },
  {
    x: 704,
    y: 320,
    type: "MAIS_14",
  },
  {
    x: 736,
    y: 320,
    type: "MAIS_14",
  },
  {
    x: 768,
    y: 320,
    type: "MAIS_14",
  },
  {
    x: 512,
    y: 128,
    type: "CIM_STRUCT_4",
  },
  {
    x: 544,
    y: 96,
    type: "CIM_STRUCT_4",
  },
  {
    x: 544,
    y: 128,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 64,
    type: "CIM_STRUCT_4",
  },
  {
    x: 640,
    y: 64,
    type: "CIM_STRUCT_4",
  },
  {
    x: 640,
    y: 96,
    type: "CIM_STRUCT_4",
  },
  {
    x: 608,
    y: 96,
    type: "CIM_STRUCT_4",
  },
  {
    x: 736,
    y: 64,
    type: "CIM_ROSE_3",
  },
  {
    x: 704,
    y: 64,
    type: "CIM_ROSE_2",
  },
  {
    x: 736,
    y: 96,
    type: "CIM_ROSE_10",
  },
  {
    x: 704,
    y: 96,
    type: "CIM_ROSE_9",
  },
  {
    x: 736,
    y: 224,
    type: "CIM_ROSE_8",
  },
  {
    x: 736,
    y: 192,
    type: "CIM_ROSE_1",
  },
  {
    x: 288,
    y: 480,
    type: "CIM_ROSE_9",
  },
  {
    x: 320,
    y: 480,
    type: "CIM_ROSE_10",
  },
  {
    x: 288,
    y: 448,
    type: "CIM_ROSE_2",
  },
  {
    x: 320,
    y: 448,
    type: "CIM_ROSE_3",
  },
  {
    x: 224,
    y: 448,
    type: "CIM_STRUCT_4",
  },
  {
    x: 256,
    y: 480,
    type: "CIM_STRUCT_4",
  },
  {
    x: 224,
    y: 480,
    type: "CIM_STRUCT_4",
  },
  {
    x: 192,
    y: 448,
    type: "CIM_STRUCT_4",
  },
  {
    x: 64,
    y: 480,
    type: "CIM_SOL_11",
  },
  {
    x: 32,
    y: 480,
    type: "CIM_SOL_11",
  },
  {
    x: 32,
    y: 448,
    type: "CIM_SOL_11",
  },
  {
    x: 96,
    y: 416,
    type: "CIM_SOL_12",
  },
  {
    x: 32,
    y: 384,
    type: "CIM_SOL_14",
  },
  {
    x: 64,
    y: 384,
    type: "CIM_SOL_13",
  },
  {
    x: 64,
    y: 416,
    type: "CIM_SOL_11",
  },
  {
    x: 32,
    y: 416,
    type: "CIM_SOL_12",
  },
  {
    x: 64,
    y: 448,
    type: "CIM_SOL_11",
  },
  {
    x: 96,
    y: 480,
    type: "CIM_MOSAIQUE_4",
  },
  {
    x: 128,
    y: 480,
    type: "CIM_MOSAIQUE_4",
  },
  {
    x: 96,
    y: 448,
    type: "CIM_MOSAIQUE_4",
  },
  {
    x: 160,
    y: 480,
    type: "CIM_MOSAIQUE_4",
  },
  {
    x: 192,
    y: 480,
    type: "CIM_SOL_13",
  },
  {
    x: 160,
    y: 448,
    type: "CIM_SOL_13",
  },
  {
    x: 128,
    y: 416,
    type: "CIM_SOL_13",
  },
  {
    x: 96,
    y: 384,
    type: "CIM_SOL_10",
  },
  {
    x: 160,
    y: 416,
    type: "CIM_SOL_10",
  },
  {
    x: 128,
    y: 384,
    type: "CIM_SOL_10",
  },
  {
    x: 128,
    y: 448,
    type: "CIM_MOSAIQUE_4",
  },
  {
    x: 256,
    y: 448,
    type: "CIM_DECO_4",
  },
  {
    x: 96,
    y: 160,
    type: "CIM_DECO_4",
  },
  {
    x: 256,
    y: 64,
    type: "CIM_DECO_4",
  },
  {
    x: 512,
    y: 32,
    type: "CIM_DECO_4",
  },
  {
    x: 736,
    y: 32,
    type: "CIM_DECO_4",
  },
  {
    x: 416,
    y: 320,
    type: "CIM_DECO_4",
  },
  {
    x: 448,
    y: 256,
    type: "CIM_MUR_18",
  },
  {
    x: 768,
    y: 256,
    type: "CIM_SOL_8",
  },
  {
    x: 480,
    y: 256,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 512,
    y: 256,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 544,
    y: 256,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 576,
    y: 256,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 608,
    y: 256,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 640,
    y: 256,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 672,
    y: 256,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 704,
    y: 256,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 736,
    y: 256,
    type: "CIM_TOMBE_BD",
  },
  {
    x: 768,
    y: 288,
    type: "CIM_DECO_3",
  },
  {
    x: 736,
    y: 288,
    type: "CIM_DECO_2",
  },
  {
    x: 704,
    y: 288,
    type: "CIM_DECO_2",
  },
  {
    x: 672,
    y: 288,
    type: "CIM_DECO_2",
  },
  {
    x: 640,
    y: 288,
    type: "CIM_DECO_2",
  },
  {
    x: 608,
    y: 288,
    type: "CIM_DECO_2",
  },
  {
    x: 576,
    y: 288,
    type: "CIM_DECO_2",
  },
  {
    x: 544,
    y: 288,
    type: "CIM_DECO_2",
  },
  {
    x: 512,
    y: 288,
    type: "CIM_DECO_2",
  },
  {
    x: 480,
    y: 288,
    type: "CIM_DECO_2",
  },
  {
    x: 448,
    y: 288,
    type: "CIM_DECO_6",
  },
  {
    x: 512,
    y: 192,
    type: "CIM_STRUCT_4",
  },
  {
    x: 512,
    y: 224,
    type: "CIM_STRUCT_4",
  },
  {
    x: 480,
    y: 224,
    type: "CIM_STRUCT_4",
  },
  {
    x: 224,
    y: 320,
    type: "CIM_STRUCT_4",
  },
  {
    x: 288,
    y: 352,
    type: "CIM_SOL_16",
  },
  {
    x: 64,
    y: 352,
    type: "CIM_SOL_16",
  },
  {
    x: 448,
    y: 448,
    type: "CIM_SOL_9",
  },
  {
    x: 480,
    y: 448,
    type: "CIM_SOL_9",
  },
  {
    x: 512,
    y: 448,
    type: "CIM_SOL_9",
  },
];

export const zoneData = {
  id: "ruins_east",
  name: "Ruines Maudites",
  bgColor: "#1a1020",
  mapData: { walls: interior },
  enemies: { moblins: 2, octoroks: 3 },
  connections: { west: "village" },
  npcs: [
    {
      name: "Gardien des Ruines",
      x: 50,
      y: 228,
      sprite: "VILLAGEOIS_BLEU",
      spriteColumns: 1,
      spriteW: 63,
      spriteH: 63,
      spriteFrame: 0,
      spriteScale: 0.5,
      z: 5,
      dialogues: [
        "Ces ruines etaient autrefois un temple sacre...",
        "Le fragment de cristal est garde par une creature puissante.",
        "Sois prudent, heros. Les morts ne dorment pas ici.",
      ],
    },
  ],
};
