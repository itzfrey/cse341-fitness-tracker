const Exercise = require('../models/exercise');

const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving exercises', error: err.message });
  }
};

const getExerciseById = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ message: 'Exercise not found' });
    res.status(200).json(exercise);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving exercise', error: err.message });
  }
};

const createExercise = async (req, res) => {
  try {
    const { name, category, description } = req.body;
    if (!name || !category || !description) {
      return res.status(400).json({ message: 'Missing required fields: name, category, description' });
    }
    const exercise = new Exercise(req.body);
    const saved = await exercise.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Error creating exercise', error: err.message });
  }
};

const updateExercise = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'No update data provided' });
    }
    const updated = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Exercise not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error updating exercise', error: err.message });
  }
};

const deleteExercise = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const deleted = await Exercise.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Exercise not found' });
    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting exercise', error: err.message });
  }
};

module.exports = { getAllExercises, getExerciseById, createExercise, updateExercise, deleteExercise };