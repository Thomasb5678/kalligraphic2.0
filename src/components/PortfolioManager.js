// src/components/PortfolioManager.js
// Composant pour faciliter l'ajout et la gestion des projets portfolio

import React, { useState } from 'react';
import { images } from '../data/data';

const PortfolioManager = () => {
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'calligraphie',
    description: '',
    image: '',
    techniques: '',
    date: new Date().getFullYear().toString()
  });

  const [projects, setProjects] = useState(images.portfolioPreview);
  const [projectsFull, setProjectsFull] = useState(images.portfolioFull);

  const categories = ['calligraphie', 'design', 'digital', 'traditionnel', 'moderne'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
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
        techniques: newProject.techniques.split(',').map(tech => tech.trim()),
        date: newProject.date
      };

      setProjects(prev => [...prev, previewProject]);
      setProjectsFull(prev => [...prev, fullProject]);
      
      // Réinitialiser le formulaire
      setNewProject({
        title: '',
        category: 'calligraphie',
        description: '',
        image: '',
        techniques: '',
        date: new Date().getFullYear().toString()
      });

      console.log('Nouveau projet ajouté:', { previewProject, fullProject });
      alert('Projet ajouté avec succès! N\'oubliez pas de mettre à jour votre fichier data.js');
    }
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      setProjects(prev => prev.filter(project => project.id !== id));
      setProjectsFull(prev => prev.filter(project => project.id !== id));
    }
  };

  const generateDataJsCode = () => {
    const previewCode = projects.map(project => `    {
      id: ${project.id},
      title: '${project.title.replace(/'/g, "\\'")}',
      category: '${project.category}',
      image: '${project.image}',
      description: '${project.description.replace(/'/g, "\\'")}'
    }`).join(',\n');

    const fullCode = projectsFull.map(project => `    {
      id: ${project.id},
      title: '${project.title.replace(/'/g, "\\'")}',
      category: '${project.category}',
      images: [${project.images.map(img => `'${img}'`).join(', ')}],
      description: '${project.description.replace(/'/g, "\\'")}',
      techniques: [${project.techniques.map(tech => `'${tech}'`).join(', ')}],
      date: '${project.date}'
    }`).join(',\n');

    return `// Copiez ce code dans votre fichier src/data/data.js pour mettre à jour le portfolio:

// Remplacez la section 'portfolioPreview: [...]' par:
portfolioPreview: [
${previewCode}
],

// Remplacez la section 'portfolioFull: [...]' par:
portfolioFull: [
${fullCode}
]`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center">🎨 Gestionnaire de Portfolio Kalligraphic</h2>
      
      {/* Formulaire d'ajout de projet */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-8 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">✨ Ajouter un nouveau projet</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Titre du projet</label>
            <input
              type="text"
              name="title"
              value={newProject.title}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Ex: Calligraphie pour mariage"
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
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Image principale (chemin)</label>
            <input
              type="text"
              name="image"
              value={newProject.image}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Ex: /images/portfolio/projet4.jpg"
            />
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
          <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
          <textarea
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Description du projet, contexte, objectifs..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">Techniques utilisées (séparées par des virgules)</label>
          <input
            type="text"
            name="techniques"
            value={newProject.techniques}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Ex: Encre de Chine, Plume métallique, Papier japonais"
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
        <h3 className="text-xl font-semibold mb-4 text-gray-800">🖼️ Projets actuels ({projects.length})</h3>
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
                      <span className="text-gray-500 text-sm">Image non trouvée</span>
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
                <div>📅 {project.date}</div>
                {projectsFull.find(p => p.id === project.id)?.techniques && (
                  <div>🎨 {projectsFull.find(p => p.id === project.id).techniques.join(', ')}</div>
                )}
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
      </div>

      {/* Code généré */}
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-3 text-purple-400">💻 Code à copier dans data.js</h3>
        <div className="bg-gray-800 p-4 rounded border">
          <pre className="text-sm overflow-x-auto whitespace-pre-wrap text-gray-300">
            {generateDataJsCode()}
          </pre>
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => navigator.clipboard.writeText(generateDataJsCode())}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors font-semibold"
          >
            📋 Copier le code
          </button>
          <button
            onClick={() => {
              const blob = new Blob([generateDataJsCode()], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'portfolio-update.txt';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors font-semibold"
          >
            💾 Télécharger
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-purple-50 border-l-4 border-purple-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-purple-700">
              <strong>📝 Instructions :</strong> Après avoir ajouté vos projets, copiez le code généré et remplacez les sections 'portfolioPreview: [...]' et 'portfolioFull: [...]' dans votre fichier <code>src/data/data.js</code>. N'oubliez pas d'ajouter les images correspondantes dans le dossier <code>public/images/portfolio/</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioManager;