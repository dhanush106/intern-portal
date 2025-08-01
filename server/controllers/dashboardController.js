const User = require('../models/User');

exports.getUserDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.addDonation = async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    user.totalDonations += amount;
    
    // Check for reward unlocks
    const rewards = [];
    if (user.totalDonations >= 100 && !user.rewardsUnlocked.includes('Bronze')) {
      rewards.push('Bronze');
      user.rewardsUnlocked.push('Bronze');
    }
    if (user.totalDonations >= 500 && !user.rewardsUnlocked.includes('Silver')) {
      rewards.push('Silver');
      user.rewardsUnlocked.push('Silver');
    }
    if (user.totalDonations >= 1000 && !user.rewardsUnlocked.includes('Gold')) {
      rewards.push('Gold');
      user.rewardsUnlocked.push('Gold');
    }
    
    await user.save();
    
    res.json({ user, rewards });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};