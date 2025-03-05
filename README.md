# MazeCLI# MazeCLI

Un générateur et un outil de résolution de labyrinthes en ligne de commande.

## 📋 Description

MazeCLI est un outil en ligne de commande permettant de générer des labyrinthes personnalisables, de trouver automatiquement le chemin de sortie et de les visualiser directement dans le terminal. Développé en JavaScript avec Node.js, il utilise des algorithmes de génération et de recherche de chemin bien connus.

## ✨ Fonctionnalités

- **Génération de labyrinthes** - Création de labyrinthes avec taille personnalisable
- **Recherche de chemin** - Trouve automatiquement le parcours entre l'entrée et la sortie
- **Visualisation dans le terminal** - Affichage coloré du labyrinthe et du chemin trouvé
- **Interface CLI intuitive** - Options de ligne de commande pour personnaliser l'expérience

## 🛠️ Technologies utilisées

- Node.js
- JavaScript
- ANSI Escape Codes pour l'affichage coloré
- Algorithmes de génération de labyrinthe (Recursive Backtracking, etc.)
- Algorithmes de recherche de chemin (A*, etc.)

## 🧩 Structure du projet

```
mazecli/
├── src/
│   ├── generators/      # Algorithmes de génération de labyrinthes
│   ├── pathfinders/     # Algorithmes de recherche de chemin
│   ├── display/         # Fonctions d'affichage dans le terminal
│   ├── models/          # Classes et modèles de données
│   └── cli.js           # Point d'entrée de l'interface de commande
├── index.js             # Point d'entrée principal
├── package.json         # Dépendances et scripts
└── README.md            # Documentation
```

## 💻 Installation

1. Clonez ce dépôt
```bash
git clone https://github.com/techmefr/MazeCLI.git
cd MazeCLI
```

2. Installez les dépendances
```bash
npm install
```

3. Installez globalement (optionnel)
```bash
npm install -g .
```

## 🎮 Utilisation

### Commande de base
```bash
mazecli generate
```

### Options disponibles
```bash
# Générer un labyrinthe de taille personnalisée
mazecli generate --width 20 --height 15

# Trouver le chemin dans un labyrinthe
mazecli path

# Générer et trouver le chemin immédiatement
mazecli generate --path

# Changer l'algorithme de génération
mazecli generate --algorithm recursive-backtracking
```

## 🧠 Algorithmes implémentés

### Génération de labyrinthes
- Recursive Backtracking
- Kruskal's Algorithm
- Prim's Algorithm

### Recherche de chemin
- A* (A-Star)
- Depth-First Search
- Breadth-First Search

## 🎨 Personnalisation

Vous pouvez personnaliser l'affichage du labyrinthe en modifiant les caractères utilisés:

```bash
mazecli generate --wall "#" --path " " --player "P" --exit "E"
```

## 🤝 Contribution

Les contributions sont les bienvenues! N'hésitez pas à:

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add some amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📝 Licence

[MIT](https://choosealicense.com/licenses/mit/)

---

Créé par [Gaëtan Compigni](https://github.com/techmefr)
