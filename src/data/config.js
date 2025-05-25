// src/data/config.js
// Configuration générale du site - Modifiez ces valeurs selon vos besoins

export const siteConfig = {
  // Informations de base
  siteName: 'Kalligraphic',
  siteDescription: 'L\'art de la calligraphie moderne',
  siteUrl: 'https://kalligraphic.com',
  
  // Informations de contact
  contact: {
    email: 'contact@kalligraphic.com',
    phone: '+33 1 23 45 67 89',
    address: 'Paris, France',
    socialMedia: {
      instagram: 'https://instagram.com/kalligraphic',
      facebook: 'https://facebook.com/kalligraphic',
      twitter: 'https://twitter.com/kalligraphic'
    }
  },

  // Configuration des images
  imageSettings: {
    formats: {
      hero: { width: 1920, height: 1080, format: 'jpg' },
      portfolio: { width: 800, height: 600, format: 'jpg' },
      blog: { width: 600, height: 400, format: 'jpg' },
      profile: { width: 400, height: 400, format: 'jpg' }
    },
    maxSizes: {
      hero: '2MB',
      portfolio: '1MB',
      blog: '500KB',
      profile: '300KB'
    }
  },

  // Configuration du blog
  blogSettings: {
    postsPerPage: 6,
    showExcerpt: true,
    showAuthor: true,
    showDate: true,
    showTags: true
  },

  // Configuration du portfolio
  portfolioSettings: {
    projectsPerPage: 9,
    categories: ['calligraphie', 'design', 'digital', 'traditionnel', 'moderne'],
    showTechniques: true,
    showDate: true
  },

  // Couleurs du thème (pour future personnalisation)
  theme: {
    primary: '#3B82F6',      // Bleu
    secondary: '#8B5CF6',    // Violet
    accent: '#10B981',       // Vert
    text: '#1F2937',         // Gris foncé
    background: '#FFFFFF'    // Blanc
  }
};

// Fonction utilitaire pour obtenir la configuration
export const getConfig = (section) => {
  return siteConfig[section] || siteConfig;
};