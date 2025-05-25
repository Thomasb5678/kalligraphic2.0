import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PortfolioPage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  // Animation variants
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

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'identite', name: 'Identité visuelle' },
    { id: 'web', name: 'Sites web' },
    { id: 'social', name: 'Réseaux sociaux' },
    { id: 'branding', name: 'Branding' },
  ];

  // Sample projects - you should replace these with your actual projects
  const projects = [
    {
      id: 1,
      title: "Refonte identité visuelle Entreprise X",
      category: "identite",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Refonte complète de l'identité visuelle d'une entreprise de conseil en stratégie, incluant logo, charte graphique et supports de communication.",
      details: "L'entreprise souhaitait moderniser son image tout en conservant son héritage. J'ai créé une identité forte qui reflète leur sérieux et leur vision innovante. Le projet incluait la création d'un nouveau logo, d'une charte graphique complète, de modèles pour leurs présentations commerciales et de supports de communication variés.",
      client: "Entreprise X",
      year: "2023",
      services: ["Logo", "Charte graphique", "Supports communication"],
      images: [
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ]
    },
    {
      id: 2,
      title: "Site web e-commerce Boutique Y",
      category: "web",
      image: "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Conception et réalisation d'un site e-commerce pour une boutique de vêtements éco-responsables.",
      details: "La boutique Y souhaitait lancer sa présence en ligne avec un site e-commerce reflétant ses valeurs d'éco-responsabilité. J'ai conçu une interface claire et esthétique, mettant en valeur les produits tout en communiquant sur leur engagement environnemental. Le site intègre un système de paiement sécurisé et une expérience utilisateur fluide.",
      client: "Boutique Y",
      year: "2024",
      services: ["UX/UI Design", "Développement web", "E-commerce"],
      images: [
        "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ]
    },
    {
      id: 3,
      title: "Campagne réseaux sociaux Association Z",
      category: "social",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Conception et réalisation d'une campagne de sensibilisation sur les réseaux sociaux pour une association environnementale.",
      details: "L'association Z m'a confié la création d'une campagne de sensibilisation à l'environnement sur les réseaux sociaux. J'ai développé une série de visuels impactants et cohérents pour Instagram, Facebook et LinkedIn, accompagnés de messages clairs et engageants. La campagne a généré une forte augmentation de l'engagement et des partages.",
      client: "Association Z",
      year: "2023",
      services: ["Stratégie social media", "Création de contenu", "Community management"],
      images: [
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ]
    },
    {
      id: 4,
      title: "Branding complet Startup W",
      category: "branding",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Création complète de l'identité de marque pour une startup tech en pleine croissance.",
      details: "La startup W avait besoin d'une identité de marque forte pour se démarquer dans un secteur compétitif. J'ai développé un branding complet incluant logo, charte graphique, site web, supports de communication et stratégie de présence en ligne. L'identité créée reflète leur innovation et leur dynamisme, tout en restant accessible à leur cible.",
      client: "Startup W",
      year: "2024",
      services: ["Branding", "Identity design", "Digital design"],
      images: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ]
    },
    {
      id: 5,
      title: "Site portfolio Photographe V",
      category: "web",
      image: "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Conception et développement d'un site portfolio pour un photographe professionnel.",
      details: "Le photographe V souhaitait un site web élégant et minimaliste mettant en valeur son travail. J'ai créé un site portfolio responsive avec une navigation intuitive, une galerie d'images optimisée et une esthétique épurée qui laisse toute la place à ses photographies. Le site inclut également un système de prise de contact et un blog.",
      client: "Photographe V",
      year: "2023",
      services: ["Web design", "Développement", "Optimisation images"],
      images: [
        "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ]
    },
    {
      id: 6,
      title: "Identité visuelle Festival U",
      category: "identite",
      image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Création de l'identité visuelle pour un festival culturel annuel.",
      details: "Le Festival U m'a confié la création de l'identité visuelle de sa nouvelle édition. J'ai développé un concept graphique fort et déclinable sur l'ensemble des supports : affiches, programmes, signalétique, goodies, site web et réseaux sociaux. L'identité créée a contribué au succès de l'événement en attirant l'attention et en renforçant sa cohérence.",
      client: "Festival U",
      year: "2024",
      services: ["Identité événementielle", "Conception graphique", "Édition"],
      images: [
        "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ]
    }
  ];

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Close project modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectedProject && e.target.classList.contains('modal-overlay')) {
        setSelectedProject(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectedProject]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gray-950">
        <AnimatedBackground>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            {/* Filter Categories */}
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${activeCategory === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                Tous
              </button>
              <button
                onClick={() => setActiveCategory('identite')}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${activeCategory === 'identite' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                Identité visuelle
              </button>
              <button
                onClick={() => setActiveCategory('web')}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${activeCategory === 'web' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                Sites web
              </button>
              <button
                onClick={() => setActiveCategory('social')}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${activeCategory === 'social' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                Réseaux sociaux
              </button>
              <button
                onClick={() => setActiveCategory('branding')}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${activeCategory === 'branding' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                Branding
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="group relative overflow-hidden" onClick={() => setSelectedProject(project)}>
                    <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="object-cover w-full h-60 transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="px-3 py-1 bg-purple-600 text-white text-xs rounded-full mb-3 inline-block">
                        {categories.find(c => c.id === project.category)?.name}
                      </span>
                      <h3 className="text-xl font-bold text-white font-heading">{project.title}</h3>
                      <p className="text-gray-300 mt-2 line-clamp-2">{project.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedBackground>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay bg-black bg-opacity-80 p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 max-w-6xl rounded-xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              
              {/* Hero Image */}
              <div className="h-96 w-full">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-8">
                <h2 className="text-3xl font-bold text-white font-heading mb-4">{selectedProject.title}</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2">
                    <p className="text-lg text-gray-300 mb-6">{selectedProject.description}</p>
                    <p className="text-gray-300 mb-8">{selectedProject.details}</p>
                    
                    {/* Project Gallery */}
                    <h3 className="text-xl font-bold text-white mb-4">Galerie du projet</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {selectedProject.images.map((image, index) => (
                        <div key={index} className="rounded-lg overflow-hidden">
                          <img 
                            src={image} 
                            alt={`${selectedProject.title} - image ${index + 1}`} 
                            className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-1">
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Informations</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-gray-400 text-sm">Client</h4>
                          <p className="text-white">{selectedProject.client}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-gray-400 text-sm">Année</h4>
                          <p className="text-white">{selectedProject.year}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-gray-400 text-sm">Catégorie</h4>
                          <p className="text-white">{categories.find(c => c.id === selectedProject.category)?.name}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-gray-400 text-sm">Services</h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedProject.services.map((service, index) => (
                              <span key={index} className="px-3 py-1 bg-gray-700 text-white text-xs rounded-full">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <a 
                          href="#contact" 
                          className="w-full block relative group overflow-hidden rounded-md text-center py-3 text-white font-medium"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-orange-500 opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span className="relative z-10">Discuter d'un projet similaire</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PortfolioPage;