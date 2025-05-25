import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Animation élégante au scroll dans le style Apple
// Ce composant permet d'animer n'importe quel élément enfant au scroll
export const SmoothScrollAnimation = ({ 
  children, 
  className = "", 
  offset = 0.2, // Quand l'animation commence par rapport à la position de l'écran
  duration = 0.8, // Durée de l'animation
  animationType = "fade-up", // Type d'animation: 'fade-up', 'fade-in', 'slide-left', 'slide-right', 'zoom'
  delay = 0, // Délai avant le début de l'animation (en secondes)
  ease = [0.22, 1, 0.36, 1], // Courbe d'animation (cubic-bezier) style Apple
  threshold = 0, // Seuil d'intersection (0 à 1)
  once = true, // Si true, l'animation ne se joue qu'une fois
}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${-offset} 1`, `${1 - offset} 1`],
  });

  // Définir les animations en fonction du type sélectionné
  const getAnimationVariants = () => {
    switch (animationType) {
      case 'fade-up':
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        };
      case 'fade-in':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      case 'slide-left':
        return {
          hidden: { opacity: 0, x: -30 },
          visible: { opacity: 1, x: 0 }
        };
      case 'slide-right':
        return {
          hidden: { opacity: 0, x: 30 },
          visible: { opacity: 1, x: 0 }
        };
      case 'zoom':
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1 }
        };
      default:
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        };
    }
  };

  const variants = getAnimationVariants();

  // Utiliser useEffect pour détecter quand l'élément est en vue
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { 
        threshold: threshold,
        rootMargin: `${offset * 100}% 0px ${-offset * 100}% 0px`
      }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) observer.disconnect();
    };
  }, [threshold, offset, once]);

  // Animer l'opacité basée sur la position de scroll
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.2, 1, 1]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: ease
      }}
      style={{ opacity: once ? undefined : opacity }}
    >
      {children}
    </motion.div>
  );
};

// Ce composant permet d'animer un groupe d'éléments avec un effet séquentiel (staggered)
export const StaggeredScrollGroup = ({ 
  children, 
  className = "", 
  staggerDelay = 0.1, // Délai entre chaque élément
  ...props 
}) => {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Variantes pour le conteneur et les éléments enfants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: props.delay || 0,
        ease: props.ease || [0.22, 1, 0.36, 1]
      }
    }
  };

  // Utiliser useEffect pour détecter quand le groupe est en vue
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (props.once !== false) observer.disconnect();
        } else if (props.once === false) {
          setIsInView(false);
        }
      },
      { 
        threshold: props.threshold || 0,
        rootMargin: `${(props.offset || 0.2) * 100}% 0px ${-(props.offset || 0.2) * 100}% 0px`
      }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) observer.disconnect();
    };
  }, [props.threshold, props.offset, props.once]);

  return (
    <motion.div
      ref={containerRef}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
};

// Ce composant est utilisé comme enfant direct de StaggeredScrollGroup
export const StaggeredScrollItem = ({ 
  children, 
  className = "", 
  animationType = "fade-up" 
}) => {
  // Définir les animations en fonction du type sélectionné
  const getAnimationVariants = () => {
    switch (animationType) {
      case 'fade-up':
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }
        };
      case 'fade-in':
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }
        };
      case 'slide-left':
        return {
          hidden: { opacity: 0, x: -30 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }
        };
      case 'slide-right':
        return {
          hidden: { opacity: 0, x: 30 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }
        };
      case 'zoom':
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }
        };
      default:
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }
        };
    }
  };

  return (
    <motion.div
      className={className}
      variants={getAnimationVariants()}
    >
      {children}
    </motion.div>
  );
};
