/**
 * @file QuestManager.js
 * @description Gère les quêtes du jeu. Chaque quête a un ID, un état et des conditions de complétion.
 */

export class QuestManager {
    constructor() {
        // États possibles : 'locked', 'available', 'active', 'completed'
        this.quests = {
            forest_moblins: {
                name: 'Eliminer les Moblins',
                zone: 'forest_south',
                state: 'available',
                description: 'Tue tous les moblins de la foret',
                killsRequired: 4,
                killsCurrent: 0,
                reward: 'fragment_1'
            },
            swamp_chest: {
                name: 'Le Coffre du Marais',
                zone: 'swamp_west',
                state: 'available',
                description: 'Trouve la cle et ouvre le coffre ancien',
                hasKey: false,
                chestOpened: false,
                reward: 'fragment_2'
            },
            ruins_boss: {
                name: 'Le Gardien des Ruines',
                zone: 'ruins_east',
                state: 'available',
                description: 'Vaincs le Gardien Ancien des ruines',
                bossDefeated: false,
                reward: 'fragment_3'
            },
            puit_chest: {
                name: 'Tresor du Puit',
                zone: 'puit_koumbou',
                state: 'available',
                description: 'Ouvre le coffre du Puit de Koumbou',
                opened: false
            }
        };

        // Fragments collectes
        this.fragments = [false, false, false];
        this.maldrekDefeated = false;
    }

    /** Marque la défaite de Maldrek. */
    defeatMaldrek(isRemote = false) {
        if (this.maldrekDefeated) return;
        this.maldrekDefeated = true;
        this.save();

        if (!isRemote && window.game.network) {
            window.game.network.socket.emit("quest_update", { type: "MALDREK_DEFEAT" });
        }
    }

    /** Retourne l'état d'une quête via son identifiant unique. */
    getQuest(id) {
        return this.quests[id];
    }

    /** Vérifie si une quête a atteint l'état de complétion. */
    isCompleted(id) {
        return this.quests[id]?.state === "completed";
    }

    /** Vérifie si la collection de fragments est complète. */
    allFragmentsCollected() {
        return this.fragments[0] && this.fragments[1] && this.fragments[2];
    }

    /** Enregistre la défaite d'un Moblin et met à jour la quête correspondante. */
    registerMoblinKill(isRemote = false) {
        const q = this.quests.forest_moblins;
        if (q.state !== "active" && q.state !== "available") return;

        q.state = "active";
        q.killsCurrent++;
        console.log(`[Quête] Moblins tués: ${q.killsCurrent}/${q.killsRequired}`);

        if (q.killsCurrent >= q.killsRequired) {
            this.completeQuest("forest_moblins", isRemote);
        }

        // Diffusion réseau si source locale.
        if (!isRemote && window.game.network) {
            window.game.network.socket.emit("quest_update", { type: "MOBLIN_KILL" });
        }
    }

    /** Gère l'obtention de la clé du marais. */
    pickUpKey(isRemote = false) {
        const q = this.quests.swamp_chest;
        if (q.state === "completed" || q.hasKey) return;
        q.state = "active";
        q.hasKey = true;
        console.log("[Quête] Clé du marais obtenue !");

        if (!isRemote && window.game.network) {
            window.game.network.socket.emit("quest_update", { type: "PICK_UP_KEY" });
        }
    }

    /** Ouvre le coffre du marais si les conditions sont réunies. */
    openChest(isRemote = false) {
        const q = this.quests.swamp_chest;
        if (!q.hasKey || q.chestOpened) return false;
        q.chestOpened = true;
        this.completeQuest("swamp_chest", isRemote);

        if (!isRemote && window.game.network) {
            window.game.network.socket.emit("quest_update", { type: "OPEN_CHEST" });
        }
        return true;
    }

    /** Valide la quête des ruines après défaite du boss. */
    defeatBoss(isRemote = false) {
        const q = this.quests.ruins_boss;
        if (q.state === "completed" || q.bossDefeated) return;
        q.bossDefeated = true;
        this.completeQuest("ruins_boss", isRemote);

        if (!isRemote && window.game.network) {
            window.game.network.socket.emit("quest_update", { type: "BOSS_DEFEAT" });
        }
    }

    /** Finalise une quête et distribue la récompense (Fragment). */
    completeQuest(id, isRemote = false) {
        const q = this.quests[id];
        if (!q || q.state === "completed") return;

        q.state = "completed";

        if (q.reward === "fragment_1") this.fragments[0] = true;
        if (q.reward === "fragment_2") this.fragments[1] = true;
        if (q.reward === "fragment_3") this.fragments[2] = true;

        const count = this.fragments.filter((f) => f).length;
        console.log(`[Quête] "${q.name}" complétée ! Fragments: ${count}/3`);

        if (this.allFragmentsCollected()) {
            console.log("[Quête] TOUS LES FRAGMENTS RÉUNIS ! La forteresse est accessible !");
        }

        this.save();
    }

    /** Persistance réseau : Sauvegarde l'état des quêtes et du joueur via l'API. */
    async save() {
        const player = window.game.player;
        const data = {
            quests: this.quests,
            fragments: this.fragments,
            maldrekDefeated: this.maldrekDefeated,
            player: player ? {
                emeralds: player.emeralds,
                arrows: player.arrows,
                potions: player.potions,
                hasShield: player.hasShield,
                swordLevel: player.swordLevel,
                bowLevel: player.bowLevel,
                hp: player.hp,
                maxHp: player.maxHp,
            } : null,
            zone: window.game.zoneManager?.currentZone || "village",
        };

        try {
            await fetch("/api/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            console.log("[Save] Progression sauvegardée");
        } catch (e) {
            console.log("[Save] Erreur:", e.message);
        }
    }

    /** Restaure l'état du jeu depuis les services backend. */
    async load() {
        try {
            const res = await fetch("/api/save");
            const data = await res.json();
            if (!data || data.exists === false) return null;

            if (data.quests) this.quests = data.quests;
            if (data.fragments) this.fragments = data.fragments;
            if (data.maldrekDefeated !== undefined) this.maldrekDefeated = data.maldrekDefeated;

            return data;
        } catch (e) {
            console.log("[Save] Erreur de chargement:", e.message);
            return null;
        }
    }

    /** Purge de la sauvegarde locale/distante. */
    async resetSave() {
        try {
            await fetch("/api/save", { method: "DELETE" });
        } catch (e) {
            /* ignore */
        }
    }
}

