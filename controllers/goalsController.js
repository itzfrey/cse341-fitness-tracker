const Goal = require('../models/goal');

const getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving goals', error: err.message });
  }
};

const getGoalById = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.status(200).json(goal);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving goal', error: err.message });
  }
};

const createGoal = async (req, res) => {
  try {
    const { userId, title, type, targetValue, unit, deadline } = req.body;
    if (!userId || !title || !type || !targetValue || !unit || !deadline) {
      return res.status(400).json({
        message: 'Missing required fields: userId, title, type, targetValue, unit, deadline'
      });
    }
    const goal = new Goal(req.body);
    const saved = await goal.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Error creating goal', error: err.message });
  }
};

const updateGoal = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'No update data provided' });
    }
    const updated = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Goal not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error updating goal', error: err.message });
  }
};

const deleteGoal = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const deleted = await Goal.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Goal not found' });
    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting goal', error: err.message });
  }
};

module.exports = { getAllGoals, getGoalById, createGoal, updateGoal, deleteGoal };