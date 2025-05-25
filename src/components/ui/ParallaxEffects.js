import React, { useEffect, useRef } from 'react';

// Composant pour créer un effet de parallaxe au scroll sur des éléments
// Souvent utilisé par Apple pour créer un effet de profondeur
const ParallaxLayer = ({ 
  children, 
  className = "", 
  speed = 0.1, // Vitesse de déplacement (0.1 = 10% de la vitesse de scroll)
  direction = "up", // Direction du mouvement: 'up', 'down', 'left', 'right'
  overflow = "hidden" // Gestion du débordement
}) => {
  const layerRef = useRef(null);
  
  useEffect(() => {
    // Fonction pour mettre à jour la position de l'élément
    const handleScroll = () => {
      if (!layerRef.current) return;
      
      const scrollY = window.scrollY;
      const rect = layerRef.current.getBoundingClientRect();
      const offsetTop = window.scrollY + rect.top;
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      
      // Calcul de la distance par rapport au centre de la fenêtre
      const distanceFromCenter = offsetTop - viewportCenter;
      
      // Calcul du décalage en fonction de la direction
      let x = 0;
      let y = 0;
      
      switch (direction) {
        case 'up':
          y = distanceFromCenter * speed;
          break;
        case 'down':
          y = -distanceFromCenter * speed;
          break;
        case 'left':
          x = distanceFromCenter * speed;
          break;
        case 'right':
          x = -distanceFromCenter * speed;
          break;
        default:
          y = distanceFromCenter * speed;
      }
      
      // Application de la transformation
      layerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    
    // Ajout de l'écouteur d'événements
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Application initiale
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, direction]);
  
  return (
    <div 
      ref={layerRef} 
      className={className} 
      style={{ 
        willChange: 'transform',
        transition: 'transform 0.1s cubic-bezier(0.22, 1, 0.36, 1)',
        overflow
      }}
    >
      {children}
    </div>
  );
};

// Composant pour créer un effet de décalage en fonction du scroll
// Utilisé par Apple pour faire apparaître des éléments de manière fluide
const ScrollStagger = ({ 
  children, 
  className = "", 
  delay = 0.05, // Délai entre les éléments (en % de la hauteur de la fenêtre)
  duration = 0.8, // Durée de l'animation (en secondes)
  threshold = 0.2 // Seuil de déclenchement (0-1)
}) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Sélection de tous les éléments enfants directs
    const elements = Array.from(containerRef.current.children);
    
    // Configuration initiale
    elements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1), transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1)`;
      element.style.transitionDelay = `${index * delay}s`;
    });
    
    // Création de l'observateur d'intersection
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animation des éléments enfants
          elements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          });
          
          // Désactiver l'observateur une fois l'animation déclenchée
          observer.disconnect();
        }
      });
    }, { threshold });
    
    // Observation du conteneur
    observer.observe(containerRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [delay, duration, threshold]);
  
  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export { ParallaxLayer, ScrollStagger };
