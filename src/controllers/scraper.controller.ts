import { Request, Response } from "express";
import { ScraperService } from "../services/scraper.service";

class ScraperController {

    constructor() {
    }

    launchScraping = async (req: Request, res: Response) => {
        ScraperService.launchScraping().then(() => {
            return res.status(204);
        })
        .catch((error) => {
            return res.status(500).json(error);
        });
    }
}

export const scraperController = new ScraperController();