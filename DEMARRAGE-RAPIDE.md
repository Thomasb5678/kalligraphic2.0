# 🚀 Instructions Rapides - Kalligraphic

## ⚡ Démarrage Rapide

1. **Lancer le serveur :**
   ```bash
   npm start
   ```

2. **Accéder à l'administration :**
   - Ouvrez votre navigateur
   - Allez sur : `http://localhost:3000/admin`
   - **Identifiants :** `admin` / `kalligraphic2024`

## 🎯 Actions Principales

### 📸 Changer une Image de la Page d'Accueil
1. Ajoutez votre image dans `public/images/`
2. Modifiez `src/data/data.js` → `images.hero.main`
3. Redémarrez le serveur

### ✍️ Ajouter un Article de Blog
1. Allez sur `http://localhost:3000/admin`
2. Onglet "📝 Gestion Blog"
3. Remplissez le formulaire
4. Copiez le code et remplacez dans `data.js`

### 🎨 Ajouter un Projet Portfolio
1. Allez sur `http://localhost:3000/admin`
2. Onglet "🎨 Gestion Portfolio"
3. Remplissez le formulaire
4. Copiez le code et remplacez dans `data.js`

## 📁 Où Placer les Images

```
public/images/
├── hero-image.png          # Image principale page d'accueil
├── hero-image1.png         # Images galerie
├── 45.png                  # Photo de profil
├── about/                  # Images section À propos
├── portfolio/              # Images projets
└── blog/                   # Images articles
```

## 🔧 Fichiers Importants

- **`src/data/data.js`** → 🎯 PRINCIPAL - Toutes vos données
- **`public/images/`** → 📁 Toutes vos images
- **`http://localhost:3000/admin`** → 🛠️ Interface d'administration

## ⚠️ Points Importants

1. **Toujours redémarrer** le serveur après modification de `data.js`
2. **Noms d'images sans espaces** : `mon-projet.jpg` ✅
3. **Faire une sauvegarde** avant modifications importantes
4. **Optimiser les images** avant de les ajouter

---

**🎨 Bon travail !** Votre système de gestion est maintenant opérationnel.