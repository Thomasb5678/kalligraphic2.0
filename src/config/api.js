// src/config/api.js
// Configuration centralisée pour les appels API

const API_CONFIG = {
  // Configuration des ports
  PORTS: {
    REACT_DEV: 3000,     // Port React en développement
    API_SERVER: 3001,    // Port du serveur API
    PROD_SERVER: 3001    // Port en production (tout en un)
  },
  
  // Détection automatique de l'environnement et du port API
  getApiBaseUrl: () => {
    const currentPort = window.location.port;
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    
    // Si on est sur le port React (3000), l'API est sur 3001
    if (currentPort === '3000') {
      return `${protocol}//${hostname}:${API_CONFIG.PORTS.API_SERVER}`;
    }
    
    // Sinon, l'API est sur le même port (mode production)
    return `${protocol}//${hostname}:${currentPort}`;
  },
  
  // URLs des endpoints
  ENDPOINTS: {
    DATA_UPDATE: '/api/data/update',
    PROJECTS: '/api/projects',
    AUTH: '/api/auth'
  }
};

// Fonction utilitaire pour construire les URLs complètes
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.getApiBaseUrl()}${endpoint}`;
};

// Export de la configuration
export default API_CONFIG;

// Fonction de diagnostic pour debug
export const diagnosticApi = () => {
  const currentUrl = window.location.href;
  const apiBaseUrl = API_CONFIG.getApiBaseUrl();
  
  console.group('🔧 DIAGNOSTIC API KALLIGRAPHIC');
  console.log('📍 URL actuelle:', currentUrl);
  console.log('🌐 Port actuel:', window.location.port);
  console.log('🔗 Base URL API:', apiBaseUrl);
  console.log('📡 Endpoint data/update:', buildApiUrl(API_CONFIG.ENDPOINTS.DATA_UPDATE));
  console.groupEnd();
  
  return {
    currentUrl,
    apiBaseUrl,
    dataUpdateUrl: buildApiUrl(API_CONFIG.ENDPOINTS.DATA_UPDATE)
  };
};
