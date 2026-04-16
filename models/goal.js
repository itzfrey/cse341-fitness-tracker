const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ['Weight Loss', 'Muscle Gain', 'Endurance', 'Flexibility', 'General Fitness']
    },
    targetValue: { type: Number, required: true, min: 0 },
    currentValue: { type: Number, default: 0, min: 0 },
    unit: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: {
      type: String,
      default: 'In Progress',
      enum: ['In Progress', 'Completed', 'Abandoned']
    },
    notes: { type: String, default: '' }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Goal', goalSchema);