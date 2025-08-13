const express = require('express');
const router = express.Router();
const login = require('../controllers/Authentication');

router.post('/auth/google', login);

module.exports = router;