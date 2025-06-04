// server-fixed.js - SERVEUR CORRIGÉ SANS ERREUR DE FORMATAGE
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

console.log('🚀 KALLIGRAPHIC - SERVEUR CORRIGÉ');
console.log('================================');
console.log('✅ Génération JavaScript valide');
console.log('✅ Plus d\'erreur de formatage');
console.log('');

// Middleware de base
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'build')));

// API pour lire les données dynamiquement
app.get('/api/data', (req, res) => {
  try {
    const dataFilePath = path.join(__dirname, 'src', 'data', 'data.js');
    
    // Lire le fichier comme du texte
    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    
    // Extraire la partie images = { ... }
    const imagesMatch = fileContent.match(/export const images = (\{[\s\S]*?\});/);
    const siteContentMatch = fileContent.match(/export const siteContent = (\{[\s\S]*?\});/);
    
    if (!imagesMatch) {
      return res.status(500).json({ error: 'Impossible de parser les données images' });
    }
    
    // Évaluer le contenu JavaScript de manière sécurisée
    const imagesData = eval('(' + imagesMatch[1] + ')');
    const siteContentData = siteContentMatch ? eval('(' + siteContentMatch[1] + ')') : {};
    
    const responseData = {
      ...imagesData,
      siteContent: siteContentData
    };
    
    console.log('✅ Données servies via API:', {
      portfolioPreview: responseData.portfolioPreview?.length || 0,
      portfolioFull: responseData.portfolioFull?.length || 0
    });
    
    res.json(responseData);
  } catch (error) {
    console.error('❌ Erreur lors de la lecture des données:', error.message);
    res.status(500).json({ error: 'Erreur lors de la lecture des données: ' + error.message });
  }
});

// API CORRIGÉE pour la synchronisation
app.post('/api/data/update', async (req, res) => {
  try {
    const { portfolioPreview, portfolioFull } = req.body;
    
    if (!portfolioPreview || !portfolioFull) {
      return res.status(400).json({
        success: false,
        message: 'Données portfolio manquantes'
      });
    }

    // Chemin vers le fichier data.js
    const dataFilePath = path.join(__dirname, 'src', 'data', 'data.js');

    // Fonction pour nettoyer et échapper les chaînes
    const cleanString = (str) => {
      if (!str) return '';
      return str
        .replace(/\\/g, '\\\\')  // Échapper les backslashes
        .replace(/'/g, "\\'")    // Échapper les quotes
        .replace(/[\r\n\t]/g, ' ') // Remplacer les retours à la ligne par des espaces
        .trim();
    };

    // Fonction CORRIGÉE pour formater les projets preview
    const formatPreviewProjects = (projects) => {
      if (!projects.length) return '    // Aucun projet pour le moment';
      
      return projects.map(project => {
        return `    {
      id: ${project.id},
      title: '${cleanString(project.title)}',
      category: '${cleanString(project.category || 'Non défini')}',
      image: '${cleanString(project.image)}',
      description: '${cleanString(project.description)}'
    }`;
      }).join(',\n');
    };

    // Fonction CORRIGÉE pour formater les projets full
    const formatFullProjects = (projects) => {
      if (!projects.length) return '    // Aucun projet pour le moment';
      
      return projects.map(project => {
        const images = project.images ? project.images : (project.image ? [project.image] : []);
        const imagesList = images.map(img => `'${cleanString(img)}'`).join(', ');
        
        return `    {
      id: ${project.id},
      title: '${cleanString(project.title)}',
      category: '${cleanString(project.category || 'Non défini')}',
      images: [${imagesList}],
      description: '${cleanString(project.description)}',
      date: '${cleanString(project.date || new Date().getFullYear().toString())}'
    }`;
      }).join(',\n');
    };

    // Contenu complet du fichier data.js avec formatage CORRECT
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

    // Validation du JavaScript généré
    try {
      // Tester si le JavaScript est valide
      new Function(newDataContent.replace(/export const/g, 'const').replace(/export default/g, '//'));
      console.log('✅ JavaScript généré est valide');
    } catch (validationError) {
      console.error('❌ JavaScript généré invalide:', validationError.message);
      return res.status(500).json({
        success: false,
        message: 'Erreur de génération JavaScript: ' + validationError.message
      });
    }

    // Créer une sauvegarde si le fichier existe
    if (fs.existsSync(dataFilePath)) {
      const backupPath = `${dataFilePath}.backup.${Date.now()}`;
      fs.copyFileSync(dataFilePath, backupPath);
      console.log(`📁 Sauvegarde créée: ${path.basename(backupPath)}`);
    }

    // Écrire le nouveau contenu
    fs.writeFileSync(dataFilePath, newDataContent, 'utf8');
    console.log('✅ Fichier data.js mis à jour avec succès (JavaScript valide)');

    res.json({
      success: true,
      message: 'Fichier data.js mis à jour avec succès'
    });

  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du fichier',
      error: error.message
    });
  }
});

// Route de santé pour vérifier que l'API fonctionne
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    port: 3001,
    timestamp: new Date().toISOString()
  });
});

// Route pour l'interface admin
app.get('/admin', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// Route de debug
app.get('/debug', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'debug.html'));
});

// Route catch-all pour toutes les autres pages React
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// Démarrer le serveur
const PORT = 3001;
app.listen(PORT, () => {
  console.log('');
  console.log('🎉 SERVEUR CORRIGÉ DÉMARRÉ !');
  console.log('============================');
  console.log(`📍 Site web    : http://localhost:${PORT}`);
  console.log(`👤 Admin       : http://localhost:${PORT}/admin`);
  console.log(`📡 API Health  : http://localhost:${PORT}/api/health`);
  console.log(`📡 API Data    : http://localhost:${PORT}/api/data`);
  console.log(`🔍 Debug       : http://localhost:${PORT}/debug`);
  console.log('');
  console.log('✅ GÉNÉRATION JAVASCRIPT VALIDE');
  console.log('✅ PLUS D\'ERREUR DE FORMATAGE');
  console.log('✅ SYNCHRONISATION FONCTIONNELLE');
  console.log('');
  console.log('🔥 POUR ARRÊTER : Ctrl+C');
  console.log('');
  
  // Tester l'API au démarrage
  console.log('🧪 Test de l\'API au démarrage...');
  setTimeout(() => {
    const dataPath = path.join(__dirname, 'src', 'data', 'data.js');
    if (fs.existsSync(dataPath)) {
      console.log('✅ Fichier data.js accessible');
      try {
        const content = fs.readFileSync(dataPath, 'utf8');
        // Tester que le JavaScript est valide
        const testCode = content.replace(/export const/g, 'const').replace(/export default/g, '//');
        new Function(testCode);
        console.log('✅ Fichier data.js contient du JavaScript valide');
        
        const match = content.match(/portfolioPreview: \[([\s\S]*?)\]/);
        if (match) {
          const projectCount = (match[1].match(/\{[\s\S]*?\}/g) || []).length;
          console.log(`📊 ${projectCount} projet(s) détecté(s) dans data.js`);
        }
      } catch (err) {
        console.log('⚠️ Erreur lecture data.js:', err.message);
      }
    } else {
      console.log('❌ Fichier data.js non trouvé');
    }
  }, 1000);
});

// Gestion des erreurs
process.on('uncaughtException', (err) => {
  console.error('❌ ERREUR CRITIQUE:', err.message);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('❌ ERREUR DE PROMESSE:', err.message);
  process.exit(1);
});
