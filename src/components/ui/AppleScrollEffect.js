import React, { useEffect, useRef } from 'react';

// Composant qui ajoute un effet de scroll fluide à la page entière
// Cette technique est souvent utilisée par Apple pour créer des animations de scroll fluides
const AppleScrollEffect = ({ children }) => {
  const scrollRef = useRef(null);
  
  useEffect(() => {
    // Options pour le comportement du scroll
    const options = {
      ease: 0.1, // Facteur de lissage (plus petit = plus fluide mais plus lent)
      current: 0, // Position actuelle
      previous: 0, // Position précédente
      rounded: 0, // Position arrondie pour éviter les saccades
      frameRequest: null // Référence pour l'animation
    };
    
    const mainElement = document.documentElement;
    
    // Hauteur totale défilable
    const setBodyHeight = () => {
      document.body.style.height = `${scrollRef.current.scrollHeight}px`;
    };
    
    // Animation du scroll
    const smoothScroll = () => {
      options.current = window.scrollY;
      options.previous += (options.current - options.previous) * options.ease;
      options.rounded = Math.round(options.previous * 100) / 100;
      
      // Appliquer la transformation
      scrollRef.current.style.transform = `translateY(-${options.rounded}px)`;
      
      // Mettre à jour les propriétés CSS personnalisées pour d'autres effets
      document.documentElement.style.setProperty('--scroll-y', options.rounded);
      document.documentElement.style.setProperty('--scroll-progress', options.rounded / (document.body.scrollHeight - window.innerHeight));
      
      // Continuer l'animation
      options.frameRequest = requestAnimationFrame(smoothScroll);
    };
    
    // Initialisation
    const init = () => {
      setBodyHeight();
      smoothScroll();
      
      // Styles pour fixer le contenu et permettre une animation fluide
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.top = '0';
      document.body.style.left = '0';
      
      scrollRef.current.style.position = 'absolute';
      scrollRef.current.style.width = '100%';
      scrollRef.current.style.top = '0';
      scrollRef.current.style.left = '0';
    };
    
    // Gestion du redimensionnement
    const handleResize = () => {
      setBodyHeight();
    };
    
    // Initialisation et ajout des écouteurs d'événements
    init();
    window.addEventListener('resize', handleResize);
    
    return () => {
      // Nettoyage
      if (options.frameRequest) {
        cancelAnimationFrame(options.frameRequest);
      }
      document.body.style.height = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.top = '';
      document.body.style.left = '';
      
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div ref={scrollRef}>
      {children}
    </div>
  );
};

export default AppleScrollEffect;
