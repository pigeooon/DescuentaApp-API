import { ScraperService } from "../services/scraper.service";
import { Bank } from "../types/bank.type";
import { Discount } from "../types/discount.type";

export class Scraper {
    private scraperService: ScraperService;
    private discounts: Discount[];

    constructor(private readonly banks: Bank[]) {
        this.scraperService = new ScraperService(); 
        this.discounts = [];
    }

    get getDiscounts() {
       return this.discounts; 
    }

    public async scrap() {
        this.banks.map((bank, _index) => {
            console.log("🔧 Starting to scrape at " + bank.name + "...");

            this.scraperService.scrap(bank).then((scrapedDiscounts: Discount[]) => {
                this.discounts.push(...scrapedDiscounts);

                if(scrapedDiscounts.length)
                    console.log("✅ " + scrapedDiscounts.length + " discounts scraped from " + bank.name + "!");
                else
                    console.log("❌ " + bank.name + "scraping failed.");
            });
        });
    }
}