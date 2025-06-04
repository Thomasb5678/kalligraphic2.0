// src/components/PortfolioModal.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PortfolioModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors z-10"
                aria-label="Fermer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative bg-gray-800 aspect-square">
                  <img
                    src={project.images?.[0] || project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex flex-col">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full mb-2">
                      {project.category}
                    </span>
                    <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
                    <p className="text-gray-400 mb-6">{project.description}</p>
                  </div>

                  <div className="mt-auto">
                    <div className="border-t border-gray-700 pt-4 mt-4">
                      <div className="text-gray-400 text-sm">
                        <span className="block"><strong>Année :</strong> {project.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Images */}
              {project.images && project.images.length > 1 && (
                <div className="border-t border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Images supplémentaires</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {project.images.slice(1).map((image, index) => (
                      <div key={index} className="aspect-square bg-gray-800 rounded overflow-hidden">
                        <img
                          src={image}
                          alt={`${project.title} - Image ${index + 2}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/images/placeholder.jpg';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PortfolioModal;