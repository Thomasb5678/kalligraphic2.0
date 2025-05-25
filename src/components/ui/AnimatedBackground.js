import React, { useEffect } from 'react';
import gsap from 'gsap';
import { useInView } from 'react-intersection-observer';

const AnimatedBackground = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      gsap.to('.floating-element', {
        y: 'random(-20, 20)',
        x: 'random(-20, 20)',
        rotation: 'random(-5, 5)',
        duration: 'random(4, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: {
          each: 0.2,
          from: 'random'
        }
      });

      gsap.to('.particle', {
        y: 'random(-100, -300)',
        x: 'random(-50, 50)',
        opacity: 0,
        duration: 'random(2, 4)',
        repeat: -1,
        ease: 'power1.out',
        stagger: {
          each: 0.2,
          repeat: -1,
          from: 'random'
        }
      });
    }
  }, [inView]);

  const particles = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className="particle absolute w-1 h-1 bg-purple-400/30 rounded-full"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  ));

  return (
    <div ref={ref} className="relative">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl floating-element" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl floating-element" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl floating-element" />
        {particles}
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;