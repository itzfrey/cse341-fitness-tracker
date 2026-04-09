const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },
    muscleGroup: { type: String, required: true },
    equipment: { type: String, default: 'None' },
    notes: { type: String, default: '' }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Workout', workoutSchema);