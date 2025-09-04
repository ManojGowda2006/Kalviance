const Announcement = require('../models/announcement');
const User = require('../models/user');

// Create (POST) a new announcement
async function createAnnouncement(req, res) {
  try {
    const { title, description, category, pinned, squadName } = req.body;
    const userEmail = req.user.email; // This comes from the userAuth middleware

    // Basic validation
    if (!title || !description || !category) {
      return res.status(400).json({ error: "Title, description, and category are required." });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const announcement = new Announcement({
      title,
      description,
      category,
      pinned: pinned || false,
      squadName: squadName || '',
      createdBy: user._id, // Assign the user's database ID
    });

    const savedAnnouncement = await announcement.save();
    res.status(201).json(savedAnnouncement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Read (GET) all announcements
async function getAnnouncements(req, res) {
  try {
    // Fetch announcements, populate the creator's details, and sort by pinned status then date
    const announcements = await Announcement.find()
      .populate('createdBy', 'name email profilePicture')
      .sort({ pinned: -1, date: -1 }); // Pinned announcements will appear first

    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createAnnouncement, getAnnouncements };
