import express from "express";
import {
  getMoods,
  createMood,
  getMoodById,
  updateMood,
  deleteMood,
} from "../controllers/moodController.js";
import { getKoreanDramas, searchKdramas } from "../controllers/kDramaController.js";
import { register, login, logout } from "../controllers/authController.js";

const router = express.Router();

// Mood routes
router.get("/moods", getMoods);
router.post("/moods", createMood);
router.get("/moods/:id", getMoodById);
router.put("/moods/:id", updateMood);
router.delete("/moods/:id", deleteMood);

// K-drama routes
router.get("/kdramas", getKoreanDramas);
router.get("/kdramas/search", searchKdramas);

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;