// src/components/Login.js
// Composant de connexion pour l'administration

import React, { useState, useEffect } from 'react';
import { 
  validateCredentials, 
  createSession, 
  handleFailedAttempt, 
  isAccountLocked, 
  resetAttempts,
  ADMIN_CONFIG 
} from '../data/auth';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);

  useEffect(() => {
    checkLockoutStatus();
  }, []);

  const checkLockoutStatus = () => {
    const locked = isAccountLocked();
    setIsLocked(locked);
    if (locked) {
      const lockoutStart = parseInt(localStorage.getItem('kalligraphic_admin_lockout') || '0');
      const remainingTime = ADMIN_CONFIG.security.lockoutDuration - (Date.now() - lockoutStart);
      setLockoutTime(Math.ceil(remainingTime / 60000)); // en minutes
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Efface l'erreur quand l'utilisateur tape
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLocked) {
      setError(`Compte verrouillé. Veuillez attendre ${lockoutTime} minute(s).`);
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulation d'un délai de connexion
    setTimeout(() => {
      if (validateCredentials(credentials.username, credentials.password)) {
        // Connexion réussie
        resetAttempts();
        createSession();
        onLogin(true);
      } else {
        // Identifiants incorrects
        const locked = handleFailedAttempt();
        if (locked) {
          setIsLocked(true);
          checkLockoutStatus();
          setError(`Trop de tentatives échouées. Compte verrouillé pour ${Math.ceil(ADMIN_CONFIG.security.lockoutDuration / 60000)} minutes.`);
        } else {
          const attempts = parseInt(localStorage.getItem('kalligraphic_admin_attempts') || '0');
          const remaining = ADMIN_CONFIG.security.maxAttempts - attempts;
          setError(`Identifiants incorrects. ${remaining} tentative(s) restante(s).`);
        }
        setCredentials({ username: '', password: '' });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🎨</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Administration Kalligraphic</h1>
          <p className="text-gray-600">Connectez-vous pour accéder à la gestion de contenu</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Entrez votre nom d'utilisateur"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Entrez votre mot de passe"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              <div className="flex items-center">
                <span className="mr-2">⚠️</span>
                {error}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !credentials.username || !credentials.password || isLocked}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
              isLoading || !credentials.username || !credentials.password || isLocked
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {isLocked ? (
              `🔒 Verrouillé (${lockoutTime}min)`
            ) : isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Connexion en cours...
              </div>
            ) : (
              '🔐 Se connecter'
            )}
          </button>
        </form>

        {/* Informations de sécurité */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <span className="text-blue-500 mr-2">🔒</span>
            <div>
              <h3 className="text-sm font-semibold text-blue-800 mb-1">Sécurité</h3>
              <p className="text-xs text-blue-700">
                Votre session sera automatiquement fermée après 2 heures d'inactivité.
                N'oubliez pas de vous déconnecter après utilisation.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Administration privée - Accès restreint
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;