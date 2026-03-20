/**
 * @file ZoneManager.js
 * @description Gere le chargement/dechargement des zones et les transitions entre elles.
 * Style Zelda NES : quand le joueur atteint le bord de l'ecran, on charge la zone adjacente.
 */

import { Map } from './Map.js';
import { Moblin } from '../entities/Enemies/Moblin.js';
import { Octorok } from '../entities/Enemies/Octorok.js';
import { NPC } from '../entities/NPC/NPC.js';
import { MiniBoss } from '../entities/Enemies/MiniBoss.js';
import { Maldrek } from '../entities/Enemies/Maldrek.js';
import { Chest } from '../entities/Items/Chest.js';
import { KeyItem } from '../entities/Items/KeyItem.js';

const _v = Date.now();
const ZONE_MODULES = {
    village:         () => import('./maps/village.js?v=' + _v),
    forest_south:    () => import('./maps/forest_south.js?v=' + _v),
    swamp_west:      () => import('./maps/swamp_west.js?v=' + _v),
    ruins_east:      () => import('./maps/ruins_east.js?v=' + _v),
    fortress_north:  () => import('./maps/fortress_north.js?v=' + _v),
    shop_interior:   () => import('./maps/shop_interior.js?v=' + _v),
    Couloir_Forteresse: () => import('./maps/couloir.js?v=' + _v),
    maison_orange_interior:    () => import('./maps/maison_orange_interior.js?v=' + _v),
    maison_bleu_interior:      () => import('./maps/maison_bleu_interior.js?v=' + _v),
    maison_violette1_interior: () => import('./maps/maison_violette1_interior.js?v=' + _v),
    maison_violette2_interior: () => import('./maps/maison_violette2_interior.js?v=' + _v)
};

const OPPOSITE = { north: 'south', south: 'north', east: 'west', west: 'east' };

export class ZoneManager {
    constructor(engine) {
        this.engine = engine;
        this.currentZone = null;
        this.previousZone = null;
        this.currentZoneData = null;
        this.worldMap = new Map(engine);
        this.transitioning = false;

        // Overlay de transition (fondu noir)
        this.fadeAlpha = 0;
        this._fadeDir = 0;       // 1 = fade out, -1 = fade in, 0 = idle
        this._fadeDuration = 0;
        this._fadeResolve = null;
    }

    /**
     * Anime un fondu vers le noir (piloté par updateFade).
     */
    fadeOut(duration = 250) {
        return new Promise(resolve => {
            this._fadeDir = 1;
            this._fadeDuration = duration;
            this._fadeResolve = resolve;
        });
    }

    /**
     * Anime un fondu depuis le noir (piloté par updateFade).
     */
    fadeIn(duration = 250) {
        return new Promise(resolve => {
            this._fadeDir = -1;
            this._fadeDuration = duration;
            this._fadeResolve = resolve;
        });
    }

    /**
     * Met a jour l'alpha du fondu. Appele chaque frame par le GameEngine.
     */
    updateFade(delta) {
        if (this._fadeDir === 0) return;
        const step = delta / this._fadeDuration;
        this.fadeAlpha += this._fadeDir * step;

        if (this.fadeAlpha >= 1 && this._fadeDir === 1) {
            this.fadeAlpha = 1;
            this._fadeDir = 0;
            if (this._fadeResolve) { this._fadeResolve(); this._fadeResolve = null; }
        } else if (this.fadeAlpha <= 0 && this._fadeDir === -1) {
            this.fadeAlpha = 0;
            this._fadeDir = 0;
            if (this._fadeResolve) { this._fadeResolve(); this._fadeResolve = null; }
        }
    }

    /**
     * Dessine l'overlay de fondu. Appele par le GameEngine apres le draw.
     */
    drawFade(ctx) {
        if (this.fadeAlpha <= 0) return;
        ctx.fillStyle = `rgba(0, 0, 0, ${this.fadeAlpha})`;
        ctx.fillRect(0, 0, 800, 660);
    }

    /**
     * Charge une zone par son identifiant (appel public, ex: spawn initial).
     */
    async loadZone(zoneId, entryDir = null) {
        if (this.transitioning) return;
        this.transitioning = true;
        try {
            await this._doLoadZone(zoneId, entryDir);
        } finally {
            this.transitioning = false;
        }
    }

    /**
     * Chargement interne (sans toucher a transitioning).
     */
    async _doLoadZone(zoneId, entryDir = null) {
        // 1. Nettoyer la zone actuelle
        this.clearZoneEntities();

        // 2. Charger les donnees de la nouvelle zone
        const module = await ZONE_MODULES[zoneId]();
        this.currentZoneData = module.zoneData;
        this.previousZone = this.currentZone;
        this.currentZone = zoneId;

        // 3. Configurer et charger la map
        this.worldMap.bgColor = this.currentZoneData.bgColor || '#1a1a1a';
        this.worldMap.load(this.currentZoneData.mapData);

        // 4. Spawner les ennemis (host uniquement)
        const isHost = window.game.network?.isHost;
        if (isHost || !window.game.network) {
            this.spawnEnemies(this.currentZoneData.enemies);
        }

        // 5. Spawner les PNJ (tous les clients)
        this.spawnNPCs(this.currentZoneData.npcs);

        // 5b. Spawner les entites de quete
        this.spawnQuestEntities(zoneId);

        // 6. Repositionner le joueur
        if (entryDir) {
            this.positionPlayer(entryDir);
        }

        // Si on revient d'un interieur, placer devant la porte
        const interiorSpawns = {
            'shop_interior':            { x: 576, y: 230 },
            'maison_orange_interior':   { x: 256, y: 260 },
            'maison_violette1_interior':{ x: 96,  y: 260 },
            'maison_bleu_interior':     { x: 576, y: 420 },
            'maison_violette2_interior':{ x: 288, y: 420 }
        };
        if (zoneId === 'village' && interiorSpawns[this.previousZone]) {
            const player = window.game.player;
            if (player) {
                const spawn = interiorSpawns[this.previousZone];
                player.x = spawn.x;
                player.y = spawn.y;
            }
        }

        console.log(`[Zone] Chargee : ${this.currentZoneData.name} (${zoneId})`);
    }

    /**
     * Supprime toutes les entites specifiques a la zone (Floor, ennemis, items, projectiles, effets).
     * Conserve : Player, NetworkPlayer, BottomBar, Map (fond).
     */
    clearZoneEntities() {
        // Decharger les tuiles de sol
        this.worldMap.unload();

        // Nettoyer les ennemis distants du NetworkUpdater
        const network = window.game.network;
        if (network) {
            for (const id in network.remoteEnemies) {
                network.remoteEnemies[id].kill();
                delete network.remoteEnemies[id];
            }
        }

        // Supprimer toutes les entites sauf les persistantes (retrait immediat)
        this.engine.entities = this.engine.entities.filter(e => {
            if (e.hasTag('PLAYER')) return true;
            if (e === this.worldMap) return true;
            if (e.constructor.name === 'BottomBar') return true;
            if (e.constructor.name === 'NetworkPlayer') return true;
            if (e.constructor.name === 'DialogueBox') return true;
            if (e.constructor.name === 'ShopMenu') return true;
            e.kill();
            return false;
        });
    }

    /**
     * Spawne les ennemis definis pour la zone courante.
     */
    spawnEnemies(enemies) {
        if (!enemies) return;

        for (let i = 0; i < (enemies.moblins || 0); i++) {
            const x = 120 + Math.random() * 560;
            const y = 100 + Math.random() * 380;
            this.engine.add(new Moblin(x, y, 120));
        }
        for (let i = 0; i < (enemies.octoroks || 0); i++) {
            const x = 120 + Math.random() * 560;
            const y = 100 + Math.random() * 380;
            this.engine.add(new Octorok(x, y, 100));
        }
    }

    /**
     * Spawne les PNJ definis pour la zone courante.
     */
    spawnNPCs(npcs) {
        if (!npcs) return;

        for (const config of npcs) {
            const npc = new NPC(config.x, config.y, config);
            this.engine.add(npc);
        }
    }

    /**
     * Spawne les entites liees aux quetes selon la zone courante.
     */
    spawnQuestEntities(zoneId) {
        const qm = window.game.questManager;
        if (!qm) return;
        const isHost = window.game.network?.isHost || !window.game.network;

        if (zoneId === 'swamp_west') {
            // Cle cachee dans le marais (si pas encore ramassee)
            const swampQuest = qm.getQuest('swamp_chest');
            if (!swampQuest.hasKey) {
                this.engine.add(new KeyItem(500, 450));
            }
            // Coffre (si pas encore ouvert)
            if (!swampQuest.chestOpened) {
                this.engine.add(new Chest(160, 200));
            }
        }

        if (zoneId === 'ruins_east' && isHost) {
            // Mini-boss (si pas encore vaincu)
            const ruinsQuest = qm.getQuest('ruins_boss');
            if (!ruinsQuest.bossDefeated) {
                this.engine.add(new MiniBoss(370, 240));
            }
        }

        if (zoneId === 'fortress_north' && isHost) {
            // Boss Maldrek (centre de la salle)
            this.engine.add(new Maldrek(360, 150));
        }
    }

    /**
     * Place le joueur a l'entree correcte apres une transition.
     */
    positionPlayer(entryDir) {
        const player = window.game.player;
        if (!player) return;

        switch (entryDir) {
            case 'north':
                // Vient du sud, apparait en haut
                player.y = 40;
                break;
            case 'south':
                // Vient du nord, apparait en bas
                player.y = 520;
                break;
            case 'west':
                // Vient de l'est, apparait a gauche
                player.x = 40;
                break;
            case 'east':
                // Vient de l'ouest, apparait a droite
                player.x = 740;
                break;
        }

        // Arreter le mouvement
        player.velX = 0;
        player.velY = 0;
    }

    /**
     * Tente une transition vers la zone adjacente dans la direction donnee.
     * @param {string} direction - 'north', 'south', 'east', 'west'
     */
    async transition(direction) {
        if (this.transitioning) return;
        this.transitioning = true;

        const connections = this.currentZoneData?.connections;
        if (!connections || !connections[direction]) {
            this.transitioning = false;
            return;
        }

        const targetZone = connections[direction];

        // Bloquer l'acces a la forteresse si les 3 fragments ne sont pas reunis
        if (this.currentZone === 'village' && direction === 'north') {
            const qm = window.game.questManager;
            if (qm && !qm.allFragmentsCollected()) {
                const db = window.game.dialogueBox;
                if (db && !window.game.dialogueActive) {
                    const count = qm.fragments.filter(f => f).length;
                    db.show('Barriere Magique', [
                        "Une puissante barriere magique bloque le passage vers le nord !",
                        `Fragments reunis : ${count}/3. Explore les zones laterales pour trouver les autres.`
                    ], null);
                }
                const player = window.game.player;
                if (player) {
                    player.y = 64;
                    player.velY = 0;
                }
                this.transitioning = false;
                return;
            }
        }

        const entryDir = OPPOSITE[direction];

        // Fondu vers le noir
        await this.fadeOut(250);

        // Notifier le reseau
        if (window.game.network?.socket) {
            window.game.network.socket.emit('zone_change', {
                zone: targetZone,
                entryDir: entryDir
            });
        }

        // Charger la zone (sans re-setter transitioning via loadZone)
        await this._doLoadZone(targetZone, entryDir);

        // Fondu depuis le noir
        await this.fadeIn(250);
        this.transitioning = false;
    }

    /**
     * Verifie si le joueur est sorti de la zone ou entre dans une porte.
     */
    checkTransition(player) {
        if (this.transitioning || !this.currentZoneData) return;

        // Transitions par les bords
        if (player.x + player.width < 0) {
            this.transition('west');
        } else if (player.x > 800) {
            this.transition('east');
        } else if (player.y > 576) {
            this.transition('south');
        } else if (player.y + player.height < 0) {
            this.transition('north');
        }

        // Transition nord via le portail (bas du portail : x 320-448, y 32-64)
        if (this.currentZoneData?.connections?.north) {
            const px = player.x + player.width / 2;
            if (px > 320 && px < 448 && player.y < 40) {
                this.transition('north');
            }
        }

        // Transitions par les portes
        const doors = this.currentZoneData.doors;
        if (doors) {
            for (const door of doors) {
                if (player.x + player.width > door.x &&
                    player.x < door.x + door.w &&
                    player.y + player.height > door.y &&
                    player.y < door.y + door.h) {
                    this.enterDoor(door);
                    return;
                }
            }
        }
    }

    /**
     * Transition via une porte (entree de batiment).
     */
    async enterDoor(door) {
        if (this.transitioning) return;
        this.transitioning = true;

        // Fondu vers le noir
        await this.fadeOut(250);

        if (window.game.network?.socket) {
            window.game.network.socket.emit('zone_change', {
                zone: door.target,
                entryDir: 'south'
            });
        }

        await this._doLoadZone(door.target, null);

        // Positionner le joueur a l'entree de la zone interieure
        const player = window.game.player;
        if (player) {
            player.x = door.spawnX || 384;
            player.y = door.spawnY || 500;
            player.velX = 0;
            player.velY = 0;
        }

        // Fondu depuis le noir
        await this.fadeIn(250);
        this.transitioning = false;
    }
}
