// src/data/data.js - Données de l'application Kalligraphic
export const images = {
  // Portfolio Preview
  portfolioPreview: [
    // Aucun projet pour le moment
  ],
  // Portfolio Full
  portfolioFull: [
    // Aucun projet pour le moment
  ],
  // Hero section images - Utilisation d'URLs externes
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
  // About section images
  about: {
    profile: '/images/45.png',
    background: '/images/about/background.jpg'
  }
};

// Site content configuration
export const siteContent = {
  site: {
    title: 'Kalligraphic',
    description: 'Site de calligraphie et portfolio artistique',
    author: 'Votre Nom',
    email: 'contact@exemple.com',
    phone: '+33 1 23 45 67 89',
    address: 'Paris, France'
  },
  
  hero: {
    title: 'L\'art de la calligraphie',
    subtitle: 'Transformez vos idées en œuvres d\'art',
    description: 'Une approche moderne et élégante de la calligraphie traditionnelle'
  },
  
  services: [
    {
      id: 1,
      icon: '✍️',
      title: 'Calligraphie',
      description: 'Création de textes calligraphiés pour tous vos projets'
    },
    {
      id: 2,
      icon: '🎨',
      title: 'Design',
      description: 'Conception graphique et mise en page artistique'
    },
    {
      id: 3,
      icon: '📝',
      title: 'Formation',
      description: 'Cours et ateliers pour apprendre l\'art de la calligraphie'
    }
  ]
};

// Default export for backwards compatibility
export default images;