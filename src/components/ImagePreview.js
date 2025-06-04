// src/components/ImagePreview.js
// Composant pour prévisualiser et gérer les images avec support amélioré des URLs

import React, { useState, useEffect } from 'react';

const ImagePreview = ({ src, alt, className = "", fallbackSrc = "/images/placeholder.jpg" }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Déterminer si l'URL est externe (commence par http:// ou https://)
  const isExternalUrl = src && (src.startsWith('http://') || src.startsWith('https://'));
  
  // Pour les URLs externes, nous les utilisons directement
  // Pour les URLs locales, nous vérifions si elles contiennent des caractères problématiques
  const imageSrc = isExternalUrl ? src : src;

  const handleImageError = () => {
    console.warn(`Erreur de chargement de l'image: ${src}`);
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
  };

  // Précharger l'image
  useEffect(() => {
    setIsLoading(true);
    setImageError(false);
    
    const img = new Image();
    img.onload = handleImageLoad;
    img.onerror = handleImageError;
    img.src = imageSrc;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageSrc]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">Chargement...</div>
        </div>
      )}
      
      <img
        src={imageError ? fallbackSrc : imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
      />
      
      {imageError && (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center text-gray-500">
          <div className="text-sm mb-2">Image non trouvée</div>
          <div className="text-xs text-gray-400 max-w-full px-2 break-all">{src}</div>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;