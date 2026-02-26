SAE402  Zelda Coop Prototype
Bienvenue sur le prototype de notre jeu d'aventure multijoueur. Ce projet utilise Node.js avec Socket.io pour la partie réseau et l'API Canvas pour le rendu graphique.

Installation Rapide

1. Cloner le projet
bash
git clone https://github.com/Kyl06/SAE402.git
cd SAE402

2. Installer les dépendances
bash
npm install

3. Lancer le serveur
bash
npm start
 ou
node server/server.js

4. Rejoindre la partie
Ouvre ton navigateur sur : http://localhost:3000

Gameplay & Commandes

 Mouvements : Touches Z, S, Q, D.
 Attaque : Touche Espace (consomme de la stamina).
 Multijoueur : Jusqu'à 4 joueurs simultanés (P1 à P4). Si le serveur est plein, l'accès est refusé.

Structure du Projet

text
SAE402/
├── public/               Fichiers clients (HTML, CSS, JS)
│   ├── assets/           Images (link.png, etc.)
│   └── src/              Logique du jeu (Engine, Entities, etc.)
├── server/               Code backend (Node.js + Socket.io)
└── README.md

À savoir pour le dev

 Système de collisions : Géré dans MapManager.js via une grille.
 Animations : Les états (walk, attack) sont synchronisés via le serveur pour que chaque joueur voie les actions des autres.
 Stamina : La barre verte se recharge automatiquement, l'attaque est bloquée si elle est vide.



C'est tout bon ! Une fois ce fichier ajouté, n'oublie pas de faire ton git add README.md, git commit et git push pour qu'ils puissent le voir.
