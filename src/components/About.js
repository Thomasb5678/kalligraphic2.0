import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SmoothScrollAnimation, StaggeredScrollGroup, StaggeredScrollItem } from './ui/SmoothScrollAnimation';
import { AppleParallax, AppleGlassParallax } from './ui/AppleParallax';
import AnimatedBackground from './ui/AnimatedBackground';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="about" className="pt-44 pb-20 bg-gray-950">
      <AnimatedBackground>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Column - Image */}
            <AppleGlassParallax className="w-full lg:w-1/2">
              <div className="relative glass-dark">
                {/* Image principale - vous pourrez la remplacer */}
                <img 
                  src="/images/about-image.jpg" 
                  alt="Kalligraphic - À propos" 
                  className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
                  onError={(e) => {
                    // Image de fallback si l'image principale n'existe pas
                    e.target.src = "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
                  }}
                />
                
                {/* Effet décoratif derrière l'image */}
                <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl"></div>
              </div>
            </AppleGlassParallax>

            {/* Right Column - Contenu textuel */}
            <StaggeredScrollGroup className="w-full lg:w-1/2">
              <StaggeredScrollItem>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white font-heading leading-tight">
                  <span className="gradient-text">Kalligraphic</span>, c'est bien plus que du graphisme
                </h2>
              </StaggeredScrollItem>
              
              <StaggeredScrollItem>
                <div className="space-y-6 text-white/80 font-body leading-relaxed">
                  <p className="text-lg">
                    C'est une approche globale de la communication, où l'image et les mots avancent ensemble.
                  </p>
                  
                  <p className="text-lg">
                    Web design, identité visuelle, réseaux sociaux, présentations orales ou écrites… Je conçois chaque support comme un prolongement de votre message. Un mot juste, un visuel fort, une intention claire : <strong className="text-white font-medium">chaque détail compte</strong>.
                  </p>
                  
                  <p className="text-lg">
                    <strong className="text-white font-medium">Écoute, intuition, structure et style</strong> guident ma démarche. Je traduis vos idées, même floues au départ, en une communication fluide, cohérente et percutante.
                  </p>
                </div>
              </StaggeredScrollItem>
              
              <StaggeredScrollItem>
                <div className="mt-10">
                  <a 
                    href="#contact" 
                    className="relative group overflow-hidden rounded-xl inline-flex items-center px-8 py-4 text-white font-medium transform hover:scale-105 font-body"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-orange-500 opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 flex items-center justify-center space-x-2">
                      <span>Discuter de votre projet</span>
                      <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </div>
                  </a>
                </div>
              </StaggeredScrollItem>
            </StaggeredScrollGroup>
          </div>
        </div>
      </AnimatedBackground>
    </section>
  );
};

export default About;
