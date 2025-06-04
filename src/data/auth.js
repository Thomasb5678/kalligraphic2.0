// src/data/auth.js
// Configuration d'authentification pour l'administration

// ⚠️ IMPORTANT : Modifiez ces identifiants selon vos préférences
export const ADMIN_CONFIG = {
  // Identifiants de connexion
  credentials: {
    username: 'admin',              // Changez selon votre préférence
    password: 'admin123'            // Mot de passe simplifié
  },

  // Configuration de session
  session: {
    duration: 2 * 60 * 60 * 1000,   // 2 heures en millisecondes
    autoLogout: true,               // Déconnexion automatique après inactivité
    rememberSession: true           // Se souvenir de la session
  },

  // Configuration de sécurité
  security: {
    maxAttempts: 10,                // Augmenté à 10 tentatives
    lockoutDuration: 1 * 60 * 1000, // Réduit à 1 minute de verrouillage
    requireStrongPassword: false    // Exiger un mot de passe fort (pour le futur)
  }
};

// Fonction pour valider les identifiants
export const validateCredentials = (username, password) => {
  return (
    username === ADMIN_CONFIG.credentials.username &&
    password === ADMIN_CONFIG.credentials.password
  );
};

// Fonction pour vérifier la validité de la session
export const isSessionValid = () => {
  const sessionTime = localStorage.getItem('kalligraphic_admin_session');
  if (!sessionTime) return false;

  const sessionStart = parseInt(sessionTime);
  const currentTime = Date.now();
  
  return (currentTime - sessionStart) < ADMIN_CONFIG.session.duration;
};

// Fonction pour créer une nouvelle session
export const createSession = () => {
  localStorage.setItem('kalligraphic_admin_logged', 'true');
  localStorage.setItem('kalligraphic_admin_session', Date.now().toString());
};

// Fonction pour détruire la session
export const destroySession = () => {
  localStorage.removeItem('kalligraphic_admin_logged');
  localStorage.removeItem('kalligraphic_admin_session');
  localStorage.removeItem('kalligraphic_admin_attempts');
};

// Gestion des tentatives de connexion échouées
export const handleFailedAttempt = () => {
  const attempts = parseInt(localStorage.getItem('kalligraphic_admin_attempts') || '0');
  const newAttempts = attempts + 1;
  
  localStorage.setItem('kalligraphic_admin_attempts', newAttempts.toString());
  
  if (newAttempts >= ADMIN_CONFIG.security.maxAttempts) {
    localStorage.setItem('kalligraphic_admin_lockout', Date.now().toString());
    return true; // Compte verrouillé
  }
  
  return false;
};

// Vérifier si le compte est verrouillé - MODIFIÉ POUR DÉVERROUILLER
export const isAccountLocked = () => {
  // Déverrouiller le compte immédiatement
  localStorage.removeItem('kalligraphic_admin_lockout');
  localStorage.removeItem('kalligraphic_admin_attempts');
  return false; // Toujours déverrouillé
};

// Réinitialiser les tentatives après une connexion réussie
export const resetAttempts = () => {
  localStorage.removeItem('kalligraphic_admin_attempts');
  localStorage.removeItem('kalligraphic_admin_lockout');
};