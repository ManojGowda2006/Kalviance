const Note = require('../models/note');
const User = require('../models/user');

// Create (POST) a new note
async function createNote(req, res) {
  try {
    // Correctly get title, description, and fileUrl from the request body
    const { title, description, fileUrl } = req.body;
    const userEmail = req.user.email; // from userAuth middleware

    // Updated validation to check for all required fields
    if (!title || !description || !fileUrl) {
      return res.status(400).json({ error: "Title, description, and a file are required." });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create the note with all the correct fields from the request
    const note = new Note({
      title,
      description,
      fileUrl,
      createdBy: user._id,
    });

    const savedNote = await note.save();
    // Populate the newly created note with user info before sending it back
    const populatedNote = await Note.findById(savedNote._id).populate('createdBy', 'name email profilePicture');
    res.status(201).json(populatedNote);
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

