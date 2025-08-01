const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  totalDonations: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);