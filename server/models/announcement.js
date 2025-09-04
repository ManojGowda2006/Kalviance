const mongoose = require('mongoose');
const User = require('./user'); // Make sure to reference the User model

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Short heading
  description: { type: String, required: true }, // Full announcement text
  category: { type: String, enum: ['General', 'Event', 'Deadline', 'Important', 'Urgent', 'Update', 'Resource', 'Opportunity'], required: true },
  date: { type: Date, default: Date.now }, // Date when created
  pinned: { type: Boolean, default: false }, // Keep on top
  
  // This is the crucial new field
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: User 
  },
  
  squadName: { type: String }, // Optional: Name of squad
});

module.exports = mongoose.model('Announcement', announcementSchema);
