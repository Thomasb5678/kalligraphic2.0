// routes/index.js - Regroupement des routes de l'API
const express = require('express');
const projectRoutes = require('./projectRoutes');
const authRoutes = require('./authRoutes');
const dataRoutes = require('./dataRoutes'); // NOUVELLE ROUTE

const router = express.Router();

// Routes API principales
router.use('/projects', projectRoutes);
router.use('/auth', authRoutes);
router.use('/data', dataRoutes); // NOUVELLE ROUTE

// Route de base pour vérifier que l'API fonctionne
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API Kalligraphic v1.0',
    timestamp: new Date().toISOString()
  });
});

// Route de santé pour vérifier l'état de l'API
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    port: process.env.PORT || 3001,
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Middleware pour gérer les routes non trouvées
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route API non trouvée'
  });
});

module.exports = router;
