# Kalligraphic - Gestion de Portfolio Sécurisée

## À propos
Kalligraphic est une application de gestion de portfolio sécurisée, conçue pour permettre aux professionnels de présenter leurs projets en ligne.

## Fonctionnalités
- Affichage des projets sur une interface moderne
- Gestion sécurisée des projets (ajout, modification, suppression)
- Authentification des utilisateurs
- API RESTful sécurisée
- Sauvegarde automatique des données

## Installation

### Prérequis
- Node.js (v14.0.0 ou supérieur)
- npm (v6.0.0 ou supérieur)

### Étapes d'installation
1. Clonez ce dépôt
2. Installez les dépendances : `npm install`
3. Configurez les variables d'environnement dans le fichier `.env`
4. Lancez l'application en mode développement : `npm run dev`

## Utilisation
- Mode développement : Exécutez `dev.bat` ou `npm run dev`
- Mode production : Exécutez `demarrer.bat` ou `npm run prod:win`

## Sécurité
Cette application implémente plusieurs couches de sécurité :
- Authentification JWT
- Protection contre les attaques XSS
- Limitation de débit (rate limiting)
- Validation des données
- Protection CORS
- En-têtes de sécurité HTTP
- Journalisation des événements

## Structure du projet
```
kalligraphic/
├── build/               # Fichiers de production compilés
├── config/              # Fichiers de configuration
├── controllers/         # Contrôleurs de l'API
├── logs/                # Journaux d'application
├── middlewares/         # Middlewares Express
├── models/              # Modèles de données
├── public/              # Fichiers statiques publics
├── routes/              # Routes de l'API
├── src/                 # Code source React
│   ├── components/      # Composants React
│   ├── data/            # Données de l'application
│   │   └── backups/     # Sauvegardes automatiques
│   ├── pages/           # Pages de l'application
│   └── styles/          # Styles CSS/SCSS
├── .env                 # Variables d'environnement
├── package.json         # Dépendances et scripts
├── server.js            # Serveur Express principal
└── README.md            # Documentation
```

## API Documentation
L'API fournit les endpoints suivants :

### Authentification
- `POST /api/auth/login` - Connexion utilisateur
- `GET /api/auth/verify` - Vérification du token JWT
- `POST /api/auth/change-password` - Changement de mot de passe

### Projets
- `GET /api/projects` - Récupération de tous les projets
- `GET /api/projects/:id` - Récupération d'un projet par ID
- `POST /api/projects` - Ajout d'un projet (authentification requise)
- `PUT /api/projects/:id` - Modification d'un projet (authentification requise)
- `DELETE /api/projects/:id` - Suppression d'un projet (authentification requise)

## Licence
Tous droits réservés.
