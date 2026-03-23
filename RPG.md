## Contexte du projet

Ce projet est un jeu multijoueur coop (2 joueurs) de type RPG action rétro-gaming 2D, basé sur une base de code existante (style Zelda). Le moteur de jeu custom est déjà fonctionnel avec : game loop 60 FPS, système d'entités, collision AABB, animation par sprite sheets, multijoueur via Socket.io (architecture host/client), 2 types d'ennemis (Moblin, Octorok), armes (épée/arc), items (coeurs, émeraudes), HUD, et 2 maps.

## Cahier des charges technique (STRICT — ne rien ajouter)

- **Frontend** : HTML5, CSS3, JavaScript Vanilla uniquement (aucun framework/bibliothèque)
- **Graphismes** : API Canvas exclusivement
- **Backend** : Node.js + Express
- **Temps réel** : Socket.io
- **Échanges** : JSON
- **Interdit** : Phaser, React, Vue, ou toute bibliothèque haut niveau

## Plan du jeu à implémenter

### Histoire
Un sorcier maléfique nommé **Maldrek** a volé la **Relique Sacrée** du village. Le chemin vers sa forteresse (au nord) est bloqué par une **barrière magique** qui ne peut être brisée qu'en réunissant **3 fragments de cristal** dispersés dans les zones latérales.

### Structure du monde (5 zones)

```
        [Zone Finale - Forteresse de Maldrek]
                      ↑
  [Zone Ouest]  ← [Village] →  [Zone Est]
                      ↓
                [Zone Sud - Forêt]
```

- **Village** (centre) : PNJ, marchand, point de départ
- **Zone Sud** (forêt) : Quête "Tue les moblins" → Fragment 1
- **Zone Ouest** (marais) : Quête "Trouve la clé du coffre" → Fragment 2
- **Zone Est** (ruines) : Quête "Élimine le mini-boss" → Fragment 3
- **Zone Finale** (forteresse) : Se débloque avec les 3 fragments → Boss Maldrek

### Transitions entre zones
En marchant vers le bord de la map (style Zelda NES).

### PNJ
- **Ancien du village** : Donne la quête principale, explique l'histoire
- **Marchand** : Vend potions, épée améliorée, arc amélioré, bouclier (monnaie = émeraudes déjà en jeu)
- **3 PNJ guides** (un par zone latérale) : Donnent les quêtes pour obtenir les fragments

### Équipement & Inventaire
- **Épée de base** → **Épée en fer** (+ dégâts)
- **Arc de base** → **Arc long** (+ portée)
- **Bouclier** : Réduit les dégâts reçus
- **Potions de soin** : Restaurent des coeurs
- **Monnaie** : Émeraudes existantes
- Obtention : coffres sur la map, récompenses de quêtes, achat chez le marchand (PAS de drop d'ennemis)

### Stamina (endurance)
- Barre verte affichée sous les coeurs
- Chaque attaque (épée/arc) consomme de la stamina
- Régénération automatique quand on n'attaque pas
- Si vide → impossible d'attaquer pendant quelques secondes

### Quêtes
- **Obligatoires** pour progresser et débloquer les zones suivantes
- Types : tuer X ennemis, trouver un objet/clé, vaincre un mini-boss

### Boss Final — Maldrek
- Humanoïde, plus grand que les ennemis normaux
- Patterns d'attaque : charge à l'épée + projectiles magiques
- Plusieurs phases (accélère quand il perd de la vie)
- Les 2 joueurs doivent coopérer pour le battre

### Sauvegarde
- Progression sauvegardée côté serveur (quêtes complétées, inventaire, fragments)
- Option "Nouvelle partie" pour reset

## Assets nécessaires (sprites pixel-art 16x16 sauf indication contraire)

1. **PNJ** — Sprite sheet villageois (ancien, marchand, guides), 4 directions, animation idle
2. **Maldrek (boss)** — Sprite humanoïde plus grand (32x32 ou 16x32), 4 directions, animation attaque
3. **Tilesets supplémentaires** — Tuiles pour marais, ruines, forteresse (le tileset actuel couvre herbe/arbres/eau/murs)
4. **Objets UI** — Icônes pour : potion, épée améliorée, arc amélioré, bouclier, fragment de cristal
5. **Coffre** — Sprite ouvert/fermé
6. **Barrière magique** — Tuiles pour le blocage au nord du village
7. **Barre de stamina** — Élément UI

## Structure actuelle du projet

```
SAE402-master/
├── server.js                    # Express + Socket.io
├── package.json                 # express, socket.io
├── public/
│   ├── index.html               # Menu + UI
│   ├── main.js                  # Entry point
│   ├── constants.js             # Constantes globales
│   ├── assets/                  # Sprites PNG (link1, link2, moblin, octorok, sword, arrow, etc.)
│   ├── engine/                  # GameEngine, Entity, Assets, InputHandler, Animator, NetworkUpdater, etc.
│   ├── entities/
│   │   ├── Player/              # Player.js, NetworkPlayer.js, PlayerActions.js
│   │   ├── Enemies/             # Moblin.js, Octorok.js + versions Network
│   │   ├── Weapons/             # Sword.js, Arrow.js
│   │   ├── Items/               # Heart.js, Emerald.js
│   │   └── Effects/             # Explosion.js
│   ├── ui/                      # BottomBar.js, Hearts.js
│   └── world/                   # Map.js, Floor.js, maps/level1.js, level2.js
```

## Instruction

En te basant sur le code existant dans ce projet et sur le plan ci-dessus, implémente le jeu RPG. Respecte strictement le cahier des charges technique. Demande-moi les assets dont tu as besoin au fur et à mesure.
