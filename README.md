# Kalligraphic - Site Web React

Ce projet est un site web React moderne pour l'agence de communication visuelle Kalligraphic. La landing page présente les services et le portfolio de l'agence avec des animations élégantes et un design responsive.

## Fonctionnalités

- Design moderne et responsive adapté à tous les appareils
- Animations fluides à l'aide de Framer Motion et GSAP
- Intégration de Tailwind CSS pour un styling flexible
- Formulaire de contact interactif
- Navigation fluide entre les sections
- Optimisé pour le SEO

## Technologies utilisées

- React.js
- Framer Motion (animations)
- GSAP (animations avancées)
- Tailwind CSS (framework CSS)
- React Intersection Observer (animations au scroll)
- Responsive Design

## Installation

Suivez ces instructions pour installer et lancer le projet sur votre machine locale.

### Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn

### Installation

1. Ouvrez un terminal dans le dossier du projet et installez les dépendances :

```bash
npm install
# ou
yarn install
```

2. Lancez le serveur de développement :

```bash
npm start
# ou
yarn start
```

3. Ouvrez votre navigateur à l'adresse [http://localhost:3000](http://localhost:3000) pour voir le site.

## Structure du projet

```
kalligraphic/
├── public/                # Fichiers publics
│   ├── index.html         # Page HTML principale
│   └── manifest.json      # Manifest pour PWA
├── src/                   # Code source
│   ├── assets/            # Images et ressources
│   ├── components/        # Composants React
│   │   ├── Header.js      # Navigation et en-tête
│   │   ├── Hero.js        # Section d'accueil
│   │   ├── Services.js    # Section des services
│   │   ├── About.js       # Section à propos
│   │   ├── Portfolio.js   # Section portfolio
│   │   ├── Contact.js     # Formulaire de contact
│   │   └── Footer.js      # Pied de page
│   ├── styles/            # Fichiers CSS
│   │   └── index.css      # Styles CSS principaux avec Tailwind
│   ├── App.js             # Composant principal
│   └── index.js           # Point d'entrée React
├── package.json           # Dépendances et scripts
└── tailwind.config.js     # Configuration de Tailwind CSS
```

## Personnalisation

Vous pouvez personnaliser facilement le site en modifiant les fichiers suivants :

- `tailwind.config.js` - Pour les couleurs, polices et styles personnalisés
- Composants dans le dossier `src/components/` - Pour modifier les sections
- `src/styles/index.css` - Pour les styles CSS spécifiques

## Déploiement

Pour construire le projet pour la production :

```bash
npm run build
# ou
yarn build
```

Le résultat de la construction se trouvera dans le dossier `build/`, prêt à être déployé sur n'importe quel hébergement statique (Netlify, Vercel, GitHub Pages, etc.).