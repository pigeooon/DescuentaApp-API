import { Router } from "express";
import ScraperController from "../controllers/scraper.controller";

export default class ScraperRoutes {
    private path = '/scraper';
    private router = Router();
    private scraperController = new ScraperController();

    constructor() {
        this.createRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    private createRoutes() {
        this.router.get(`${this.path}/launch`, this.scraperController.launchScraping);
    }
}