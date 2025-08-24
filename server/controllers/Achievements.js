const Achievement = require('../models/achievement');
const User = require('../models/user')

// Create (POST) a new achievement
async function createAchievement(req, res) {
  try {
    const { title, description, category, achievedBy, date, images } = req.body;

    // Manual validation for required fields
    if (!title || !description || !category || !achievedBy || !date) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }
    console.log(achievedBy)
    const achievedByUser = await User.findOne({email : achievedBy})
    if(!achievedByUser){
      return res.status(404).json({message: "Invalid email"})
    }

    const achievement = new Achievement({
      title,
      description,
      category,
      achievedBy : achievedByUser.id,
      date,
      images: images || []
    });

    const savedAchievement = await achievement.save();
    res.status(201).json(savedAchievement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Read (GET) all achievements
async function getAchievements(req, res) {
  try {
    const achievements = await Achievement.find().populate('achievedBy', 'name email profilePicture');
    res.status(200).json(achievements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createAchievement, getAchievements };
