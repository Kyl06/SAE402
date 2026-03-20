/**
 * @file village.js
 * @description Zone centrale - Village. Point de depart, zone safe.
 * Sorties : Nord (forteresse), Sud (foret), Est (ruines), Ouest (marais)
 */

const mapTiles =[
    {
      "x": 0,
      "y": 544,
      "type": "WALL_UP"
    },
    {
      "x": 32,
      "y": 544,
      "type": "WALL_UP"
    },
    {
      "x": 64,
      "y": 544,
      "type": "WALL_UP"
    },
    {
      "x": 96,
      "y": 544,
      "type": "WALL_UP"
    },
    {
      "x": 128,
      "y": 544,
      "type": "WALL_UP"
    },
    {
      "x": 160,
      "y": 544,
      "type": "WALL_UP"
    },
    {
      "x": 192,
      "y": 544,
      "type": "WALL_UP"
    },
    {
      "x": 224,
      "y": 544,
      "type": "WALL_UP"
    },
    {
      "x": 256,
      "y": 544,
      "type": "WALL_UP"
    },
    {
      "x": 288,
      "y": 544,
      "type": "WALL_UP"
    },
    {
      "x": 448,
      "y": 544,
      "type": "WALL_UP"
    },
    {
      "x": 480,
      "y": 544,
      "type": "WALL_UP"
    },
    {
      "x": 512,
      "y": 544,
      "type": "WALL_UP"
    },
    {
      "x": 544,
      "y": 544,
      "type": "WALL_UP"
    },
    {
      "x": 576,
      "y": 544,
      "type": "WALL_UP"
    },
    {
      "x": 608,
      "y": 544,
      "type": "WALL_UP"
    },
    {
      "x": 640,
      "y": 544,
      "type": "WALL_UP"
    },
    {
      "x": 672,
      "y": 544,
      "type": "WALL_UP"
    },
    {
      "x": 704,
      "y": 544,
      "type": "WALL_UP"
    },
    {
      "x": 736,
      "y": 544,
      "type": "WALL_UP"
    },
    {
      "x": 768,
      "y": 544,
      "type": "WALL_UP"
    },
    {
      "x": 0,
      "y": 64,
      "type": "WALL_RIGHT"
    },
    {
      "x": 0,
      "y": 96,
      "type": "WALL_RIGHT"
    },
    {
      "x": 0,
      "y": 128,
      "type": "WALL_RIGHT"
    },
    {
      "x": 0,
      "y": 160,
      "type": "WALL_RIGHT"
    },
    {
      "x": 0,
      "y": 192,
      "type": "WALL_RIGHT"
    },
    {
      "x": 0,
      "y": 352,
      "type": "WALL_RIGHT"
    },
    {
      "x": 0,
      "y": 384,
      "type": "WALL_RIGHT"
    },
    {
      "x": 0,
      "y": 416,
      "type": "WALL_RIGHT"
    },
    {
      "x": 0,
      "y": 448,
      "type": "WALL_RIGHT"
    },
    {
      "x": 0,
      "y": 480,
      "type": "WALL_RIGHT"
    },
    {
      "x": 0,
      "y": 512,
      "type": "WALL_RIGHT"
    },
    {
      "x": 768,
      "y": 64,
      "type": "WALL_LEFT"
    },
    {
      "x": 768,
      "y": 96,
      "type": "WALL_LEFT"
    },
    {
      "x": 768,
      "y": 128,
      "type": "WALL_LEFT"
    },
    {
      "x": 768,
      "y": 160,
      "type": "WALL_LEFT"
    },
    {
      "x": 768,
      "y": 192,
      "type": "WALL_LEFT"
    },
    {
      "x": 768,
      "y": 352,
      "type": "WALL_LEFT"
    },
    {
      "x": 768,
      "y": 384,
      "type": "WALL_LEFT"
    },
    {
      "x": 768,
      "y": 416,
      "type": "WALL_LEFT"
    },
    {
      "x": 768,
      "y": 448,
      "type": "WALL_LEFT"
    },
    {
      "x": 768,
      "y": 480,
      "type": "WALL_LEFT"
    },
    {
      "x": 768,
      "y": 512,
      "type": "WALL_LEFT"
    },
    {
      "x": 320,
      "y": 32,
      "type": "HERBESOL"
    },
    {
      "x": 352,
      "y": 32,
      "type": "HERBESOL"
    },
    {
      "x": 384,
      "y": 32,
      "type": "HERBESOL"
    },
    {
      "x": 416,
      "y": 32,
      "type": "HERBESOL"
    },
    {
      "x": 32,
      "y": 64,
      "type": "HERBESOL2"
    },
    {
      "x": 64,
      "y": 64,
      "type": "HERBESOL2"
    },
    {
      "x": 96,
      "y": 64,
      "type": "HERBESOL2"
    },
    {
      "x": 128,
      "y": 64,
      "type": "HERBESOL"
    },
    {
      "x": 160,
      "y": 64,
      "type": "HERBESOL"
    },
    {
      "x": 192,
      "y": 64,
      "type": "HERBESOL"
    },
    {
      "x": 224,
      "y": 64,
      "type": "HERBESOL"
    },
    {
      "x": 256,
      "y": 64,
      "type": "HERBESOL"
    },
    {
      "x": 288,
      "y": 64,
      "type": "HERBESOL"
    },
    {
      "x": 320,
      "y": 64,
      "type": "HERBESOL"
    },
    {
      "x": 384,
      "y": 64,
      "type": "HERBESOL"
    },
    {
      "x": 448,
      "y": 64,
      "type": "HERBESOL"
    },
    {
      "x": 544,
      "y": 64,
      "type": "HERBESOL2"
    },
    {
      "x": 576,
      "y": 64,
      "type": "HERBESOL2"
    },
    {
      "x": 608,
      "y": 64,
      "type": "HERBESOL"
    },
    {
      "x": 640,
      "y": 64,
      "type": "HERBESOL"
    },
    {
      "x": 672,
      "y": 64,
      "type": "HERBESOL"
    },
    {
      "x": 704,
      "y": 64,
      "type": "HERBESOL"
    },
    {
      "x": 736,
      "y": 64,
      "type": "HERBESOL2"
    },
    {
      "x": 32,
      "y": 96,
      "type": "HERBESOL2"
    },
    {
      "x": 64,
      "y": 96,
      "type": "HERBESOL2"
    },
    {
      "x": 96,
      "y": 96,
      "type": "HERBESOL"
    },
    {
      "x": 128,
      "y": 96,
      "type": "HERBESOL"
    },
    {
      "x": 160,
      "y": 96,
      "type": "HERBESOL"
    },
    {
      "x": 192,
      "y": 96,
      "type": "HERBESOL"
    },
    {
      "x": 224,
      "y": 96,
      "type": "HERBESOL"
    },
    {
      "x": 256,
      "y": 96,
      "type": "HERBESOL"
    },
    {
      "x": 288,
      "y": 96,
      "type": "HERBESOL"
    },
    {
      "x": 320,
      "y": 96,
      "type": "HERBESOL"
    },
    {
      "x": 384,
      "y": 96,
      "type": "HERBESOL"
    },
    {
      "x": 448,
      "y": 96,
      "type": "HERBESOL2"
    },
    {
      "x": 576,
      "y": 96,
      "type": "HERBESOL2"
    },
    {
      "x": 608,
      "y": 96,
      "type": "HERBESOL"
    },
    {
      "x": 640,
      "y": 96,
      "type": "HERBESOL"
    },
    {
      "x": 672,
      "y": 96,
      "type": "HERBESOL"
    },
    {
      "x": 704,
      "y": 96,
      "type": "HERBESOL"
    },
    {
      "x": 736,
      "y": 96,
      "type": "HERBESOL2"
    },
    {
      "x": 32,
      "y": 128,
      "type": "HERBESOL2"
    },
    {
      "x": 160,
      "y": 128,
      "type": "HERBESOL"
    },
    {
      "x": 192,
      "y": 128,
      "type": "HERBESOL"
    },
    {
      "x": 224,
      "y": 128,
      "type": "HERBESOL"
    },
    {
      "x": 256,
      "y": 128,
      "type": "HERBESOL"
    },
    {
      "x": 288,
      "y": 128,
      "type": "HERBESOL2"
    },
    {
      "x": 320,
      "y": 128,
      "type": "HERBESOL2"
    },
    {
      "x": 384,
      "y": 128,
      "type": "HERBESOL"
    },
    {
      "x": 448,
      "y": 128,
      "type": "HERBESOL2"
    },
    {
      "x": 544,
      "y": 128,
      "type": "HERBESOL2"
    },
    {
      "x": 576,
      "y": 128,
      "type": "HERBESOL"
    },
    {
      "x": 608,
      "y": 128,
      "type": "HERBESOL"
    },
    {
      "x": 640,
      "y": 128,
      "type": "HERBESOL"
    },
    {
      "x": 672,
      "y": 128,
      "type": "HERBESOL"
    },
    {
      "x": 704,
      "y": 128,
      "type": "HERBESOL2"
    },
    {
      "x": 736,
      "y": 128,
      "type": "HERBESOL2"
    },
    {
      "x": 192,
      "y": 160,
      "type": "HERBESOL"
    },
    {
      "x": 288,
      "y": 160,
      "type": "HERBESOL2"
    },
    {
      "x": 320,
      "y": 160,
      "type": "HERBESOL2"
    },
    {
      "x": 384,
      "y": 160,
      "type": "HERBESOL2"
    },
    {
      "x": 448,
      "y": 160,
      "type": "HERBESOL2"
    },
    {
      "x": 544,
      "y": 160,
      "type": "HERBESOL2"
    },
    {
      "x": 576,
      "y": 160,
      "type": "HERBESOL"
    },
    {
      "x": 608,
      "y": 160,
      "type": "HERBESOL"
    },
    {
      "x": 640,
      "y": 160,
      "type": "HERBESOL"
    },
    {
      "x": 672,
      "y": 160,
      "type": "HERBESOL"
    },
    {
      "x": 704,
      "y": 160,
      "type": "HERBESOL2"
    },
    {
      "x": 736,
      "y": 160,
      "type": "HERBESOL2"
    },
    {
      "x": 192,
      "y": 192,
      "type": "HERBESOL"
    },
    {
      "x": 224,
      "y": 192,
      "type": "HERBESOL2"
    },
    {
      "x": 256,
      "y": 192,
      "type": "HERBESOL2"
    },
    {
      "x": 288,
      "y": 192,
      "type": "HERBESOL2"
    },
    {
      "x": 320,
      "y": 192,
      "type": "HERBESOL2"
    },
    {
      "x": 384,
      "y": 192,
      "type": "HERBESOL2"
    },
    {
      "x": 448,
      "y": 192,
      "type": "HERBESOL2"
    },
    {
      "x": 544,
      "y": 192,
      "type": "HERBESOL"
    },
    {
      "x": 608,
      "y": 192,
      "type": "HERBESOL"
    },
    {
      "x": 640,
      "y": 192,
      "type": "HERBESOL"
    },
    {
      "x": 672,
      "y": 192,
      "type": "HERBESOL"
    },
    {
      "x": 704,
      "y": 192,
      "type": "HERBESOL2"
    },
    {
      "x": 736,
      "y": 192,
      "type": "HERBESOL2"
    },
    {
      "x": 256,
      "y": 224,
      "type": "HERBESOL2"
    },
    {
      "x": 288,
      "y": 224,
      "type": "HERBESOL2"
    },
    {
      "x": 320,
      "y": 224,
      "type": "HERBESOL2"
    },
    {
      "x": 384,
      "y": 224,
      "type": "HERBESOL"
    },
    {
      "x": 448,
      "y": 224,
      "type": "HERBESOL"
    },
    {
      "x": 544,
      "y": 224,
      "type": "HERBESOL"
    },
    {
      "x": 608,
      "y": 224,
      "type": "HERBESOL"
    },
    {
      "x": 640,
      "y": 224,
      "type": "HERBESOL"
    },
    {
      "x": 672,
      "y": 224,
      "type": "HERBESOL"
    },
    {
      "x": 704,
      "y": 224,
      "type": "HERBESOL2"
    },
    {
      "x": 736,
      "y": 224,
      "type": "HERBESOL2"
    },
    {
      "x": 192,
      "y": 256,
      "type": "HERBESOL2"
    },
    {
      "x": 224,
      "y": 256,
      "type": "HERBESOL2"
    },
    {
      "x": 256,
      "y": 256,
      "type": "HERBESOL2"
    },
    {
      "x": 288,
      "y": 256,
      "type": "HERBESOL2"
    },
    {
      "x": 320,
      "y": 256,
      "type": "HERBESOL2"
    },
    {
      "x": 384,
      "y": 256,
      "type": "HERBESOL"
    },
    {
      "x": 416,
      "y": 256,
      "type": "HERBESOL"
    },
    {
      "x": 448,
      "y": 256,
      "type": "HERBESOL"
    },
    {
      "x": 544,
      "y": 256,
      "type": "HERBESOL"
    },
    {
      "x": 576,
      "y": 256,
      "type": "HERBESOL"
    },
    {
      "x": 608,
      "y": 256,
      "type": "HERBESOL"
    },
    {
      "x": 640,
      "y": 256,
      "type": "HERBESOL"
    },
    {
      "x": 224,
      "y": 288,
      "type": "HERBESOL2"
    },
    {
      "x": 256,
      "y": 288,
      "type": "HERBESOL2"
    },
    {
      "x": 288,
      "y": 288,
      "type": "HERBESOL2"
    },
    {
      "x": 320,
      "y": 288,
      "type": "HERBESOL"
    },
    {
      "x": 384,
      "y": 288,
      "type": "HERBESOL"
    },
    {
      "x": 416,
      "y": 288,
      "type": "HERBESOL"
    },
    {
      "x": 448,
      "y": 288,
      "type": "HERBESOL"
    },
    {
      "x": 544,
      "y": 288,
      "type": "HERBESOL"
    },
    {
      "x": 576,
      "y": 288,
      "type": "HERBESOL"
    },
    {
      "x": 608,
      "y": 288,
      "type": "HERBESOL"
    },
    {
      "x": 640,
      "y": 288,
      "type": "HERBESOL2"
    },
    {
      "x": 32,
      "y": 320,
      "type": "HERBESOL"
    },
    {
      "x": 64,
      "y": 320,
      "type": "HERBESOL"
    },
    {
      "x": 96,
      "y": 320,
      "type": "HERBESOL2"
    },
    {
      "x": 128,
      "y": 320,
      "type": "HERBESOL2"
    },
    {
      "x": 160,
      "y": 320,
      "type": "HERBESOL2"
    },
    {
      "x": 192,
      "y": 320,
      "type": "HERBESOL2"
    },
    {
      "x": 288,
      "y": 320,
      "type": "HERBESOL"
    },
    {
      "x": 384,
      "y": 320,
      "type": "HERBESOL"
    },
    {
      "x": 448,
      "y": 320,
      "type": "HERBESOL"
    },
    {
      "x": 576,
      "y": 320,
      "type": "HERBESOL"
    },
    {
      "x": 608,
      "y": 320,
      "type": "HERBESOL2"
    },
    {
      "x": 672,
      "y": 320,
      "type": "HERBESOL2"
    },
    {
      "x": 704,
      "y": 320,
      "type": "HERBESOL2"
    },
    {
      "x": 736,
      "y": 320,
      "type": "HERBESOL2"
    },
    {
      "x": 32,
      "y": 352,
      "type": "HERBESOL"
    },
    {
      "x": 64,
      "y": 352,
      "type": "HERBESOL"
    },
    {
      "x": 96,
      "y": 352,
      "type": "HERBESOL2"
    },
    {
      "x": 128,
      "y": 352,
      "type": "HERBESOL2"
    },
    {
      "x": 160,
      "y": 352,
      "type": "HERBESOL2"
    },
    {
      "x": 192,
      "y": 352,
      "type": "HERBESOL2"
    },
    {
      "x": 256,
      "y": 352,
      "type": "HERBESOL"
    },
    {
      "x": 288,
      "y": 352,
      "type": "HERBESOL"
    },
    {
      "x": 320,
      "y": 352,
      "type": "HERBESOL"
    },
    {
      "x": 384,
      "y": 352,
      "type": "HERBESOL"
    },
    {
      "x": 448,
      "y": 352,
      "type": "HERBESOL"
    },
    {
      "x": 544,
      "y": 352,
      "type": "HERBESOL"
    },
    {
      "x": 576,
      "y": 352,
      "type": "HERBESOL2"
    },
    {
      "x": 608,
      "y": 352,
      "type": "HERBESOL2"
    },
    {
      "x": 672,
      "y": 352,
      "type": "HERBESOL2"
    },
    {
      "x": 704,
      "y": 352,
      "type": "HERBESOL2"
    },
    {
      "x": 736,
      "y": 352,
      "type": "HERBESOL"
    },
    {
      "x": 32,
      "y": 384,
      "type": "HERBESOL"
    },
    {
      "x": 64,
      "y": 384,
      "type": "HERBESOL"
    },
    {
      "x": 96,
      "y": 384,
      "type": "HERBESOL2"
    },
    {
      "x": 128,
      "y": 384,
      "type": "HERBESOL2"
    },
    {
      "x": 160,
      "y": 384,
      "type": "HERBESOL2"
    },
    {
      "x": 192,
      "y": 384,
      "type": "HERBESOL2"
    },
    {
      "x": 256,
      "y": 384,
      "type": "HERBESOL"
    },
    {
      "x": 288,
      "y": 384,
      "type": "HERBESOL"
    },
    {
      "x": 320,
      "y": 384,
      "type": "HERBESOL"
    },
    {
      "x": 384,
      "y": 384,
      "type": "HERBESOL"
    },
    {
      "x": 448,
      "y": 384,
      "type": "HERBESOL2"
    },
    {
      "x": 544,
      "y": 384,
      "type": "HERBESOL2"
    },
    {
      "x": 576,
      "y": 384,
      "type": "HERBESOL2"
    },
    {
      "x": 608,
      "y": 384,
      "type": "HERBESOL2"
    },
    {
      "x": 672,
      "y": 384,
      "type": "HERBESOL2"
    },
    {
      "x": 704,
      "y": 384,
      "type": "HERBESOL2"
    },
    {
      "x": 736,
      "y": 384,
      "type": "HERBESOL"
    },
    {
      "x": 32,
      "y": 416,
      "type": "HERBESOL"
    },
    {
      "x": 64,
      "y": 416,
      "type": "HERBESOL"
    },
    {
      "x": 96,
      "y": 416,
      "type": "HERBESOL2"
    },
    {
      "x": 128,
      "y": 416,
      "type": "HERBESOL2"
    },
    {
      "x": 160,
      "y": 416,
      "type": "HERBESOL2"
    },
    {
      "x": 192,
      "y": 416,
      "type": "HERBESOL"
    },
    {
      "x": 384,
      "y": 416,
      "type": "HERBESOL2"
    },
    {
      "x": 448,
      "y": 416,
      "type": "HERBESOL2"
    },
    {
      "x": 672,
      "y": 416,
      "type": "HERBESOL2"
    },
    {
      "x": 704,
      "y": 416,
      "type": "HERBESOL"
    },
    {
      "x": 736,
      "y": 416,
      "type": "HERBESOL"
    },
    {
      "x": 32,
      "y": 448,
      "type": "HERBESOL"
    },
    {
      "x": 64,
      "y": 448,
      "type": "HERBESOL"
    },
    {
      "x": 96,
      "y": 448,
      "type": "HERBESOL"
    },
    {
      "x": 128,
      "y": 448,
      "type": "HERBESOL2"
    },
    {
      "x": 160,
      "y": 448,
      "type": "HERBESOL"
    },
    {
      "x": 192,
      "y": 448,
      "type": "HERBESOL"
    },
    {
      "x": 224,
      "y": 448,
      "type": "HERBESOL"
    },
    {
      "x": 256,
      "y": 448,
      "type": "HERBESOL"
    },
    {
      "x": 288,
      "y": 448,
      "type": "HERBESOL"
    },
    {
      "x": 320,
      "y": 448,
      "type": "HERBESOL"
    },
    {
      "x": 384,
      "y": 448,
      "type": "HERBESOL2"
    },
    {
      "x": 448,
      "y": 448,
      "type": "HERBESOL2"
    },
    {
      "x": 544,
      "y": 448,
      "type": "HERBESOL"
    },
    {
      "x": 576,
      "y": 448,
      "type": "HERBESOL"
    },
    {
      "x": 608,
      "y": 448,
      "type": "HERBESOL"
    },
    {
      "x": 640,
      "y": 448,
      "type": "HERBESOL"
    },
    {
      "x": 672,
      "y": 448,
      "type": "HERBESOL"
    },
    {
      "x": 704,
      "y": 448,
      "type": "HERBESOL"
    },
    {
      "x": 736,
      "y": 448,
      "type": "HERBESOL"
    },
    {
      "x": 32,
      "y": 480,
      "type": "HERBESOL"
    },
    {
      "x": 64,
      "y": 480,
      "type": "HERBESOL"
    },
    {
      "x": 96,
      "y": 480,
      "type": "HERBESOL"
    },
    {
      "x": 128,
      "y": 480,
      "type": "HERBESOL"
    },
    {
      "x": 160,
      "y": 480,
      "type": "HERBESOL"
    },
    {
      "x": 192,
      "y": 480,
      "type": "HERBESOL"
    },
    {
      "x": 224,
      "y": 480,
      "type": "HERBESOL"
    },
    {
      "x": 256,
      "y": 480,
      "type": "HERBESOL"
    },
    {
      "x": 288,
      "y": 480,
      "type": "HERBESOL"
    },
    {
      "x": 320,
      "y": 480,
      "type": "HERBESOL2"
    },
    {
      "x": 384,
      "y": 480,
      "type": "HERBESOL2"
    },
    {
      "x": 448,
      "y": 480,
      "type": "HERBESOL2"
    },
    {
      "x": 544,
      "y": 480,
      "type": "HERBESOL"
    },
    {
      "x": 576,
      "y": 480,
      "type": "HERBESOL"
    },
    {
      "x": 608,
      "y": 480,
      "type": "HERBESOL"
    },
    {
      "x": 640,
      "y": 480,
      "type": "HERBESOL"
    },
    {
      "x": 672,
      "y": 480,
      "type": "HERBESOL"
    },
    {
      "x": 704,
      "y": 480,
      "type": "HERBESOL"
    },
    {
      "x": 736,
      "y": 480,
      "type": "HERBESOL"
    },
    {
      "x": 32,
      "y": 512,
      "type": "HERBESOL"
    },
    {
      "x": 64,
      "y": 512,
      "type": "HERBESOL"
    },
    {
      "x": 96,
      "y": 512,
      "type": "HERBESOL"
    },
    {
      "x": 128,
      "y": 512,
      "type": "HERBESOL"
    },
    {
      "x": 160,
      "y": 512,
      "type": "HERBESOL"
    },
    {
      "x": 192,
      "y": 512,
      "type": "HERBESOL"
    },
    {
      "x": 224,
      "y": 512,
      "type": "HERBESOL"
    },
    {
      "x": 256,
      "y": 512,
      "type": "HERBESOL"
    },
    {
      "x": 288,
      "y": 512,
      "type": "HERBESOL2"
    },
    {
      "x": 320,
      "y": 512,
      "type": "HERBESOL2"
    },
    {
      "x": 416,
      "y": 512,
      "type": "HERBESOL2"
    },
    {
      "x": 448,
      "y": 512,
      "type": "HERBESOL2"
    },
    {
      "x": 544,
      "y": 512,
      "type": "HERBESOL"
    },
    {
      "x": 576,
      "y": 512,
      "type": "HERBESOL"
    },
    {
      "x": 608,
      "y": 512,
      "type": "HERBESOL"
    },
    {
      "x": 640,
      "y": 512,
      "type": "HERBESOL"
    },
    {
      "x": 672,
      "y": 512,
      "type": "HERBESOL"
    },
    {
      "x": 704,
      "y": 512,
      "type": "HERBESOL"
    },
    {
      "x": 736,
      "y": 512,
      "type": "HERBESOL"
    },
    {
      "x": 480,
      "y": 64,
      "type": "WATER"
    },
    {
      "x": 512,
      "y": 64,
      "type": "WATER"
    },
    {
      "x": 480,
      "y": 96,
      "type": "WATER"
    },
    {
      "x": 512,
      "y": 96,
      "type": "WATER"
    },
    {
      "x": 480,
      "y": 128,
      "type": "WATER"
    },
    {
      "x": 512,
      "y": 128,
      "type": "WATER"
    },
    {
      "x": 480,
      "y": 160,
      "type": "WATER"
    },
    {
      "x": 512,
      "y": 160,
      "type": "WATER"
    },
    {
      "x": 480,
      "y": 192,
      "type": "WATER"
    },
    {
      "x": 512,
      "y": 192,
      "type": "WATER"
    },
    {
      "x": 480,
      "y": 224,
      "type": "WATER"
    },
    {
      "x": 512,
      "y": 224,
      "type": "WATER"
    },
    {
      "x": 480,
      "y": 320,
      "type": "WATER"
    },
    {
      "x": 512,
      "y": 320,
      "type": "WATER"
    },
    {
      "x": 480,
      "y": 352,
      "type": "WATER"
    },
    {
      "x": 512,
      "y": 352,
      "type": "WATER"
    },
    {
      "x": 480,
      "y": 384,
      "type": "WATER"
    },
    {
      "x": 512,
      "y": 384,
      "type": "WATER"
    },
    {
      "x": 480,
      "y": 416,
      "type": "WATER"
    },
    {
      "x": 512,
      "y": 416,
      "type": "WATER"
    },
    {
      "x": 480,
      "y": 448,
      "type": "WATER"
    },
    {
      "x": 512,
      "y": 448,
      "type": "WATER"
    },
    {
      "x": 480,
      "y": 480,
      "type": "WATER"
    },
    {
      "x": 512,
      "y": 480,
      "type": "WATER"
    },
    {
      "x": 480,
      "y": 512,
      "type": "WATER"
    },
    {
      "x": 512,
      "y": 512,
      "type": "WATER"
    },
    {
      "x": 0,
      "y": 0,
      "type": "BRIQUE"
    },
    {
      "x": 32,
      "y": 0,
      "type": "BRIQUE"
    },
    {
      "x": 64,
      "y": 0,
      "type": "BRIQUE"
    },
    {
      "x": 96,
      "y": 0,
      "type": "BRIQUE"
    },
    {
      "x": 128,
      "y": 0,
      "type": "BRIQUE"
    },
    {
      "x": 160,
      "y": 0,
      "type": "BRIQUE"
    },
    {
      "x": 192,
      "y": 0,
      "type": "BRIQUE"
    },
    {
      "x": 224,
      "y": 0,
      "type": "BRIQUE"
    },
    {
      "x": 256,
      "y": 0,
      "type": "BRIQUE"
    },
    {
      "x": 288,
      "y": 0,
      "type": "BRIQUE"
    },
    {
      "x": 448,
      "y": 0,
      "type": "BRIQUE"
    },
    {
      "x": 480,
      "y": 0,
      "type": "BRIQUE"
    },
    {
      "x": 512,
      "y": 0,
      "type": "BRIQUE"
    },
    {
      "x": 544,
      "y": 0,
      "type": "BRIQUE"
    },
    {
      "x": 576,
      "y": 0,
      "type": "BRIQUE"
    },
    {
      "x": 608,
      "y": 0,
      "type": "BRIQUE"
    },
    {
      "x": 640,
      "y": 0,
      "type": "BRIQUE"
    },
    {
      "x": 672,
      "y": 0,
      "type": "BRIQUE"
    },
    {
      "x": 704,
      "y": 0,
      "type": "BRIQUE"
    },
    {
      "x": 736,
      "y": 0,
      "type": "BRIQUE"
    },
    {
      "x": 768,
      "y": 0,
      "type": "BRIQUE"
    },
    {
      "x": 576,
      "y": 96,
      "type": "WALL_DOWN"
    },
    {
      "x": 608,
      "y": 96,
      "type": "WALL_DOWN"
    },
    {
      "x": 544,
      "y": 128,
      "type": "WALL_DOWN"
    },
    {
      "x": 576,
      "y": 128,
      "type": "WALL_DOWN"
    },
    {
      "x": 608,
      "y": 128,
      "type": "WALL_DOWN"
    },
    {
      "x": 544,
      "y": 160,
      "type": "WALL_DOWN"
    },
    {
      "x": 608,
      "y": 160,
      "type": "WALL_DOWN"
    },
    {
      "x": 64,
      "y": 64,
      "type": "TREE"
    },
    {
      "x": 128,
      "y": 64,
      "type": "TREE"
    },
    {
      "x": 64,
      "y": 384,
      "type": "TREE"
    },
    {
      "x": 64,
      "y": 448,
      "type": "TREE"
    },
    {
      "x": 128,
      "y": 448,
      "type": "TREE"
    },
    {
      "x": 672,
      "y": 384,
      "type": "TREE"
    },
    {
      "x": 672,
      "y": 448,
      "type": "TREE"
    },
    {
      "x": 608,
      "y": 448,
      "type": "TREE"
    },
    {
      "x": 672,
      "y": 64,
      "type": "TREE"
    },
    {
      "x": 672,
      "y": 128,
      "type": "TREE"
    },
    {
      "x": 192,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 224,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 224,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 256,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 256,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 288,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 288,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 320,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 320,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 384,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 384,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 416,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 416,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 448,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 448,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 544,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 544,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 576,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 576,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 608,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 608,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 640,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 640,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 384,
      "y": 64,
      "type": "SAND"
    },
    {
      "x": 384,
      "y": 96,
      "type": "SAND"
    },
    {
      "x": 384,
      "y": 128,
      "type": "SAND"
    },
    {
      "x": 384,
      "y": 160,
      "type": "SAND"
    },
    {
      "x": 384,
      "y": 192,
      "type": "SAND"
    },
    {
      "x": 384,
      "y": 224,
      "type": "SAND"
    },
    {
      "x": 384,
      "y": 320,
      "type": "SAND"
    },
    {
      "x": 384,
      "y": 352,
      "type": "SAND"
    },
    {
      "x": 384,
      "y": 384,
      "type": "SAND"
    },
    {
      "x": 384,
      "y": 416,
      "type": "SAND"
    },
    {
      "x": 384,
      "y": 448,
      "type": "SAND"
    },
    {
      "x": 384,
      "y": 480,
      "type": "SAND"
    },
    {
      "x": 320,
      "y": 0,
      "type": "PORTAIL"
    },
    {
      "x": 480,
      "y": 256,
      "type": "BRIDGE_H_RIGHT"
    },
    {
      "x": 512,
      "y": 256,
      "type": "BRIDGE_H_RIGHT"
    },
    {
      "x": 480,
      "y": 288,
      "type": "BRIDGE_H_LEFT"
    },
    {
      "x": 512,
      "y": 288,
      "type": "BRIDGE_H_LEFT"
    },
    {
      "x": 544,
      "y": 96,
      "type": "SHOP"
    },
    {
      "x": 0,
      "y": 32,
      "type": "BRIQUE"
    },
    {
      "x": 32,
      "y": 32,
      "type": "BRIQUE"
    },
    {
      "x": 64,
      "y": 32,
      "type": "BRIQUE"
    },
    {
      "x": 96,
      "y": 32,
      "type": "BRIQUE"
    },
    {
      "x": 128,
      "y": 32,
      "type": "BRIQUE"
    },
    {
      "x": 160,
      "y": 32,
      "type": "BRIQUE"
    },
    {
      "x": 192,
      "y": 32,
      "type": "BRIQUE"
    },
    {
      "x": 224,
      "y": 32,
      "type": "BRIQUE"
    },
    {
      "x": 256,
      "y": 32,
      "type": "BRIQUE"
    },
    {
      "x": 288,
      "y": 32,
      "type": "BRIQUE"
    },
    {
      "x": 448,
      "y": 32,
      "type": "BRIQUE"
    },
    {
      "x": 480,
      "y": 32,
      "type": "BRIQUE"
    },
    {
      "x": 512,
      "y": 32,
      "type": "BRIQUE"
    },
    {
      "x": 544,
      "y": 32,
      "type": "BRIQUE"
    },
    {
      "x": 576,
      "y": 32,
      "type": "BRIQUE"
    },
    {
      "x": 608,
      "y": 32,
      "type": "BRIQUE"
    },
    {
      "x": 640,
      "y": 32,
      "type": "BRIQUE"
    },
    {
      "x": 672,
      "y": 32,
      "type": "BRIQUE"
    },
    {
      "x": 704,
      "y": 32,
      "type": "BRIQUE"
    },
    {
      "x": 736,
      "y": 32,
      "type": "BRIQUE"
    },
    {
      "x": 768,
      "y": 32,
      "type": "BRIQUE"
    },
    {
      "x": 352,
      "y": 64,
      "type": "SAND"
    },
    {
      "x": 352,
      "y": 96,
      "type": "SAND"
    },
    {
      "x": 352,
      "y": 128,
      "type": "SAND"
    },
    {
      "x": 352,
      "y": 160,
      "type": "SAND"
    },
    {
      "x": 352,
      "y": 192,
      "type": "SAND"
    },
    {
      "x": 352,
      "y": 224,
      "type": "SAND"
    },
    {
      "x": 352,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 352,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 352,
      "y": 320,
      "type": "SAND"
    },
    {
      "x": 352,
      "y": 352,
      "type": "SAND"
    },
    {
      "x": 352,
      "y": 384,
      "type": "SAND"
    },
    {
      "x": 352,
      "y": 416,
      "type": "SAND"
    },
    {
      "x": 352,
      "y": 448,
      "type": "SAND"
    },
    {
      "x": 352,
      "y": 480,
      "type": "SAND"
    },
    {
      "x": 352,
      "y": 512,
      "type": "SAND"
    },
    {
      "x": 384,
      "y": 512,
      "type": "SAND"
    },
    {
      "x": 672,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 704,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 736,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 736,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 704,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 672,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 160,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 128,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 96,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 64,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 32,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 32,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 64,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 96,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 128,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 160,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 192,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 416,
      "y": 480,
      "type": "HERBESOL2"
    },
    {
      "x": 416,
      "y": 448,
      "type": "HERBESOL2"
    },
    {
      "x": 416,
      "y": 416,
      "type": "HERBESOL2"
    },
    {
      "x": 416,
      "y": 384,
      "type": "HERBESOL"
    },
    {
      "x": 416,
      "y": 352,
      "type": "HERBESOL"
    },
    {
      "x": 416,
      "y": 320,
      "type": "HERBESOL"
    },
    {
      "x": 416,
      "y": 192,
      "type": "HERBESOL2"
    },
    {
      "x": 416,
      "y": 160,
      "type": "HERBESOL2"
    },
    {
      "x": 416,
      "y": 128,
      "type": "HERBESOL2"
    },
    {
      "x": 416,
      "y": 96,
      "type": "HERBESOL"
    },
    {
      "x": 416,
      "y": 64,
      "type": "HERBESOL"
    },
    {
      "x": 64,
      "y": 128,
      "type": "HERBESOL2"
    },
    {
      "x": 96,
      "y": 128,
      "type": "HERBESOL2"
    },
    {
      "x": 128,
      "y": 160,
      "type": "HERBESOL2"
    },
    {
      "x": 128,
      "y": 192,
      "type": "HERBESOL2"
    },
    {
      "x": 128,
      "y": 224,
      "type": "HERBESOL2"
    },
    {
      "x": 32,
      "y": 160,
      "type": "HERBESOL2"
    },
    {
      "x": 32,
      "y": 192,
      "type": "HERBESOL2"
    },
    {
      "x": 32,
      "y": 224,
      "type": "HERBESOL2"
    },
    {
      "x": 64,
      "y": 224,
      "type": "HERBESOL2"
    },
    {
      "x": 96,
      "y": 224,
      "type": "HERBESOL2"
    },
    {
      "x": 96,
      "y": 192,
      "type": "HERBESOL2"
    },
    {
      "x": 96,
      "y": 160,
      "type": "HERBESOL2"
    },
    {
      "x": 64,
      "y": 192,
      "type": "HERBESOL2"
    },
    {
      "x": 320,
      "y": 416,
      "type": "SAND"
    },
    {
      "x": 288,
      "y": 416,
      "type": "SAND"
    },
    {
      "x": 256,
      "y": 416,
      "type": "SAND"
    },
    {
      "x": 224,
      "y": 416,
      "type": "SAND"
    },
    {
      "x": 224,
      "y": 384,
      "type": "SAND"
    },
    {
      "x": 224,
      "y": 352,
      "type": "SAND"
    },
    {
      "x": 224,
      "y": 320,
      "type": "SAND"
    },
    {
      "x": 320,
      "y": 320,
      "type": "SAND"
    },
    {
      "x": 576,
      "y": 224,
      "type": "SAND"
    },
    {
      "x": 576,
      "y": 192,
      "type": "SAND"
    },
    {
      "x": 0,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 0,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 768,
      "y": 256,
      "type": "SAND"
    },
    {
      "x": 768,
      "y": 288,
      "type": "SAND"
    },
    {
      "x": 352,
      "y": 544,
      "type": "SAND"
    },
    {
      "x": 384,
      "y": 544,
      "type": "SAND"
    },
    {
      "x": 320,
      "y": 544,
      "type": "HERBESOL2"
    },
    {
      "x": 416,
      "y": 544,
      "type": "HERBESOL2"
    },
    {
      "x": 768,
      "y": 320,
      "type": "HERBESOL2"
    },
    {
      "x": 768,
      "y": 224,
      "type": "HERBESOL2"
    },
    {
      "x": 0,
      "y": 224,
      "type": "HERBESOL2"
    },
    {
      "x": 0,
      "y": 320,
      "type": "HERBESOL"
    },
    {
      "x": 192,
      "y": 224,
      "type": "HERBESOL"
    },
    {
      "x": 224,
      "y": 224,
      "type": "HERBESOL"
    },
    {
      "x": 256,
      "y": 160,
      "type": "HERBESOL"
    },
    {
      "x": 416,
      "y": 224,
      "type": "SAND"
    },
    {
      "x": 224,
      "y": 160,
      "type": "MAISON_ORANGE"
    },
    {
      "x": 64,
      "y": 160,
      "type": "MAISON_VIOLETTE"
    },
    {
      "x": 544,
      "y": 320,
      "type": "MAISON_BLEU"
    },
    {
      "x": 544,
      "y": 416,
      "type": "SAND"
    },
    {
      "x": 576,
      "y": 416,
      "type": "SAND"
    },
    {
      "x": 608,
      "y": 416,
      "type": "SAND"
    },
    {
      "x": 640,
      "y": 416,
      "type": "SAND"
    },
    {
      "x": 640,
      "y": 384,
      "type": "SAND"
    },
    {
      "x": 640,
      "y": 352,
      "type": "SAND"
    },
    {
      "x": 640,
      "y": 320,
      "type": "SAND"
    },
    {
      "x": 128,
      "y": 128,
      "type": "HERBESOL2"
    },
    {
      "x": 160,
      "y": 160,
      "type": "HERBESOL2"
    },
    {
      "x": 160,
      "y": 192,
      "type": "HERBESOL2"
    },
    {
      "x": 160,
      "y": 224,
      "type": "HERBESOL2"
    },
    {
      "x": 256,
      "y": 320,
      "type": "MAISON_VIOLETTE"
    },
    {
      "x": 416,
      "y": 224,
      "type": "PANELS", signText: 'Bienvenue au Village Koumbou !'
    }
];

export const zoneData = {
    id: 'village',
    name: 'Village Koumbou',
    bgColor: '#1a3a1e',
    mapData: { walls: mapTiles },
    enemies: { moblins: 0, octoroks: 0 },
    connections: { north: 'Couloir_Forteresse', south: 'forest_south', west: 'swamp_west', east: 'ruins_east' },
    doors: [
        { x: 576, y: 160, w: 32, h: 32, target: 'shop_interior', spawnX: 384, spawnY: 310 },
        { x: 256, y: 224, w: 32, h: 32, target: 'maison_orange_interior', spawnX: 368, spawnY: 310 },
        { x: 96, y: 224, w: 32, h: 32, target: 'maison_violette1_interior', spawnX: 368, spawnY: 310 },
        { x: 576, y: 384, w: 32, h: 32, target: 'maison_bleu_interior', spawnX: 368, spawnY: 310 },
        { x: 288, y: 384, w: 32, h: 32, target: 'maison_violette2_interior', spawnX: 368, spawnY: 310 }
    ],
    npcs: [
        {
            name: 'Ancien du Village',
            x: 322, y: 220,
            sprite: 'VIEUXNPC',
            spriteColumns: 1,
            spriteW: 170,
            spriteH: 226,
            spriteFrame: 0,
            spriteScale: 0.18,
            z: 5,
            dialogues: [
                "Heros ! Le sorcier Maldrek a vole la Relique Sacree de notre village !",
                "Il s'est refugie dans sa forteresse au nord, protegee par une barriere magique.",
                "Pour la briser, tu dois reunir 3 fragments de cristal caches dans les zones voisines.",
                "Explore la foret au sud, les marais a l'ouest et les ruines a l'est. Bonne chance !"
            ],
        }
    ]
};
