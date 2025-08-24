const express = require('express');
const router = express.Router();
const login = require('../controllers/Authentication');
const { createAchievement, getAchievements } = require('../controllers/Achievements');
const userAuth = require('../middleWare/middleWare');

// Authentication
router.post('/auth/google', login);

// Achievements
router.post('/achievements', userAuth, createAchievement);
router.get('/achievements', userAuth, getAchievements);

module.exports = router;