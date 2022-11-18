import express from "express";
import { scraperController } from "../controllers/scraper.controller";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();
const prefix = "/scraper"

router.put(`${prefix}/launch/:id`, [authMiddleware, adminMiddleware], scraperController.launchScraping);

export default router;