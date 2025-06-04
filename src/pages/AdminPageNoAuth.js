// AdminPageNoAuth.js - Interface admin sans authentification
import React from 'react';
import PortfolioManagerFixed from '../components/PortfolioManagerFixed';

const AdminPageNoAuth = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              🎨 Administration Kalligraphic
            </h1>
            <div className="text-sm text-green-600 font-medium">
              ✅ Accès direct (sans mot de passe)
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-8">
        <PortfolioManagerFixed />
      </div>
    </div>
  );
};

export default AdminPageNoAuth;