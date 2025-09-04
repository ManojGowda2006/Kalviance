const express = require('express');
const router = express.Router();

// --- Import Controllers ---
const login = require('../controllers/Authentication');
const { createAchievement, getAchievements } = require('../controllers/Achievements');
const { createNote, getNotes, deleteNote } = require('../controllers/Notes');
const { getMe } = require('../controllers/User');
const { createAnnouncement, getAnnouncements } = require('../controllers/Announcements'); // Import the new controller
const userAuth = require('../middleWare/middleWare');

// --- Authentication ---
router.post('/auth/google', login);

// --- User ---
router.get('/me', userAuth, getMe);

// --- Achievements ---
router.post('/achievements', userAuth, createAchievement);
router.get('/achievements', userAuth, getAchievements);

// --- Notes ---
router.post('/notes', userAuth, createNote);
router.get('/notes', userAuth, getNotes);
router.delete('/notes/:id', userAuth, deleteNote);

// --- Announcements (New Section) ---
router.post('/announcements', userAuth, createAnnouncement);
router.get('/announcements', userAuth, getAnnouncements);


module.exports = router;