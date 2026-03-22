/**
 * @file QuestManager.js
 * @description Gere les quetes du jeu. Chaque quete a un id, un etat, et des conditions de completion.
 */

export class QuestManager {
    constructor() {
        // Etats possibles : 'locked', 'available', 'active', 'completed'
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
    }

    /**
     * Retourne l'etat d'une quete.
     */
    getQuest(id) {
        return this.quests[id];
    }

    /**
     * Verifie si une quete est completee.
     */
    isCompleted(id) {
        return this.quests[id]?.state === 'completed';
    }

    /**
     * Verifie si les 3 fragments sont reunis.
     */
    allFragmentsCollected() {
        return this.fragments[0] && this.fragments[1] && this.fragments[2];
    }

    /**
     * Enregistre un kill de moblin dans la foret.
     */
    registerMoblinKill() {
        const q = this.quests.forest_moblins;
        if (q.state !== 'active' && q.state !== 'available') return;

        q.state = 'active';
        q.killsCurrent++;
        console.log(`[Quete] Moblins tues: ${q.killsCurrent}/${q.killsRequired}`);

        if (q.killsCurrent >= q.killsRequired) {
            this.completeQuest('forest_moblins');
        }
    }

    /**
     * Le joueur a trouve la cle du marais.
     */
    pickUpKey() {
        const q = this.quests.swamp_chest;
        if (q.state === 'completed') return;
        q.state = 'active';
        q.hasKey = true;
        console.log('[Quete] Cle du marais obtenue !');
    }

    /**
     * Le joueur ouvre le coffre du marais.
     */
    openChest() {
        const q = this.quests.swamp_chest;
        if (!q.hasKey || q.chestOpened) return false;
        q.chestOpened = true;
        this.completeQuest('swamp_chest');
        return true;
    }

    /**
     * Le mini-boss des ruines est vaincu.
     */
    defeatBoss() {
        const q = this.quests.ruins_boss;
        if (q.state === 'completed') return;
        q.bossDefeated = true;
        this.completeQuest('ruins_boss');
    }

    /**
     * Complete une quete et attribue le fragment.
     */
    completeQuest(id) {
        const q = this.quests[id];
        if (!q || q.state === 'completed') return;

        q.state = 'completed';

        // Attribuer le fragment
        if (q.reward === 'fragment_1') this.fragments[0] = true;
        if (q.reward === 'fragment_2') this.fragments[1] = true;
        if (q.reward === 'fragment_3') this.fragments[2] = true;

        const count = this.fragments.filter(f => f).length;
        console.log(`[Quete] "${q.name}" completee ! Fragments: ${count}/3`);

        if (this.allFragmentsCollected()) {
            console.log('[Quete] TOUS LES FRAGMENTS REUNIS ! La forteresse est accessible !');
        }

        // Sauvegarde automatique
        this.save();
    }

    /**
     * Sauvegarde la progression sur le serveur.
     */
    async save() {
        const player = window.game.player;
        const data = {
            quests: this.quests,
            fragments: this.fragments,
            player: player ? {
                emeralds: player.emeralds,
                arrows: player.arrows,
                potions: player.potions,
                hasShield: player.hasShield,
                swordLevel: player.swordLevel,
                bowLevel: player.bowLevel,
                hp: player.hp
            } : null,
            zone: window.game.zoneManager?.currentZone || 'village'
        };

        try {
            await fetch('/api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            console.log('[Save] Progression sauvegardee');
        } catch (e) {
            console.log('[Save] Erreur:', e.message);
        }
    }

    /**
     * Charge une sauvegarde depuis le serveur.
     * @returns {Object|null} Donnees de sauvegarde ou null
     */
    async load() {
        try {
            const res = await fetch('/api/save');
            const data = await res.json();
            if (!data || data.exists === false) return null;

            // Restaurer les quetes
            if (data.quests) this.quests = data.quests;
            if (data.fragments) this.fragments = data.fragments;

            return data;
        } catch (e) {
            console.log('[Save] Erreur de chargement:', e.message);
            return null;
        }
    }

    /**
     * Supprime la sauvegarde (nouvelle partie).
     */
    async resetSave() {
        try {
            await fetch('/api/save', { method: 'DELETE' });
        } catch (e) { /* ignore */ }
    }
}
