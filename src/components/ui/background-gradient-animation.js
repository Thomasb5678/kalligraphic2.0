import React, { useEffect, useRef, useState } from 'react';
import { cn } from "../../lib/utils";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(20, 20, 30)", // Fond sombre pour contraste
  gradientBackgroundEnd = "rgb(15, 15, 25)", // Fond sombre pour contraste
  firstColor = "0, 106, 255", // Bleu vif
  secondColor = "214, 51, 255", // Magenta/violet
  thirdColor = "0, 204, 255", // Cyan
  fourthColor = "120, 10, 255", // Violet foncé
  fifthColor = "255, 40, 150", // Rose
  blendingValue = "screen", // Mode de fusion pour des couleurs vives
  children,
  className,
  interactive = true,
  containerClassName,
  bubbleOpacity = 0.75,
  bubbleSizes = [25, 30, 20, 18, 23, 15, 28],
  blurAmount = '30px',
  speedFactor = 0.5,
  mouseRepulsionStrength = 4.5,
}) => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);
  const mouseActiveRef = useRef(false);
  const autoMoveTimeRef = useRef(0);
  
  // ===== PARAMÈTRES FACILEMENT MODIFIABLES =====
  // Ces paramètres sont maintenant passés via les props
  
  // Couleurs des bulles
  const bubbleColors = [
    firstColor,
    secondColor, 
    thirdColor,
    fourthColor,
    fifthColor,
    firstColor, // Répété pour avoir plus de bulles
    secondColor  // Répété pour avoir plus de bulles
  ];
  
  // Positions et vélocités des bulles
  const [bubbles, setBubbles] = useState([
    { id: 1, x: 20, y: 30, vx: 0.01, vy: 0.02, size: bubbleSizes[0], color: bubbleColors[0], opacity: bubbleOpacity },
    { id: 2, x: 65, y: 40, vx: -0.01, vy: 0.01, size: bubbleSizes[1], color: bubbleColors[1], opacity: bubbleOpacity },
    { id: 3, x: 40, y: 60, vx: 0.015, vy: -0.01, size: bubbleSizes[2], color: bubbleColors[2], opacity: bubbleOpacity },
    { id: 4, x: 80, y: 25, vx: -0.008, vy: 0.015, size: bubbleSizes[3], color: bubbleColors[3], opacity: bubbleOpacity },
    { id: 5, x: 25, y: 80, vx: 0.012, vy: -0.01, size: bubbleSizes[4], color: bubbleColors[4], opacity: bubbleOpacity },
    { id: 6, x: 70, y: 70, vx: -0.01, vy: -0.008, size: bubbleSizes[5], color: bubbleColors[5], opacity: bubbleOpacity },
    { id: 7, x: 50, y: 15, vx: 0.007, vy: 0.012, size: bubbleSizes[6], color: bubbleColors[6], opacity: bubbleOpacity },
  ]);
  
  // Position de la souris et état d'interaction
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [mouseVelocity, setMouseVelocity] = useState({ x: 0, y: 0 });
  const prevMousePosRef = useRef({ x: -100, y: -100 });
  
  // Animation principale
  useEffect(() => {
    const animate = (timestamp) => {
      // Calculer le delta time pour une animation fluide
      const deltaTime = lastTimeRef.current ? (timestamp - lastTimeRef.current) / 16 : 1;
      lastTimeRef.current = timestamp;
      
      // Incrémenter le compteur de temps pour le mouvement automatique
      autoMoveTimeRef.current += deltaTime * 0.002 * speedFactor;
      
      // Calculer la vélocité de la souris si elle est active
      if (isHovering) {
        const mouseVelX = (mousePos.x - prevMousePosRef.current.x) / deltaTime;
        const mouseVelY = (mousePos.y - prevMousePosRef.current.y) / deltaTime;
        setMouseVelocity({ x: mouseVelX, y: mouseVelY });
        prevMousePosRef.current = { ...mousePos };
      }
      
      setBubbles(prevBubbles => {
        // Copie profonde pour éviter les modifications directes
        const newBubbles = JSON.parse(JSON.stringify(prevBubbles));
        
        // Calculer les forces et mettre à jour les positions
        for (let i = 0; i < newBubbles.length; i++) {
          const bubble = newBubbles[i];
          
          // --- 1. Forces automatisées (toujours actives) ---
          const time = autoMoveTimeRef.current;
          const radius = 20; // Amplitude du mouvement
          const speed = 0.2 + (i * 0.05); // Vitesse de base variée pour chaque bulle
          
          // Force de mouvement autonome (mouvement léger et fluide sans souris)
          if (!mouseActiveRef.current) {
            // Appliquer un mouvement lent et ondulatoire
            const targetX = 30 + (i * 10) + Math.sin(time * speed) * radius;
            const targetY = 40 + (i * 8) + Math.cos(time * (speed + 0.1)) * radius;
            
            // Force vers la position cible
            const dx = targetX - bubble.x;
            const dy = targetY - bubble.y;
            
            // Application d'une force très légère pour mouvement fluide
            bubble.vx += dx * 0.0001 * deltaTime * speedFactor;
            bubble.vy += dy * 0.0001 * deltaTime * speedFactor;
          }
          
          // --- 2. Forces entre bulles (attraction/répulsion) ---
          for (let j = 0; j < newBubbles.length; j++) {
            if (i !== j) {
              const otherBubble = newBubbles[j];
              const dx = otherBubble.x - bubble.x;
              const dy = otherBubble.y - bubble.y;
              const distSq = Math.max(dx * dx + dy * dy, 5); // Éviter division par zéro
              const dist = Math.sqrt(distSq);
              
              // Répulsion à courte distance, attraction légère à distance moyenne
              const forceMagnitude = 0.00005 * deltaTime * speedFactor;
              const repulsionDist = (bubble.size + otherBubble.size) / 3;
              
              // Ajustement de la force selon la distance
              const force = (dist < repulsionDist) 
                ? -forceMagnitude * (repulsionDist / dist) // Répulsion forte à courte distance
                : forceMagnitude * 0.1; // Attraction légère à distance
              
              bubble.vx += (dx / dist) * force;
              bubble.vy += (dy / dist) * force;
            }
          }
          
          // --- 3. Influence de la souris ---
          if (isHovering && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const mouseXPercent = ((mousePos.x - rect.left) / rect.width) * 100;
            const mouseYPercent = ((mousePos.y - rect.top) / rect.height) * 100;
            
            // Distance de la souris à la bulle
            const dx = mouseXPercent - bubble.x;
            const dy = mouseYPercent - bubble.y;
            const distSq = Math.max(dx * dx + dy * dy, 1);
            const dist = Math.sqrt(distSq);
            
            // Calculer la vitesse absolue de la souris
            const mouseSpeed = Math.sqrt(mouseVelocity.x * mouseVelocity.x + mouseVelocity.y * mouseVelocity.y);
            
            // Force d'attraction/répulsion de la souris
            // Plus on bouge vite, plus la répulsion est forte
            const mouseForceMagnitude = 0.0002 * deltaTime * speedFactor;
            
            if (mouseSpeed > 5) {
              // Mode répulsion quand la souris bouge rapidement
              const repulsionForce = -mouseForceMagnitude * mouseRepulsionStrength * mouseSpeed;
              bubble.vx += (dx / dist) * repulsionForce;
              bubble.vy += (dy / dist) * repulsionForce;
            } else {
              // Mode attraction quand la souris est lente ou immobile
              bubble.vx += (dx / dist) * mouseForceMagnitude * 5;
              bubble.vy += (dy / dist) * mouseForceMagnitude * 5;
            }
            
            mouseActiveRef.current = true;
          } else {
            // Diminuer progressivement l'influence de la souris
            if (mouseActiveRef.current) {
              mouseActiveRef.current = false;
            }
          }
          
          // --- 4. Contraintes aux bordures ---
          // Force de rappel douce vers le centre si trop proche des bords
          if (bubble.x < 15) bubble.vx += 0.0002 * deltaTime * speedFactor * (15 - bubble.x);
          if (bubble.x > 85) bubble.vx -= 0.0002 * deltaTime * speedFactor * (bubble.x - 85);
          if (bubble.y < 15) bubble.vy += 0.0002 * deltaTime * speedFactor * (15 - bubble.y);
          if (bubble.y > 85) bubble.vy -= 0.0002 * deltaTime * speedFactor * (bubble.y - 85);
          
          // --- 5. Amortissement (effet visqueux) ---
          // Ralentissement progressif (plus lent = plus fluide)
          bubble.vx *= 0.98;
          bubble.vy *= 0.98;
          
          // --- 6. Légère variation aléatoire pour animation organique ---
          if (Math.random() < 0.03) { // Seulement 3% du temps pour des mouvements subtils
            bubble.vx += (Math.random() - 0.5) * 0.001 * deltaTime * speedFactor;
            bubble.vy += (Math.random() - 0.5) * 0.001 * deltaTime * speedFactor;
          }
          
          // Mise à jour des positions
          bubble.x += bubble.vx * deltaTime * speedFactor;
          bubble.y += bubble.vy * deltaTime * speedFactor;
          
          // S'assurer que les bulles restent dans les limites visibles
          bubble.x = Math.max(5, Math.min(95, bubble.x));
          bubble.y = Math.max(5, Math.min(95, bubble.y));
        }
        
        return newBubbles;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Démarrer l'animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Nettoyage à la destruction du composant
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovering, mousePos, speedFactor, mouseRepulsionStrength]);
  
  // Gestionnaires d'événements
  const handleMouseMove = (event) => {
    if (!containerRef.current || !interactive) return;
    
    setIsHovering(true);
    setMousePos({
      x: event.clientX,
      y: event.clientY
    });
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden top-0 left-0",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: `linear-gradient(40deg, ${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
      }}
    >
      <div className={cn("", className)}>{children}</div>
      
      {/* Les bulles de lave */}
      <div className="absolute inset-0 overflow-hidden">
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            style={{
              position: 'absolute',
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}vw`,
              height: `${bubble.size}vw`,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle at 40% 40%, rgba(${bubble.color}, 1) 0%, rgba(${bubble.color}, 0.8) 30%, rgba(${bubble.color}, 0.4) 60%, rgba(${bubble.color}, 0) 85%)`,
              mixBlendMode: blendingValue,
              filter: `blur(${blurAmount})`,
              opacity: bubble.opacity,
              pointerEvents: 'none',
              zIndex: 0
            }}
          />
        ))}
      </div>
    </div>
  );
};
