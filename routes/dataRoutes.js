// routes/dataRoutes.js - Routes pour modifier automatiquement data.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Chemin vers le fichier data.js
const dataFilePath = path.join(__dirname, '..', 'src', 'data', 'data.js');

/**
 * Mettre à jour automatiquement le fichier data.js
 * @route POST /api/data/update
 * @access Public (pour simplifier)
 */
router.post('/update', async (req, res) => {
  try {
    const { portfolioPreview, portfolioFull } = req.body;
    
    if (!portfolioPreview || !portfolioFull) {
      return res.status(400).json({
        success: false,
        message: 'Données portfolio manquantes'
      });
    }

    // Fonction pour formater les projets preview
    const formatPreviewProjects = (projects) => {
      if (!projects.length) return '    // Aucun projet pour le moment';
      
      return projects.map(project => `    {
      id: ${project.id},
      title: '${project.title.replace(/'/g, "\\'")}',
      category: '${project.category}',
      image: '${project.image}',
      description: '${project.description.replace(/'/g, "\\'")}'
    }`).join(',\n');
    };

    // Fonction pour formater les projets full
    const formatFullProjects = (projects) => {
      if (!projects.length) return '    // Aucun projet pour le moment';
      
      return projects.map(project => `    {
      id: ${project.id},
      title: '${project.title.replace(/'/g, "\\'")}',
      category: '${project.category}',
      images: [${project.images ? project.images.map(img => `'${img}'`).join(', ') : `'${project.image}'`}],
      description: '${project.description.replace(/'/g, "\\'")}',
      date: '${project.date}'
    }`).join(',\n');
    };

    // Générer le nouveau contenu du fichier
    const newDataContent = `// src/data/data.js - Données de l'application Kalligraphic
export const images = {
  // Portfolio Preview
  portfolioPreview: [
${formatPreviewProjects(portfolioPreview)}
  ],
  // Portfolio Full
  portfolioFull: [
${formatFullProjects(portfolioFull)}
  ],
  // Blog posts
  blog: [
    {
      id: 1,
      title: 'Premier article de blog',
      image: '/images/blog/default.jpg',
      excerpt: 'Un exemple d\\'article pour votre blog de calligraphie',
      date: '2025-05-25',
      author: 'Administrateur',
      content: 'Contenu de l\\'article...',
      tags: ['exemple', 'blog']
    }
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
    title: 'L\\'art de la calligraphie',
    subtitle: 'Transformez vos idées en œuvres d\\'art',
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
      description: 'Cours et ateliers pour apprendre l\\'art de la calligraphie'
    }
  ]
};
// Default export for backwards compatibility
export default images;`;

    // Créer une sauvegarde avant modification
    const backupPath = `${dataFilePath}.backup.${Date.now()}`;
    if (fs.existsSync(dataFilePath)) {
      fs.copyFileSync(dataFilePath, backupPath);
    }

    // Écrire le nouveau contenu
    fs.writeFileSync(dataFilePath, newDataContent, 'utf8');

    console.log(`✅ Fichier data.js mis à jour automatiquement`);
    console.log(`📁 Sauvegarde créée: ${backupPath}`);

    res.json({
      success: true,
      message: 'Fichier data.js mis à jour avec succès',
      backupPath: backupPath
    });

  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour de data.js:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du fichier',
      error: error.message
    });
  }
});

/**
 * Lire le contenu actuel du fichier data.js
 * @route GET /api/data/current
 * @access Public
 */
router.get('/current', (req, res) => {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return res.status(404).json({
        success: false,
        message: 'Fichier data.js non trouvé'
      });
    }

    const content = fs.readFileSync(dataFilePath, 'utf8');
    
    res.json({
      success: true,
      content: content,
      path: dataFilePath
    });

  } catch (error) {
    console.error('Erreur lors de la lecture de data.js:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la lecture du fichier',
      error: error.message
    });
  }
});

module.exports = router;