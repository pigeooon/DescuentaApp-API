import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { ScraperService } from "../services/scraper.service";

class ScraperController {

    constructor() {
    }

    launchScraping = async (req: Request, res: Response) => {
        ScraperService.launchScraping().then((data) => {
            return res.status(StatusCodes.OK).json({scrapingMeta: data});
        })
        .catch((error) => {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Error interno del servidor.", error: error});
        });
    }
}

export const scraperController = new ScraperController();