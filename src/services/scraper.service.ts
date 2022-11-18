import { Scraper } from "../models/scraper.model";
import { IBank, IBankCategory } from "../interfaces/bank.interface";
import { IDiscount } from "../interfaces/discount.interface";
import { DiscountService } from "./discount.service";

import { scrapSinglePageApp } from "./scrap-single-page-app";
import { scrapJsonPage } from "./scrap-json-page";

export class ScraperService {
    constructor() {
    }

    public static async launchScraping(bank: any) {
        await DiscountService.deleteDiscountsByBank(bank.name);
        const scraper = new Scraper(bank);
        scraper.scrapingDiscounts();
    }

    async scrap(bank: IBank, bankCategory: IBankCategory): Promise<IDiscount[]> {
        if(bank.scraping_type === "single-app-page") return await scrapSinglePageApp(bank, bankCategory);
        else if(bank.scraping_type === "json-page") return await scrapJsonPage(bank, bankCategory);
        return [];
    }
}