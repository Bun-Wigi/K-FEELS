import express from "express";
import { getKoreanDramas } from "../controllers/kDramaController.js";

const router = express.Router();

// GET /api/kdramas
router.get("/", getKoreanDramas);

export default router;
