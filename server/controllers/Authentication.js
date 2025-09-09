const User = require('../models/user.js');
require('dotenv').config();
const {OAuth2Client} = require('google-auth-library');
const jwt = require('jsonwebtoken');


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google-login 
const login = async (req, res) => {
  try {
    const { token } = req.body;

    // Verify the token from frontend
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    // Restrict domain
    if (!payload.email.endsWith("@kalvium.community")) {
      return res.status(403).json({ message: "Only @kalvium.community emails allowed" });
    }

    // Find or create user
    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = await User.create({
        googleId: payload.sub,
        name: payload.name,
        email: payload.email,
        profilePicture: payload.picture
      });
    }

    // Create JWT
    const appToken = jwt.sign(
      {email: payload.email, id: user._id }, // Include user ID
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    // Set cookie with JWT
    res.cookie("token", appToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "Strict", 
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });
    
    console.log("User authenticated:", payload.email);
    res.status(200).json({ token: appToken, payload });
  } catch (error) {
    res.status(500).json({ message: "Authentication failed" ,err: error.message});
  }
};

// Logout function
const logout = (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed', error: error.message });
  }
};

module.exports = { login, logout };