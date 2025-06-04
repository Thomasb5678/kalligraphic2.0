// src/hooks/usePortfolioData.js
// Hook personnalisé pour récupérer les données du portfolio via API

import { useState, useEffect } from 'react';

const usePortfolioData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/data');
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const portfolioData = await response.json();
      setData(portfolioData);
      setError(null);
      
      console.log('✅ Données portfolio récupérées via API:', {
        portfolioPreview: portfolioData.portfolioPreview?.length || 0,
        portfolioFull: portfolioData.portfolioFull?.length || 0
      });
    } catch (err) {
      console.error('❌ Erreur lors du fetch des données portfolio:', err);
      setError(err.message);
      
      // Fallback vers des données par défaut
      setData({
        portfolioPreview: [],
        portfolioFull: [],
        hero: {
          main: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
          gallery: [
            'https://images.unsplash.com/photo-1626544827763-d516dce335e2',
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
            'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e',
            'https://images.unsplash.com/photo-1633158829875-e5316a358c6f',
            'https://images.unsplash.com/photo-1617791160588-241658c0f566'
          ]
        },
        about: {
          profile: '/images/45.png',
          background: '/images/about/background.jpg'
        },
        blog: [
          {
            id: 1,
            title: 'Premier article de blog',
            image: '/images/blog/default.jpg',
            excerpt: 'Un exemple d\'article pour votre blog de calligraphie',
            date: '2025-05-25',
            author: 'Administrateur',
            content: 'Contenu de l\'article...',
            tags: ['exemple', 'blog']
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fonction pour refetch les données (utile après une mise à jour)
  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default usePortfolioData;
