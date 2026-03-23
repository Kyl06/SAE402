/**
 * @file forest_south.js
 * @description Zone Sud - Foret dense. Quete: tuer les moblins pour le Fragment 1.
 * Sortie : Nord (village)
 */
import { generateBorder } from "./mapUtils.js";

const walls = generateBorder({ north: true });

const interior = [
  {
    x: 0,
    y: 0,
    type: "DES_1",
  },
  {
    x: 768,
    y: 0,
    type: "DES_2",
  },
  {
    x: 0,
    y: 544,
    type: "DES_10",
  },
  {
    x: 768,
    y: 544,
    type: "DES_11",
  },
  {
    x: 32,
    y: 0,
    type: "DES_12",
  },
  {
    x: 64,
    y: 0,
    type: "DES_12",
  },
  {
    x: 96,
    y: 0,
    type: "DES_12",
  },
  {
    x: 128,
    y: 0,
    type: "DES_12",
  },
  {
    x: 160,
    y: 0,
    type: "DES_12",
  },
  {
    x: 192,
    y: 0,
    type: "DES_12",
  },
  {
    x: 224,
    y: 0,
    type: "DES_12",
  },
  {
    x: 256,
    y: 0,
    type: "DES_12",
  },
  {
    x: 288,
    y: 0,
    type: "DES_12",
  },
  {
    x: 480,
    y: 0,
    type: "DES_12",
  },
  {
    x: 512,
    y: 0,
    type: "DES_12",
  },
  {
    x: 544,
    y: 0,
    type: "DES_12",
  },
  {
    x: 576,
    y: 0,
    type: "DES_12",
  },
  {
    x: 608,
    y: 0,
    type: "DES_12",
  },
  {
    x: 640,
    y: 0,
    type: "DES_12",
  },
  {
    x: 672,
    y: 0,
    type: "DES_12",
  },
  {
    x: 704,
    y: 0,
    type: "DES_12",
  },
  {
    x: 736,
    y: 0,
    type: "DES_12",
  },
  {
    x: 768,
    y: 32,
    type: "DES_3",
  },
  {
    x: 768,
    y: 64,
    type: "DES_3",
  },
  {
    x: 768,
    y: 96,
    type: "DES_3",
  },
  {
    x: 768,
    y: 128,
    type: "DES_3",
  },
  {
    x: 768,
    y: 160,
    type: "DES_3",
  },
  {
    x: 768,
    y: 192,
    type: "DES_3",
  },
  {
    x: 768,
    y: 224,
    type: "DES_3",
  },
  {
    x: 768,
    y: 256,
    type: "DES_3",
  },
  {
    x: 768,
    y: 384,
    type: "DES_3",
  },
  {
    x: 768,
    y: 416,
    type: "DES_3",
  },
  {
    x: 768,
    y: 448,
    type: "DES_3",
  },
  {
    x: 768,
    y: 480,
    type: "DES_3",
  },
  {
    x: 768,
    y: 512,
    type: "DES_3",
  },
  {
    x: 0,
    y: 32,
    type: "DES_37",
  },
  {
    x: 0,
    y: 64,
    type: "DES_37",
  },
  {
    x: 0,
    y: 96,
    type: "DES_37",
  },
  {
    x: 0,
    y: 128,
    type: "DES_37",
  },
  {
    x: 0,
    y: 160,
    type: "DES_37",
  },
  {
    x: 0,
    y: 192,
    type: "DES_37",
  },
  {
    x: 0,
    y: 224,
    type: "DES_37",
  },
  {
    x: 0,
    y: 256,
    type: "DES_37",
  },
  {
    x: 0,
    y: 288,
    type: "DES_37",
  },
  {
    x: 0,
    y: 320,
    type: "DES_37",
  },
  {
    x: 0,
    y: 352,
    type: "DES_37",
  },
  {
    x: 0,
    y: 384,
    type: "DES_37",
  },
  {
    x: 0,
    y: 416,
    type: "DES_37",
  },
  {
    x: 0,
    y: 448,
    type: "DES_37",
  },
  {
    x: 0,
    y: 480,
    type: "DES_37",
  },
  {
    x: 0,
    y: 512,
    type: "DES_37",
  },
  {
    x: 32,
    y: 544,
    type: "DES_46",
  },
  {
    x: 64,
    y: 544,
    type: "DES_46",
  },
  {
    x: 96,
    y: 544,
    type: "DES_46",
  },
  {
    x: 128,
    y: 544,
    type: "DES_46",
  },
  {
    x: 160,
    y: 544,
    type: "DES_46",
  },
  {
    x: 192,
    y: 544,
    type: "DES_46",
  },
  {
    x: 224,
    y: 544,
    type: "DES_46",
  },
  {
    x: 256,
    y: 544,
    type: "DES_46",
  },
  {
    x: 288,
    y: 544,
    type: "DES_46",
  },
  {
    x: 320,
    y: 544,
    type: "DES_46",
  },
  {
    x: 352,
    y: 544,
    type: "DES_46",
  },
  {
    x: 384,
    y: 544,
    type: "DES_46",
  },
  {
    x: 416,
    y: 544,
    type: "DES_46",
  },
  {
    x: 448,
    y: 544,
    type: "DES_46",
  },
  {
    x: 480,
    y: 544,
    type: "DES_46",
  },
  {
    x: 512,
    y: 544,
    type: "DES_46",
  },
  {
    x: 544,
    y: 544,
    type: "DES_46",
  },
  {
    x: 672,
    y: 544,
    type: "DES_46",
  },
  {
    x: 704,
    y: 544,
    type: "DES_46",
  },
  {
    x: 736,
    y: 544,
    type: "DES_46",
  },
  {
    x: 32,
    y: 32,
    type: "DES_45",
  },
  {
    x: 64,
    y: 32,
    type: "DES_45",
  },
  {
    x: 96,
    y: 32,
    type: "DES_36",
  },
  {
    x: 32,
    y: 512,
    type: "DES_47",
  },
  {
    x: 32,
    y: 448,
    type: "DES_31",
  },
  {
    x: 32,
    y: 416,
    type: "DES_22",
  },
  {
    x: 32,
    y: 384,
    type: "DES_31",
  },
  {
    x: 32,
    y: 352,
    type: "DES_22",
  },
  {
    x: 32,
    y: 320,
    type: "DES_18",
  },
  {
    x: 160,
    y: 32,
    type: "DES_1",
  },
  {
    x: 192,
    y: 32,
    type: "DES_2",
  },
  {
    x: 192,
    y: 64,
    type: "DES_3",
  },
  {
    x: 192,
    y: 96,
    type: "DES_3",
  },
  {
    x: 160,
    y: 64,
    type: "DES_37",
  },
  {
    x: 160,
    y: 96,
    type: "DES_37",
  },
  {
    x: 160,
    y: 128,
    type: "DES_29",
  },
  {
    x: 128,
    y: 128,
    type: "DES_12",
  },
  {
    x: 96,
    y: 96,
    type: "DES_32",
  },
  {
    x: 64,
    y: 96,
    type: "DES_32",
  },
  {
    x: 32,
    y: 96,
    type: "DES_32",
  },
  {
    x: 96,
    y: 128,
    type: "DES_1",
  },
  {
    x: 96,
    y: 160,
    type: "DES_10",
  },
  {
    x: 128,
    y: 160,
    type: "DES_46",
  },
  {
    x: 160,
    y: 160,
    type: "DES_46",
  },
  {
    x: 192,
    y: 160,
    type: "DES_11",
  },
  {
    x: 192,
    y: 128,
    type: "DES_3",
  },
  {
    x: 224,
    y: 64,
    type: "DES_23",
  },
  {
    x: 224,
    y: 96,
    type: "DES_23",
  },
  {
    x: 320,
    y: 0,
    type: "DES_29",
  },
  {
    x: 448,
    y: 0,
    type: "DES_28",
  },
  {
    x: 320,
    y: 32,
    type: "DES_17",
  },
  {
    x: 320,
    y: 64,
    type: "DES_35",
  },
  {
    x: 448,
    y: 32,
    type: "DES_26",
  },
  {
    x: 448,
    y: 64,
    type: "DES_35",
  },
  {
    x: 288,
    y: 32,
    type: "DES_22",
  },
  {
    x: 288,
    y: 64,
    type: "DES_31",
  },
  {
    x: 480,
    y: 64,
    type: "DES_31",
  },
  {
    x: 480,
    y: 32,
    type: "DES_22",
  },
  {
    x: 256,
    y: 32,
    type: "DES_26",
  },
  {
    x: 512,
    y: 32,
    type: "DES_26",
  },
  {
    x: 256,
    y: 64,
    type: "DES_35",
  },
  {
    x: 512,
    y: 64,
    type: "DES_35",
  },
  {
    x: 224,
    y: 32,
    type: "DES_18",
  },
  {
    x: 544,
    y: 32,
    type: "DES_18",
  },
  {
    x: 320,
    y: 512,
    type: "DES_32",
  },
  {
    x: 352,
    y: 512,
    type: "DES_32",
  },
  {
    x: 544,
    y: 512,
    type: "DES_32",
  },
  {
    x: 672,
    y: 512,
    type: "DES_32",
  },
  {
    x: 704,
    y: 512,
    type: "DES_32",
  },
  {
    x: 736,
    y: 512,
    type: "DES_32",
  },
  {
    x: 288,
    y: 480,
    type: "DES_32",
  },
  {
    x: 544,
    y: 480,
    type: "DES_32",
  },
  {
    x: 608,
    y: 480,
    type: "DES_32",
  },
  {
    x: 640,
    y: 480,
    type: "DES_32",
  },
  {
    x: 672,
    y: 480,
    type: "DES_32",
  },
  {
    x: 704,
    y: 480,
    type: "DES_32",
  },
  {
    x: 64,
    y: 448,
    type: "DES_32",
  },
  {
    x: 96,
    y: 448,
    type: "DES_32",
  },
  {
    x: 288,
    y: 448,
    type: "DES_32",
  },
  {
    x: 544,
    y: 448,
    type: "DES_32",
  },
  {
    x: 576,
    y: 448,
    type: "DES_32",
  },
  {
    x: 608,
    y: 448,
    type: "DES_32",
  },
  {
    x: 640,
    y: 448,
    type: "DES_32",
  },
  {
    x: 672,
    y: 448,
    type: "DES_32",
  },
  {
    x: 704,
    y: 448,
    type: "DES_32",
  },
  {
    x: 736,
    y: 416,
    type: "DES_32",
  },
  {
    x: 736,
    y: 224,
    type: "DES_32",
  },
  {
    x: 736,
    y: 192,
    type: "DES_32",
  },
  {
    x: 704,
    y: 128,
    type: "DES_32",
  },
  {
    x: 704,
    y: 160,
    type: "DES_32",
  },
  {
    x: 704,
    y: 224,
    type: "DES_32",
  },
  {
    x: 704,
    y: 256,
    type: "DES_32",
  },
  {
    x: 704,
    y: 416,
    type: "DES_32",
  },
  {
    x: 672,
    y: 416,
    type: "DES_32",
  },
  {
    x: 672,
    y: 384,
    type: "DES_32",
  },
  {
    x: 672,
    y: 224,
    type: "DES_32",
  },
  {
    x: 672,
    y: 160,
    type: "DES_32",
  },
  {
    x: 640,
    y: 224,
    type: "DES_32",
  },
  {
    x: 640,
    y: 256,
    type: "DES_32",
  },
  {
    x: 640,
    y: 288,
    type: "DES_32",
  },
  {
    x: 640,
    y: 320,
    type: "DES_32",
  },
  {
    x: 640,
    y: 352,
    type: "DES_32",
  },
  {
    x: 640,
    y: 384,
    type: "DES_32",
  },
  {
    x: 608,
    y: 416,
    type: "DES_32",
  },
  {
    x: 608,
    y: 320,
    type: "DES_32",
  },
  {
    x: 608,
    y: 288,
    type: "DES_32",
  },
  {
    x: 608,
    y: 256,
    type: "DES_32",
  },
  {
    x: 608,
    y: 224,
    type: "DES_32",
  },
  {
    x: 608,
    y: 192,
    type: "DES_32",
  },
  {
    x: 576,
    y: 224,
    type: "DES_32",
  },
  {
    x: 576,
    y: 256,
    type: "DES_32",
  },
  {
    x: 576,
    y: 288,
    type: "DES_32",
  },
  {
    x: 576,
    y: 320,
    type: "DES_32",
  },
  {
    x: 576,
    y: 352,
    type: "DES_32",
  },
  {
    x: 608,
    y: 352,
    type: "DES_32",
  },
  {
    x: 608,
    y: 384,
    type: "DES_32",
  },
  {
    x: 576,
    y: 416,
    type: "DES_32",
  },
  {
    x: 544,
    y: 416,
    type: "DES_32",
  },
  {
    x: 544,
    y: 384,
    type: "DES_32",
  },
  {
    x: 544,
    y: 352,
    type: "DES_32",
  },
  {
    x: 544,
    y: 320,
    type: "DES_32",
  },
  {
    x: 544,
    y: 288,
    type: "DES_32",
  },
  {
    x: 544,
    y: 256,
    type: "DES_32",
  },
  {
    x: 544,
    y: 224,
    type: "DES_32",
  },
  {
    x: 544,
    y: 160,
    type: "DES_32",
  },
  {
    x: 512,
    y: 384,
    type: "DES_32",
  },
  {
    x: 512,
    y: 352,
    type: "DES_32",
  },
  {
    x: 512,
    y: 288,
    type: "DES_32",
  },
  {
    x: 512,
    y: 256,
    type: "DES_32",
  },
  {
    x: 512,
    y: 160,
    type: "DES_32",
  },
  {
    x: 512,
    y: 128,
    type: "DES_32",
  },
  {
    x: 480,
    y: 96,
    type: "DES_32",
  },
  {
    x: 480,
    y: 128,
    type: "DES_32",
  },
  {
    x: 480,
    y: 160,
    type: "DES_32",
  },
  {
    x: 480,
    y: 192,
    type: "DES_32",
  },
  {
    x: 480,
    y: 224,
    type: "DES_32",
  },
  {
    x: 480,
    y: 256,
    type: "DES_32",
  },
  {
    x: 480,
    y: 288,
    type: "DES_32",
  },
  {
    x: 448,
    y: 352,
    type: "DES_32",
  },
  {
    x: 448,
    y: 320,
    type: "DES_32",
  },
  {
    x: 448,
    y: 288,
    type: "DES_32",
  },
  {
    x: 448,
    y: 256,
    type: "DES_32",
  },
  {
    x: 448,
    y: 224,
    type: "DES_32",
  },
  {
    x: 448,
    y: 192,
    type: "DES_32",
  },
  {
    x: 448,
    y: 160,
    type: "DES_32",
  },
  {
    x: 448,
    y: 128,
    type: "DES_32",
  },
  {
    x: 448,
    y: 96,
    type: "DES_32",
  },
  {
    x: 416,
    y: 64,
    type: "DES_32",
  },
  {
    x: 416,
    y: 32,
    type: "DES_32",
  },
  {
    x: 416,
    y: 0,
    type: "DES_32",
  },
  {
    x: 384,
    y: 0,
    type: "DES_32",
  },
  {
    x: 352,
    y: 0,
    type: "DES_32",
  },
  {
    x: 352,
    y: 32,
    type: "DES_32",
  },
  {
    x: 352,
    y: 64,
    type: "DES_32",
  },
  {
    x: 384,
    y: 64,
    type: "DES_32",
  },
  {
    x: 384,
    y: 32,
    type: "DES_32",
  },
  {
    x: 416,
    y: 96,
    type: "DES_32",
  },
  {
    x: 416,
    y: 160,
    type: "DES_32",
  },
  {
    x: 416,
    y: 192,
    type: "DES_32",
  },
  {
    x: 416,
    y: 224,
    type: "DES_32",
  },
  {
    x: 416,
    y: 256,
    type: "DES_32",
  },
  {
    x: 416,
    y: 288,
    type: "DES_32",
  },
  {
    x: 384,
    y: 288,
    type: "DES_32",
  },
  {
    x: 384,
    y: 224,
    type: "DES_32",
  },
  {
    x: 384,
    y: 192,
    type: "DES_32",
  },
  {
    x: 384,
    y: 160,
    type: "DES_32",
  },
  {
    x: 384,
    y: 128,
    type: "DES_32",
  },
  {
    x: 384,
    y: 96,
    type: "DES_32",
  },
  {
    x: 352,
    y: 96,
    type: "DES_32",
  },
  {
    x: 352,
    y: 128,
    type: "DES_32",
  },
  {
    x: 352,
    y: 160,
    type: "DES_32",
  },
  {
    x: 352,
    y: 224,
    type: "DES_32",
  },
  {
    x: 352,
    y: 256,
    type: "DES_32",
  },
  {
    x: 352,
    y: 288,
    type: "DES_32",
  },
  {
    x: 320,
    y: 384,
    type: "DES_32",
  },
  {
    x: 320,
    y: 352,
    type: "DES_32",
  },
  {
    x: 320,
    y: 320,
    type: "DES_32",
  },
  {
    x: 320,
    y: 288,
    type: "DES_32",
  },
  {
    x: 320,
    y: 256,
    type: "DES_32",
  },
  {
    x: 320,
    y: 224,
    type: "DES_32",
  },
  {
    x: 320,
    y: 192,
    type: "DES_32",
  },
  {
    x: 320,
    y: 160,
    type: "DES_32",
  },
  {
    x: 320,
    y: 96,
    type: "DES_32",
  },
  {
    x: 288,
    y: 96,
    type: "DES_32",
  },
  {
    x: 288,
    y: 128,
    type: "DES_32",
  },
  {
    x: 288,
    y: 160,
    type: "DES_32",
  },
  {
    x: 288,
    y: 192,
    type: "DES_32",
  },
  {
    x: 288,
    y: 224,
    type: "DES_32",
  },
  {
    x: 288,
    y: 256,
    type: "DES_32",
  },
  {
    x: 288,
    y: 288,
    type: "DES_32",
  },
  {
    x: 288,
    y: 320,
    type: "DES_32",
  },
  {
    x: 288,
    y: 352,
    type: "DES_32",
  },
  {
    x: 288,
    y: 384,
    type: "DES_32",
  },
  {
    x: 288,
    y: 416,
    type: "DES_32",
  },
  {
    x: 256,
    y: 416,
    type: "DES_32",
  },
  {
    x: 256,
    y: 384,
    type: "DES_32",
  },
  {
    x: 256,
    y: 224,
    type: "DES_32",
  },
  {
    x: 256,
    y: 192,
    type: "DES_32",
  },
  {
    x: 256,
    y: 160,
    type: "DES_32",
  },
  {
    x: 256,
    y: 128,
    type: "DES_32",
  },
  {
    x: 224,
    y: 384,
    type: "DES_32",
  },
  {
    x: 160,
    y: 416,
    type: "DES_32",
  },
  {
    x: 96,
    y: 416,
    type: "DES_32",
  },
  {
    x: 64,
    y: 416,
    type: "DES_32",
  },
  {
    x: 64,
    y: 384,
    type: "DES_32",
  },
  {
    x: 96,
    y: 384,
    type: "DES_32",
  },
  {
    x: 128,
    y: 384,
    type: "DES_32",
  },
  {
    x: 160,
    y: 384,
    type: "DES_32",
  },
  {
    x: 96,
    y: 352,
    type: "DES_32",
  },
  {
    x: 96,
    y: 320,
    type: "DES_32",
  },
  {
    x: 96,
    y: 288,
    type: "DES_32",
  },
  {
    x: 96,
    y: 256,
    type: "DES_32",
  },
  {
    x: 96,
    y: 224,
    type: "DES_32",
  },
  {
    x: 160,
    y: 192,
    type: "DES_32",
  },
  {
    x: 160,
    y: 224,
    type: "DES_32",
  },
  {
    x: 128,
    y: 224,
    type: "DES_32",
  },
  {
    x: 32,
    y: 128,
    type: "DES_32",
  },
  {
    x: 64,
    y: 192,
    type: "DES_32",
  },
  {
    x: 64,
    y: 128,
    type: "DES_32",
  },
  {
    x: 64,
    y: 160,
    type: "DES_32",
  },
  {
    x: 32,
    y: 160,
    type: "DES_32",
  },
  {
    x: 32,
    y: 224,
    type: "DES_32",
  },
  {
    x: 64,
    y: 224,
    type: "DES_32",
  },
  {
    x: 64,
    y: 256,
    type: "DES_32",
  },
  {
    x: 32,
    y: 256,
    type: "DES_32",
  },
  {
    x: 32,
    y: 288,
    type: "DES_32",
  },
  {
    x: 64,
    y: 288,
    type: "DES_32",
  },
  {
    x: 64,
    y: 320,
    type: "DES_32",
  },
  {
    x: 64,
    y: 352,
    type: "DES_32",
  },
  {
    x: 608,
    y: 32,
    type: "DES_39",
  },
  {
    x: 640,
    y: 32,
    type: "DES_39",
  },
  {
    x: 672,
    y: 32,
    type: "DES_39",
  },
  {
    x: 704,
    y: 32,
    type: "DES_39",
  },
  {
    x: 576,
    y: 32,
    type: "DES_39",
  },
  {
    x: 576,
    y: 64,
    type: "DES_41",
  },
  {
    x: 608,
    y: 64,
    type: "DES_43",
  },
  {
    x: 576,
    y: 96,
    type: "DES_50",
  },
  {
    x: 608,
    y: 96,
    type: "DES_52",
  },
  {
    x: 640,
    y: 64,
    type: "DES_40",
  },
  {
    x: 640,
    y: 96,
    type: "DES_49",
  },
  {
    x: 672,
    y: 64,
    type: "DES_41",
  },
  {
    x: 704,
    y: 64,
    type: "DES_43",
  },
  {
    x: 672,
    y: 96,
    type: "DES_50",
  },
  {
    x: 704,
    y: 96,
    type: "DES_52",
  },
  {
    x: 736,
    y: 64,
    type: "DES_17",
  },
  {
    x: 736,
    y: 32,
    type: "DES_24",
  },
  {
    x: 736,
    y: 96,
    type: "DES_35",
  },
  {
    x: 640,
    y: 128,
    type: "DES_27",
  },
  {
    x: 640,
    y: 192,
    type: "DES_27",
  },
  {
    x: 640,
    y: 160,
    type: "DES_27",
  },
  {
    x: 608,
    y: 160,
    type: "DES_27",
  },
  {
    x: 672,
    y: 192,
    type: "DES_27",
  },
  {
    x: 544,
    y: 192,
    type: "DES_27",
  },
  {
    x: 512,
    y: 224,
    type: "DES_27",
  },
  {
    x: 576,
    y: 160,
    type: "DES_38",
  },
  {
    x: 576,
    y: 192,
    type: "DES_38",
  },
  {
    x: 736,
    y: 128,
    type: "DES_38",
  },
  {
    x: 544,
    y: 64,
    type: "DES_38",
  },
  {
    x: 512,
    y: 96,
    type: "DES_36",
  },
  {
    x: 704,
    y: 192,
    type: "DES_36",
  },
  {
    x: 544,
    y: 96,
    type: "DES_33",
  },
  {
    x: 736,
    y: 160,
    type: "DES_33",
  },
  {
    x: 672,
    y: 128,
    type: "DES_33",
  },
  {
    x: 192,
    y: 192,
    type: "DES_25",
  },
  {
    x: 192,
    y: 224,
    type: "DES_34",
  },
  {
    x: 224,
    y: 192,
    type: "DES_31",
  },
  {
    x: 224,
    y: 160,
    type: "DES_22",
  },
  {
    x: 64,
    y: 512,
    type: "DES_45",
  },
  {
    x: 224,
    y: 224,
    type: "DES_38",
  },
  {
    x: 128,
    y: 32,
    type: "DES_23",
  },
  {
    x: 128,
    y: 64,
    type: "DES_23",
  },
  {
    x: 608,
    y: 128,
    type: "DES_23",
  },
  {
    x: 576,
    y: 128,
    type: "DES_23",
  },
  {
    x: 32,
    y: 480,
    type: "DES_23",
  },
  {
    x: 64,
    y: 480,
    type: "DES_23",
  },
  {
    x: 96,
    y: 480,
    type: "DES_23",
  },
  {
    x: 96,
    y: 512,
    type: "DES_23",
  },
  {
    x: 416,
    y: 416,
    type: "DES_23",
  },
  {
    x: 416,
    y: 448,
    type: "DES_23",
  },
  {
    x: 480,
    y: 384,
    type: "DES_2",
  },
  {
    x: 480,
    y: 480,
    type: "DES_11",
  },
  {
    x: 480,
    y: 416,
    type: "DES_3",
  },
  {
    x: 480,
    y: 448,
    type: "DES_3",
  },
  {
    x: 416,
    y: 384,
    type: "DES_12",
  },
  {
    x: 448,
    y: 384,
    type: "DES_12",
  },
  {
    x: 384,
    y: 480,
    type: "DES_46",
  },
  {
    x: 416,
    y: 480,
    type: "DES_46",
  },
  {
    x: 448,
    y: 480,
    type: "DES_46",
  },
  {
    x: 448,
    y: 416,
    type: "DES_18",
  },
  {
    x: 384,
    y: 448,
    type: "DES_47",
  },
  {
    x: 704,
    y: 384,
    type: "DES_36",
  },
  {
    x: 384,
    y: 256,
    type: "DES_36",
  },
  {
    x: 96,
    y: 192,
    type: "DES_45",
  },
  {
    x: 352,
    y: 192,
    type: "DES_45",
  },
  {
    x: 416,
    y: 128,
    type: "DES_45",
  },
  {
    x: 640,
    y: 416,
    type: "DES_45",
  },
  {
    x: 288,
    y: 512,
    type: "DES_45",
  },
  {
    x: 416,
    y: 512,
    type: "DES_45",
  },
  {
    x: 32,
    y: 192,
    type: "DES_38",
  },
  {
    x: 736,
    y: 480,
    type: "DES_38",
  },
  {
    x: 736,
    y: 448,
    type: "DES_38",
  },
  {
    x: 544,
    y: 128,
    type: "DES_47",
  },
  {
    x: 224,
    y: 128,
    type: "DES_47",
  },
  {
    x: 32,
    y: 64,
    type: "DES_47",
  },
  {
    x: 64,
    y: 64,
    type: "DES_33",
  },
  {
    x: 256,
    y: 96,
    type: "DES_33",
  },
  {
    x: 320,
    y: 128,
    type: "DES_33",
  },
  {
    x: 448,
    y: 448,
    type: "DES_33",
  },
  {
    x: 512,
    y: 512,
    type: "DES_33",
  },
  {
    x: 576,
    y: 384,
    type: "DES_33",
  },
  {
    x: 672,
    y: 256,
    type: "DES_33",
  },
  {
    x: 512,
    y: 192,
    type: "DES_33",
  },
  {
    x: 128,
    y: 480,
    type: "DES_33",
  },
  {
    x: 768,
    y: 288,
    type: "DES_11",
  },
  {
    x: 736,
    y: 288,
    type: "DES_46",
  },
  {
    x: 704,
    y: 288,
    type: "DES_46",
  },
  {
    x: 672,
    y: 288,
    type: "DES_19",
  },
  {
    x: 384,
    y: 512,
    type: "DES_24",
  },
  {
    x: 736,
    y: 384,
    type: "DES_24",
  },
  {
    x: 736,
    y: 256,
    type: "DES_24",
  },
  {
    x: 128,
    y: 192,
    type: "DES_24",
  },
  {
    x: 96,
    y: 64,
    type: "DES_24",
  },
  {
    x: 128,
    y: 512,
    type: "DES_24",
  },
  {
    x: 384,
    y: 416,
    type: "DES_38",
  },
  {
    x: 512,
    y: 448,
    type: "DES_26",
  },
  {
    x: 512,
    y: 480,
    type: "DES_35",
  },
  {
    x: 480,
    y: 352,
    type: "DES_35",
  },
  {
    x: 480,
    y: 320,
    type: "DES_26",
  },
  {
    x: 512,
    y: 416,
    type: "DES_33",
  },
  {
    x: 256,
    y: 448,
    type: "DES_33",
  },
  {
    x: 256,
    y: 512,
    type: "DES_35",
  },
  {
    x: 256,
    y: 480,
    type: "DES_26",
  },
  {
    x: 128,
    y: 416,
    type: "DES_26",
  },
  {
    x: 128,
    y: 448,
    type: "DES_35",
  },
  {
    x: 608,
    y: 544,
    type: "DES_8",
  },
  {
    x: 576,
    y: 544,
    type: "DES_11",
  },
  {
    x: 640,
    y: 544,
    type: "DES_10",
  },
  {
    x: 640,
    y: 512,
    type: "DES_20",
  },
  {
    x: 576,
    y: 512,
    type: "DES_19",
  },
  {
    x: 608,
    y: 512,
    type: "DES_46",
  },
  {
    x: 128,
    y: 320,
    type: "DES_41",
  },
  {
    x: 128,
    y: 288,
    type: "DES_39",
  },
  {
    x: 160,
    y: 288,
    type: "DES_39",
  },
  {
    x: 192,
    y: 288,
    type: "DES_39",
  },
  {
    x: 768,
    y: 352,
    type: "DES_2",
  },
  {
    x: 736,
    y: 352,
    type: "DES_12",
  },
  {
    x: 704,
    y: 352,
    type: "DES_12",
  },
  {
    x: 672,
    y: 352,
    type: "DES_28",
  },
  {
    x: 672,
    y: 320,
    type: "DES_3",
  },
  {
    x: 736,
    y: 320,
    type: "DES_23",
  },
  {
    x: 768,
    y: 320,
    type: "DES_23",
  },
  {
    x: 704,
    y: 320,
    type: "DES_27",
  },
  {
    x: 160,
    y: 320,
    type: "DES_43",
  },
  {
    x: 192,
    y: 320,
    type: "DES_40",
  },
  {
    x: 192,
    y: 352,
    type: "DES_49",
  },
  {
    x: 128,
    y: 352,
    type: "DES_50",
  },
  {
    x: 160,
    y: 352,
    type: "DES_52",
  },
  {
    x: 256,
    y: 352,
    type: "DES_52",
  },
  {
    x: 224,
    y: 352,
    type: "DES_50",
  },
  {
    x: 224,
    y: 320,
    type: "DES_41",
  },
  {
    x: 256,
    y: 320,
    type: "DES_43",
  },
  {
    x: 224,
    y: 288,
    type: "DES_39",
  },
  {
    x: 256,
    y: 288,
    type: "DES_39",
  },
  {
    x: 256,
    y: 256,
    type: "DES_39",
  },
  {
    x: 224,
    y: 256,
    type: "DES_39",
  },
  {
    x: 192,
    y: 256,
    type: "DES_39",
  },
  {
    x: 160,
    y: 256,
    type: "DES_39",
  },
  {
    x: 128,
    y: 256,
    type: "DES_39",
  },
  {
    x: 160,
    y: 448,
    type: "DES_45",
  },
  {
    x: 160,
    y: 480,
    type: "DES_38",
  },
  {
    x: 192,
    y: 480,
    type: "DES_32",
  },
  {
    x: 192,
    y: 448,
    type: "DES_32",
  },
  {
    x: 224,
    y: 448,
    type: "DES_32",
  },
  {
    x: 192,
    y: 512,
    type: "DES_23",
  },
  {
    x: 224,
    y: 512,
    type: "DES_23",
  },
  {
    x: 224,
    y: 480,
    type: "DES_24",
  },
  {
    x: 160,
    y: 512,
    type: "DES_32",
  },
  {
    x: 352,
    y: 480,
    type: "DES_44",
  },
  {
    x: 352,
    y: 448,
    type: "DES_32",
  },
  {
    x: 320,
    y: 480,
    type: "DES_32",
  },
  {
    x: 320,
    y: 448,
    type: "DES_32",
  },
  {
    x: 352,
    y: 416,
    type: "DES_23",
  },
  {
    x: 128,
    y: 96,
    type: "DES_18",
  },
  {
    x: 512,
    y: 320,
    type: "DES_45",
  },
  {
    x: 352,
    y: 352,
    type: "DES_22",
  },
  {
    x: 352,
    y: 384,
    type: "DES_31",
  },
  {
    x: 320,
    y: 416,
    type: "DES_33",
  },
  {
    x: 352,
    y: 320,
    type: "DES_27",
  },
  {
    x: 192,
    y: 384,
    type: "DES_27",
  },
  {
    x: 224,
    y: 416,
    type: "DES_27",
  },
  {
    x: 192,
    y: 416,
    type: "DES_32",
  },
  {
    x: 384,
    y: 384,
    type: "DES_28",
  },
  {
    x: 384,
    y: 352,
    type: "DES_3",
  },
  {
    x: 416,
    y: 320,
    type: "DES_21",
  },
  {
    x: 384,
    y: 320,
    type: "DES_19",
  },
  {
    x: 416,
    y: 352,
    type: "DES_38",
  },
  {
    x: 576,
    y: 480,
    type: "DES_45",
  },
  {
    x: 448,
    y: 512,
    type: "DES_36",
  },
  {
    x: 480,
    y: 512,
    type: "DES_32",
  },
];

export const zoneData = {
    id: 'forest_south',
    name: 'Foret Sombre',
    bgColor: '#0f1f0f',
    mapData: { walls: [...interior] },
    enemies: { moblins: 4, octoroks: 1, creuses: 3 },
    connections: { north: 'village' },
    npcs: [
        {
            name: 'Voyageur du désert',
            x: 384, y: 96,
            sprite: 'PNJDESERT',
            spriteColumns: 2,
            spriteW: 92,
            spriteH: 105,
            spriteScale: 0.35,
            hitboxOffsetX: 8,
            z: 5,
            dialogues: [
                "Ce désert est infesté de moblins depuis que Maldrek a pris le pouvoir.",
                "Élimine-les tous et je te confierai le Fragment de Cristal que je protège.",
                "Sois prudent, ils rôdent derrière les dunes et se fondent dans les tempêtes de sable !"
            ],
            questDialogues: {
                questId: 'forest_moblins',
                active: [
                    "Continue ! Il reste encore des moblins dans ces terres arides.",
                    "Ne laisse pas la chaleur et les mirages tromper ta vigilance !"
                ],
                completed: [
                    "Bravo, héros ! Tu as purgé les sables de tous ces moblins !",
                    "Voici le Fragment de Cristal comme promis. Un de moins pour Maldrek !"
                ]
            }
        }
    ]
};
