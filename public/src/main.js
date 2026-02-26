import { Engine } from './Engine.js';
import { Network } from './Network.js';
import { Input } from './Input.js';

// Configuration du Canvas (la zone de jeu)
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

// On fixe une résolution d'écran "rétro"
canvas.width = 800;
canvas.height = 600;

// Initialisation des modules principaux
const game = new Engine(canvas, ctx);
const input = new Input();
const network = new Network(game);

// On lie les modules à l'Engine pour qu'il puisse les utiliser
game.input = input;
game.network = network;

// On lance la connexion réseau et la boucle de jeu
network.connect();
game.start();