const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  referralCode: {
    type: String,
    unique: true
  },
  totalDonations: {
    type: Number,
    default: 0
  },
  rewardsUnlocked: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate referral code before saving
UserSchema.pre('save', function(next) {
  if (!this.referralCode) {
    this.referralCode = `${this.name.toLowerCase().replace(/\s/g, '')}${new Date().getFullYear()}`;
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);