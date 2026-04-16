const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise
} = require('../controllers/exercisesController');

router.get('/', getAllExercises);
router.get('/:id', getExerciseById);
router.post('/', isAuthenticated, createExercise);
router.put('/:id', isAuthenticated, updateExercise);
router.delete('/:id', isAuthenticated, deleteExercise);

module.exports = router;