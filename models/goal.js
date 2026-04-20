const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    target: { type: Number, required: true },
    current: { type: Number, default: 0 },
    unit: { type: String, required: true },
    deadline: { type: Date, required: true },
    achieved: { type: Boolean, default: false }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Goal', goalSchema);