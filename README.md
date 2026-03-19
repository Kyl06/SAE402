# ⚔ SAE402 - Zelda Coop Prototype

Bienvenue sur le prototype de notre jeu d'aventure multijoueur. Ce projet utilise **Node.js** avec **Socket.io** pour la synchronisation en temps réel et l'**API Canvas** pour un rendu graphique pixel-art fluide.

## 🚀 Installation Rapide

1. **Cloner le projet**
   ```bash
   git clone https://github.com/Kyl06/SAE402.git
   cd SAE402
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur**
   ```bash
   npm start
   ```

4. **Rejoindre la partie**
   Ouvre ton navigateur sur : [http://localhost:3000](http://localhost:3000)

## 🎮 Gameplay & Commandes

- **Menu de démarrage** : Choisissez votre rôle (Joueur 1 = Hôte, Joueur 2 = Client).
- **Mouvements** : Touches fléchées (← → ↑ ↓).
- **Attaque Épée** : Touche **Z**.
- **Tir à l'arc** : Touche **X**.
- **Multijoueur** : Le Joueur 1 (Hôte) gère l'IA des ennemis. Le Joueur 2 (Client) voit les ennemis synchronisés par le réseau.

## 📁 Structure du Projet

```text
SAE402/
├── public/
│   ├── assets/           # Sprites et sons
│   ├── engine/           # Moteur maison (Physique, Rendu, Réseau)
│   ├── entities/         # Joueurs, Ennemis, Armes, Items
│   ├── ui/               # HUD (Barre de vie)
│   └── world/            # Cartes et collisions
├── server.js             # Serveur Node.js + Relais Socket.io
└── map-converter.js      # Outil de génération de maps
```

## 🛠 À savoir pour le développement

- **Documentation** : Le code source est intégralement commenté pour expliquer chaque module (Physique AABB, lissage réseau, IA de patrouille).
- **Système de collisions** : Géré dans `Floor.js` via une séparation sur l'axe de moindre pénétration.
- **Animations** : Les séquences d'actions sont synchronisées via `NetworkUpdater.js`.
- **Éditeur de Map** : Un outil visuel est disponible sur [/map-editor.html](http://localhost:3000/map-editor.html) pour créer de nouvelles zones.

---
*Projet réalisé dans le cadre de la SAE 402.*
