// src/components/PortfolioSync.js
// Composant qui synchronise les données via API au lieu de localStorage

import React, { useState, useEffect } from 'react';
import usePortfolioData from '../hooks/usePortfolioData';

const PortfolioSync = ({ children }) => {
  const { data: portfolioData, loading, error, refetch } = usePortfolioData();
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    // Vérifier périodiquement s'il y a des mises à jour (toutes les 3 secondes)
    const interval = setInterval(() => {
      refetch();
      setLastUpdate(Date.now());
    }, 3000);

    // Écouter les événements personnalisés pour les mises à jour immédiates
    const handlePortfolioUpdate = () => {
      console.log('✅ Événement de mise à jour portfolio détecté, refetch des données...');
      setTimeout(() => refetch(), 500); // Léger délai pour laisser le serveur écrire
    };

    window.addEventListener('portfolioUpdated', handlePortfolioUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener('portfolioUpdated', handlePortfolioUpdate);
    };
  }, [refetch]);

  // Cloner les enfants en passant les données synchronisées
  return React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { 
        syncedImages: portfolioData,
        loading,
        error,
        lastUpdate 
      });
    }
    return child;
  });
};

export default PortfolioSync;