import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import BlogPage from './pages/BlogPage';
import PortfolioPage from './pages/PortfolioPage';
import AdminPage from './pages/AdminPage';
import ScrollToTop from './components/ScrollToTop';
import AnimatedGallery from './components/AnimatedGallery';

// Page d'accueil qui contient toutes les sections
const HomePage = () => {
  useEffect(() => {
    // Vérifier s'il y a une section à faire défiler après la navigation
    const scrollToSection = localStorage.getItem('scrollToSection');
    if (scrollToSection) {
      // Supprimer l'item de localStorage pour éviter des défilements indésirables à l'avenir
      localStorage.removeItem('scrollToSection');
      
      // Délai pour s'assurer que tous les composants sont montés
      setTimeout(() => {
        const element = document.getElementById(scrollToSection);
        if (element) {
          // Décalage spécifique pour chaque section
          let offset = 140; // valeur par défaut
          
          // Ajuster en fonction de la section
          if (scrollToSection === 'services') {
            offset = 100;
          } else if (scrollToSection === 'about') {
            offset = 120;
          } else if (scrollToSection === 'contact') {
            offset = 80;  // Ajusté pour voir le titre "Donnons vie à vos idées ensemble"
          }
          
          // Calculer la position de l'élément
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          
          // Faire défiler la page
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
          
          // Mettre à jour l'URL
          window.history.pushState(null, '', `/#${scrollToSection}`);
        }
      }, 500);
    }
  }, []);
  
  return (
    <>
      <Navbar />
      <AnimatedGallery />
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Contact />
      <Footer />
    </>
  );
};

// Ajout de l'effet de scroll fluide sans modifier la structure du site
function App() {
  useEffect(() => {
    // Variables CSS pour l'animation de scroll
    document.documentElement.style.setProperty('--scroll-behavior', 'smooth');
    
    // Fonction pour animer les éléments au scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollProgress = scrollY / (document.body.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty('--scroll-progress', scrollProgress.toString());
    };
    
    // Initialiser la valeur
    handleScroll();
    
    // Ajouter l'écouteur d'événement
    window.addEventListener('scroll', handleScroll);
    
    // Fix pour le scroll aux ancres qui tient compte de la navbar
    const fixScrollToAnchor = () => {
      // Délai pour s'assurer que le DOM est complètement chargé
      setTimeout(() => {
        // Vérifier si l'URL contient une ancre
        if (window.location.hash) {
          // Récupérer l'élément correspondant à l'ancre
          const element = document.querySelector(window.location.hash);
          if (element) {
            // Décalage spécifique pour chaque section
            let offset = 140; // valeur par défaut
            
            // Ajuster en fonction de la section
            if (window.location.hash === '#services') {
              offset = 100; // Décalage ajusté pour la section Services
            } else if (window.location.hash === '#about') {
              offset = 120;
            } else if (window.location.hash === '#contact') {
              offset = 80;  // Ajusté pour voir le titre "Donnons vie à vos idées ensemble"
            }
            
            // Calculer la position de l'élément par rapport au haut de la page
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            
            // Faire défiler la page jusqu'à l'élément moins le décalage
            window.scrollTo({
              top: elementPosition - offset,
              behavior: 'smooth'
            });
          }
        }
      }, 300);
    };
    
    // Exécuter la fonction au chargement de la page
    fixScrollToAnchor();
    
    // Nettoyer l'écouteur d'événement
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="App bg-gray-950">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;