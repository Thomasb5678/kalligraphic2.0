// src/utils/api-client.js
// Client pour communiquer avec l'API sécurisée

const API_URL = 'http://localhost:3001/api';

/**
 * Fonction pour se connecter à l'API
 * @param {string} username - Nom d'utilisateur
 * @param {string} password - Mot de passe
 * @returns {Promise} Promesse contenant le résultat de la connexion
 */
export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Stocker le token dans le localStorage
      localStorage.setItem('kalligraphic_token', data.token);
      return { success: true, user: data.user };
    }
    
    return { success: false, message: data.message || 'Erreur de connexion' };
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return { success: false, message: 'Erreur de connexion au serveur' };
  }
};

/**
 * Fonction pour vérifier si l'utilisateur est authentifié
 * @returns {boolean} true si l'utilisateur est authentifié, false sinon
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('kalligraphic_token');
};

/**
 * Fonction pour récupérer le token d'authentification
 * @returns {string|null} Token d'authentification ou null si non connecté
 */
export const getAuthToken = () => {
  return localStorage.getItem('kalligraphic_token');
};

/**
 * Fonction pour se déconnecter
 */
export const logout = () => {
  localStorage.removeItem('kalligraphic_token');
};

/**
 * Fonction pour ajouter un projet
 * @param {Object} project - Données du projet à ajouter
 * @returns {Promise} Promesse contenant le résultat de l'ajout
 */
export const addProject = async (project) => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      return { success: false, message: 'Non authentifié' };
    }
    
    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(project)
    });
    
    const data = await response.json();
    
    return {
      success: response.ok,
      message: data.message || (response.ok ? 'Projet ajouté avec succès' : 'Erreur lors de l\'ajout du projet'),
      data: data.data
    };
  } catch (error) {
    console.error('Erreur lors de l\'ajout du projet:', error);
    return { success: false, message: 'Erreur de communication avec le serveur' };
  }
};

/**
 * Fonction pour supprimer un projet
 * @param {number} id - ID du projet à supprimer
 * @returns {Promise} Promesse contenant le résultat de la suppression
 */
export const deleteProject = async (id) => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      return { success: false, message: 'Non authentifié' };
    }
    
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    return {
      success: response.ok,
      message: data.message || (response.ok ? 'Projet supprimé avec succès' : 'Erreur lors de la suppression du projet')
    };
  } catch (error) {
    console.error('Erreur lors de la suppression du projet:', error);
    return { success: false, message: 'Erreur de communication avec le serveur' };
  }
};

/**
 * Solution temporaire pour la compatibilité avec l'ancienne API
 * Cette fonction émule l'ancienne API pour la transition
 */
export const saveData = async (dataContent) => {
  try {
    // Pour l'instant, nous allons utiliser une approche basée sur le stockage local
    // pour ne pas perturber le fonctionnement actuel
    console.log('Sauvegarde des données dans le stockage local');
    localStorage.setItem('kalligraphic_data_backup', dataContent);
    
    // Cette fonction est normalement appelée quand l'API échoue
    // donc nous retournons une erreur pour que le code de secours s'exécute
    return { success: false, message: 'Utilisation du mode de secours pour la sauvegarde' };
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données:', error);
    return { success: false, message: 'Erreur lors de la sauvegarde des données' };
  }
};

/**
 * Fonction pour mettre à jour un projet
 * @param {number} id - ID du projet à mettre à jour
 * @param {Object} updates - Données à mettre à jour
 * @returns {Promise} Promesse contenant le résultat de la mise à jour
 */
export const updateProject = async (id, updates) => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      return { success: false, message: 'Non authentifié' };
    }
    
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updates)
    });
    
    const data = await response.json();
    
    return {
      success: response.ok,
      message: data.message || (response.ok ? 'Projet mis à jour avec succès' : 'Erreur lors de la mise à jour du projet'),
      data: data.data
    };
  } catch (error) {
    console.error('Erreur lors de la mise à jour du projet:', error);
    return { success: false, message: 'Erreur de communication avec le serveur' };
  }
};

/**
 * Fonction pour récupérer tous les projets
 * @returns {Promise} Promesse contenant la liste des projets
 */
export const getAllProjects = async () => {
  try {
    const response = await fetch(`${API_URL}/projects`);
    
    const data = await response.json();
    
    return {
      success: response.ok,
      message: data.message || (response.ok ? 'Projets récupérés avec succès' : 'Erreur lors de la récupération des projets'),
      data: data.data
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    return { success: false, message: 'Erreur de communication avec le serveur' };
  }
};

/**
 * Solution temporaire pour la compatibilité avec l'ancienne API
 */
export const readData = async () => {
  try {
    // Charger les données depuis le fichier data.js (via une simulation)
    return localStorage.getItem('kalligraphic_data_backup') || null;
  } catch (error) {
    console.error('Erreur lors de la lecture des données:', error);
    return null;
  }
};
