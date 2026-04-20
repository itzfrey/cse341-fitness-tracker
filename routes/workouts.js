const express = require('express');
const router = express.Router();
const { isAuthenticated, isAuthenticatedBrowser } = require('../middleware/authenticate');
const {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout
} = require('../controllers/workoutsController');

router.get('/', isAuthenticatedBrowser, getAllWorkouts);
router.get('/:id', isAuthenticatedBrowser, getWorkoutById);
router.post('/', isAuthenticated, createWorkout);
router.put('/:id', isAuthenticated, updateWorkout);
router.delete('/:id', isAuthenticated, deleteWorkout);

module.exports = router;