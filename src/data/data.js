// src/data/data.js
// Système centralisé de gestion du contenu et des images

// Configuration des images - Modifiez ici pour changer les images du site
export const images = {
  // Images du Hero (page d'accueil)
  hero: {
    main: '/images/hero-image.png',
    gallery: [
      '/images/hero-image1.png',
      '/images/hero-image2.png',
      '/images/hero-image4.png',
      '/images/hero-image5.png',
      '/images/hero-image6.png'
    ]
  },

  // Images de la section À propos
  about: {
    profile: '/images/45.png', // Votre photo de profil
    background: '/images/hero-image2.png', // Image de fond pour la section
    skills: '/images/hero-image3.png' // Image pour les compétences (optionnel)
  },

  // Images du portfolio (page d'accueil)
  portfolioPreview: [
    {
      id: 1,
      title: 'Calligraphie pour Mariage',
      category: 'calligraphie',
      image: '/images/hero-image1.png',
      description: 'Invitations et décorations calligraphiques pour un mariage élégant'
    },
    {
      id: 2,
      title: 'Logo Moderne',
      category: 'design',
      image: '/images/hero-image2.png',
      description: 'Création d\'un logo moderne pour une entreprise de design'
    },
    {
      id: 3,
      title: 'Art Numérique Calligraphique',
      category: 'digital',
      image: '/images/hero-image4.png',
      description: 'Fusion entre calligraphie traditionnelle et art numérique'
    },
    {
      id: 4,
      title: 'Lettering Traditionnel',
      category: 'traditionnel',
      image: '/images/hero-image5.png',
      description: 'Techniques traditionnelles de calligraphie à la plume'
    },
    {
      id: 5,
      title: 'Design Contemporain',
      category: 'moderne',
      image: '/images/hero-image6.png',
      description: 'Approche moderne de la calligraphie pour supports digitaux'
    },
    {
      id: 6,
      title: 'Identité Visuelle Complète',
      category: 'design',
      image: '/images/45.png',
      description: 'Développement d\'une identité visuelle cohérente'
    }
  ],

  // Images complètes du portfolio (page portfolio)
  portfolioFull: [
    {
      id: 1,
      title: 'Calligraphie pour Mariage',
      category: 'calligraphie',
      images: [
        '/images/hero-image1.png',
        '/images/hero-image.png'
      ],
      description: 'Création complète d\'invitations de mariage avec calligraphie personnalisée. Travail sur mesure incluant les faire-part, menus, et signalétique pour l\'\u00e9vénement.',
      techniques: ['Encre de Chine', 'Plume métallique', 'Papier japonais', 'Dorure'],
      date: '2024'
    },
    {
      id: 2,
      title: 'Logo Moderne',
      category: 'design',
      images: [
        '/images/hero-image2.png',
        '/images/logo.png'
      ],
      description: 'Développement d\'un logo moderne pour une start-up technologique. Recherche typographique et déclinaisons pour différents supports.',
      techniques: ['Adobe Illustrator', 'Recherche typographique', 'Design thinking'],
      date: '2024'
    },
    {
      id: 3,
      title: 'Art Numérique Calligraphique',
      category: 'digital',
      images: [
        '/images/hero-image4.png',
        '/images/hero-image5.png',
        '/images/hero-image6.png'
      ],
      description: 'Série d\'\u0153uvres mêlant calligraphie traditionnelle et outils numériques. Exploration des possibilités offertes par les nouvelles technologies.',
      techniques: ['Procreate', 'Adobe Photoshop', 'Tablette graphique', 'Calligraphie traditionnelle'],
      date: '2024'
    },
    {
      id: 4,
      title: 'Lettering Traditionnel',
      category: 'traditionnel',
      images: [
        '/images/hero-image5.png',
        '/images/45.png'
      ],
      description: 'Retour aux sources avec des pièces de calligraphie utilisant uniquement des techniques ancestrales. Exploration des grands maîtres calligraphes.',
      techniques: ['Plume d\'oie', 'Encre naturelle', 'Parchemin', 'Techniques médiévales'],
      date: '2024'
    },
    {
      id: 5,
      title: 'Design Contemporain',
      category: 'moderne',
      images: [
        '/images/hero-image6.png',
        '/images/hero-image1.png'
      ],
      description: 'Approche moderne de la calligraphie pour supports digitaux et impression contemporaine. Jeu sur les contrastes et la modernité.',
      techniques: ['Design numérique', 'Typographie moderne', 'Impression haute qualité'],
      date: '2024'
    },
    {
      id: 6,
      title: 'Identité Visuelle Complète',
      category: 'design',
      images: [
        '/images/45.png',
        '/images/logo.png',
        '/images/hero-image.png'
      ],
      description: 'Développement complet d\'une identité visuelle pour un studio artistique. De la conception du logo aux applications sur différents supports.',
      techniques: ['Stratégie de marque', 'Design graphique', 'Charte graphique', 'Applications multi-supports'],
      date: '2024'
    }
  ],

  // Images pour le blog
  blog: [
    {
      id: 1,
      title: 'L\'art de la calligraphie moderne',
      image: '/images/blog/article1.jpg',
      excerpt: 'Découvrez les techniques modernes de calligraphie qui révolutionnent cet art ancestral.',
      date: '2024-05-20',
      author: 'Votre Nom',
      content: `La calligraphie moderne représente une évolution fascinante de cet art millénaire. 

Dans cet article, nous explorerons comment les techniques traditionnelles s'adaptent aux outils contemporains, créant de nouvelles possibilités expressives.

## Les outils modernes

Les pinceaux numériques, les tablettes graphiques et les logiciels spécialisés ouvrent des horizons inédits pour les calligraphes d'aujourd'hui.

## Fusion tradition-modernité

L'art réside dans l'équilibre entre respect des codes ancestraux et innovation créative.`,
      tags: ['calligraphie', 'moderne', 'technique']
    },
    {
      id: 2,
      title: 'Histoire de la typographie',
      image: '/images/blog/article2.jpg',
      excerpt: 'Un voyage à travers l\'évolution de la typographie depuis ses origines jusqu\'à aujourd\'hui.',
      date: '2024-05-15',
      author: 'Votre Nom',
      content: `La typographie a connu une évolution remarquable depuis l'invention de l'imprimerie par Gutenberg.

## Les débuts
Tout commence avec les premiers caractères mobiles au XVe siècle.

## L'ère numérique
L'avènement de l'informatique a révolutionné la création typographique.

## Perspectives d'avenir
Les nouvelles technologies ouvrent des possibilités infinies pour la création de caractères.`,
      tags: ['histoire', 'typographie', 'design']
    }
  ],

  // Images générales du site
  general: {
    logo: '/images/logo.png',
    favicon: '/images/favicon.ico',
    notFound: '/images/404.png',
    placeholder: '/images/placeholder.jpg'
  }
};

// Configuration des textes du site
export const siteContent = {
  // Informations générales
  site: {
    title: 'Kalligraphic',
    description: 'L\'art de la calligraphie moderne',
    author: 'Votre Nom',
    email: 'contact@kalligraphic.com',
    phone: '+33 1 23 45 67 89',
    address: 'Paris, France'
  },

  // Contenu de la section Hero
  hero: {
    title: 'L\'Art de la Calligraphie',
    subtitle: 'Moderne et Élégante',
    description: 'Créateur de lettres, passionné de formes et d\'harmonie typographique.',
    cta: 'Découvrir mon travail'
  },

  // Contenu de la section À propos
  about: {
    title: 'À Propos',
    subtitle: 'Passion et Créativité',
    description: `Passionné(e) par l'art de la lettre depuis plus de 10 ans, 
                  je crée des œuvres calligraphiques uniques qui mêlent tradition et modernité.
                  Mon approche allie techniques ancestrales et innovations contemporaines.`,
    skills: [
      'Calligraphie traditionnelle',
      'Design typographique',
      'Art numérique',
      'Enseignement'
    ]
  },

  // Contenu des services
  services: [
    {
      id: 1,
      title: 'Calligraphie Personnalisée',
      description: 'Créations sur mesure pour vos événements spéciaux',
      icon: '✍️'
    },
    {
      id: 2,
      title: 'Design Typographique',
      description: 'Conception de logos et identités visuelles',
      icon: '🎨'
    },
    {
      id: 3,
      title: 'Cours et Ateliers',
      description: 'Apprentissage des techniques de calligraphie',
      icon: '🎓'
    }
  ]
};

// Fonctions utilitaires pour gérer les images
export const imageUtils = {
  // Obtenir une image par catégorie et nom
  getImage: (category, name) => {
    return images[category]?.[name] || '/images/placeholder.jpg';
  },

  // Obtenir toutes les images d'une catégorie
  getImagesByCategory: (category) => {
    return images[category] || [];
  },

  // Ajouter une nouvelle image (pour future interface d'admin)
  addImage: (category, name, path) => {
    if (!images[category]) {
      images[category] = {};
    }
    images[category][name] = path;
  },

  // Obtenir tous les articles de blog
  getBlogArticles: () => {
    return images.blog || [];
  },

  // Obtenir un article de blog par ID
  getBlogArticle: (id) => {
    return images.blog.find(article => article.id === parseInt(id));
  }
};