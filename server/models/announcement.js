const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Short heading
  description: { type: String, required: true }, // Full announcement text
  category: { type: String, enum: ['General', 'Event', 'Deadline', 'Important'], required: true },
  date: { type: Date, default: Date.now }, // Date when created
  attachments: [{ type: String }], // URLs or file references
  pinned: { type: Boolean, default: false }, // Keep on top
  squadName: { type: String }, // Name of squad
});

module.exports = mongoose.model('Announcement', announcementSchema);
