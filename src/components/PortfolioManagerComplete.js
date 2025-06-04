// src/components/PortfolioManagerComplete.js
// Gestionnaire de portfolio complet - VERSION SIMPLIFIÉE QUI FONCTIONNE

import React, { useState, useRef, useEffect } from 'react';
import { images } from '../data/data';

const PortfolioManagerComplete = () => {
  // États principaux
  const [projects, setProjects] = useState([]);
  const [projectsFull, setProjectsFull] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  
  // États pour le formulaire d'ajout
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'calligraphie',
    description: '',
    image: '',
    date: new Date().getFullYear().toString()
  });

  // États pour la modification
  const [editingProject, setEditingProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    category: 'calligraphie',
    description: '',
    image: '',
    date: ''
  });

  // Références pour les inputs file
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);
  const [selectedImageName, setSelectedImageName] = useState('');
  const [editSelectedImageName, setEditSelectedImageName] = useState('');

  const categories = [
    'calligraphie',
    'identité visuelle', 
    'webdesign', 
    'communication digitale', 
    'présentation et supports'
  ];

  // Charger les projets au démarrage
  useEffect(() => {
    loadProjects();
  }, []);

  // Fonction pour charger les projets
  const loadProjects = () => {
    if (images && images.portfolioPreview && images.portfolioFull) {
      setProjects([...images.portfolioPreview]);
      setProjectsFull([...images.portfolioFull]);
    }
  };

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  // Gestion des formulaires
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gestion des images
  const handleImageSelect = () => {
    fileInputRef.current?.click();
  };

  const handleEditImageSelect = () => {
    editFileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const imagePath = `/images/portfolio/${file.name}`;
        setSelectedImageName(file.name);
        setNewProject(prev => ({
          ...prev,
          image: imagePath
        }));
      } else {
        showMessage('Veuillez sélectionner un fichier image (JPG, PNG, GIF, etc.)', 'error');
        e.target.value = '';
      }
    }
  };

  const handleEditFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const imagePath = `/images/portfolio/${file.name}`;
        setEditSelectedImageName(file.name);
        setEditForm(prev => ({
          ...prev,
          image: imagePath
        }));
      } else {
        showMessage('Veuillez sélectionner un fichier image (JPG, PNG, GIF, etc.)', 'error');
        e.target.value = '';
      }
    }
  };

  // Fonction pour générer le code JS du portfolio
  const generatePortfolioCode = (previewProjects, fullProjects) => {
    const previewCode = previewProjects.map(project => `    {
      id: ${project.id},
      title: '${project.title.replace(/'/g, "\\'")}',
      category: '${project.category}',
      image: '${project.image}',
      description: '${project.description.replace(/'/g, "\\'")}'
    }`).join(',\n');
    
    const fullCode = fullProjects.map(project => `    {
      id: ${project.id},
      title: '${project.title.replace(/'/g, "\\'")}',
      category: '${project.category}',
      images: [${project.images ? project.images.map(img => `'${img}'`).join(', ') : `'${project.image}'`}],
      description: '${project.description.replace(/'/g, "\\'")}',
      date: '${project.date}'
    }`).join(',\n');

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
  };

  // Ajouter un projet
  const handleAddProject = async () => {
    if (!newProject.title || !newProject.description || !newProject.image) {
      showMessage('Veuillez remplir tous les champs obligatoires (titre, description, image)', 'error');
      return;
    }

    setIsLoading(true);
    
    const projectId = Date.now();
    
    // Créer le nouveau projet pour preview
    const previewProject = {
      id: projectId,
      title: newProject.title,
      category: newProject.category,
      image: newProject.image,
      description: newProject.description
    };

    // Créer le nouveau projet pour full
    const fullProject = {
      id: projectId,
      title: newProject.title,
      category: newProject.category,
      images: [newProject.image],
      description: newProject.description,
      date: newProject.date
    };

    // Mettre à jour les listes
    const updatedProjects = [...projects, previewProject];
    const updatedProjectsFull = [...projectsFull, fullProject];
    
    setProjects(updatedProjects);
    setProjectsFull(updatedProjectsFull);
    
    // Générer et copier le code
    const code = generatePortfolioCode(updatedProjects, updatedProjectsFull);
    
    try {
      await navigator.clipboard.writeText(code);
      showMessage('✅ Projet ajouté ! Code copié dans le presse-papier. Collez-le dans src/data/data.js', 'success');
    } catch (error) {
      showMessage('✅ Projet ajouté ! Code disponible dans la console (F12)', 'success');
      console.log('CODE À COPIER DANS src/data/data.js :');
      console.log(code);
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
    
    setIsLoading(false);
  };

  // Supprimer un projet
  const handleDeleteProject = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      return;
    }

    setIsLoading(true);
    
    // Supprimer des deux listes
    const updatedProjects = projects.filter(p => p.id !== id);
    const updatedProjectsFull = projectsFull.filter(p => p.id !== id);
    
    setProjects(updatedProjects);
    setProjectsFull(updatedProjectsFull);
    
    // Générer et copier le code
    const code = generatePortfolioCode(updatedProjects, updatedProjectsFull);
    
    try {
      await navigator.clipboard.writeText(code);
      showMessage('✅ Projet supprimé ! Code mis à jour copié dans le presse-papier', 'success');
    } catch (error) {
      showMessage('✅ Projet supprimé ! Code mis à jour disponible dans la console (F12)', 'success');
      console.log('CODE À COPIER DANS src/data/data.js :');
      console.log(code);
    }
    
    setIsLoading(false);
  };

  // Modifier un projet
  const handleEditProject = (project) => {
    setEditingProject(project);
    setEditForm({
      title: project.title,
      category: project.category,
      description: project.description,
      image: project.image,
      date: projectsFull.find(p => p.id === project.id)?.date || new Date().getFullYear().toString()
    });
    setEditSelectedImageName(project.image ? project.image.split('/').pop() : '');
    setShowEditModal(true);
  };

  // Sauvegarder les modifications
  const handleSaveEdit = async () => {
    if (!editForm.title || !editForm.description || !editForm.image) {
      showMessage('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }

    setIsLoading(true);
    
    // Mettre à jour dans les deux listes
    const updatedProjects = projects.map(p => 
      p.id === editingProject.id ? {
        ...p,
        title: editForm.title,
        category: editForm.category,
        image: editForm.image,
        description: editForm.description
      } : p
    );
    
    const updatedProjectsFull = projectsFull.map(p => 
      p.id === editingProject.id ? {
        ...p,
        title: editForm.title,
        category: editForm.category,
        images: [editForm.image],
        description: editForm.description,
        date: editForm.date
      } : p
    );
    
    setProjects(updatedProjects);
    setProjectsFull(updatedProjectsFull);
    
    // Générer et copier le code
    const code = generatePortfolioCode(updatedProjects, updatedProjectsFull);
    
    try {
      await navigator.clipboard.writeText(code);
      showMessage('✅ Projet modifié ! Code mis à jour copié dans le presse-papier', 'success');
    } catch (error) {
      showMessage('✅ Projet modifié ! Code mis à jour disponible dans la console (F12)', 'success');
      console.log('CODE À COPIER DANS src/data/data.js :');
      console.log(code);
    }
    
    setShowEditModal(false);
    setEditingProject(null);
    setIsLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">🎨 Gestionnaire de Portfolio</h2>
          <p className="text-gray-600 mt-2">✅ Version simplifiée qui fonctionne à 100%</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${projects.length > 0 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <span className="text-sm text-gray-600">{projects.length} projet(s)</span>
        </div>
      </div>
      
      {/* Message de notification */}
      {message.text && (
        <div className={`mb-4 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 
          message.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' : 
          'bg-blue-100 text-blue-800 border border-blue-200'
        }`}>
          <div className="flex items-center">
            <span className="mr-2">
              {message.type === 'success' ? '✅' : message.type === 'error' ? '❌' : 'ℹ️'}
            </span>
            {message.text}
          </div>
        </div>
      )}
      
      {/* Formulaire d'ajout de projet */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-8 shadow-lg border">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">✨ Ajouter un nouveau projet</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Titre du projet *</label>
            <input
              type="text"
              name="title"
              value={newProject.title}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Image principale *</label>
            <button
              type="button"
              onClick={handleImageSelect}
              className="w-full p-3 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-left"
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
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Année</label>
            <input
              type="text"
              name="date"
              value={newProject.date}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="2025"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">Description *</label>
          <textarea
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-purple-500"
            placeholder="Description du projet, contexte, objectifs..."
            required
          />
        </div>

        <button
          onClick={handleAddProject}
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 font-semibold shadow-lg disabled:opacity-50"
        >
          {isLoading ? '⏳ Ajout en cours...' : '➕ Ajouter le projet'}
        </button>
      </div>

      {/* Liste des projets */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">🖼️ Projets actuels ({projects.length})</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow bg-white">
              <div className="aspect-video bg-gray-200 rounded mb-3 flex items-center justify-center overflow-hidden">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="text-gray-500 text-sm">Aucune image</div>
                )}
              </div>
              <h4 className="font-semibold mb-2 text-gray-800">{project.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{project.description}</p>
              <div className="text-xs text-gray-500 space-y-1 mb-3">
                <div>🏷️ {project.category}</div>
                <div>📅 {projectsFull.find(p => p.id === project.id)?.date}</div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditProject(project)}
                  disabled={isLoading}
                  className="flex-1 bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  ✏️ Modifier
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  disabled={isLoading}
                  className="flex-1 bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  🗑️ Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de modification */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">✏️ Modifier le projet</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Titre *</label>
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Catégorie</label>
                  <select
                    name="category"
                    value={editForm.category}
                    onChange={handleEditInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Image *</label>
                  <button
                    type="button"
                    onClick={handleEditImageSelect}
                    className="w-full p-3 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                  >
                    {editSelectedImageName ? (
                      <div>
                        <div className="text-sm text-blue-600 font-medium">📁 {editSelectedImageName}</div>
                        <div className="text-xs text-gray-500">Cliquez pour changer</div>
                      </div>
                    ) : (
                      <div className="text-blue-600 font-medium">📁 Sélectionner une image</div>
                    )}
                  </button>
                  <input
                    ref={editFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleEditFileSelect}
                    style={{ display: 'none' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Année</label>
                  <input
                    type="text"
                    name="date"
                    value={editForm.date}
                    onChange={handleEditInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSaveEdit}
                  disabled={isLoading}
                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {isLoading ? '⏳ Sauvegarde...' : '💾 Sauvegarder'}
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  ❌ Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-400 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-green-800 mb-3">🎯 Comment ça marche maintenant</h4>
        <div className="space-y-2 text-sm text-green-700">
          <div><strong>1. ✅ Ajouter/Modifier/Supprimer :</strong> Tout fonctionne immédiatement</div>
          <div><strong>2. 📋 Code automatique :</strong> Copié dans le presse-papier après chaque action</div>
          <div><strong>3. 📁 Coller le code :</strong> Dans <code className="bg-green-100 px-1 rounded">src/data/data.js</code></div>
          <div><strong>4. 🖼️ Images :</strong> Copier manuellement dans <code className="bg-green-100 px-1 rounded">public/images/portfolio/</code></div>
          <div><strong>5. 🔄 Rechargement :</strong> Rechargez la page de votre site pour voir les changements</div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioManagerComplete;