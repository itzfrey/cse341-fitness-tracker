const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    githubId: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    email: { type: String, default: '' },
    avatar: { type: String, default: '' }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('User', userSchema);