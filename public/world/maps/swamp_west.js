/**
 * @file swamp_west.js
 * @description Zone Ouest - Marais. Quete: trouver la cle du coffre pour le Fragment 2.
 * Sortie : Est (village)
 */
import { generateBorder } from './mapUtils.js';

const walls = generateBorder({ east: true });

const interior = [
    {
        "x": 0,
        "y": 0,
        "type": "WALL_DOWN"
    },
    {
        "x": 32,
        "y": 0,
        "type": "WALL_DOWN"
    },
    {
        "x": 64,
        "y": 0,
        "type": "WALL_DOWN"
    },
    {
        "x": 96,
        "y": 0,
        "type": "WALL_DOWN"
    },
    {
        "x": 128,
        "y": 0,
        "type": "WALL_DOWN"
    },
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
        "x": 320,
        "y": 544,
        "type": "WALL_UP"
    },
    {
        "x": 352,
        "y": 544,
        "type": "WALL_UP"
    },
    {
        "x": 0,
        "y": 32,
        "type": "WALL_RIGHT"
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
        "y": 224,
        "type": "WALL_RIGHT"
    },
    {
        "x": 0,
        "y": 256,
        "type": "WALL_RIGHT"
    },
    {
        "x": 0,
        "y": 288,
        "type": "WALL_RIGHT"
    },
    {
        "x": 0,
        "y": 320,
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
        "x": 96,
        "y": 32,
        "type": "MAR_BUISSON_1"
    },
    {
        "x": 64,
        "y": 32,
        "type": "MAR_CHEMIN_HG"
    },
    {
        "x": 64,
        "y": 64,
        "type": "MAR_CHEMIN_BG"
    },
    {
        "x": 96,
        "y": 64,
        "type": "MAR_MARECAGE_1"
    },
    {
        "x": 128,
        "y": 64,
        "type": "MAR_SOMBRE_3"
    },
    {
        "x": 128,
        "y": 32,
        "type": "MAR_SOMBRE_3"
    },
    {
        "x": 128,
        "y": 0,
        "type": "MAR_SOMBRE_3"
    },
    {
        "x": 96,
        "y": 0,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 64,
        "y": 0,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 32,
        "y": 0,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 32,
        "y": 32,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 32,
        "y": 64,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 128,
        "y": 96,
        "type": "MAR_SOMBRE_5"
    },
    {
        "x": 96,
        "y": 96,
        "type": "MAR_EAU_TEAL_2"
    },
    {
        "x": 64,
        "y": 96,
        "type": "MAR_EAU_TEAL_2"
    },
    {
        "x": 32,
        "y": 96,
        "type": "MAR_MARECAGE_5"
    },
    {
        "x": 32,
        "y": 128,
        "type": "MAR_SOMBRE_3"
    },
    {
        "x": 32,
        "y": 160,
        "type": "MAR_SOMBRE_3"
    },
    {
        "x": 32,
        "y": 192,
        "type": "MAR_SOMBRE_3"
    },
    {
        "x": 32,
        "y": 224,
        "type": "MAR_SOMBRE_3"
    },
    {
        "x": 32,
        "y": 256,
        "type": "MAR_SOMBRE_3"
    },
    {
        "x": 32,
        "y": 288,
        "type": "MAR_MARECAGE_3"
    },
    {
        "x": 64,
        "y": 288,
        "type": "MAR_BOUE_2"
    },
    {
        "x": 96,
        "y": 288,
        "type": "MAR_HERBE"
    },
    {
        "x": 96,
        "y": 320,
        "type": "MAR_SOMBRE_3"
    },
    {
        "x": 96,
        "y": 352,
        "type": "MAR_SOMBRE_3"
    },
    {
        "x": 96,
        "y": 384,
        "type": "MAR_SOMBRE_3"
    },
    {
        "x": 96,
        "y": 416,
        "type": "MAR_SOMBRE_3"
    },
    {
        "x": 96,
        "y": 448,
        "type": "MAR_SOMBRE_3"
    },
    {
        "x": 96,
        "y": 480,
        "type": "MAR_MARECAGE_3"
    },
    {
        "x": 128,
        "y": 480,
        "type": "MAR_BOUE_2"
    },
    {
        "x": 160,
        "y": 480,
        "type": "MAR_BOUE_2"
    },
    {
        "x": 192,
        "y": 480,
        "type": "MAR_BOUE_2"
    },
    {
        "x": 224,
        "y": 480,
        "type": "MAR_BOUE_2"
    },
    {
        "x": 256,
        "y": 480,
        "type": "MAR_BOUE_2"
    },
    {
        "x": 288,
        "y": 480,
        "type": "MAR_BOUE_2"
    },
    {
        "x": 320,
        "y": 480,
        "type": "MAR_BOUE_2"
    },
    {
        "x": 352,
        "y": 480,
        "type": "MAR_HERBE"
    },
    {
        "x": 352,
        "y": 512,
        "type": "MAR_SOMBRE_3"
    },
    {
        "x": 352,
        "y": 544,
        "type": "MAR_SOMBRE_3"
    },
    {
        "x": 32,
        "y": 480,
        "type": "MAR_SOMBRE_2"
    },
    {
        "x": 32,
        "y": 448,
        "type": "MAR_SOMBRE_1"
    },
    {
        "x": 32,
        "y": 512,
        "type": "MAR_SOMBRE_4"
    },
    {
        "x": 32,
        "y": 544,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 0,
        "y": 512,
        "type": "MAR_SOMBRE_3"
    },
    {
        "x": 0,
        "y": 480,
        "type": "MAR_SOMBRE_3"
    },
    {
        "x": 64,
        "y": 512,
        "type": "MAR_BOUE_3"
    },
    {
        "x": 64,
        "y": 480,
        "type": "MAR_BOUE_3"
    },
    {
        "x": 0,
        "y": 448,
        "type": "MAR_MARECAGE_5"
    },
    {
        "x": 64,
        "y": 448,
        "type": "MAR_CHEMIN_BD"
    },
    {
        "x": 0,
        "y": 544,
        "type": "MAR_SOMBRE_5"
    },
    {
        "x": 64,
        "y": 544,
        "type": "MAR_BOUE_4"
    },
    {
        "x": 96,
        "y": 512,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 128,
        "y": 512,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 160,
        "y": 512,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 192,
        "y": 512,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 224,
        "y": 512,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 256,
        "y": 512,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 288,
        "y": 512,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 320,
        "y": 512,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 320,
        "y": 544,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 288,
        "y": 544,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 256,
        "y": 544,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 224,
        "y": 544,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 192,
        "y": 544,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 160,
        "y": 544,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 128,
        "y": 544,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 96,
        "y": 544,
        "type": "MAR_CHEMIN_BD"
    },
    {
        "x": 64,
        "y": 416,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 32,
        "y": 416,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 0,
        "y": 416,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 0,
        "y": 384,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 32,
        "y": 384,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 64,
        "y": 384,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 0,
        "y": 352,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 0,
        "y": 320,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 0,
        "y": 288,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 0,
        "y": 256,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 0,
        "y": 224,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 0,
        "y": 192,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 0,
        "y": 160,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 0,
        "y": 128,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 0,
        "y": 96,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 0,
        "y": 64,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 0,
        "y": 32,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 0,
        "y": 0,
        "type": "MAR_EAU_TEAL"
    },
    {
        "x": 32,
        "y": 320,
        "type": "MAR_CHEMIN_HG"
    },
    {
        "x": 64,
        "y": 320,
        "type": "MAR_BUISSON_1"
    },
    {
        "x": 32,
        "y": 352,
        "type": "MAR_CHEMIN_BG"
    },
    {
        "x": 64,
        "y": 352,
        "type": "MAR_MARECAGE_1"
    },
    {
        "x": 96,
        "y": 192,
        "type": "MAR_CHAMPI"
    },
    {
        "x": 64,
        "y": 192,
        "type": "MAR_CHAMPI"
    },
    {
        "x": 64,
        "y": 160,
        "type": "MAR_SOUCHE"
    },
    {
        "x": 128,
        "y": 448,
        "type": "MAR_PONT_2"
    },
    {
        "x": 64,
        "y": 256,
        "type": "MAR_PONT_2"
    },
    {
        "x": 96,
        "y": 128,
        "type": "MAR_TERRE_1"
    },
    {
        "x": 64,
        "y": 128,
        "type": "MAR_TERRE_1"
    },
    {
        "x": 160,
        "y": 0,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 192,
        "y": 64,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 192,
        "y": 96,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 192,
        "y": 128,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 192,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 160,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 96,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 128,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 128,
        "y": 128,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 160,
        "y": 128,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 160,
        "y": 96,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 160,
        "y": 64,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 160,
        "y": 32,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 192,
        "y": 32,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 192,
        "y": 0,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 224,
        "y": 0,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 256,
        "y": 0,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 416,
        "y": 0,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 288,
        "y": 0,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 288,
        "y": 32,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 224,
        "y": 32,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 224,
        "y": 128,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 224,
        "y": 96,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 224,
        "y": 64,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 256,
        "y": 32,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 256,
        "y": 64,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 256,
        "y": 96,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 224,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 352,
        "y": 0,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 320,
        "y": 0,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 256,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 256,
        "y": 128,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 288,
        "y": 96,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 288,
        "y": 64,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 320,
        "y": 64,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 320,
        "y": 32,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 352,
        "y": 32,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 320,
        "y": 96,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 288,
        "y": 128,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 352,
        "y": 64,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 448,
        "y": 0,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 480,
        "y": 0,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 320,
        "y": 128,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 576,
        "y": 64,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 544,
        "y": 96,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 512,
        "y": 128,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 512,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 480,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 352,
        "y": 128,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 352,
        "y": 96,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 416,
        "y": 32,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 416,
        "y": 64,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 512,
        "y": 0,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 448,
        "y": 32,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 544,
        "y": 0,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 576,
        "y": 0,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 608,
        "y": 32,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 640,
        "y": 0,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 608,
        "y": 0,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 576,
        "y": 32,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 416,
        "y": 96,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 512,
        "y": 32,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 480,
        "y": 32,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 448,
        "y": 64,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 384,
        "y": 96,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 288,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 320,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 480,
        "y": 64,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 352,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 384,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 384,
        "y": 128,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 448,
        "y": 96,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 480,
        "y": 96,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 416,
        "y": 128,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 416,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 448,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 448,
        "y": 128,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 480,
        "y": 128,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 512,
        "y": 96,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 512,
        "y": 64,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 544,
        "y": 64,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 544,
        "y": 32,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 544,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 544,
        "y": 128,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 576,
        "y": 96,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 576,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 576,
        "y": 128,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 608,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 608,
        "y": 64,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 608,
        "y": 96,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 608,
        "y": 128,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 640,
        "y": 32,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 640,
        "y": 128,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 640,
        "y": 96,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 640,
        "y": 64,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 672,
        "y": 96,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 672,
        "y": 64,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 672,
        "y": 32,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 704,
        "y": 32,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 672,
        "y": 0,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 704,
        "y": 0,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 736,
        "y": 0,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 768,
        "y": 0,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 768,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 768,
        "y": 192,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 736,
        "y": 192,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 736,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 768,
        "y": 128,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 768,
        "y": 96,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 768,
        "y": 64,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 768,
        "y": 32,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 736,
        "y": 32,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 736,
        "y": 64,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 736,
        "y": 128,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 736,
        "y": 96,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 704,
        "y": 64,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 704,
        "y": 96,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 704,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 704,
        "y": 192,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 672,
        "y": 192,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 640,
        "y": 192,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 704,
        "y": 128,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 672,
        "y": 128,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 672,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 640,
        "y": 160,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 608,
        "y": 192,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 576,
        "y": 192,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 544,
        "y": 192,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 512,
        "y": 192,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 480,
        "y": 192,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 448,
        "y": 192,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 416,
        "y": 192,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 384,
        "y": 192,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 352,
        "y": 192,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 320,
        "y": 192,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 288,
        "y": 192,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 256,
        "y": 192,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 224,
        "y": 192,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 192,
        "y": 192,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 160,
        "y": 192,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 128,
        "y": 192,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 64,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 96,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 96,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 128,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 160,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 192,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 224,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 256,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 288,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 320,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 352,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 384,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 416,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 448,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 480,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 512,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 544,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 576,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 608,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 640,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 672,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 704,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 736,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 768,
        "y": 224,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 768,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 736,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 704,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 672,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 640,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 608,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 576,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 544,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 512,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 480,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 448,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 416,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 384,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 352,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 320,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 288,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 256,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 224,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 192,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 160,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 128,
        "y": 256,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 128,
        "y": 288,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 160,
        "y": 288,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 192,
        "y": 288,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 224,
        "y": 288,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 256,
        "y": 288,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 288,
        "y": 288,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 320,
        "y": 288,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 352,
        "y": 288,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 384,
        "y": 288,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 416,
        "y": 288,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 448,
        "y": 288,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 480,
        "y": 288,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 512,
        "y": 288,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 544,
        "y": 288,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 576,
        "y": 288,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 608,
        "y": 288,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 640,
        "y": 288,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 672,
        "y": 288,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 704,
        "y": 288,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 736,
        "y": 288,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 768,
        "y": 288,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 768,
        "y": 320,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 736,
        "y": 320,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 704,
        "y": 320,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 672,
        "y": 320,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 640,
        "y": 320,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 608,
        "y": 320,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 576,
        "y": 320,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 544,
        "y": 320,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 512,
        "y": 320,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 480,
        "y": 320,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 448,
        "y": 320,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 416,
        "y": 320,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 384,
        "y": 320,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 352,
        "y": 320,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 320,
        "y": 320,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 288,
        "y": 320,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 256,
        "y": 320,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 224,
        "y": 320,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 192,
        "y": 320,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 160,
        "y": 320,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 128,
        "y": 320,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 128,
        "y": 352,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 160,
        "y": 352,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 192,
        "y": 352,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 224,
        "y": 352,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 256,
        "y": 352,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 288,
        "y": 352,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 320,
        "y": 352,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 352,
        "y": 352,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 384,
        "y": 352,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 416,
        "y": 352,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 448,
        "y": 352,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 480,
        "y": 352,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 512,
        "y": 352,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 544,
        "y": 352,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 576,
        "y": 352,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 608,
        "y": 352,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 640,
        "y": 352,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 672,
        "y": 352,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 704,
        "y": 352,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 736,
        "y": 352,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 768,
        "y": 352,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 768,
        "y": 384,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 736,
        "y": 384,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 704,
        "y": 384,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 672,
        "y": 384,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 640,
        "y": 384,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 608,
        "y": 384,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 576,
        "y": 384,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 544,
        "y": 384,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 512,
        "y": 384,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 480,
        "y": 384,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 448,
        "y": 384,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 416,
        "y": 384,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 384,
        "y": 384,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 352,
        "y": 384,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 320,
        "y": 384,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 288,
        "y": 384,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 256,
        "y": 384,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 224,
        "y": 384,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 192,
        "y": 384,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 128,
        "y": 416,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 128,
        "y": 384,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 160,
        "y": 384,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 160,
        "y": 416,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 384,
        "y": 416,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 416,
        "y": 416,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 448,
        "y": 416,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 480,
        "y": 416,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 512,
        "y": 416,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 544,
        "y": 416,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 576,
        "y": 416,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 608,
        "y": 416,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 640,
        "y": 416,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 672,
        "y": 416,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 704,
        "y": 416,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 736,
        "y": 416,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 768,
        "y": 416,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 768,
        "y": 448,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 736,
        "y": 448,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 704,
        "y": 448,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 672,
        "y": 448,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 640,
        "y": 448,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 608,
        "y": 448,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 576,
        "y": 448,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 544,
        "y": 448,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 512,
        "y": 448,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 480,
        "y": 448,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 448,
        "y": 448,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 416,
        "y": 448,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 320,
        "y": 448,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 288,
        "y": 448,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 256,
        "y": 448,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 224,
        "y": 448,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 192,
        "y": 448,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 160,
        "y": 448,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 192,
        "y": 416,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 224,
        "y": 416,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 256,
        "y": 416,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 288,
        "y": 416,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 320,
        "y": 416,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 352,
        "y": 416,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 352,
        "y": 448,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 384,
        "y": 448,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 384,
        "y": 480,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 416,
        "y": 480,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 448,
        "y": 480,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 480,
        "y": 480,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 512,
        "y": 480,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 544,
        "y": 480,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 576,
        "y": 480,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 608,
        "y": 480,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 640,
        "y": 480,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 672,
        "y": 480,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 704,
        "y": 480,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 736,
        "y": 480,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 768,
        "y": 480,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 768,
        "y": 512,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 736,
        "y": 512,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 704,
        "y": 512,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 672,
        "y": 512,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 640,
        "y": 512,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 608,
        "y": 512,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 576,
        "y": 512,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 544,
        "y": 512,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 512,
        "y": 512,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 480,
        "y": 512,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 448,
        "y": 512,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 416,
        "y": 512,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 384,
        "y": 512,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 384,
        "y": 544,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 416,
        "y": 544,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 448,
        "y": 544,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 480,
        "y": 544,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 512,
        "y": 544,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 544,
        "y": 544,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 576,
        "y": 544,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 608,
        "y": 544,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 640,
        "y": 544,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 672,
        "y": 544,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 704,
        "y": 544,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 736,
        "y": 544,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 768,
        "y": 544,
        "type": "MAR_MARECAGE_10"
    },
    {
        "x": 384,
        "y": 0,
        "type": "MAR_TERRE_2"
    },
    {
        "x": 384,
        "y": 64,
        "type": "MAR_SOMBRE_9"
    },
    {
        "x": 384,
        "y": 32,
        "type": "MAR_SOMBRE_9"
    }
]

export const zoneData = {
    id: 'swamp_west',
    name: 'Marais Sombre',
    bgColor: '#0f1f1a',
    mapData: { walls: [...walls, ...interior] },
    enemies: { moblins: 2, octoroks: 2 },
    connections: { east: 'village' },
    npcs: [
        {
            name: 'Ermite du Marais',
            x: 640, y: 160,
            color: '#2a6a6a',
            skinColor: '#d8b888',
            dialogues: [
                "Le marais cache bien des secrets... et un coffre tres ancien.",
                "Trouve la cle cachee quelque part dans cette zone et ouvre le coffre.",
                "Le Fragment de Cristal est a l'interieur. Fais attention aux creatures !"
            ],
            questDialogues: {
                questId: 'swamp_chest',
                active: [
                    "Tu as la cle ? Bien ! Cherche le coffre, il est quelque part dans le marais.",
                    "Ouvre-le et le Fragment sera a toi !"
                ],
                completed: [
                    "Tu as trouve le Fragment du marais ! Excellent !",
                    "Continue ta quete, heros. D'autres fragments t'attendent."
                ]
            }
        }
    ]
};
