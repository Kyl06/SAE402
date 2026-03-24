// Gestion des quêtes, fragments et sauvegarde
export class QuestManager {
    constructor() {
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

        this.fragments = [false, false, false];
        this.maldrekDefeated = false;
    }

    defeatMaldrek(isRemote = false) {
        if (this.maldrekDefeated) return;
        this.maldrekDefeated = true;
        this.save();
        if (!isRemote && window.game.network) {
            window.game.network.socket.emit("quest_update", { type: "MALDREK_DEFEAT" });
        }
    }

    getQuest(id) { return this.quests[id]; }
    isCompleted(id) { return this.quests[id]?.state === "completed"; }
    allFragmentsCollected() { return this.fragments[0] && this.fragments[1] && this.fragments[2]; }

    registerMoblinKill(isRemote = false) {
        const q = this.quests.forest_moblins;
        if (q.state !== "active" && q.state !== "available") return;
        q.state = "active";
        q.killsCurrent++;
        console.log(`[Quête] Moblins tués: ${q.killsCurrent}/${q.killsRequired}`);
        if (q.killsCurrent >= q.killsRequired) this.completeQuest("forest_moblins", isRemote);
        if (!isRemote && window.game.network) {
            window.game.network.socket.emit("quest_update", { type: "MOBLIN_KILL" });
        }
    }

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

    defeatBoss(isRemote = false) {
        const q = this.quests.ruins_boss;
        if (q.state === "completed" || q.bossDefeated) return;
        q.bossDefeated = true;
        this.completeQuest("ruins_boss", isRemote);
        if (!isRemote && window.game.network) {
            window.game.network.socket.emit("quest_update", { type: "BOSS_DEFEAT" });
        }
    }

    completeQuest(id, isRemote = false) {
        const q = this.quests[id];
        if (!q || q.state === "completed") return;
        q.state = "completed";
        if (q.reward === "fragment_1") this.fragments[0] = true;
        if (q.reward === "fragment_2") this.fragments[1] = true;
        if (q.reward === "fragment_3") this.fragments[2] = true;
        const count = this.fragments.filter((f) => f).length;
        console.log(`[Quête] "${q.name}" complétée ! Fragments: ${count}/3`);
        if (this.allFragmentsCollected()) console.log("[Quête] TOUS LES FRAGMENTS RÉUNIS !");
        this.save();
    }

    // Sauvegarde via API
    async save() {
        const player = window.game.player;
        const data = {
            quests: this.quests,
            fragments: this.fragments,
            maldrekDefeated: this.maldrekDefeated,
            player: player ? {
                emeralds: player.emeralds, arrows: player.arrows,
                potions: player.potions, hasShield: player.hasShield,
                swordLevel: player.swordLevel, bowLevel: player.bowLevel,
                hp: player.hp, maxHp: player.maxHp,
            } : null,
            zone: window.game.zoneManager?.currentZone || "village",
        };
        try {
            await fetch("/api/save", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        } catch (e) { console.log("[Save] Erreur:", e.message); }
    }

    // Chargement depuis API
    async load() {
        try {
            const res = await fetch("/api/save");
            const data = await res.json();
            if (!data || data.exists === false) return null;
            if (data.quests) this.quests = data.quests;
            if (data.fragments) this.fragments = data.fragments;
            if (data.maldrekDefeated !== undefined) this.maldrekDefeated = data.maldrekDefeated;
            return data;
        } catch (e) { console.log("[Save] Erreur:", e.message); return null; }
    }

    async resetSave() {
        try { await fetch("/api/save", { method: "DELETE" }); } catch (e) { /* ignore */ }
    }
}
