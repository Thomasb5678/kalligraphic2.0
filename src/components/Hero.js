import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { BackgroundGradientAnimation } from './ui/background-gradient-animation';
import { StaggeredScrollGroup, StaggeredScrollItem } from './ui/SmoothScrollAnimation';
import { AppleGlassParallax } from './ui/AppleParallax';
import { BlurText } from './ui/animated-blur-text';

// Image de hero - votre image personnalisée locale
const placeholderImage = "/images/hero-image.png";

const Hero = () => {
  useEffect(() => {
    // Animation pour les éléments hero
    const tl = gsap.timeline();
    tl.to('.hero-animate-item', {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power2.out',
    });
    
    // Animation qui se déclenche au scroll quand la section devient visible
    const mainTitle = document.getElementById('mainTitle');
    
    // Vérifier si l'élément existe
    if (mainTitle) {
      // Assurons-nous que le texte est correct
      mainTitle.innerText = "\"Kalligraphic donne du sens à l'image, de la force aux mots.\"";
      
      // Initialisation - texte flou et invisible
      mainTitle.style.opacity = "0";
      mainTitle.style.filter = "blur(20px)";
      mainTitle.style.transition = "opacity 2.5s ease, filter 2.5s ease";
      
      // Fonction pour animer le titre
      const animateTitle = () => {
        console.log("Animating title!"); // Débogage
        mainTitle.style.opacity = "1";
        mainTitle.style.filter = "blur(0px)";
      };
      
      // Détecter le scroll et animer quand la section hero est visible
      const handleScroll = () => {
        const heroSection = document.getElementById('hero');
        if (heroSection && mainTitle) {
          const rect = heroSection.getBoundingClientRect();
          // Si la section est visible dans le viewport
          if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
            console.log("Hero section is visible!"); // Débogage
            animateTitle();
            // Ne déclencher qu'une seule fois
            window.removeEventListener('scroll', handleScroll);
          }
        }
      };
      
      // Vérifier au chargement initial
      setTimeout(handleScroll, 100);
      
      // Écouter les événements de scroll
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="hero" className="relative overflow-hidden z-10">
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgba(15, 23, 42, 0.8)" 
        gradientBackgroundEnd="rgba(30, 41, 59, 0.8)"
        firstColor="0, 106, 255" // Bleu vif
        secondColor="214, 51, 255" // Magenta/violet
        thirdColor="0, 204, 255" // Cyan
        fourthColor="120, 10, 255" // Violet foncé
        fifthColor="255, 40, 150" // Rose
        blendingValue="screen"
        containerClassName="absolute inset-0 h-screen"
      >
        {/* Contenu du hero */}
        
        <div className="relative z-10 container mx-auto px-4 pt-44 pb-16 md:pt-24 md:pb-24 flex flex-col items-center justify-center min-h-screen">
          {/* Centered tagline with BlurText animation */}
          <div className="mb-12 flex justify-center">
            {/* Style sobre pour le texte de titre - tout en blanc avec halo */}
            <h2 id="mainTitle" className="text-white text-xl md:text-2xl lg:text-3xl text-center leading-relaxed font-bold blue-glow" style={{ fontFamily: 'Playfair Display, serif' }}>
              "Kalligraphic donne du sens à l'image, de la force aux mots."
            </h2>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12 w-full">
            {/* Left Column - Text Content */}
            <StaggeredScrollGroup className="w-full lg:w-1/2 mb-12 lg:mb-0 text-white">
              <StaggeredScrollItem>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white leading-tight mb-6">
                  L'art de la <span className="gradient-text-hero">communication visuelle</span> qui s'adapte à vos besoins
                </h1>
              </StaggeredScrollItem>
              <StaggeredScrollItem>
                <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl font-body leading-relaxed">
                  Identité visuelle, site web, réseaux sociaux, rédaction…J'imagine des solutions sur mesure, où chaque mot et chaque image portent votre message avec justesse.
                </p>
              </StaggeredScrollItem>
              <StaggeredScrollItem>
                <div className="flex justify-center">
                  <a
                    href="#contact"
                    className="relative group overflow-hidden rounded-md inline-flex items-center px-6 py-3 text-white font-medium font-body"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-orange-500 opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">Discuter de votre projet</span>
                  </a>
                </div>
              </StaggeredScrollItem>
            </StaggeredScrollGroup>

            {/* Right Column - Hero Image */}
            <AppleGlassParallax 
              className="w-full lg:w-1/2 flex justify-center"
              blur="0px"
              opacity={0}
              border="none"
              style={{ background: 'transparent' }}
            >
              <div className="relative w-full max-w-lg hero-image-container">
                {/* L'image principale du héros */}
                <img 
                  src={placeholderImage} 
                  alt="Kalligraphic - Communication visuelle" 
                  className="w-full h-auto object-cover z-10 relative"
                  style={{ backdropFilter: 'none', background: 'transparent' }}
                />
              </div>
            </AppleGlassParallax>
          </div>
          
          {/* Scroll down indicator */}
          <motion.div 
            className="flex justify-center mt-10 absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <motion.div 
              className="w-8 h-12 border-2 border-white/20 rounded-full flex justify-center items-start p-1 backdrop-blur-md"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <motion.div className="w-1 h-3 bg-white/40 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </BackgroundGradientAnimation>
    </section>
  );
};

export default Hero;