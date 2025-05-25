import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GlowingEffect } from './ui/GlowingEffect';
import { StaggeredScrollGroup, StaggeredScrollItem } from './ui/SmoothScrollAnimation';
import AnimatedBackground from './ui/AnimatedBackground';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0,
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

  const services = [
    {
      id: 1,
      title: 'Identité visuelle',
      features: [
        'Création de logos et chartes graphiques',
        'Univers visuel sur mesure',
        'Déclinaisons print & web'
      ],
      quote: 'Une image cohérente, reconnaissable, qui incarne votre message à chaque point de contact.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Web design',
      features: [
        'Design de sites vitrines ou portfolio',
        'Expérience utilisateur fluide',
        'Mise en valeur de vos contenus'
      ],
      quote: 'Un site clair, esthétique et aligné avec votre image.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Communication digitale',
      features: [
        'Stratégie réseaux sociaux',
        'Création de visuels impactants (posts, stories, carrousels…)',
        'Templates personnalisés pour gagner du temps'
      ],
      quote: 'Une présence en ligne qui vous ressemble et qui engage.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Présentations & supports',
      features: [
        'Présentations visuelles (pitch, projets, conférences…)',
        'Documents internes ou commerciaux designés',
        'Supports pour appels d\'offres, formations, etc.'
      ],
      quote: "Vos idées méritent d'être comprises et mémorables.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V9a2 2 0 012-2h6l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2z"></path>
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="py-16 bg-gray-950">
      <AnimatedBackground>
        <div className="container mx-auto px-4 md:px-6">
          <StaggeredScrollGroup className="text-center mb-16">
            <StaggeredScrollItem>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-heading">
                Des solutions créatives <span className="gradient-text">adaptées à vos besoins</span>
              </h2>
            </StaggeredScrollItem>
            <StaggeredScrollItem>
              <p className="max-w-2xl mx-auto text-white/70 text-lg">
                Chez <strong className="text-white font-medium">Kalligraphic</strong>, je pense la communication comme un tout : chaque mot, chaque image, chaque support a un rôle à jouer. Mon approche mêle <strong className="text-white font-medium">design, stratégie et écriture</strong> pour créer une identité forte et des messages qui font sens.
              </p>
            </StaggeredScrollItem>
          </StaggeredScrollGroup>

          <StaggeredScrollGroup staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 pt-2">
          {services.map((service, index) => (
            <StaggeredScrollItem key={service.id} animationType="fade-up" className="h-[480px]">
              <div className="group relative h-full rounded-2xl transition-all duration-300 hover:scale-[1.01]">
                {/* Contour en gradient - visible au survol */}
                <div className="absolute inset-0 rounded-2xl bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden" 
                     style={{ 
                       padding: '1px',
                     }}>
                  <div style={{ 
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, #6366f1, #f97316)',
                  }}></div>
                  {/* Fond noir intérieur pour créer l'effet de contour uniquement */}
                  <div className="absolute inset-px rounded-xl bg-gray-950"></div>
                </div>
                <div className="relative h-full flex flex-col rounded-xl bg-gray-950 p-6 border border-gray-800/30 transition-all duration-300 group-hover:border-transparent group-hover:bg-purple-900/5 group-hover:backdrop-blur-md z-10">
                  
                  {/* Icône - section fixe */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-orange-500/20 border border-indigo-400/30 flex items-center justify-center transition-all duration-300 group-hover:from-indigo-500/30 group-hover:to-orange-500/30 group-hover:border-orange-400/50">
                      <div className="text-indigo-300 group-hover:text-orange-300 transition-colors duration-300">
                        {service.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Titre - section fixe */}
                  <h3 className="text-xl font-semibold text-white text-center mb-6 font-heading leading-tight h-[28px] flex items-center justify-center">
                    {service.title}
                  </h3>
                  
                  {/* Liste des fonctionnalités - zone flexible */}
                  <div className="flex-1 mb-6 min-h-[120px] flex flex-col justify-start">
                    <div className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <p key={idx} className="text-sm text-gray-300 leading-relaxed transition-colors duration-300 group-hover:text-gray-200 font-body">
                          {feature}
                        </p>
                      ))}
                    </div>
                  </div>
                  
                  {/* Spacer pour forcer l'alignement du trait */}
                  <div className="flex-grow"></div>
                  
                  {/* Citation - TOUJOURS à la même position */}
                  <div className="h-[150px] pt-6 flex flex-col justify-start" style={{
                    borderTop: '1px solid',
                    borderImage: 'linear-gradient(90deg, #6366f1, #f97316) 1'
                  }}>
                    <p className="text-lg text-gray-200 leading-relaxed font-heading font-medium text-center transition-colors duration-300 group-hover:text-white overflow-hidden px-1">
                      <span className="font-heading">
                        {service.quote}
                      </span>
                    </p>
                  </div>
                  
                </div>
              </div>
            </StaggeredScrollItem>
          ))}
        </StaggeredScrollGroup>
        </div>
      </AnimatedBackground>
    </section>
  );
};

export default Services;
