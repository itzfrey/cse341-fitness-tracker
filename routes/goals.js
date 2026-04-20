const express = require('express');
const router = express.Router();
const { isAuthenticated, isAuthenticatedBrowser } = require('../middleware/authenticate');
const {
  getAllGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal
} = require('../controllers/goalsController');

router.get('/', isAuthenticatedBrowser, getAllGoals);
router.get('/:id', isAuthenticatedBrowser, getGoalById);
router.post('/', isAuthenticated, createGoal);
router.put('/:id', isAuthenticated, updateGoal);
router.delete('/:id', isAuthenticated, deleteGoal);

module.exports = router;