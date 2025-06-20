const mongoose = require('mongoose');

const savedFundSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fundId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a compound index to prevent duplicate saved funds for a user
savedFundSchema.index({ user: 1, fundId: 1 }, { unique: true });

module.exports = mongoose.model('SavedFund', savedFundSchema);