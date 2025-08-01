const Leaderboard = require('../models/Leaderboard');
const User = require('../models/User');

exports.getLeaderboard = async (req, res) => {
  try {
    // Update leaderboard with current data
    const users = await User.find().sort({ totalDonations: -1 }).limit(10);

    // Update or create leaderboard entries in parallel
    await Promise.all(
      users.map(user =>
        Leaderboard.findOneAndUpdate(
          { userId: user._id },
          {
            userId: user._id,
            name: user.name,
            totalDonations: user.totalDonations
          },
          { upsert: true, new: true }
        )
      )
    );

    // Get the updated leaderboard
    const leaderboard = await Leaderboard.find()
      .sort({ totalDonations: -1 })
      .limit(10)
      .populate('userId', 'name email');

    res.json(leaderboard);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};