import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "../../lib/utils";

const AnimatedText = React.forwardRef(
  (
    {
      text,
      textClassName,
      underlineClassName,
      underlinePath = "M 0,10 Q 75,0 150,10 Q 225,20 300,10",
      underlineHoverPath = "M 0,10 Q 75,20 150,10 Q 225,0 300,10",
      underlineDuration = 1.5,
      fontFamily = "font-heading", // Nouvelle prop pour la police
      animationType = "typewriter", // Nouvelle prop pour le type d'animation
      className,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef(null);
    const isInView = useInView(containerRef, { 
      once: true, 
      threshold: 0.3,
      margin: "-50px"
    });

    // Animation typewriter (par défaut)
    const typewriterVariants = {
      hidden: {
        opacity: 0,
        y: 50,
        rotateX: -90,
      },
      visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    };

    // Animation fade-in avec scale
    const fadeScaleVariants = {
      hidden: {
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)",
      },
      visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    };

    // Animation d'écriture manuscrite - comme une plume qui écrit
    const handwritingVariants = {
      hidden: {
        opacity: 0,
        pathLength: 0,
        scale: 0.8,
        rotate: -3,
        x: -10,
        filter: "blur(2px)",
      },
      visible: {
        opacity: 1,
        pathLength: 1,
        scale: 1,
        rotate: 0,
        x: 0,
        filter: "blur(0px)",
        transition: {
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          pathLength: {
            duration: 0.9,
            ease: "easeInOut",
          },
          opacity: {
            duration: 0.3,
            ease: "easeOut",
          },
        },
      },
    };

    // Animation moderne et subtile 2030
    const modernVariants = {
      hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
          type: "tween",
        },
      },
    };

    // Animation futuriste 2030 - Holographic reveal (sans flou)
    const futuristicVariants = {
      hidden: {
        opacity: 0,
        scale: 0.5,
        rotateY: 30,
        z: -100,
        brightness: 0.4,
      },
      visible: {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        z: 0,
        brightness: 1,
        transition: {
          duration: 0.3,
          ease: [0.34, 1.56, 0.64, 1],
          type: "spring",
          stiffness: 300,
          damping: 25,
        },
      },
    };

    // Animation bounce
    const bounceVariants = {
      hidden: {
        opacity: 0,
        y: -100,
        rotate: -10,
      },
      visible: {
        opacity: 1,
        y: 0,
        rotate: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200,
          duration: 0.6,
        },
      },
    };

    // Sélectionner le variant selon le type d'animation
    const getLetterVariants = () => {
      switch(animationType) {
        case "fadeScale": return fadeScaleVariants;
        case "bounce": return bounceVariants;
        case "futuristic": return futuristicVariants;
        case "modern": return modernVariants;
        case "handwriting": return handwritingVariants;
        default: return typewriterVariants;
      }
    };

    // Animation du trait de soulignement avec dégradé
    const pathVariants = {
      hidden: {
        pathLength: 0,
        opacity: 0,
      },
      visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
          duration: underlineDuration,
          ease: "easeInOut",
          delay: 0.3,
        },
      },
    };

    // Animation du conteneur
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: animationType === "typewriter" ? 0.03 : animationType === "handwriting" ? 0.12 : animationType === "modern" ? 0.08 : animationType === "futuristic" ? 0.015 : 0.1,
          delayChildren: 0.3,
        },
      },
    };

    // Diviser le texte en mots et lettres pour l'animation
    const words = text.split(" ");

    return (
      <div
        ref={containerRef}
        className={cn("flex flex-col items-center justify-center gap-4", className)}
        {...props}
      >
        <div className="relative">
          <motion.div
            className={cn("text-center", fontFamily, textClassName)}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.02 }}
            style={{ perspective: "1000px" }}
          >
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    className="inline-block"
                    variants={getLetterVariants()}
                    style={{ transformOrigin: "bottom center" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.div>
          
          {/* SVG avec dégradé centré sous le texte */}
          <motion.svg
            width="100%"
            height="20"
            viewBox="0 0 600 20"
            className={cn("absolute -bottom-2 left-1/2 transform -translate-x-1/2", underlineClassName)}
            style={{ width: "90%" }}
          >
            <defs>
              <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="30%" stopColor="#6366f1" />
                <stop offset="60%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>
            <motion.path
              d={underlinePath}
              stroke="url(#underlineGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={pathVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{
                d: underlineHoverPath,
                transition: { duration: 0.8 },
              }}
            />
          </motion.svg>
        </div>
      </div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
