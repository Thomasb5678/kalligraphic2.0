// src/components/PortfolioManagerFixed.js
// Version corrigée qui fonctionne vraiment

import React, { useState, useRef, useEffect } from 'react';

const PortfolioManagerFixed = () => {
  const [projects, setProjects] = useState([]);
  const [projectsFull, setProjectsFull] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'calligraphie',
    description: '',
    image: '',
    date: new Date().getFullYear().toString()
  });

  const [editingProject, setEditingProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    category: 'calligraphie',
    description: '',
    image: '',
    date: ''
  });

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

  useEffect(() => {
    loadProjectsFromMemory();
  }, []);

  // Utiliser localStorage comme source de vérité au lieu de data.js
  const loadProjectsFromMemory = () => {
    try {
      const savedProjects = localStorage.getItem('kalligraphic_projects');
      const savedProjectsFull = localStorage.getItem('kalligraphic_projects_full');
      
      if (savedProjects && savedProjectsFull) {
        setProjects(JSON.parse(savedProjects));
        setProjectsFull(JSON.parse(savedProjectsFull));
      } else {
        // Initialiser avec les données statiques seulement la première fois
        const { images } = require('../data/data');
        if (images && images.portfolioPreview && images.portfolioFull) {
          setProjects([...images.portfolioPreview]);
          setProjectsFull([...images.portfolioFull]);
          saveProjectsToMemory([...images.portfolioPreview], [...images.portfolioFull]);
        }
      }
    } catch (error) {
      console.error('Erreur chargement:', error);
      setProjects([]);
      setProjectsFull([]);
    }
  };

  const saveProjectsToMemory = (updatedProjects, updatedProjectsFull) => {
    localStorage.setItem('kalligraphic_projects', JSON.stringify(updatedProjects));
    localStorage.setItem('kalligraphic_projects_full', JSON.stringify(updatedProjectsFull));
  };

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const updateDataFile = async (updatedProjects, updatedProjectsFull) => {
    try {
      // URL directe vers l'API (pas de configuration complexe)
      const apiUrl = 'http://localhost:3001/api/data/update';
      
      console.log('🔗 Synchronisation avec le site...', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          portfolioPreview: updatedProjects,
          portfolioFull: updatedProjectsFull
        })
      });

      const result = await response.json();
      
      if (result.success) {
        showMessage('✅ Fichier data.js mis à jour ! Les changements sont immédiatement visibles.', 'success');
        console.log('🚀 Synchronisation réussie:', result);
        
        // Déclencher l'événement de mise à jour pour synchroniser le site
        window.dispatchEvent(new CustomEvent('portfolioUpdated', {
          detail: { portfolioPreview: updatedProjects, portfolioFull: updatedProjectsFull }
        }));
        
        return true;
      } else {
        showMessage('⚠️ Erreur API: ' + result.message + ' (Changements sauvés localement)', 'error');
        console.error('❌ Erreur API:', result);
        return false;
      }
    } catch (error) {
      console.error('Erreur API:', error);
      showMessage('⚠️ API indisponible - Changements sauvés localement uniquement', 'error');
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = () => fileInputRef.current?.click();
  const handleEditImageSelect = () => editFileInputRef.current?.click();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imagePath = `/images/portfolio/${file.name}`;
      setSelectedImageName(file.name);
      setNewProject(prev => ({ ...prev, image: imagePath }));
    } else {
      showMessage('Veuillez sélectionner un fichier image', 'error');
    }
  };

  const handleEditFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imagePath = `/images/portfolio/${file.name}`;
      setEditSelectedImageName(file.name);
      setEditForm(prev => ({ ...prev, image: imagePath }));
    } else {
      showMessage('Veuillez sélectionner un fichier image', 'error');
    }
  };

  const handleAddProject = async () => {
    if (!newProject.title || !newProject.description || !newProject.image) {
      showMessage('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }

    setIsLoading(true);
    const projectId = Date.now();
    
    const previewProject = {
      id: projectId,
      title: newProject.title,
      category: newProject.category,
      image: newProject.image,
      description: newProject.description
    };

    const fullProject = {
      id: projectId,
      title: newProject.title,
      category: newProject.category,
      images: [newProject.image],
      description: newProject.description,
      date: newProject.date
    };

    const updatedProjects = [...projects, previewProject];
    const updatedProjectsFull = [...projectsFull, fullProject];
    
    // Sauvegarder immédiatement en mémoire
    setProjects(updatedProjects);
    setProjectsFull(updatedProjectsFull);
    saveProjectsToMemory(updatedProjects, updatedProjectsFull);
    
    // Essayer de mettre à jour le fichier data.js
    await updateDataFile(updatedProjects, updatedProjectsFull);
    
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

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;

    setIsLoading(true);
    
    const updatedProjects = projects.filter(p => p.id !== id);
    const updatedProjectsFull = projectsFull.filter(p => p.id !== id);
    
    // Sauvegarder immédiatement en mémoire
    setProjects(updatedProjects);
    setProjectsFull(updatedProjectsFull);
    saveProjectsToMemory(updatedProjects, updatedProjectsFull);
    
    // Essayer de mettre à jour le fichier data.js
    await updateDataFile(updatedProjects, updatedProjectsFull);
    
    setIsLoading(false);
    showMessage('✅ Projet supprimé avec succès !', 'success');
  };

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

  const handleSaveEdit = async () => {
    if (!editForm.title || !editForm.description || !editForm.image) {
      showMessage('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }

    setIsLoading(true);
    
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
    
    // Sauvegarder immédiatement en mémoire
    setProjects(updatedProjects);
    setProjectsFull(updatedProjectsFull);
    saveProjectsToMemory(updatedProjects, updatedProjectsFull);
    
    // Essayer de mettre à jour le fichier data.js
    await updateDataFile(updatedProjects, updatedProjectsFull);
    
    setShowEditModal(false);
    setEditingProject(null);
    setIsLoading(false);
    showMessage('✅ Projet modifié avec succès !', 'success');
  };

  const resetToOriginal = () => {
    if (window.confirm('Remettre les données d\'origine ? Tous vos changements seront perdus.')) {
      localStorage.removeItem('kalligraphic_projects');
      localStorage.removeItem('kalligraphic_projects_full');
      loadProjectsFromMemory();
      showMessage('✅ Données remises à l\'origine', 'success');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">🎨 Gestionnaire de Portfolio</h2>
          <p className="text-green-600 mt-2 font-semibold">🔥 VERSION QUI FONCTIONNE VRAIMENT</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${projects.length > 0 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-600">{projects.length} projet(s)</span>
          </div>
          <button
            onClick={resetToOriginal}
            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm"
          >
            🔄 Reset
          </button>
        </div>
      </div>
      
      {message.text && (
        <div className={`mb-4 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 
          'bg-red-100 text-red-800 border border-red-200'
        }`}>
          <div className="flex items-center">
            <span className="mr-2">{message.type === 'success' ? '✅' : '❌'}</span>
            {message.text}
          </div>
        </div>
      )}
      
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mb-8 shadow-lg border border-green-200">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">✨ Ajouter un nouveau projet</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Titre du projet *</label>
            <input
              type="text"
              name="title"
              value={newProject.title}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Ex: Calligraphie pour mariage"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Catégorie</label>
            <select
              name="category"
              value={newProject.category}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Image principale *</label>
            <button
              type="button"
              onClick={handleImageSelect}
              className="w-full p-3 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left"
            >
              {selectedImageName ? (
                <div>
                  <div className="text-sm text-green-600 font-medium">📁 {selectedImageName}</div>
                  <div className="text-xs text-gray-500">Cliquez pour changer</div>
                </div>
              ) : (
                <div>
                  <div className="text-green-600 font-medium">📁 Sélectionner une image</div>
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
            <label className="block text-sm font-medium mb-2">Année</label>
            <input
              type="text"
              name="date"
              value={newProject.date}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="2025"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description *</label>
          <textarea
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-green-500"
            placeholder="Description du projet..."
          />
        </div>

        <button
          onClick={handleAddProject}
          disabled={isLoading}
          className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all font-semibold shadow-lg disabled:opacity-50"
        >
          {isLoading ? '⏳ Ajout en cours...' : '➕ Ajouter le projet'}
        </button>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">🖼️ Projets actuels ({projects.length})</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow bg-white">
              <div className="aspect-video bg-gray-200 rounded mb-3 flex items-center justify-center overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <h4 className="font-semibold mb-2">{project.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{project.description}</p>
              <div className="text-xs text-gray-500 mb-3">
                <div>🏷️ {project.category}</div>
                <div>📅 {projectsFull.find(p => p.id === project.id)?.date}</div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditProject(project)}
                  disabled={isLoading}
                  className="flex-1 bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
                >
                  ✏️ Modifier
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  disabled={isLoading}
                  className="flex-1 bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition-colors"
                >
                  🗑️ Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">✏️ Modifier le projet</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
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
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Catégorie</label>
                  <select
                    name="category"
                    value={editForm.category}
                    onChange={handleEditInputChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditInputChange}
                  className="w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSaveEdit}
                  disabled={isLoading}
                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
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

      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-400 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-green-800 mb-3">🔥 VERSION CORRIGÉE</h4>
        <div className="space-y-2 text-sm text-green-700">
          <div><strong>✅ Suppression qui fonctionne :</strong> Utilise localStorage comme source de vérité</div>
          <div><strong>🔄 Pas de rechargement :</strong> Les changements restent même après rechargement</div>
          <div><strong>💾 Sauvegarde double :</strong> En mémoire + fichier data.js</div>
          <div><strong>🖼️ Images :</strong> Copiez toujours dans <code>public/images/portfolio/</code></div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioManagerFixed;