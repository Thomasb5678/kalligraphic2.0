// routes/projectRoutes.js - Routes pour la gestion des projets
const express = require('express');
const { check } = require('express-validator');
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Validation pour l'ajout/mise à jour de projet
const projectValidation = [
  check('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Le titre doit contenir entre 1 et 100 caractères'),
  check('category')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('La catégorie doit contenir entre 1 et 50 caractères'),
  check('image')
    .optional()
    .trim()
    .isURL()
    .withMessage('L\'image doit être une URL valide')
    .isLength({ max: 2000 })
    .withMessage('L\'URL de l\'image est trop longue'),
  check('description')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('La description ne doit pas dépasser 2000 caractères'),
  check('date')
    .optional()
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('La date doit contenir entre 4 et 20 caractères')
];

// Routes publiques
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

// Routes protégées (authentification requise)
router.post(
  '/', 
  authMiddleware.protect,
  projectValidation,
  projectController.addProject
);

router.put(
  '/:id', 
  authMiddleware.protect,
  projectValidation,
  projectController.updateProject
);

router.delete(
  '/:id', 
  authMiddleware.protect,
  projectController.deleteProject
);

module.exports = router;
