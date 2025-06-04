import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Composant pour l'effet de parallaxe Apple au scroll
export const AppleParallax = ({ 
  children, 
  className = "", 
  depth = 0.1, // Intensité de l'effet de profondeur (0.05 à 0.3 recommandé)
  direction = "up", // Direction du mouvement: 'up', 'down', 'left', 'right'
  overflow = "hidden" // Gestion du débordement
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Calculer les valeurs de transformation en fonction de la direction
  const getTransformProps = () => {
    const range = 100 * depth; // Portée du mouvement en pixels
    
    switch (direction) {
      case 'up':
        return { range: [range, -range] };
      case 'down':
        return { range: [-range, range] };
      case 'left':
        return { range: [range, -range] };
      case 'right':
        return { range: [-range, range] };
      default:
        return { range: [range, -range] };
    }
  };
  
  const transformProps = getTransformProps();
  
  // Valeurs de transformation basées sur la direction
  const transformValue = useTransform(scrollYProgress, [0, 1], transformProps.range);
  
  return (
    <div ref={ref} className={`${className} relative`} style={{ overflow }}>
      <motion.div
        style={{
          y: direction === 'up' || direction === 'down' ? transformValue : 0,
          x: direction === 'left' || direction === 'right' ? transformValue : 0,
          transition: "transform 0.1s cubic-bezier(0.22, 1, 0.36, 1)"
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Composant pour créer l'effet de parallaxe en couches typique d'Apple
export const AppleLayeredParallax = ({
  children,
  className = "",
  layers = [], // Tableau d'objets contenant les éléments des différentes couches
  baseDepth = 0.05, // Profondeur de base pour l'effet
  perspective = 1000 // Perspective pour l'effet 3D
}) => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 à 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 à 0.5
    
    setMousePosition({ x, y });
  };
  
  // Effet de fondu progressif quand on quitte la zone
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  
  return (
    <div
      ref={containerRef}
      className={`${className} relative`}
      style={{ 
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Contenu principal */}
      <motion.div
        className="relative z-10"
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovering 
            ? `rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`
            : 'rotateY(0deg) rotateX(0deg)',
          transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)"
        }}
      >
        {children}
      </motion.div>
      
      {/* Couches de parallaxe */}
      {layers.map((layer, index) => {
        const depth = baseDepth * (index + 1);
        return (
          <motion.div
            key={index}
            className={`absolute ${layer.className || ''}`}
            style={{
              ...layer.style,
              transform: isHovering 
                ? `translate3d(${mousePosition.x * 50 * depth}px, ${mousePosition.y * 50 * depth}px, 0)`
                : 'translate3d(0, 0, 0)',
              transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
              zIndex: layer.zIndex || index
            }}
          >
            {layer.content}
          </motion.div>
        );
      })}
    </div>
  );
};

// Composant pour créer l'effet de parallaxe au scroll avec un aspect glacé/blur comme Apple
export const AppleGlassParallax = ({
  children,
  className = "",
  blur = "8px", // Intensité du flou
  opacity = 0.1, // Opacité de l'effet de verre
  depth = 0.1, // Intensité de l'effet de parallaxe
  color = "255, 255, 255", // Couleur du verre (format RGB)
  border = "1px solid rgba(255, 255, 255, 0.1)", // Bordure du verre
  style = {} // Styles personnalisés supplémentaires
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Transformation basée sur le scroll
  const y = useTransform(scrollYProgress, [0, 1], [50 * depth, -50 * depth]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const yGlass = useTransform(scrollYProgress, [0, 1], [-30 * depth, 30 * depth]);
  
  // Déterminez si nous devons afficher le fond ou non
  const showBackground = opacity > 0 && style.background !== 'transparent';

  return (
    <div ref={ref} className={`${className} relative overflow-hidden`} style={style}>
      {/* Élément principal */}
      <motion.div
        style={{
          y,
          scale,
          transition: "transform 0.1s cubic-bezier(0.22, 1, 0.36, 1)"
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>
      
      {/* Effet de verre Apple, seulement si l'opacité est > 0 et le fond n'est pas transparent */}
      {showBackground && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backdropFilter: `blur(${blur})`,
            backgroundColor: `rgba(${color}, ${opacity})`,
            border: border,
            borderRadius: 'inherit',
            y: yGlass,
            transition: "transform 0.1s cubic-bezier(0.22, 1, 0.36, 1)"
          }}
        />
      )}
    </div>
  );
};
