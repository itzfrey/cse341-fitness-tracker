const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const {
  getAllGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal
} = require('../controllers/goalsController');

router.get('/', getAllGoals);
router.get('/:id', getGoalById);
router.post('/', isAuthenticated, createGoal);
router.put('/:id', isAuthenticated, updateGoal);
router.delete('/:id', isAuthenticated, deleteGoal);

module.exports = router;