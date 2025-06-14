// src/components/PortfolioManager.js
// Composant amélioré pour la gestion des projets portfolio avec sauvegarde automatique

import React, { useState, useRef, useEffect } from 'react';
import { images } from '../data/data';

const PortfolioManager = () => {
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'calligraphie',
    description: '',
    image: '',
    images: [], // Pour multiple images
    date: new Date().getFullYear().toString()
  });

  // États initialisés avec les données existantes
  const [projects, setProjects] = useState([]);
  const [projectsFull, setProjectsFull] = useState([]);
  
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

        // Optionnel : Prévisualisation de l'image
        const reader = new FileReader();
        reader.onload = (e) => {
          // Vous pouvez ici afficher une prévisualisation
          console.log('Image sélectionnée:', file.name);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Veuillez sélectionner un fichier image (JPG, PNG, GIF, etc.)');
        e.target.value = ''; // Reset input
      }
    }
  };

  const handleAddProject = () => {
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
      
      // Sauvegarder automatiquement dans data.js
      saveProjectsToFile(updatedProjects, updatedProjectsFull);
      
      // Réinitialiser le formulaire
      setNewProject({
        title: '',
        category: 'calligraphie',
        description: '',
        image: '',
        images: [],
        date: new Date().getFullYear().toString()
      });
      setSelectedImageName('');

      console.log('Nouveau projet ajouté:', { previewProject, fullProject });
    } else {
      alert('Veuillez remplir tous les champs obligatoires (titre, description, image)');
    }
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      const updatedProjects = projects.filter(project => project.id !== id);
      const updatedProjectsFull = projectsFull.filter(project => project.id !== id);
      
      setProjects(updatedProjects);
      setProjectsFull(updatedProjectsFull);
      
      // Sauvegarder automatiquement dans data.js
      saveProjectsToFile(updatedProjects, updatedProjectsFull);
    }
  };

  const handleClearAllProjects = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer TOUS les projets ? Cette action est irréversible.')) {
      setProjects([]);
      setProjectsFull([]);
      
      // Sauvegarder automatiquement dans data.js
      saveProjectsToFile([], []);
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
  
  // Fonction pour sauvegarder les projets dans data.js
  const saveProjectsToFile = async (previewProjects, fullProjects) => {
    try {
      // Générer le code JS pour les projets
      const dataContent = await generateDataJsContent(previewProjects, fullProjects);
      
      // Sauvegarder les données via l'API
      const response = await fetch('http://localhost:3001/api/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: dataContent }),
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde des données');
      }
      
      const result = await response.json();
      console.log('Données sauvegardées avec succès:', result);
      
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      // En cas d'échec de l'API, on propose la méthode manuelle
      const codeToDisplay = generateDataJsCode();
      alert('La sauvegarde automatique a échoué. Veuillez copier le code et le mettre à jour manuellement.');
      
      // Copier le code dans le presse-papier
      navigator.clipboard.writeText(codeToDisplay)
        .then(() => {
          alert('Le code a été copié dans votre presse-papier. Collez-le dans votre fichier src/data/data.js.');
        })
        .catch(() => {
          console.log('CODE À COPIER:\n', codeToDisplay);
          alert('Veuillez copier le code affiché dans la console (F12) et le mettre à jour manuellement dans src/data/data.js');
        });
    }
  };
  
  // Générer le contenu JS pour data.js
  const generateDataJsContent = async (previewProjects, fullProjects) => {
    try {
      // Lire le fichier data.js actuel via l'API
      const response = await fetch('http://localhost:3001/api/read-data');
      
      if (!response.ok) {
        throw new Error('Erreur lors de la lecture du fichier data.js');
      }
      
      const currentData = await response.text();
      
      // Générer le code pour portfolioPreview et portfolioFull
      const previewCode = generatePortfolioPreviewCode(previewProjects);
      const fullCode = generatePortfolioFullCode(fullProjects);
      
      // Remplacer les sections dans le fichier data.js
      let updatedData = currentData;
      
      // Remplacer la section portfolioPreview
      const previewRegex = /portfolioPreview:\s*\[(.*?)\],/s;
      updatedData = updatedData.replace(previewRegex, `portfolioPreview: [\n${previewCode}\n],`);
      
      // Remplacer la section portfolioFull
      const fullRegex = /portfolioFull:\s*\[(.*?)\],/s;
      updatedData = updatedData.replace(fullRegex, `portfolioFull: [\n${fullCode}\n],`);
      
      return updatedData;
    } catch (error) {
      console.error('Erreur lors de la génération du contenu:', error);
      throw error;
    }
  };

  // Fonction pour générer le code à copier (en cas d'échec de la sauvegarde automatique)
  const generateDataJsCode = () => {
    const previewCode = generatePortfolioPreviewCode(projects);
    const fullCode = generatePortfolioFullCode(projectsFull);

    return `// Code à copier dans votre fichier src/data/data.js :

// Remplacez la section 'portfolioPreview: [...]' par:
portfolioPreview: [
${previewCode}
],

// Remplacez la section 'portfolioFull: [...]' par:
portfolioFull: [
${fullCode}
]`;
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
    alert('Instructions copiées dans le presse-papiers !');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">🎨 Gestionnaire de Portfolio Kalligraphic</h2>
        
        {/* Bouton de remise à zéro */}
        <button
          onClick={handleClearAllProjects}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-lg"
          title="Supprimer tous les projets"
        >
          🗑️ Tout effacer
        </button>
      </div>
      
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

export default PortfolioManager;