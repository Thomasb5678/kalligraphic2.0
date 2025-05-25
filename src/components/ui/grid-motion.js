import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// Fonction utilitaire pour combiner des classes CSS
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export function GridMotion({ items = [], gradientColor = 'black', className = '' }) {
  const gridRef = useRef(null);
  const rowRefs = useRef([]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const totalItems = 28;
  const defaultItems = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;
  
  // Initialiser les références
  useEffect(() => {
    rowRefs.current = rowRefs.current.slice(0, 4);
    setIsInitialized(true);
  }, []);
  
  // Configuration des animations
  useEffect(() => {
    if (!isInitialized) return;
    
    let mouseX = window.innerWidth / 2;
    
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
    };
    
    const updateMotion = () => {
      const maxMoveAmount = 300;
      const baseDuration = 0.8;
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];
      
      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1;
          const moveAmount = ((mouseX / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction;
          
          gsap.to(row, {
            x: moveAmount,
            duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
            ease: 'power3.out',
            overwrite: 'auto',
          });
        }
      });
    };
    
    // S'assurer que gsap est disponible
    if (typeof gsap !== 'undefined' && gsap.ticker) {
      gsap.ticker.lagSmoothing(0);
      const tickerId = gsap.ticker.add(updateMotion);
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        gsap.ticker.remove(tickerId);
      };
    }
  }, [isInitialized]);
  
  return (
    <div className={cn("h-full w-full overflow-hidden", className)} ref={gridRef}>
      <section
        className="relative flex h-screen w-full items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle, ${gradientColor}20 0%, transparent 70%)`,
        }}
      >
        <div className="relative z-2 flex-none grid h-[150vh] w-[150vw] gap-4 grid-rows-[repeat(4,1fr)] grid-cols-[100%] -rotate-[15deg] origin-center">
          {[...Array(4)].map((_, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="grid gap-4 grid-cols-[repeat(7,1fr)] will-change-transform"
              ref={(el) => (rowRefs.current[rowIndex] = el)}
            >
              {[...Array(7)].map((_, itemIndex) => {
                const contentIndex = rowIndex * 7 + itemIndex;
                const content = contentIndex < combinedItems.length ? combinedItems[contentIndex] : `Item ${contentIndex + 1}`;
                
                return (
                  <div key={`item-${rowIndex}-${itemIndex}`} className="relative">
                    <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-900 flex items-center justify-center text-white text-xl">
                      {typeof content === 'string' && content.startsWith('http') ? (
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${content})`,
                          }}
                        />
                      ) : (
                        <div className="p-4 text-center z-1">
                          {content}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="relative pointer-events-none h-full w-full inset-0">
          <div className="rounded-none" />
        </div>
      </section>
    </div>
  );
}
