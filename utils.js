// utils.js - Fonctions utilitaires pour l'application Kalligraphic
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Génère une chaîne aléatoire sécurisée
 * @param {number} length - Longueur de la chaîne à générer
 * @returns {string} - Chaîne aléatoire hexadécimale
 */
exports.generateRandomString = (length = 32) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

/**
 * Vérifie si un fichier existe
 * @param {string} filePath - Chemin du fichier à vérifier
 * @returns {boolean} - true si le fichier existe, false sinon
 */
exports.fileExists = (filePath) => {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    console.error(`Erreur lors de la vérification du fichier ${filePath}:`, error);
    return false;
  }
};

/**
 * Crée un répertoire s'il n'existe pas
 * @param {string} dirPath - Chemin du répertoire à créer
 * @returns {boolean} - true si le répertoire existe ou a été créé, false sinon
 */
exports.ensureDirectoryExists = (dirPath) => {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Répertoire créé: ${dirPath}`);
    }
    return true;
  } catch (error) {
    console.error(`Erreur lors de la création du répertoire ${dirPath}:`, error);
    return false;
  }
};

/**
 * Encode une chaîne en Base64
 * @param {string} str - Chaîne à encoder
 * @returns {string} - Chaîne encodée en Base64
 */
exports.encodeBase64 = (str) => {
  return Buffer.from(str).toString('base64');
};

/**
 * Décode une chaîne Base64
 * @param {string} base64Str - Chaîne Base64 à décoder
 * @returns {string} - Chaîne décodée
 */
exports.decodeBase64 = (base64Str) => {
  return Buffer.from(base64Str, 'base64').toString('utf8');
};

/**
 * Sanitize une chaîne en échappant les caractères spéciaux HTML
 * @param {string} str - Chaîne à sanitizer
 * @returns {string} - Chaîne sanitizée
 */
exports.sanitizeHTML = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

/**
 * Tronque une chaîne à une longueur maximale
 * @param {string} str - Chaîne à tronquer
 * @param {number} maxLength - Longueur maximale
 * @param {string} suffix - Suffixe à ajouter si la chaîne est tronquée
 * @returns {string} - Chaîne tronquée
 */
exports.truncateString = (str, maxLength = 100, suffix = '...') => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Formate une date au format français
 * @param {Date|string} date - Date à formater
 * @returns {string} - Date formatée (JJ/MM/AAAA)
 */
exports.formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  return `${day}/${month}/${year}`;
};
