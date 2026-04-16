const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout
} = require('../controllers/workoutsController');

router.get('/', getAllWorkouts);
router.get('/:id', getWorkoutById);
router.post('/', isAuthenticated, createWorkout);
router.put('/:id', isAuthenticated, updateWorkout);
router.delete('/:id', isAuthenticated, deleteWorkout);

module.exports = router;