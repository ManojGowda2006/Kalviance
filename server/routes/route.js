const express = require('express');
const router = express.Router();
const login = require('../controllers/Authentication');
const { createAchievement, getAchievements } = require('../controllers/Achievements');
const { createNote, getNotes, deleteNote } = require('../controllers/Notes');
const userAuth = require('../middleWare/middleWare');

// Authentication
router.post('/auth/google', login);

// Achievements
router.post('/achievements', userAuth, createAchievement);
router.get('/achievements', userAuth, getAchievements);

// --- Notes ---
router.post('/notes', userAuth, createNote);
router.get('/notes', userAuth, getNotes);
router.delete('/notes/:id', userAuth, deleteNote);

module.exports = router;