import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    // Déclencher une fois au chargement
    handleScroll();
    
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const menuItems = [
    { name: 'Services', href: '/#services' },
    { name: 'À propos', href: '/#about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/#contact' }
  ];

  // Gestionnaire pour le clic sur les liens ancre
  const handleAnchorClick = (e, href) => {
    // Vérifier si c'est un lien d'ancre qui commence par /#
    if (href.includes('#')) {
      // Si nous ne sommes pas sur la page d'accueil mais le lien est vers une ancre sur la page d'accueil
      if (location.pathname !== '/' && href.startsWith('/#')) {
        // Store the hash in localStorage to scroll to after navigation
        const hash = href.split('#')[1];
        localStorage.setItem('scrollToSection', hash);
        // Allow default navigation to home page
        return;
      }
      
      // Si nous sommes déjà sur la bonne page et qu'il s'agit d'une ancre
      if ((location.pathname === '/' && href.startsWith('/#')) || 
          (location.pathname === href.split('#')[0])) {
        e.preventDefault();
        
        // Extraire l'identifiant de l'ancre
        const id = href.split('#')[1];
        const element = document.getElementById(id);
        
        if (element) {
          // Décalage spécifique pour chaque section
          let offset = 0;
          
          // Ajuster en fonction de la section cible
          if (id === 'services') {
            // Décalage précis pour la section Services
            offset = 100;
          } else if (id === 'about') {
            offset = 120;
          } else if (id === 'contact') {
            // Décalage précis pour la section Contact
            offset = 80;  // Ajusté pour voir le titre "Donnons vie à vos idées ensemble"
          } else {
            // Décalage par défaut
            offset = scrolled ? 120 : 140;
          }
          
          // Calculer la position de l'élément
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          
          // Faire défiler la page
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
          
          // Mettre à jour l'URL sans recharger la page
          window.history.pushState(null, '', href);
        }
      }
    }
  };
  
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
      scrolled ? 'py-0 backdrop-blur-md bg-slate-900/60' : 'py-2 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center ml-1 transition-all duration-500 ease-in-out"
          >
            <Link to="/" onClick={(e) => {
              // Si on est déjà sur la page d'accueil, juste défiler en haut
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({top: 0, behavior: 'smooth'});
              }
              // Sinon, le comportement par défaut du Link prendra le relais et nous amènera à la page d'accueil
            }} className={`flex items-center pl-1 pt-0 transition-all duration-500 ease-in-out ${scrolled ? 'transform scale-90 -ml-2' : ''}`}>
              <div className="relative">
                <div className={`absolute inset-0 bg-white/20 blur-xl rounded-full transition-all duration-500 ease-in-out ${scrolled ? 'scale-90' : 'scale-100'}`}></div>
                <div className={`absolute inset-0 bg-blue-500/10 blur-lg rounded-full animate-pulse transition-all duration-500 ease-in-out ${scrolled ? 'scale-90' : 'scale-100'}`}></div>
                <img 
                  src="/images/logo.png" 
                  alt="Kalligraphic" 
                  className={`object-contain filter-none drop-shadow-lg relative z-10 transition-all duration-500 ease-in-out ${scrolled ? 'h-24' : 'h-32'}`}
                  style={{
                    imageRendering: 'crisp-edges',
                    filter: 'brightness(1.2) contrast(1.1)'
                  }} 
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:flex space-x-8"
          >
            {menuItems.map((item, i) => {
              if (item.href.startsWith('/') && !item.href.includes('#')) {
                return (
                  <motion.div key={item.name} className="inline-block">
                    <Link
                      to={item.href}
                      className={`font-medium transition-colors duration-200 font-body text-shadow-lg font-bold ${location.pathname === item.href ? 'text-orange-500' : 'text-white hover:text-orange-500'}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              } else {
                return (
                  <motion.div key={item.name} className="inline-block">
                    <a
                      href={item.href}
                      className="font-medium text-white hover:text-orange-500 transition-colors duration-200 font-body text-shadow-lg font-bold"
                      onClick={(e) => handleAnchorClick(e, item.href)}
                    >
                      {item.name}
                    </a>
                  </motion.div>
                );
              }
            })}
          </motion.div>

          {/* Mobile menu button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:hidden"
          >
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden backdrop-blur-md bg-slate-900/80"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => {
              if (item.href.startsWith('/') && !item.href.includes('#')) {
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium text-shadow-lg font-bold ${location.pathname === item.href ? 'text-orange-500' : 'text-white hover:text-orange-500'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              } else {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-shadow-lg font-bold text-white hover:text-orange-500"
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (item.href === '/') {
                        e.preventDefault();
                        window.scrollTo({top: 0, behavior: 'smooth'});
                      } else {
                        handleAnchorClick(e, item.href);
                      }
                    }}
                  >
                    {item.name}
                  </a>
                );
              }
            })}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;