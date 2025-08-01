const User = require('../models/User');

// Dummy login - in real app, use JWT
exports.login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }
    
    res.json(user);
    console.log(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Dummy signup
exports.signup = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    
    user = new User({ name, email });
    await user.save();
    
    res.status(201).json(user);
    console.log(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};