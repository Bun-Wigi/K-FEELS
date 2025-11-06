import express from "express";
import {
  getMoods,
  createMood,
  getMoodById,
  updateMood,
  deleteMood,
} from "../controllers/moodController.js";
import { getKoreanDramas, searchKdramas } from "../controllers/kDramaController.js";

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

export default router;