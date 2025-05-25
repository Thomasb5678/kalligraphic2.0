import React, { useRef, useEffect } from 'react';

export const GlowingEffect = ({ 
  spread = 90, 
  glow = true, 
  disabled = false, 
  proximity = 0, 
  inactiveZone = 0.05,
  borderWidth = 2,
  blur = 0,
  movementDuration = 0.3
}) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (disabled) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      container.style.setProperty('--mouse-x', `${x}%`);
      container.style.setProperty('--mouse-y', `${y}%`);
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [disabled]);
  
  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 rounded-2xl pointer-events-none"
      style={{
        '--spread': `${spread}px`,
        '--border-width': `${borderWidth}px`,
        '--blur': `${blur}px`,
        '--movement-duration': `${movementDuration}s`,
        background: glow ? `
          radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(168, 85, 247, 0.3) 0%,
            rgba(236, 72, 153, 0.3) 25%,
            transparent var(--spread)
          )
        ` : 'none',
        transition: `background var(--movement-duration) ease-out`,
      }}
    />
  );
};