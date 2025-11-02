const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodController');
const authController = require('../controllers/authController');

// Define routes
router.get('/moods', moodController.getMoods);
router.post('/moods', moodController.createMood);
router.get('/moods/:id', moodController.getMoodById);
router.put('/moods/:id', moodController.updateMood);
router.delete('/moods/:id', moodController.deleteMood);
router.post('/login', authController.login);

module.exports = router;