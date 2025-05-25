# 🎨 Guide de Gestion de Contenu - Kalligraphic

## 📋 Vue d'ensemble

Ce système vous permet de gérer facilement le contenu de votre site de calligraphie sans avoir besoin de connaissances techniques approfondies. Tout est centralisé dans des fichiers faciles à modifier.

## 🗂️ Structure des Fichiers

```
kalligraphic/
├── src/
│   ├── data/
│   │   └── data.js          # ⭐ FICHIER PRINCIPAL - Toutes vos données
│   ├── components/
│   │   ├── BlogManager.js   # Gestionnaire d'articles de blog
│   │   └── PortfolioManager.js # Gestionnaire de portfolio
│   └── pages/
│       └── AdminPage.js     # Interface d'administration
└── public/
    └── images/              # 📁 Toutes vos images
        ├── hero-image.png   # Images de la page d'accueil
        ├── hero-image1.png à hero-image6.png
        ├── 45.png          # Photo de profil
        ├── logo.png
        ├── about/          # Images section "À propos"
        ├── portfolio/      # Images des projets
        │   ├── projet1/
        │   ├── projet2/
        │   └── projet3/
        └── blog/          # Images des articles
```

## 🚀 Comment Utiliser

### 1. 📸 Changer les Images de la Page d'Accueil

1. **Ajoutez vos nouvelles images** dans `public/images/`
2. **Modifiez le fichier** `src/data/data.js`
3. **Changez les chemins** dans la section `images.hero` :

```javascript
hero: {
  main: '/images/votre-nouvelle-image-principale.jpg',
  gallery: [
    '/images/votre-image1.jpg',
    '/images/votre-image2.jpg',
    // Ajoutez autant d'images que vous voulez
  ]
}
```

### 2. 👤 Modifier la Section "À Propos"

Dans `src/data/data.js`, section `images.about` :

```javascript
about: {
  profile: '/images/about/votre-photo.jpg',        # Votre photo
  background: '/images/about/arriere-plan.jpg'     # Image de fond
}
```

### 3. 🎨 Gérer le Portfolio

**Option A - Interface Graphique (Recommandé) :**
1. Accédez à votre page d'administration : `http://localhost:3000/admin`
2. Cliquez sur "🎨 Gestion Portfolio"
3. Remplissez le formulaire pour ajouter un projet
4. Copiez le code généré et remplacez-le dans `data.js`

**Option B - Manuel :**
Modifiez directement `src/data/data.js` sections `portfolioPreview` et `portfolioFull`

### 4. ✍️ Ajouter des Articles de Blog

**Option A - Interface Graphique (Recommandé) :**
1. Accédez à votre page d'administration : `http://localhost:3000/admin`
2. Cliquez sur "📝 Gestion Blog"
3. Remplissez le formulaire pour créer un article
4. Copiez le code généré et remplacez-le dans `data.js`

**Option B - Manuel :**
Ajoutez un nouvel article dans `src/data/data.js`, section `images.blog`

## 🔧 Accès à l'Administration

Pour accéder à l'interface d'administration, vous devez d'abord l'ajouter à votre App.js :

### Étape 1 : Modifier App.js

La route d'administration est déjà ajoutée dans votre App.js :
```javascript
<Route path="/admin" element={<AdminPage />} />
```

### Étape 2 : Accéder à l'Administration avec Authentification

Démarrez votre serveur :
```bash
npm start
```

Puis allez sur : `http://localhost:3000/admin`

**🔐 Identifiants de connexion :**
- **Nom d'utilisateur :** `admin`
- **Mot de passe :** `kalligraphic2024`

⚠️ **IMPORTANT :** Modifiez ces identifiants dans `src/data/auth.js` avant la mise en production !

## 📁 Organisation des Images

### Nommage Recommandé
- **Pas d'espaces** : `mon-projet.jpg` ✅, `mon projet.jpg` ❌
- **Pas de caractères spéciaux** : `projet-1.jpg` ✅, `projet@1.jpg` ❌
- **Noms descriptifs** : `calligraphie-mariage.jpg` ✅, `img1.jpg` ❌

### Tailles Recommandées
- **Images Hero** : 1920x1080px
- **Images Portfolio** : 800x600px
- **Images Blog** : 600x400px
- **Photo de profil** : 400x400px

### Formats
- **JPG** : pour les photos
- **PNG** : pour les logos ou images avec transparence

## 🔄 Processus de Mise à Jour

### Pour Changer une Image :
1. ✅ Ajoutez votre nouvelle image dans le bon dossier
2. ✅ Modifiez le chemin dans `data.js`
3. ✅ Redémarrez votre serveur (`npm start`)
4. ✅ Vérifiez que l'image s'affiche

### Pour Ajouter du Contenu :
1. ✅ Utilisez l'interface d'administration
2. ✅ Copiez le code généré
3. ✅ Remplacez dans `data.js`
4. ✅ Redémarrez votre serveur

## 💡 Conseils et Astuces

### Optimisation des Images
- Compressez vos images avant de les ajouter
- Utilisez des outils comme TinyPNG ou Squoosh
- Gardez les fichiers sous 1MB si possible

### Sauvegarde
- Faites une copie de votre fichier `data.js` avant les modifications
- Sauvegardez régulièrement votre dossier `public/images/`

### Résolution de Problèmes
- **Image qui ne s'affiche pas** : Vérifiez le chemin dans `data.js`
- **Changements non visibles** : Redémarrez le serveur
- **Erreur de syntaxe** : Vérifiez les guillemets et virgules dans `data.js`

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez que tous les chemins d'images sont corrects
2. Assurez-vous que le serveur est redémarré
3. Consultez la console du navigateur pour les erreurs

## 🎯 Prochaines Étapes

1. **Testez le système** en ajoutant un article de blog
2. **Organisez vos images** dans les bons dossiers
3. **Personnalisez le contenu** selon vos besoins
4. **Sauvegardez régulièrement** vos modifications

---

**🎨 Bon travail avec votre site Kalligraphic !** 

Ce système vous donnera un contrôle total sur votre contenu tout en restant simple à utiliser.