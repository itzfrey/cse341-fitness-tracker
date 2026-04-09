const Workout = require('../models/workout');

const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving workouts', error: err.message });
  }
};

const getWorkoutById = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving workout', error: err.message });
  }
};

const createWorkout = async (req, res) => {
  try {
    const { name, type, duration, caloriesBurned, difficulty, muscleGroup } = req.body;
    if (!name || !type || !duration || !caloriesBurned || !difficulty || !muscleGroup) {
      return res.status(400).json({ message: 'Missing required fields: name, type, duration, caloriesBurned, difficulty, muscleGroup' });
    }
    const workout = new Workout(req.body);
    const saved = await workout.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Error creating workout', error: err.message });
  }
};

const updateWorkout = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'No update data provided' });
    }
    const updated = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Workout not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error updating workout', error: err.message });
  }
};

const deleteWorkout = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const deleted = await Workout.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Workout not found' });
    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting workout', error: err.message });
  }
};

module.exports = { getAllWorkouts, getWorkoutById, createWorkout, updateWorkout, deleteWorkout };