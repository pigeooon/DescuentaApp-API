import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BankService } from "../services/bank.service";

import { ScraperService } from "../services/scraper.service";

class ScraperController {

    constructor() {
    }

    launchScraping = async (req: Request, res: Response) => {
        try {
            const bankId = req.params.id;

            BankService.getBankById(bankId).then((bank) => {
                if(!bank || bank === null) return res.status(StatusCodes.NOT_FOUND);
    
                ScraperService.launchScraping(bank).then((data) => {
                    return res.status(StatusCodes.OK).json({ metaScraping: data });
                });
            });
        }
        catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Error interno del servidor.", error: error});
        }
    }
}

export const scraperController = new ScraperController();