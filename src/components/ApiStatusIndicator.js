// src/components/ApiStatusIndicator.js
// Indicateur de statut de l'API pour diagnostiquer les problèmes de connexion

import React, { useState, useEffect } from 'react';
import { buildApiUrl, diagnosticApi } from '../config/api';
import API_CONFIG from '../config/api';

const ApiStatusIndicator = () => {
  const [apiStatus, setApiStatus] = useState({
    connected: false,
    port: null,
    lastCheck: null,
    error: null
  });
  
  const [showDiagnostic, setShowDiagnostic] = useState(false);

  const checkApiStatus = async () => {
    try {
      const apiUrl = buildApiUrl('/api/health');
      const startTime = Date.now();
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const responseTime = Date.now() - startTime;
      
      if (response.ok || response.status === 404) {
        // 404 est OK car l'endpoint /health peut ne pas exister
        setApiStatus({
          connected: true,
          port: window.location.port === '3000' ? '3001' : window.location.port,
          lastCheck: new Date().toLocaleTimeString(),
          responseTime: responseTime,
          error: null
        });
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      setApiStatus({
        connected: false,
        port: null,
        lastCheck: new Date().toLocaleTimeString(),
        error: error.message
      });
    }
  };

  useEffect(() => {
    // Vérification initiale
    checkApiStatus();
    
    // Vérification périodique toutes les 30 secondes
    const interval = setInterval(checkApiStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleDiagnostic = () => {
    const diagnostic = diagnosticApi();
    setShowDiagnostic(!showDiagnostic);
    console.log('🔧 Diagnostic complet:', diagnostic);
  };

  const getStatusColor = () => {
    if (apiStatus.connected) return 'bg-green-500';
    return 'bg-red-500';
  };

  const getStatusText = () => {
    if (apiStatus.connected) {
      return `✅ API Connectée (Port ${apiStatus.port})`;
    }
    return '❌ API Déconnectée';
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border p-3 max-w-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
            <span className="text-sm font-medium">{getStatusText()}</span>
          </div>
          <button
            onClick={handleDiagnostic}
            className="text-blue-500 hover:text-blue-700 text-xs"
          >
            🔧 Debug
          </button>
        </div>
        
        {apiStatus.lastCheck && (
          <div className="text-xs text-gray-500">
            Dernière vérif: {apiStatus.lastCheck}
            {apiStatus.responseTime && ` (${apiStatus.responseTime}ms)`}
          </div>
        )}
        
        {apiStatus.error && (
          <div className="text-xs text-red-600 mt-1">
            Erreur: {apiStatus.error}
          </div>
        )}
        
        {showDiagnostic && (
          <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
            <div><strong>URL actuelle:</strong> {window.location.href}</div>
            <div><strong>Port React:</strong> {window.location.port || '80'}</div>
            <div><strong>API attendue:</strong> {buildApiUrl('/api')}</div>
            <div><strong>Config auto:</strong> {API_CONFIG.getApiBaseUrl()}</div>
          </div>
        )}
        
        <button
          onClick={checkApiStatus}
          className="mt-2 text-xs bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded w-full"
        >
          🔄 Vérifier maintenant
        </button>
      </div>
    </div>
  );
};

export default ApiStatusIndicator;
