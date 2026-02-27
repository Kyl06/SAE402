// game.js
import { TILE_SIZE, COLUMNS, ROWS, map } from '/js/config.js';
import { myPlayer, startAttack, isSolid } from '/js/player.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const socket = io();

canvas.width = COLUMNS * TILE_SIZE;
canvas.height = ROWS * TILE_SIZE;
ctx.imageSmoothingEnabled = false;

const linkSheet = new Image();
linkSheet.src = './assets/link-sheet.png';

const swordSheet = new Image();
swordSheet.src = './assets/sword-sheet.png';

let otherPlayers = {};
let keys = {};
let walkFrame = 0;
let tick = 0;

// --- INPUTS ---
window.addEventListener('keydown', e => {
    keys[e.key] = true;
    if (!myPlayer.isAttacking) {
        if (e.key === 'z' || e.key === 'ArrowUp') myPlayer.direction = 'up';
        if (e.key === 's' || e.key === 'ArrowDown') myPlayer.direction = 'down';
        if (e.key === 'q' || e.key === 'ArrowLeft') myPlayer.direction = 'left';
        if (e.key === 'd' || e.key === 'ArrowRight') myPlayer.direction = 'right';
    }
    if (e.key === ' ' && !myPlayer.isAttacking) startAttack();
});
window.addEventListener('keyup', e => keys[e.key] = false);

socket.on('updatePlayers', serverPlayers => {
    otherPlayers = serverPlayers;
    if (!myPlayer.id) myPlayer.id = socket.id;
});

// --- UPDATE ---
function update() {
    if (myPlayer.isAttacking) return; 

    let moved = false;
    let speed = myPlayer.speed;

    if (keys['q'] || keys['ArrowLeft']) {
        let testX = myPlayer.x - speed;
        if (!isSolid(testX + 8, myPlayer.y + 8) && !isSolid(testX + 8, myPlayer.y + 24)) {
            myPlayer.x = testX; moved = true;
        }
    } else if (keys['d'] || keys['ArrowRight']) {
        let testX = myPlayer.x + speed;
        if (!isSolid(testX + 24, myPlayer.y + 8) && !isSolid(testX + 24, myPlayer.y + 24)) {
            myPlayer.x = testX; moved = true;
        }
    }

    if (keys['z'] || keys['ArrowUp']) {
        let testY = myPlayer.y - speed;
        if (!isSolid(myPlayer.x + 8, testY + 8) && !isSolid(myPlayer.x + 24, testY + 8)) {
            myPlayer.y = testY; moved = true;
        }
    } else if (keys['s'] || keys['ArrowDown']) {
        let testY = myPlayer.y + speed;
        if (!isSolid(myPlayer.x + 8, testY + 24) && !isSolid(myPlayer.x + 24, testY + 24)) {
            myPlayer.y = testY; moved = true;
        }
    }

    if (moved) {
        socket.emit('move', { x: myPlayer.x, y: myPlayer.y, direction: myPlayer.direction, isAttacking: myPlayer.isAttacking });
    }
}

// --- DRAW ---
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Dessiner les murs
    ctx.fillStyle = '#666';
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLUMNS; c++) {
            if (map[r][c] === 1) ctx.fillRect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }

    // 2. Animation marche
    let isMoving = (keys['z'] || keys['s'] || keys['q'] || keys['d'] || keys['ArrowUp'] || keys['ArrowDown'] || keys['ArrowLeft'] || keys['ArrowRight']) && !myPlayer.isAttacking;
    if (isMoving) {
        tick++;
        if (tick % 10 === 0) walkFrame = (walkFrame + 1) % 2;
    } else {
        walkFrame = 0;
    }

    // 3. Dessiner les autres joueurs
    for (let id in otherPlayers) {
        if (id === socket.id) continue;
        let p = otherPlayers[id];
        ctx.fillStyle = 'rgba(255,0,0,0.5)';
        ctx.fillRect(p.x, p.y, 32, 32); 
    }

    // 4. Déterminer la ligne (Y) commune
    let currentLineY = 0; 
    if (myPlayer.direction === 'down')  currentLineY = 0; 
    if (myPlayer.direction === 'up')    currentLineY = 1; 
    if (myPlayer.direction === 'left')  currentLineY = 2; 
    if (myPlayer.direction === 'right') currentLineY = 3; 

    // 5. Dessiner Link
    let linkSourceX = myPlayer.isAttacking ? (myPlayer.attackFrame === 0 ? 2 : 3) : walkFrame;
    ctx.drawImage(linkSheet, linkSourceX * 16, currentLineY * 16, 16, 16, myPlayer.x, myPlayer.y, 32, 32);

    // 6. Dessiner l'épée
    if (myPlayer.isAttacking) {
        let swordX = myPlayer.x;
        let swordY = myPlayer.y;
        
        if (myPlayer.direction === 'down') {
            swordX -= 16; swordY += 0;
        } else if (myPlayer.direction === 'up') {
            swordX -= 16; swordY -= 32;
        } else if (myPlayer.direction === 'left') {
            swordX -= 32; swordY -= 16;
        } else if (myPlayer.direction === 'right') {
            swordX += 0; swordY -= 16;
        }

        ctx.drawImage(
            swordSheet,
            myPlayer.attackFrame * 32, currentLineY * 32, 32, 32, 
            swordX, swordY, 64, 64 
        );
    }

    update();
    requestAnimationFrame(draw);
}

// --- INIT ---
let imagesLoaded = 0;
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === 2) draw();
}
linkSheet.onload = imageLoaded;
swordSheet.onload = imageLoaded;