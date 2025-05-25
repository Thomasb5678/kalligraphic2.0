import React, { useState } from 'react';
import { ParallaxScrollSecond } from "../components/ui/parallax-scroll";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { images } from '../data/data';

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Récupération des projets complets depuis vos données
  const portfolioProjects = images.portfolioFull || [];

  // Catégories disponibles
  const categories = [
    { id: 'all', name: 'Tous les projets' },
    { id: 'calligraphie', name: 'Calligraphie' },
    { id: 'design', name: 'Design' },
    { id: 'digital', name: 'Art Numérique' },
    { id: 'traditionnel', name: 'Traditionnel' },
    { id: 'moderne', name: 'Moderne' },
  ];

  // Filtrage des projets
  const filteredProjects = selectedCategory === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === selectedCategory);

  // Préparation des images et titres pour le composant ParallaxScrollSecond
  const preparePortfolioData = () => {
    if (filteredProjects.length === 0) {
      // Si aucun projet, afficher des placeholders
      return {
        images: [
          '/images/hero-image.png',
          '/images/hero-image1.png',
          '/images/hero-image2.png',
          '/images/hero-image4.png',
          '/images/hero-image5.png',
          '/images/hero-image6.png',
        ],
        titles: [
          'Votre premier projet',
          'Votre deuxième projet',
          'Votre troisième projet',
          'Votre quatrième projet',
          'Votre cinquième projet',
          'Votre sixième projet',
        ]
      };
    }

    const portfolioImages = [];
    const portfolioTitles = [];

    filteredProjects.forEach(project => {
      // Ajouter toutes les images du projet
      if (project.images && project.images.length > 0) {
        project.images.forEach(image => {
          portfolioImages.push(image);
          portfolioTitles.push(project.title);
        });
      } else if (project.image) {
        // Fallback pour les projets avec une seule image
        portfolioImages.push(project.image);
        portfolioTitles.push(project.title);
      }
    });

    // Dupliquer les projets si on en a moins de 15 pour un meilleur effet visuel
    while (portfolioImages.length < 15 && portfolioImages.length > 0) {
      const originalLength = portfolioImages.length;
      for (let i = 0; i < originalLength && portfolioImages.length < 15; i++) {
        portfolioImages.push(portfolioImages[i]);
        portfolioTitles.push(portfolioTitles[i]);
      }
    }

    return {
      images: portfolioImages,
      titles: portfolioTitles
    };
  };

  const { images: portfolioImages, titles: portfolioTitles } = preparePortfolioData();

  return (
    <div className="bg-gray-950 min-h-screen">
      <Navbar />
      <div className="pt-36 pb-20">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6">
            <span className="gradient-text">Portfolio</span> de projets
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Découvrez une sélection de mes réalisations en calligraphie, design et art numérique.
            Survolez les images pour plus de détails sur chaque projet.
          </p>

          {/* Filtres par catégorie */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Compteur de projets */}
          <div className="text-gray-400 text-sm mb-8">
            {filteredProjects.length > 0 
              ? `${filteredProjects.length} projet${filteredProjects.length > 1 ? 's' : ''} ${selectedCategory !== 'all' ? `en ${categories.find(c => c.id === selectedCategory)?.name.toLowerCase()}` : ''}`
              : "Aucun projet dans cette catégorie"
            }
          </div>

          {/* Bouton pour gérer le portfolio */}
          <div className="mb-8">
            <Link 
              to="/admin" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              <span className="mr-2">⚙️</span>
              Gérer mon portfolio
            </Link>
          </div>
        </div>

        {/* Affichage du portfolio */}
        {filteredProjects.length > 0 ? (
          <ParallaxScrollSecond images={portfolioImages} projectTitles={portfolioTitles} />
        ) : (
          <div className="container mx-auto px-4 md:px-6">
            {/* Message si aucun projet */}
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-3xl text-white">🎨</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {selectedCategory === 'all' ? 'Aucun projet encore' : `Aucun projet en ${categories.find(c => c.id === selectedCategory)?.name.toLowerCase()}`}
                </h3>
                <p className="text-gray-400 mb-6">
                  Commencez par ajouter vos premiers projets via l'interface d'administration.
                </p>
                <Link 
                  to="/admin" 
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="mr-2">➕</span>
                  Ajouter mon premier projet
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Section détails des projets */}
        {filteredProjects.length > 0 && (
          <div className="container mx-auto px-4 md:px-6 mt-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Détails des <span className="gradient-text">projets</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                  <div className="aspect-video bg-gray-800">
                    <img 
                      src={project.images?.[0] || project.image || '/images/placeholder.jpg'} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4 text-sm">
                      {project.description}
                    </p>
                    
                    {project.techniques && project.techniques.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-white mb-2">Techniques utilisées :</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.techniques.map((technique, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                              {technique}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-500">
                      Année : {project.date}
                    </div>
                    
                    {project.images && project.images.length > 1 && (
                      <div className="mt-4 text-xs text-blue-400">
                        +{project.images.length - 1} image{project.images.length > 2 ? 's' : ''} supplémentaire{project.images.length > 2 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PortfolioPage;