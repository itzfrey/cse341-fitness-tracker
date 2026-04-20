const express = require('express');
const router = express.Router();
const { isAuthenticated, isAuthenticatedBrowser } = require('../middleware/authenticate');
const {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise
} = require('../controllers/exercisesController');

router.get('/', isAuthenticatedBrowser, getAllExercises);
router.get('/:id', isAuthenticatedBrowser, getExerciseById);
router.post('/', isAuthenticated, createExercise);
router.put('/:id', isAuthenticated, updateExercise);
router.delete('/:id', isAuthenticated, deleteExercise);

module.exports = router;