const Note = require('../models/note');
const User = require('../models/user');

// Create (POST) a new note
async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const userEmail = req.user.email; // from userAuth middleware

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required." });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const note = new Note({
      title,
      content,
      createdBy: user._id, // Assign the user's ObjectId
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Read (GET) all notes
async function getNotes(req, res) {
  try {
    const notes = await Note.find().populate('createdBy', 'name email profilePicture').sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete (DELETE) a note
async function deleteNote(req, res) {
  try {
    const noteId = req.params.id;
    const userEmail = req.user.email; // from userAuth middleware

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    // Authorization check: Ensure the user deleting the note is the one who created it
    if (note.createdBy.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "Forbidden: You are not authorized to delete this note." });
    }

    await Note.findByIdAndDelete(noteId);
    res.status(200).json({ message: "Note deleted successfully." });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = { createNote, getNotes, deleteNote };
