# 🔐 Configuration de l'Authentification - Kalligraphic

## 🎯 Identifiants par Défaut

**⚠️ IMPORTANT : Changez ces identifiants avant la mise en production !**

### Identifiants Actuels
- **Nom d'utilisateur :** `admin`
- **Mot de passe :** `kalligraphic2024`

## 🔧 Comment Modifier les Identifiants

### Étape 1 : Modifier le fichier de configuration
Ouvrez le fichier `src/data/auth.js` et modifiez cette section :

```javascript
export const ADMIN_CONFIG = {
  credentials: {
    username: 'votre_nom_utilisateur',     // ← Changez ici
    password: 'votre_mot_de_passe_secure'  // ← Et ici
  },
  // ... reste de la configuration
};
```

### Étape 2 : Recommandations de Sécurité

#### 📝 Nom d'utilisateur
- Évitez `admin`, `administrator`, `root`
- Utilisez quelque chose de unique : `kalligraph_admin`, `studio_manager`
- Pas d'espaces ni de caractères spéciaux

#### 🔒 Mot de passe
- **Minimum 12 caractères**
- Mélange de majuscules, minuscules, chiffres et symboles
- Évitez les mots du dictionnaire
- Exemples sécurisés :
  - `Kalli2024@Secure!`
  - `Art&Calligr@ph1c`
  - `MyStudi0#2024`

## ⚙️ Configuration de Sécurité

### Durée de Session
```javascript
session: {
  duration: 2 * 60 * 60 * 1000,  // 2 heures (modifiable)
}
```

### Protection contre les Attaques
```javascript
security: {
  maxAttempts: 3,                 // Nombre de tentatives autorisées
  lockoutDuration: 15 * 60 * 1000, // 15 minutes de verrouillage
}
```

## 🛡️ Fonctionnalités de Sécurité Incluses

### ✅ Protection par Mot de Passe
- Identifiants requis pour accéder à l'administration
- Validation côté client

### ✅ Gestion de Session
- Session automatiquement fermée après 2 heures
- Bouton de déconnexion disponible

### ✅ Protection contre les Attaques par Force Brute
- Maximum 3 tentatives de connexion
- Verrouillage de 15 minutes après échec
- Compteur de tentatives restantes

### ✅ Persistance de Session
- Session maintenue lors du rechargement de page
- Vérification automatique de validité

## 🚨 Mesures de Sécurité Supplémentaires Recommandées

### Pour un Site en Production
1. **HTTPS Obligatoire** : Utilisez toujours HTTPS
2. **Variables d'Environnement** : Stockez les identifiants dans `.env`
3. **Authentification Serveur** : Implémentez une vraie authentification backend
4. **Logs de Sécurité** : Enregistrez les tentatives de connexion

### Structure .env Recommandée
```env
REACT_APP_ADMIN_USERNAME=votre_username
REACT_APP_ADMIN_PASSWORD=votre_password_secure
```

## 📋 Checklist de Sécurité

### Avant la Mise en Production
- [ ] Identifiants modifiés
- [ ] Mot de passe sécurisé (12+ caractères)
- [ ] Tests de connexion effectués
- [ ] Documentation mise à jour
- [ ] Sauvegarde des nouveaux identifiants

### Tests à Effectuer
- [ ] Connexion avec bons identifiants ✅
- [ ] Connexion avec mauvais identifiants ❌
- [ ] Test de verrouillage après 3 échecs
- [ ] Test de déconnexion automatique
- [ ] Test de persistance de session

## 🔄 Processus de Changement d'Identifiants

### Étapes Détaillées
1. **Sauvegardez** votre configuration actuelle
2. **Modifiez** `src/data/auth.js`
3. **Testez** la nouvelle configuration
4. **Documentez** les nouveaux identifiants en sécurité
5. **Redémarrez** l'application

### Script de Test
```bash
# Lancer l'application
npm start

# Aller sur http://localhost:3000/admin
# Tester avec nouveaux identifiants
```

## 🔗 Accès à l'Administration

### URL d'Accès
```
http://localhost:3000/admin
```

### En Production
```
https://votre-domaine.com/admin
```

## 📞 Que Faire en Cas de Problème

### Identifiants Oubliés
1. Consultez le fichier `src/data/auth.js`
2. Vérifiez vos notes de sécurité
3. Modifiez si nécessaire et redémarrez

### Compte Verrouillé
- Attendez 15 minutes OU
- Effacez le localStorage du navigateur :
  ```javascript
  localStorage.clear()
  ```

### Session Expirée
- Reconnectez-vous normalement
- La session dure 2 heures par défaut

## 💡 Conseils de Bonnes Pratiques

### 🔐 Sécurité
- Changez régulièrement les mots de passe
- Ne partagez jamais vos identifiants
- Déconnectez-vous après chaque utilisation
- Utilisez un gestionnaire de mots de passe

### 💻 Utilisation
- Testez toujours après modification
- Gardez une sauvegarde des identifiants
- Documentez les changements
- Vérifiez régulièrement les accès

## ⚠️ Avertissements Importants

### Sécurité Client-Side
Cette authentification est côté client uniquement. Pour une sécurité renforcée en production :
- Implémentez une authentification serveur
- Utilisez JWT ou sessions serveur
- Ajoutez du chiffrement
- Configurez HTTPS

### Limitations Actuelles
- Identifiants stockés dans le code
- Validation côté client uniquement
- Pas de chiffrement des mots de passe
- Session en localStorage

---

## 🎯 Résumé Rapide

### Identifiants Actuels
- **Username:** `admin`
- **Password:** `kalligraphic2024`

### Pour Modifier
1. Éditez `src/data/auth.js`
2. Changez username et password
3. Redémarrez l'application
4. Testez la connexion

### Accès
- **URL:** `http://localhost:3000/admin`
- **Sécurité:** 3 tentatives max, verrouillage 15min
- **Session:** 2 heures d'inactivité

**🎨 Votre administration est maintenant sécurisée !**