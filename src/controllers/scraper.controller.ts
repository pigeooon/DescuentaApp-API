import { Request, Response } from "express";
import { ScraperService } from "../services/scraper.service";

export default class ScraperController {

    constructor() {
    }

    public launchScraping(req: Request, res: Response) {
        ScraperService.launchScraping().then(() => {
            return res.status(204);
        })
        .catch((error) => {
            return res.status(500).json(error);
        });
    }
}