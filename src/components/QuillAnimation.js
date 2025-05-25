import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const QuillAnimation = () => {
  const quillRef = useRef(null);
  
  useEffect(() => {
    if (quillRef.current) {
      // Animation du mouvement de la plume
      const tl = gsap.timeline({ delay: 0.8 });
      
      tl.to(quillRef.current, {
        x: '280px',
        duration: 5.2, // Ajuster pour correspondre à la durée totale de l'animation calligraphique
        ease: "none",
      });
      
      // Petits mouvements pour simuler l'écriture
      gsap.to(quillRef.current, {
        y: '+=2',
        rotation: '+=1',
        duration: 0.1,
        repeat: 40,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);
  
  return (
    <motion.div 
      ref={quillRef}
      className="absolute top-[-24px] left-0 z-10 pointer-events-none"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M20 6L7 19L3 15M17 3L13 7" 
          stroke="#4F46E5" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M7 19C6.5 19.5 4 20 4 20C4 20 4.5 17.5 5 17L7 19Z" 
          fill="#4F46E5" 
          stroke="#4F46E5" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
};

export default QuillAnimation;