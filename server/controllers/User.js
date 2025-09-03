const User = require('../models/user');

// Define the function
const getMe = async (req, res) => {
  try {
    // The user's email is attached to req.user by the userAuth middleware
    const user = await User.findOne({ email: req.user.email }).select('-googleId'); // .select('-googleId') prevents the googleId from being sent to the frontend
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user data.", details: error.message });
  }
};

// We are now exporting an object containing the getMe function.
// This is the crucial fix.
module.exports = { getMe };

