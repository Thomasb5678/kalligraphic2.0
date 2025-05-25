import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { GridMotion } from './ui/grid-motion';
import AnimatedBackground from './ui/AnimatedBackground';
import { images } from '../data/data';
import ImagePreview from './ImagePreview';

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeCategory, setActiveCategory] = useState('all');

  // Variantes d'animation pour le container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  // Variantes pour le titre et texte d'introduction
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  // Catégories basées sur vos données + catégories par défaut
  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'calligraphie', name: 'Calligraphie' },
    { id: 'design', name: 'Design' },
    { id: 'digital', name: 'Art Numérique' },
    { id: 'traditionnel', name: 'Traditionnel' },
    { id: 'moderne', name: 'Moderne' },
  ];

  // Récupération des projets depuis vos données
  const portfolioProjects = images.portfolioPreview || [];

  // Fonction pour filtrer les projets par catégorie
  const filteredProjects = activeCategory === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === activeCategory);

  // Création des items pour le grid (projets + quelques éléments visuels)
  const createPortfolioItems = () => {
    const items = [];
    
    // Ajouter les vrais projets
    filteredProjects.forEach((project, index) => {
      items.push(
        <div key={`project-${project.id}`} className="relative group cursor-pointer overflow-hidden rounded-lg">
          <ImagePreview
            src={project.image}
            alt={project.title}
            className="w-full h-full"
          />
          {/* Overlay avec informations du projet */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
            <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
              <h3 className="text-lg font-bold mb-2">{project.title}</h3>
              <p className="text-sm mb-2">{project.description}</p>
              <span className="inline-block px-2 py-1 bg-blue-500 rounded-full text-xs">
                {project.category}
              </span>
            </div>
          </div>
        </div>
      );
    });

    // Ajouter quelques éléments visuels décoratifs si pas assez de projets
    if (items.length < 8) {
      const decorativeElements = [
        <div key='deco-1' className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-lg">
          <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-4">
            ✍️
          </div>
          <div className="text-lg font-medium">Calligraphie</div>
        </div>,
        <div key='deco-2' className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-500 to-teal-600 text-white rounded-lg">
          <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-4">
            🎨
          </div>
          <div className="text-lg font-medium">Design</div>
        </div>,
        <div key='deco-3' className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-green-500 to-blue-600 text-white rounded-lg">
          <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-4">
            💻
          </div>
          <div className="text-lg font-medium">Art Numérique</div>
        </div>,
        <div key='deco-4' className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-lg">
          <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-4">
            📖
          </div>
          <div className="text-lg font-medium">Traditionnel</div>
        </div>,
        <div key='deco-5' className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-yellow-500 to-orange-600 text-white rounded-lg">
          <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-4">
            🚀
          </div>
          <div className="text-lg font-medium">Moderne</div>
        </div>,
        <div key='deco-admin' className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg">
          <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-4">
            ⚙️
          </div>
          <div className="text-lg font-medium">
            <Link to="/admin" className="hover:underline">
              Gérer Portfolio
            </Link>
          </div>
        </div>,
      ];

      // Ajouter les éléments décoratifs pour compléter
      const needed = Math.min(decorativeElements.length, 12 - items.length);
      for (let i = 0; i < needed; i++) {
        items.push(decorativeElements[i]);
      }
    }

    return items;
  };

  const portfolioItems = createPortfolioItems();

  return (
    <section id="portfolio" className="relative overflow-hidden py-20 bg-gray-950">
      <AnimatedBackground>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-center mb-12"
          >
            <motion.h2 
              variants={itemVariants}
              className="section-title text-white"
            >
              Découvrez mes <span className="text-gradient">récentes réalisations</span>
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="max-w-2xl mx-auto text-gray-300 text-lg"
            >
              Une sélection de projets qui illustrent ma capacité à m'adapter à différents besoins et à créer des solutions visuelles impactantes.
            </motion.p>
            
            {/* Filter Categories */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center space-x-2 space-y-2 md:space-y-0 mt-8 mb-12"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-secondary text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </motion.div>

            {/* Indicateur du nombre de projets */}
            <motion.div 
              variants={itemVariants}
              className="text-gray-400 text-sm mb-4"
            >
              {filteredProjects.length > 0 
                ? `${filteredProjects.length} projet${filteredProjects.length > 1 ? 's' : ''} ${activeCategory !== 'all' ? `en ${categories.find(c => c.id === activeCategory)?.name.toLowerCase()}` : ''}`
                : "Aucun projet dans cette catégorie"
              }
            </motion.div>
          </motion.div>
        </div>

        {/* Grid Motion avec projets dynamiques */}
        <div className="h-[800px] w-full">
          <GridMotion 
            items={portfolioItems}
            gradientColor="#4F46E5"
            className="relative z-10"
          />
        </div>
        
        <div className="text-center mt-12 container mx-auto px-4 md:px-6">
          <motion.div variants={itemVariants} className="space-y-4">
            <Link 
              to="/portfolio" 
              className="relative group overflow-hidden rounded-xl inline-flex items-center px-8 py-4 text-white font-medium transform hover:scale-105 mr-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-orange-500 opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex items-center justify-center space-x-2">
                <span>Découvrir mes réalisations</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
            </Link>

            <Link 
              to="/admin" 
              className="relative group overflow-hidden rounded-xl inline-flex items-center px-6 py-3 text-white font-medium transform hover:scale-105 ml-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="relative z-10 flex items-center justify-center space-x-2">
                <span>⚙️ Gérer mon portfolio</span>
              </div>
            </Link>

            {/* Message informatif si pas de projets */}
            {portfolioProjects.length === 0 && (
              <motion.div 
                variants={itemVariants}
                className="mt-6 p-4 bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg text-blue-200 max-w-md mx-auto"
              >
                <p className="text-sm">
                  💡 <strong>Astuce :</strong> Cliquez sur "Gérer mon portfolio" pour ajouter vos premiers projets via l'interface d'administration.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </AnimatedBackground>
    </section>
  );
};

export default Portfolio;