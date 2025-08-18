const Achievement = require('../models/achievement');

// Create (POST) a new achievement
async function createAchievement(req, res) {
  try {
    const { title, description, category, achievedBy, date, images } = req.body;

    // Manual validation for required fields
    if (!title || !description || !category || !achievedBy || !date) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    const achievement = new Achievement({
      title,
      description,
      category,
      achievedBy,
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
    const achievements = await Achievement.find();
    res.status(200).json(achievements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createAchievement, getAchievements };
