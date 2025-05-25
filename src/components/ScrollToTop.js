import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Ce composant assure que les pages se chargent depuis le haut à chaque navigation
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Si pas d'ancre dans l'URL, scroll tout en haut
    if (!hash) {
      // Utiliser requestAnimationFrame pour s'assurer que le scroll est exécuté après le rendu
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
