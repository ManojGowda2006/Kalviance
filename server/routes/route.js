const express = require('express');
const router = express.Router();
const login = require('../controllers/Authentication');
const { createAchievement, getAchievements } = require('../controllers/Achievements');
const { createNote, getNotes, deleteNote } = require('../controllers/Notes');
const { getMe } = require('../controllers/User');
const userAuth = require('../middleWare/middleWare');

// --- Authentication ---
// Handles Google login and creates a user session
router.post('/auth/google', login);

// --- User ---
// Gets the currently logged-in user's data
router.get('/me', userAuth, getMe);

// --- Achievements ---
// Gets all achievements (for the main wall)
router.get('/achievements', userAuth, getAchievements);
// Creates a new achievement
router.post('/achievements', userAuth, createAchievement);

// --- Notes ---
// Gets all notes created by the logged-in user
router.get('/notes', userAuth, getNotes);
// Creates a new note
router.post('/notes', userAuth, createNote);
// Deletes a specific note, checking for ownership
router.delete('/notes/:noteId', userAuth, deleteNote);

module.exports = router;

