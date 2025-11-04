import express from 'express';
import { getMoods, createMood, getMoodById, updateMood, deleteMood } from '../controllers/moodController.js';

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

export default router;