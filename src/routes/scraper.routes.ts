import express from "express";
import { scraperController } from "../controllers/scraper.controller";

const router = express.Router();
const prefix = "/scraper"

router.get(`${prefix}/launch`, scraperController.launchScraping);

export default router;