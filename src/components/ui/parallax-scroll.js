"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";

// Ajout d'une propriété projectTitles pour les légendes
export const ParallaxScrollSecond = ({
  images,
  className,
  projectTitles = [], // Tableau de titres correspondant aux images
}) => {
  const gridRef = useRef(null);
  const { scrollYProgress } = useScroll({
    // Utiliser le scroll de la page entière pour le parallaxe
    offset: ["start end", "end start"],
  });
  
  // Augmenter les valeurs de transformation pour un effet plus prononcé
  const translateYFirst = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const translateXFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotateXFirst = useTransform(scrollYProgress, [0, 1], [0, -15]);
  
  const translateYThird = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const translateXThird = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotateXThird = useTransform(scrollYProgress, [0, 1], [0, 15]);
  
  // Division des images en trois colonnes
  const third = Math.ceil(images.length / 3);
  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);
  
  // Générer un titre par défaut si non fourni
  const getTitle = (index) => {
    return projectTitles[index] || `Projet ${index + 1}`;
  };
  
  return (
    <div
      className={`relative h-auto w-full ${className || ''}`}
      ref={gridRef}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-6xl mx-auto gap-10 py-40 px-10 min-h-[80vh]"
      >
        <div className="grid gap-24">  {/* Augmenter l'espacement pour un meilleur effet */}
          {firstPart.map((el, idx) => (
            <motion.div
              style={{
                y: translateYFirst,
                x: translateXFirst,
                rotateZ: rotateXFirst,
              }}
              key={"grid-1" + idx}
              className="relative group overflow-hidden"
            >
              <img
                src={el}
                className="h-96 w-full object-cover object-center rounded-lg shadow-xl transition-all duration-300 group-hover:scale-105"
                alt={getTitle(idx)}
              />
              {/* Overlay pour le texte */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <h3 className="text-white font-bold font-heading text-lg">{getTitle(idx)}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-24">  {/* Augmenter l'espacement pour un meilleur effet */}
          {secondPart.map((el, idx) => (
            <motion.div 
              key={"grid-2" + idx}
              className="relative group overflow-hidden"
            >
              <img
                src={el}
                className="h-96 w-full object-cover object-center rounded-lg shadow-xl transition-all duration-300 group-hover:scale-105"
                alt={getTitle(idx + third)}
              />
              {/* Overlay pour le texte */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <h3 className="text-white font-bold font-heading text-lg">{getTitle(idx + third)}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-24">  {/* Augmenter l'espacement pour un meilleur effet */}
          {thirdPart.map((el, idx) => (
            <motion.div
              style={{
                y: translateYThird,
                x: translateXThird,
                rotateZ: rotateXThird,
              }}
              key={"grid-3" + idx}
              className="relative group overflow-hidden"
            >
              <img
                src={el}
                className="h-96 w-full object-cover object-center rounded-lg shadow-xl transition-all duration-300 group-hover:scale-105"
                alt={getTitle(idx + third * 2)}
              />
              {/* Overlay pour le texte */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <h3 className="text-white font-bold font-heading text-lg">{getTitle(idx + third * 2)}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};