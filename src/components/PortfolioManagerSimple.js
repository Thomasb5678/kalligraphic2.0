// src/components/PortfolioManagerSimple.js
// Version simplifiée du gestionnaire de portfolio pour une utilisation temporaire

import React, { useState, useRef, useEffect } from 'react';
import { images } from '../data/data';
import * as apiClient from '../utils/api-client';

const PortfolioManagerSimple = () => {
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'calligraphie',
    description: '',
    image: '',
    date: new Date().getFullYear().toString()
  });

  // États initialisés avec les données existantes
  const [projects, setProjects] = useState([]);
  const [projectsFull, setProjectsFull] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Charger les projets existants au démarrage
  useEffect(() => {
    if (images && images.portfolioPreview && images.portfolioFull) {
      setProjects(images.portfolioPreview);
      setProjectsFull(images.portfolioFull);
    }
  }, []);
  
  // Référence pour l'input file caché
  const fileInputRef = useRef(null);
  const [selectedImageName, setSelectedImageName] = useState('');

  const categories = [
    'calligraphie',
    'identité visuelle', 
    'webdesign', 
    'communication digitale', 
    'présentation et supports'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fonction pour ouvrir le sélecteur de fichier
  const handleImageSelect = () => {
    fileInputRef.current?.click();
  };

  // Fonction pour gérer la sélection de fichier
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Vérifier que c'est bien une image
      if (file.type.startsWith('image/')) {
        // Créer le chemin relatif pour l'image
        const imagePath = `/images/portfolio/${file.name}`;
        setSelectedImageName(file.name);
        setNewProject(prev => ({
          ...prev,
          image: imagePath
        }));
      } else {
        showMessage('Veuillez sélectionner un fichier image (JPG, PNG, GIF, etc.)', 'error');
        e.target.value = ''; // Reset input
      }
    }
  };

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleAddProject = async () => {
    if (newProject.title && newProject.description && newProject.image) {
      const projectId = Date.now();
      
      // Projet pour la preview (page d'accueil)
      const previewProject = {
        id: projectId,
        title: newProject.title,
        category: newProject.category,
        image: newProject.image,
        description: newProject.description
      };

      // Projet complet (page portfolio)
      const fullProject = {
        id: projectId,
        title: newProject.title,
        category: newProject.category,
        images: [newProject.image], // On peut ajouter plus d'images plus tard
        description: newProject.description,
        date: newProject.date
      };

      // Mettre à jour les états locaux
      const updatedProjects = [...projects, previewProject];
      const updatedProjectsFull = [...projectsFull, fullProject];
      
      setProjects(updatedProjects);
      setProjectsFull(updatedProjectsFull);
      
      // Tenter d'utiliser l'API sécurisée si disponible
      try {
        const result = await apiClient.addProject({
          title: newProject.title,
          category: newProject.category,
          image: newProject.image,
          description: newProject.description,
          date: newProject.date
        });
        
        if (result.success) {
          showMessage('Projet ajouté avec succès', 'success');
        } else {
          // Si l'API sécurisée échoue, utiliser la sauvegarde manuelle
          const dataContent = await generateDataJsContent(updatedProjects, updatedProjectsFull);
          await apiClient.saveData(dataContent);
          // Dans ce cas, nous passons directement à la méthode de secours car nous nous attendons à ce que saveData échoue
          copyCodeToClipboard(updatedProjects, updatedProjectsFull);
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout du projet:', error);
        copyCodeToClipboard(updatedProjects, updatedProjectsFull);
      }
      
      // Réinitialiser le formulaire
      setNewProject({
        title: '',
        category: 'calligraphie',
        description: '',
        image: '',
        date: new Date().getFullYear().toString()
      });
      setSelectedImageName('');
    } else {
      showMessage('Veuillez remplir tous les champs obligatoires (titre, description, image)', 'error');
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      const updatedProjects = projects.filter(project => project.id !== id);
      const updatedProjectsFull = projectsFull.filter(project => project.id !== id);
      
      setProjects(updatedProjects);
      setProjectsFull(updatedProjectsFull);
      
      // Tenter d'utiliser l'API sécurisée si disponible
      try {
        const result = await apiClient.deleteProject(id);
        
        if (result.success) {
          showMessage('Projet supprimé avec succès', 'success');
        } else {
          // Si l'API sécurisée échoue, utiliser la sauvegarde manuelle
          const dataContent = await generateDataJsContent(updatedProjects, updatedProjectsFull);
          await apiClient.saveData(dataContent);
          // Dans ce cas, nous passons directement à la méthode de secours car nous nous attendons à ce que saveData échoue
          copyCodeToClipboard(updatedProjects, updatedProjectsFull);
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du projet:', error);
        copyCodeToClipboard(updatedProjects, updatedProjectsFull);
      }
    }
  };
  
  // Fonction pour générer le code des projets preview
  const generatePortfolioPreviewCode = (previewProjects) => {
    if (previewProjects.length === 0) {
      return '    // Aucun projet pour le moment';
    }
    
    return previewProjects.map(project => `    {
      id: ${project.id},
      title: '${project.title.replace(/'/g, "\\'")}',
      category: '${project.category}',
      image: '${project.image}',
      description: '${project.description.replace(/'/g, "\\'")}'
    }`).join(',\n');
  };
  
  // Fonction pour générer le code des projets complets
  const generatePortfolioFullCode = (fullProjects) => {
    if (fullProjects.length === 0) {
      return '    // Aucun projet pour le moment';
    }
    
    return fullProjects.map(project => `    {
      id: ${project.id},
      title: '${project.title.replace(/'/g, "\\'")}',
      category: '${project.category}',
      images: [${project.images.map(img => `'${img}'`).join(', ')}],
      description: '${project.description.replace(/'/g, "\\'")}',
      date: '${project.date}'
    }`).join(',\n');
  };
  
  // Fonction pour générer le contenu JS pour data.js
  const generateDataJsContent = async (previewProjects, fullProjects) => {
    try {
      // Tenter de lire le fichier data.js actuel via l'API
      const currentData = await apiClient.readData();
      
      // Si nous n'avons pas pu lire le fichier, utiliser un modèle par défaut
      const dataTemplate = currentData || `// src/data/data.js - Données de l'application Kalligraphic

export const images = {
  // Portfolio Preview
  portfolioPreview: [
  ],

  // Portfolio Full
  portfolioFull: [
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

  // Hero section images
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
      
      // Générer le code pour portfolioPreview et portfolioFull
      const previewCode = generatePortfolioPreviewCode(previewProjects);
      const fullCode = generatePortfolioFullCode(fullProjects);
      
      // Remplacer les sections dans le fichier data.js
      let updatedData = dataTemplate;
      
      // Remplacer la section portfolioPreview
      const previewRegex = /portfolioPreview:\s*\[(.*?)\],/s;
      updatedData = updatedData.replace(previewRegex, `portfolioPreview: [\n${previewCode}\n],`);
      
      // Remplacer la section portfolioFull
      const fullRegex = /portfolioFull:\s*\[(.*?)\],/s;
      updatedData = updatedData.replace(fullRegex, `portfolioFull: [\n${fullCode}\n],`);
      
      return updatedData;
    } catch (error) {
      console.error('Erreur lors de la génération du contenu:', error);
      return generateDataJsCodeFallback(projects, projectsFull);
    }
  };

  // Méthode de secours pour générer le code JS
  const generateDataJsCodeFallback = (previewProjects, fullProjects) => {
    const previewCode = generatePortfolioPreviewCode(previewProjects);
    const fullCode = generatePortfolioFullCode(fullProjects);

    return `// src/data/data.js - Données de l'application Kalligraphic

export const images = {
  // Portfolio Preview
  portfolioPreview: [
${previewCode}
  ],

  // Portfolio Full
  portfolioFull: [
${fullCode}
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

  // Hero section images
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
  };

  // Fonction pour copier le code dans le presse-papiers
  const copyCodeToClipboard = async (previewProjects, fullProjects) => {
    try {
      const codeToDisplay = generateDataJsCodeFallback(previewProjects, fullProjects);
      
      // Copier le code dans le presse-papier
      await navigator.clipboard.writeText(codeToDisplay);
      showMessage('Le code a été copié dans votre presse-papier. Collez-le dans src/data/data.js', 'info');
    } catch (error) {
      console.error('Erreur lors de la copie dans le presse-papiers:', error);
      showMessage('Erreur lors de la copie. Consultez la console pour le code (F12)', 'error');
      console.log('CODE À COPIER:');
      console.log(generateDataJsCodeFallback(previewProjects, fullProjects));
    }
  };

  const copyImageInstructions = () => {
    const imageList = projects.map(p => p.image.replace('/images/portfolio/', '')).join('\n');
    const instructions = `📁 Instructions pour les images :

1. Créez le dossier public/images/portfolio/ si il n'existe pas
2. Copiez les images suivantes dans ce dossier :

${imageList || 'Aucune image pour le moment'}

3. Les images doivent avoir exactement les mêmes noms que ceux affichés ci-dessus
4. Formats recommandés : JPG, PNG, WebP
5. Taille recommandée : 800x600px minimum pour une bonne qualité`;
    
    navigator.clipboard.writeText(instructions);
    showMessage('Instructions copiées dans le presse-papiers !', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">🎨 Gestionnaire de Portfolio Kalligraphic</h2>
      </div>
      
      {/* Message de notification */}
      {message.text && (
        <div className={`mb-4 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-800' : 
          message.type === 'error' ? 'bg-red-100 text-red-800' : 
          'bg-blue-100 text-blue-800'
        }`}>
          {message.text}
        </div>
      )}
      
      {/* Formulaire d'ajout de projet */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-8 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">✨ Ajouter un nouveau projet</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Titre du projet *</label>
            <input
              type="text"
              name="title"
              value={newProject.title}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Ex: Calligraphie pour mariage"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Catégorie</label>
            <select
              name="category"
              value={newProject.category}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Nouveau sélecteur d'image avec pop-up */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Image principale *</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleImageSelect}
                className="flex-1 p-3 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-left"
              >
                {selectedImageName ? (
                  <div>
                    <div className="text-sm text-purple-600 font-medium">📁 {selectedImageName}</div>
                    <div className="text-xs text-gray-500">Cliquez pour changer</div>
                  </div>
                ) : (
                  <div>
                    <div className="text-purple-600 font-medium">📁 Sélectionner une image</div>
                    <div className="text-xs text-gray-500">Cliquez pour ouvrir l'explorateur</div>
                  </div>
                )}
              </button>
              
              {/* Input file caché */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </div>
            {newProject.image && (
              <div className="mt-2 text-xs text-gray-600">
                Chemin: <code className="bg-gray-100 px-1 rounded">{newProject.image}</code>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Année</label>
            <input
              type="text"
              name="date"
              value={newProject.date}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="2024"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">Description *</label>
          <textarea
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Description du projet, contexte, objectifs..."
            required
          />
        </div>

        <button
          onClick={handleAddProject}
          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 font-semibold shadow-lg"
        >
          ➕ Ajouter le projet
        </button>
      </div>

      {/* Liste des projets */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">🖼️ Projets actuels ({projects.length})</h3>
          {projects.length > 0 && (
            <button
              onClick={copyImageInstructions}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              📋 Instructions images
            </button>
          )}
        </div>
        
        {projects.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-4xl mb-4">🎨</div>
            <h4 className="text-lg font-medium text-gray-600 mb-2">Aucun projet pour le moment</h4>
            <p className="text-gray-500">Ajoutez votre premier projet en utilisant le formulaire ci-dessus</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 rounded mb-3 flex items-center justify-center overflow-hidden">
                  {project.image ? (
                    <div className="relative w-full h-full">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-full h-full bg-gray-200 items-center justify-center">
                        <div className="text-center">
                          <div className="text-gray-500 text-sm mb-1">Image non trouvée</div>
                          <div className="text-xs text-gray-400">{project.image}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">Aucune image</div>
                  )}
                </div>
                <h4 className="font-semibold mb-2 text-gray-800">{project.title}</h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>🏷️ {project.category}</div>
                  <div>📅 {projectsFull.find(p => p.id === project.id)?.date}</div>
                </div>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="mt-3 bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition-colors"
                >
                  🗑️ Supprimer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instructions améliorées */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-purple-400 p-6 rounded-lg">
        <div className="flex">
          <div className="ml-3">
            <h4 className="text-lg font-semibold text-purple-800 mb-3">📝 Instructions d'utilisation</h4>
            <div className="space-y-3 text-sm text-purple-700">
              <div className="flex items-start">
                <span className="font-semibold mr-2">1.</span>
                <div>
                  <strong>Sélection d'image :</strong> Cliquez sur "Sélectionner une image" pour ouvrir l'explorateur de fichiers
                </div>
              </div>
              <div className="flex items-start">
                <span className="font-semibold mr-2">2.</span>
                <div>
                  <strong>Ajout de projet :</strong> Remplissez tous les champs et cliquez sur "Ajouter le projet"
                </div>
              </div>
              <div className="flex items-start">
                <span className="font-semibold mr-2">3.</span>
                <div>
                  <strong>Copie d'images :</strong> Copiez manuellement vos images dans <code className="bg-purple-100 px-1 rounded">public/images/portfolio/</code>
                </div>
              </div>
              <div className="flex items-start">
                <span className="font-semibold mr-2">4.</span>
                <div>
                  <strong>Mise à jour du code :</strong> Le code est automatiquement copié dans votre presse-papier en cas d'échec de la sauvegarde automatique
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioManagerSimple;