const express = require('express');
const router = express.Router();
const login = require('../controllers/Authentication');
const { createAchievement, getAchievements } = require('../controllers/Achievements');
const { createNote, getNotes, deleteNote } = require('../controllers/Notes');
const { getMe } = require('../controllers/User');
const userAuth = require('../middleWare/middleWare');

// --- Authentication ---
router.post('/auth/google', login);

// --- User ---
// Defines the GET /api/me route
router.get('/me', userAuth, getMe);

// --- Achievements ---
router.post('/achievements', userAuth, createAchievement);
router.get('/achievements', userAuth, getAchievements);

// --- Notes ---
// Defines the POST /api/notes route
router.post('/notes', userAuth, createNote);
// Defines the GET /api/notes route
router.get('/notes', userAuth, getNotes);
// Defines the DELETE /api/notes/:id route
router.delete('/notes/:id', userAuth, deleteNote);

module.exports = router;

