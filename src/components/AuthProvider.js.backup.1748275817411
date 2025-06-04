// src/components/AuthProvider.js
// Gestionnaire d'authentification pour l'administration

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Durée de session : 2 heures (en millisecondes)
  const SESSION_DURATION = 2 * 60 * 60 * 1000;

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const isLoggedIn = localStorage.getItem('kalligraphic_admin_logged');
    const sessionTime = localStorage.getItem('kalligraphic_admin_session');
    
    if (isLoggedIn === 'true' && sessionTime) {
      const sessionStart = parseInt(sessionTime);
      const currentTime = Date.now();
      
      // Vérifier si la session n'a pas expiré
      if (currentTime - sessionStart < SESSION_DURATION) {
        setIsAuthenticated(true);
      } else {
        // Session expirée
        logout();
      }
    }
    
    setIsLoading(false);
  };

  const login = () => {
    setIsAuthenticated(true);
    // La session est déjà sauvée dans localStorage par le composant Login
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('kalligraphic_admin_logged');
    localStorage.removeItem('kalligraphic_admin_session');
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;