const User = require('../models/user.js');

// Get the currently authenticated user's details
const getCurrentUser = async (req, res) => {
    try {
        // The user's email is attached to req.user by the auth middleware
        const userEmail = req.user.email;
        const user = await User.findOne({ email: userEmail }).select('-googleId'); // Exclude googleId

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getCurrentUser };
