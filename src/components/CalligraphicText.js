import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Composant de texte calligraphique qui utilise la police Imperial Script pour afficher
// la phrase "Kalligraphic donne du sens à l'image, de la force aux mots."
const CalligraphicText = ({ className }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      // Animation avec GSAP
      gsap.fromTo(textRef.current, 
        { opacity: 0, scale: 0.9 },
        { 
          opacity: 1, 
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.5
        }
      );

      // Ajouter une animation d'encre qui coule
      gsap.to(textRef.current, {
        className: "+=writing-effect",
        delay: 0.8
      });
    }
  }, []);

  return (
    <div className={className} style={{ width: '100%', margin: '0 auto', textAlign: 'center' }}>
      <h2 
        ref={textRef} 
        className="font-imperial handwriting-text" 
        style={{ 
          fontSize: '3.5rem', 
          lineHeight: '1.2',
          color: '#4F46E5',
          margin: '20px 0',
          fontWeight: 400,
          opacity: 0
        }}
      >
        Kalligraphic donne du sens à l'image, de la force aux mots.
      </h2>
    </div>
  );
};

export default CalligraphicText;