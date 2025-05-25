// src/components/ImagePreview.js
// Composant pour prévisualiser et gérer les images

import React, { useState } from 'react';

const ImagePreview = ({ src, alt, className = "", fallbackSrc = "/images/placeholder.jpg" }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">Chargement...</div>
        </div>
      )}
      
      <img
        src={imageError ? fallbackSrc : src}
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
          <div className="text-xs text-gray-400">{src}</div>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;