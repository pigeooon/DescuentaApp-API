import express from "express";
import { scraperController } from "../controllers/scraper.controller";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();
const prefix = "/scraper"

router.get(`${prefix}/launch`, [authMiddleware, adminMiddleware], scraperController.launchScraping);

export default router;