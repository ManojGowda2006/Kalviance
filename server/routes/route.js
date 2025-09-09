const express = require('express');
const router = express.Router();
// Correctly import both login and logout from the Authentication controller
const { login, logout } = require('../controllers/Authentication');
const { createAchievement, getAchievements } = require('../controllers/Achievements');
const { createNote, getNotes, deleteNote } = require('../controllers/Notes');
const { getMe } = require('../controllers/User');
const { createAnnouncement, getAnnouncements } = require('../controllers/Announcements');
const userAuth = require('../middleWare/middleWare');

// --- Authentication ---
router.post('/auth/google', login);
// This is the missing route that needs to be added
router.post('/auth/logout', logout);

// --- User ---
router.get('/me', userAuth, getMe);

// --- Achievements ---
router.post('/achievements', userAuth, createAchievement); // Typo corrected here
router.get('/achievements', userAuth, getAchievements);

// --- Notes ---
router.post('/notes', userAuth, createNote);
router.get('/notes', userAuth, getNotes);
router.delete('/notes/:id', userAuth, deleteNote);

// --- Announcements ---
router.post('/announcements', userAuth, createAnnouncement);
router.get('/announcements', userAuth, getAnnouncements);

module.exports = router;

