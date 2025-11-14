import express from "express";
import {
  getKoreanDramas,
  searchKdramas,
} from "../controllers/kDramaController.js";

const router = express.Router();

// GET /api/kdramas
router.get("/", getKoreanDramas);

router.get("/search", searchKdramas);



export default router;