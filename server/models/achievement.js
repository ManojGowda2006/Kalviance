const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Achievement name
  description: { type: String, required: true }, // Short details
  category: { type: String, enum: ['Academic', 'Sports', 'Dojo', 'Hackathon', 'Community', 'Other'], required: true },
  achievedBy: { type: mongoose.Schema.Types.ObjectId, required: true }, // User ID who achieved it
  date: { type: Date, required: true }, // Date of achievement
  images: [{ type: String }], // Proofs or photos
  likes: { type: Number, default: 0 }
  
});

module.exports = mongoose.model('Achievement', achievementSchema);
