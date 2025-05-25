import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { GlowingEffect } from './ui/GlowingEffect';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const controls = useAnimation();
  const formRef = useRef(null);
  const [focusedField, setFocusedField] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [isTyping, setIsTyping] = useState({});

  useEffect(() => {
    if (inView) {
      controls.start('visible');
      
      // GSAP animations pour les éléments flottants
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

      // Animation des particules
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
  }, [inView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1.0],
      },
    },
  };

  const floatingVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.5,
      },
    },
  };

  const validateField = (name, value) => {
    const errors = { ...fieldErrors };
    
    switch (name) {
      case 'email':
        if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          errors.email = 'Email invalide';
        } else {
          delete errors.email;
        }
        break;
      case 'name':
        if (value.length < 2) {
          errors.name = 'Le nom doit contenir au moins 2 caractères';
        } else {
          delete errors.name;
        }
        break;
      case 'subject':
        if (value.length < 5) {
          errors.subject = 'Le sujet doit contenir au moins 5 caractères';
        } else {
          delete errors.subject;
        }
        break;
      case 'message':
        if (value.length < 20) {
          errors.message = 'Le message doit contenir au moins 20 caractères';
        } else {
          delete errors.message;
        }
        break;
      default:
        break;
    }
    
    setFieldErrors(errors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    setIsTyping({ ...isTyping, [name]: true });
    validateField(name, value);
    
    // Reset typing state after delay
    setTimeout(() => {
      setIsTyping({ ...isTyping, [name]: false });
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation finale
    Object.keys(formState).forEach((key) => {
      validateField(key, formState[key]);
    });

    if (Object.keys(fieldErrors).length === 0) {
      // Animation de soumission
      gsap.to(formRef.current, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });

      setFormStatus({
        submitted: true,
        success: true,
        message: 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.',
      });
      
      // Réinitialiser après animation
      setTimeout(() => {
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setFormStatus({
          submitted: false,
          success: false,
          message: '',
        });
      }, 5000);
    }
  };

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      href: 'https://linkedin.com',
      color: 'from-indigo-400 to-blue-600'
    },
    { 
      name: 'Instagram', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
        </svg>
      ),
      href: 'https://instagram.com',
      color: 'from-orange-400 to-pink-500'
    },
    { 
      name: 'Behance', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
        </svg>
      ),
      href: 'https://behance.net',
      color: 'from-indigo-500 to-blue-600'
    },
    { 
      name: 'Dribbble', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
        </svg>
      ),
      href: 'https://dribbble.com',
      color: 'from-orange-500 to-red-500'
    }
  ];

  // Générateur de particules
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
    <section id="contact" className="relative pt-20 pb-12 overflow-hidden bg-gray-950">
      {/* Éléments de fond animés */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl floating-element" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl floating-element" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl floating-element" />
        {particles}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-6xl mx-auto"
        >
          {/* En-tête de section avec effet de typing */}
          <div className="text-center mb-10">
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white font-heading"
            >
              Donnons vie à vos{' '}
              <span className="gradient-text">idées ensemble</span>
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="max-w-2xl mx-auto text-white/70 text-lg leading-relaxed"
            >
              Chaque projet commence par une conversation. Partagez-moi votre vision, 
              et construisons ensemble une communication qui vous ressemble.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne d'informations avec effets 3D */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-1"
            >
              <div className="space-y-8">
                {/* Carte d'information principale */}
                <motion.div 
                  variants={floatingVariants}
                  className="relative group"
                  whileHover={{ 
                    rotateY: 5,
                    rotateX: -5,
                    transition: { duration: 0.3 }
                  }}
                  style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-white mb-6 font-heading">Parlons de votre projet</h3>
                    
                    <div className="space-y-6">
                      {[
                        {
                          icon: (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          ),
                          label: 'Email',
                          value: 'contact@kalligraphic.fr',
                          href: 'mailto:contact@kalligraphic.fr'
                        },
                        {
                          icon: (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          ),
                          label: 'Téléphone',
                          value: '+33 6 00 00 00 00',
                          href: 'tel:+33600000000'
                        },
                        {
                          icon: (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          ),
                          label: 'Disponibilité',
                          value: 'Lun - Ven : 9h - 18h',
                          href: null
                        }
                      ].map((item, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-start space-x-4"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {item.icon}
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">{item.label}</p>
                            {item.href ? (
                              <a href={item.href} className="text-white hover:text-purple-400 transition-colors">
                                {item.value}
                              </a>
                            ) : (
                              <p className="text-white">{item.value}</p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Réseaux sociaux avec effet de hover avancé */}
                <motion.div 
                  variants={floatingVariants}
                  className="relative group"
                  whileHover={{ 
                    rotateY: -5,
                    rotateX: 5,
                    transition: { duration: 0.3 }
                  }}
                  style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300">
                    <h3 className="text-xl font-bold text-white mb-6 font-heading">Suivez-moi</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {socialLinks.map((social, index) => (
                        <motion.a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative group/social"
                          onHoverStart={() => setHoveredSocial(index)}
                          onHoverEnd={() => setHoveredSocial(null)}
                          whileHover={{ scale: 1.05, z: 20 }}
                          whileTap={{ scale: 0.95 }}
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${social.color} rounded-xl opacity-0 group-hover/social:opacity-100 blur-xl transition-all duration-300`} />
                          <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 group-hover/social:border-gray-600/50 transition-all duration-300 flex items-center justify-center">
                            <div className="text-gray-400 group-hover/social:text-white transition-colors duration-300">
                              {social.icon}
                            </div>
                          </div>
                          <AnimatePresence>
                            {hoveredSocial === index && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 rounded text-xs text-white whitespace-nowrap"
                              >
                                {social.name}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Formulaire de contact avec animations avancées */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-2"
            >
              <div className="relative group">
                <GlowingEffect
                  spread={120}
                  glow={true}
                  disabled={false}
                  proximity={0}
                  inactiveZone={0.1}
                  borderWidth={2}
                  blur={0}
                  movementDuration={0.5}
                />
                <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300">
                  <AnimatePresence mode="wait">
                    {formStatus.submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center py-20"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                          className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                          <motion.svg 
                            className="w-12 h-12 text-white" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                          >
                            <motion.path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="3" 
                              d="M5 13l4 4L19 7"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.5, delay: 0.5 }}
                            />
                          </motion.svg>
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-4">Message envoyé avec succès !</h3>
                        <p className="text-gray-400">{formStatus.message}</p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Champ Nom */}
                          <motion.div
                            whileTap={{ scale: 0.995 }}
                            className="relative"
                          >
                            <label 
                              htmlFor="name" 
                              className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
                                focusedField === 'name' ? 'text-purple-400' : 'text-gray-400'
                              }`}
                            >
                              Nom complet
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={formState.name}
                                onChange={handleInputChange}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-200 ${
                                  fieldErrors.name 
                                    ? 'border-red-500/50 focus:border-red-400'
                                    : focusedField === 'name'
                                    ? 'border-purple-500/50 bg-gray-800/70'
                                    : 'border-gray-700/50 hover:border-gray-600/50'
                                }`}
                                placeholder="Jean Dupont"
                                required
                              />
                              {isTyping.name && (
                                <motion.div
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                >
                                  <div className="flex space-x-1">
                                    <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                  </div>
                                </motion.div>
                              )}
                              {fieldErrors.name && (
                                <motion.p
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="absolute text-red-400 text-xs mt-1"
                                >
                                  {fieldErrors.name}
                                </motion.p>
                              )}
                            </div>
                          </motion.div>

                          {/* Champ Email */}
                          <motion.div
                            whileTap={{ scale: 0.995 }}
                            className="relative"
                          >
                            <label 
                              htmlFor="email" 
                              className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
                                focusedField === 'email' ? 'text-purple-400' : 'text-gray-400'
                              }`}
                            >
                              Email
                            </label>
                            <div className="relative">
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formState.email}
                                onChange={handleInputChange}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-200 ${
                                  fieldErrors.email 
                                    ? 'border-red-500/50 focus:border-red-400'
                                    : focusedField === 'email'
                                    ? 'border-purple-500/50 bg-gray-800/70'
                                    : 'border-gray-700/50 hover:border-gray-600/50'
                                }`}
                                placeholder="jean@exemple.com"
                                required
                              />
                              {isTyping.email && (
                                <motion.div
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                >
                                  <div className="flex space-x-1">
                                    <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                  </div>
                                </motion.div>
                              )}
                              {fieldErrors.email && (
                                <motion.p
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="absolute text-red-400 text-xs mt-1"
                                >
                                  {fieldErrors.email}
                                </motion.p>
                              )}
                            </div>
                          </motion.div>
                        </div>

                        {/* Champ Sujet */}
                        <motion.div
                          whileTap={{ scale: 0.995 }}
                          className="relative"
                        >
                          <label 
                            htmlFor="subject" 
                            className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
                              focusedField === 'subject' ? 'text-purple-400' : 'text-gray-400'
                            }`}
                          >
                            Sujet
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="subject"
                              name="subject"
                              value={formState.subject}
                              onChange={handleInputChange}
                              onFocus={() => setFocusedField('subject')}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-200 ${
                                fieldErrors.subject 
                                  ? 'border-red-500/50 focus:border-red-400'
                                  : focusedField === 'subject'
                                  ? 'border-purple-500/50 bg-gray-800/70'
                                  : 'border-gray-700/50 hover:border-gray-600/50'
                              }`}
                              placeholder="Création d'identité visuelle pour mon entreprise"
                              required
                            />
                            {fieldErrors.subject && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute text-red-400 text-xs mt-1"
                              >
                                {fieldErrors.subject}
                              </motion.p>
                            )}
                          </div>
                        </motion.div>

                        {/* Champ Message avec compteur de caractères animé */}
                        <motion.div
                          whileTap={{ scale: 0.995 }}
                          className="relative"
                        >
                          <label 
                            htmlFor="message" 
                            className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
                              focusedField === 'message' ? 'text-purple-400' : 'text-gray-400'
                            }`}
                          >
                            Message
                          </label>
                          <div className="relative">
                            <textarea
                              id="message"
                              name="message"
                              value={formState.message}
                              onChange={handleInputChange}
                              onFocus={() => setFocusedField('message')}
                              onBlur={() => setFocusedField(null)}
                              rows="6"
                              className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-200 resize-none ${
                                fieldErrors.message 
                                  ? 'border-red-500/50 focus:border-red-400'
                                  : focusedField === 'message'
                                  ? 'border-purple-500/50 bg-gray-800/70'
                                  : 'border-gray-700/50 hover:border-gray-600/50'
                              }`}
                              placeholder="Parlez-moi de votre projet, vos objectifs, vos délais..."
                              required
                            />
                            <motion.div 
                              className="absolute bottom-3 right-3 text-xs text-gray-500"
                              animate={{ 
                                color: formState.message.length > 450 ? '#ef4444' : formState.message.length > 400 ? '#f59e0b' : '#6b7280'
                              }}
                            >
                              {formState.message.length} / 500
                            </motion.div>
                            {fieldErrors.message && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute text-red-400 text-xs -bottom-5"
                              >
                                {fieldErrors.message}
                              </motion.p>
                            )}
                          </div>
                        </motion.div>

                        {/* Checkbox et bouton avec animations */}
                        <div className="space-y-6">
                          <motion.div 
                            className="flex items-start"
                            whileHover={{ x: 2 }}
                          >
                            <input
                              id="privacy"
                              name="privacy"
                              type="checkbox"
                              className="mt-1 w-4 h-4 bg-gray-800/50 border-gray-600 rounded text-purple-500 focus:ring-purple-500 focus:ring-offset-0 focus:ring-2 transition-all duration-200"
                              required
                            />
                            <label htmlFor="privacy" className="ml-3 text-sm text-gray-400 leading-relaxed">
                              J'accepte que mes données soient traitées conformément à la 
                              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors underline ml-1">politique de confidentialité</a>
                            </label>
                          </motion.div>

                          <motion.button
                            type="submit"
                            disabled={Object.keys(fieldErrors).length > 0}
                            className="relative w-full group overflow-hidden rounded-xl"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-orange-500 opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <motion.div 
                              className="absolute inset-0 opacity-0 group-hover:opacity-20"
                              animate={{
                                background: [
                                  'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                                  'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                                  'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                                ],
                              }}
                              transition={{ duration: 3, repeat: Infinity }}
                            />
                            <div className="relative px-8 py-4 text-white font-medium flex items-center justify-center space-x-2">
                              <span>Envoyer le message</span>
                              <svg 
                                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </div>
                          </motion.button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Section FAQ rapide avec animations */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <p className="text-gray-400 mb-4">
              Vous avez des questions ? Consultez notre 
              <a href="#faq" className="text-purple-400 hover:text-purple-300 transition-colors ml-1">FAQ</a>
              {' '}ou prenez directement contact.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              {[
                { icon: '✓', text: 'Réponse sous 24h' },
                { icon: '✓', text: 'Devis gratuit' },
                { icon: '✓', text: '100% personnalisé' },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <motion.div
                    className="w-4 h-4 text-green-400 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + index * 0.1, type: 'spring' }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;