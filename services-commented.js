import React from 'react';
import { motion } from 'framer-motion'; // Pour les animations
import { useInView } from 'react-intersection-observer'; // Pour détecter quand la section est visible
import { GlowingEffect } from './ui/GlowingEffect'; // Effet de bordure lumineuse au survol

const Services = () => {
  // ═══════════════════════════════════════════════════════════════
  // 📱 DÉTECTION DE VISIBILITÉ
  // ═══════════════════════════════════════════════════════════════
  const [ref, inView] = useInView({
    triggerOnce: false, // L'animation peut se rejouer plusieurs fois
    threshold: 0, // Se déclenche dès que 0% de la section est visible
  });

  // ═══════════════════════════════════════════════════════════════
  // 🎬 CONFIGURATIONS D'ANIMATIONS
  // ═══════════════════════════════════════════════════════════════
  
  // Animation du conteneur principal (anime les enfants un par un)
  const containerVariants = {
    hidden: { opacity: 0 }, // État initial : invisible
    visible: {
      opacity: 1, // État final : visible
      transition: {
        staggerChildren: 0.2, // Délai de 0.2s entre chaque enfant
      },
    },
  };

  // Animation des éléments individuels (titre, cartes, etc.)
  const itemVariants = {
    hidden: { 
      y: 50,      // Commence 50px plus bas
      opacity: 0  // Invisible
    },
    visible: {
      y: 0,       // Position finale normale
      opacity: 1, // Visible
      transition: {
        duration: 0.6,    // Animation de 0.6 seconde
        ease: 'easeOut',  // Courbe d'animation fluide
      },
    },
  };

  // ═══════════════════════════════════════════════════════════════
  // 📋 DONNÉES DES SERVICES
  // ═══════════════════════════════════════════════════════════════
  const services = [
    {
      id: 1, // Identifiant unique pour React
      title: 'Identité visuelle', // Titre affiché
      description: 'Création de logos et chartes graphiques, univers visuel sur mesure, déclinaisons print & web. Une image cohérente, reconnaissable, qui incarne votre message à chaque point de contact.',
      icon: ( // Icône SVG (vous pouvez la changer)
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
        </svg>
      ),
    },
    // ... autres services suivent le même modèle
  ];

  return (
    // ═══════════════════════════════════════════════════════════════
    // 🏗️ STRUCTURE PRINCIPALE
    // ═══════════════════════════════════════════════════════════════
    <section 
      id="services"           // Pour la navigation (ancre #services)
      className="py-20 bg-gray-950" // Padding vertical + fond noir
    >
      <div className="container mx-auto px-4 md:px-6"> {/* Conteneur centré avec marges */}
        
        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* 📄 EN-TÊTE DE LA SECTION */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          ref={ref} // Référence pour la détection de visibilité
          variants={containerVariants} // Animation du conteneur
          initial="visible" // État initial (vous pouvez changer en "hidden")
          animate="visible"  // État d'animation (vous pouvez changer en "inView ? 'visible' : 'hidden'")
          className="text-center mb-16" // Centré avec marge en bas
        >
          {/* Sous-titre */}
          <motion.span 
            variants={itemVariants} // Utilise l'animation itemVariants
            className="inline-block text-white/60 font-medium text-lg mb-2"
            // CLASSES EXPLIQUÉES :
            // text-white/60 = Blanc à 60% d'opacité
            // font-medium = Poids de police moyen
            // text-lg = Taille de texte large
            // mb-2 = Marge en bas de 0.5rem
          >
            Mes services
          </motion.span>
          
          {/* Titre principal */}
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-6 text-white font-heading"
            // CLASSES EXPLIQUÉES :
            // text-3xl = Texte très grand (sur mobile)
            // md:text-4xl = Texte encore plus grand (sur écrans moyens+)
            // font-bold = Police en gras
            // mb-6 = Marge en bas de 1.5rem
            // font-heading = Police Playfair Display (définie dans CSS)
          >
            Des solutions créatives <span className="gradient-purple-pink">adaptées à vos besoins</span>
            {/* span avec gradient = Texte en dégradé violet-rose */}
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="max-w-2xl mx-auto text-white/70 text-lg"
            // CLASSES EXPLIQUÉES :
            // max-w-2xl = Largeur maximale de 42rem
            // mx-auto = Centré horizontalement
            // text-white/70 = Blanc à 70% d'opacité
          >
            Chez <strong className="text-white font-medium">Kalligraphic</strong>, je pense la communication comme un tout : chaque mot, chaque image, chaque support a un rôle à jouer. Mon approche mêle <strong className="text-white font-medium">design, stratégie et écriture</strong> pour créer une identité forte et des messages qui font sens.
            {/* strong = Texte en gras avec couleur blanche pure */}
          </motion.p>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* 🎴 GRILLE DES SERVICES */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          variants={containerVariants}
          initial="visible"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6"
          // GRILLE EXPLIQUÉE :
          // grid-cols-1 = 1 colonne sur mobile
          // md:grid-cols-2 = 2 colonnes sur tablette
          // lg:grid-cols-4 = 4 colonnes sur ordinateur
          // xl:grid-cols-4 = 4 colonnes sur grand écran
          // gap-6 = Espacement de 1.5rem entre les éléments
        >
          {/* Boucle pour afficher chaque service */}
          {services.map((service, index) => (
            <motion.div
              key={service.id} // Clé unique pour React
              variants={itemVariants} // Animation de chaque carte
              className="min-h-[350px]" // Hauteur minimale de 350px
            >
              {/* ═══════════════════════════════════════════════════════════════ */}
              {/* 🎨 CARTE DE SERVICE */}
              {/* ═══════════════════════════════════════════════════════════════ */}
              <div className="group relative h-full rounded-2xl border border-gray-800/50 bg-gray-950/30 p-1 transition-all duration-300 hover:border-gray-700/50">
                {/* CLASSES EXPLIQUÉES :
                    group = Permet les effets hover sur les enfants
                    relative = Position relative pour l'effet GlowingEffect
                    h-full = Hauteur à 100% du conteneur
                    rounded-2xl = Bordures très arrondies
                    border border-gray-800/50 = Bordure grise à 50% d'opacité
                    bg-gray-950/30 = Fond gris très foncé à 30% d'opacité
                    p-1 = Padding de 0.25rem
                    transition-all duration-300 = Animation de 300ms
                    hover:border-gray-700/50 = Bordure plus claire au survol
                */}
                
                {/* Effet de bordure lumineuse */}
                <GlowingEffect
                  spread={70}              // Largeur de l'arc lumineux
                  glow={true}             // Effet activé
                  disabled={false}        // Pas désactivé
                  proximity={0}           // Distance de déclenchement
                  inactiveZone={0.05}     // Zone centrale inactive
                  borderWidth={2}         // Épaisseur de la bordure
                  blur={0}               // Pas de flou
                  movementDuration={0.3} // Vitesse de suivi de la souris
                />
                
                {/* Contenu de la carte */}
                <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-xl bg-gray-950/80 p-6 backdrop-blur-sm border border-gray-800/20 transition-all duration-300 group-hover:bg-gray-950/90">
                  {/* CLASSES EXPLIQUÉES :
                      flex flex-col = Disposition verticale
                      gap-6 = Espacement de 1.5rem entre les éléments
                      overflow-hidden = Cache le débordement
                      backdrop-blur-sm = Effet de flou d'arrière-plan
                      group-hover:bg-gray-950/90 = Fond plus opaque au survol
                  */}
                  
                  <div className="flex flex-col gap-4">
                    {/* ═══════════════════════════════════════════════════════════════ */}
                    {/* 🎯 ICÔNE */}
                    {/* ═══════════════════════════════════════════════════════════════ */}
                    <div className="w-fit rounded-xl border border-gray-700/50 bg-gray-900/30 p-4 transition-all duration-300 group-hover:border-gray-600/70 group-hover:bg-gray-800/50">
                      {/* CLASSES EXPLIQUÉES :
                          w-fit = Largeur adaptée au contenu
                          rounded-xl = Bordures arrondies
                          p-4 = Padding de 1rem
                          group-hover:... = Changements au survol de la carte parent
                      */}
                      <div className="text-gray-300 transition-colors duration-300 group-hover:text-white">
                        {service.icon} {/* Affiche l'icône SVG du service */}
                      </div>
                    </div>
                    
                    {/* ═══════════════════════════════════════════════════════════════ */}
                    {/* 📝 CONTENU TEXTUEL */}
                    {/* ═══════════════════════════════════════════════════════════════ */}
                    <div className="flex-1 space-y-4">
                      {/* flex-1 = Prend tout l'espace disponible */}
                      {/* space-y-4 = Espacement vertical de 1rem entre les enfants */}
                      
                      {/* Titre du service */}
                      <h3 className="text-xl font-semibold text-white leading-tight transition-all duration-300 group-hover:text-gray-100">
                        {service.title}
                      </h3>
                      
                      {/* Description du service */}
                      <p className="text-sm text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* 🔗 BOUTON D'ACTION */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-16" // Centré avec marge en haut
        >
          <a 
            href="#contact" // Lien vers la section contact
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 group"
            // CLASSES EXPLIQUÉES :
            // inline-flex items-center = Disposition horizontale centrée
            // px-8 py-4 = Padding horizontal et vertical
            // bg-gradient-to-r = Dégradé de gauche à droite
            // from-purple-600 to-pink-600 = Couleurs du dégradé
            // hover:scale-105 = Agrandissement de 5% au survol
          >
            Discuter de votre projet
            {/* Icône flèche */}
            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {/* group-hover:translate-x-1 = Déplace la flèche à droite au survol */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

// ═══════════════════════════════════════════════════════════════
// 📚 GUIDE DE MODIFICATION
// ═══════════════════════════════════════════════════════════════

/*
🎯 POUR MODIFIER LE CONTENU :

1. CHANGER LES TEXTES :
   - Modifiez les strings dans l'array `services`
   - Changez les titres dans les balises <span>, <h2>, <p>

2. AJOUTER/SUPPRIMER DES SERVICES :
   - Ajoutez un objet dans l'array `services`
   - Changez la grille : "grid-cols-4" → "grid-cols-5" pour 5 services

3. MODIFIER LES ICÔNES :
   - Remplacez le contenu de la propriété `icon`
   - Utilisez Heroicons, Lucide, ou vos propres SVG

4. CHANGER LES COULEURS :
   - Modifiez les classes Tailwind : text-white → text-blue-500
   - Changez les gradients : from-purple-600 → from-blue-600

🎬 POUR MODIFIER LES ANIMATIONS :

1. VITESSE D'ANIMATION :
   - duration: 0.6 → duration: 1.0 (plus lent)
   - staggerChildren: 0.2 → staggerChildren: 0.1 (plus rapide)

2. TYPE D'ANIMATION :
   - ease: 'easeOut' → ease: 'easeInOut' ou 'linear'
   - y: 50 → y: 100 (commence plus bas)

3. DÉCLENCHEMENT :
   - initial="visible" → initial="hidden" (commence invisible)
   - animate="visible" → animate={inView ? 'visible' : 'hidden'}

4. NOUVEL EFFET :
   - Ajoutez scale: 0.8 dans hidden pour un effet de zoom
   - Ajoutez rotate: -5 pour un effet de rotation

📐 POUR MODIFIER LA MISE EN PAGE :

1. GRILLE :
   - grid-cols-4 → grid-cols-3 (3 colonnes)
   - gap-6 → gap-8 (plus d'espace)

2. TAILLES :
   - min-h-[350px] → min-h-[400px] (cartes plus hautes)
   - text-lg → text-xl (texte plus grand)

3. ESPACEMENT :
   - py-20 → py-32 (plus d'espace vertical)
   - mb-16 → mb-24 (plus d'espace après le titre)
*/