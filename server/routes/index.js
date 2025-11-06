import express from "express";
import {
  getMoods,
  createMood,
  getMoodById,
  updateMood,
  deleteMood,
} from "../controllers/moodController.js";
import { getKoreanDramas } from "../controllers/kDramaController.js";
import { authController } from "../controllers/authController.js";

const router = express.Router();


// Define routes
router.get("/moods", getMoods);
router.post("/moods", createMood);
router.get("/moods/:id", getMoodById);
router.put("/moods/:id", updateMood);
router.delete("/moods/:id", deleteMood);
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);

export default router;
x