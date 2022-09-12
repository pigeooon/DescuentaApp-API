import { ScraperService } from "../services/scraper.service";
import { DiscountService } from "../services/discount.service";
import { Bank } from "../types/bank.type";

export class Scraper {
    private scraperService: ScraperService;
    private discountService: DiscountService;

    constructor(private readonly banks: Bank[]) {
        this.scraperService = new ScraperService(); 
        this.discountService = new DiscountService();
    }

    public async scrap() {
        this.banks.map((bank, _index) => {
            this.scrapingCall(bank);
        });
    }

    private scrapingCall(bank: Bank) {
        console.log("🔧 Starting to scrape at " + bank.name + "...");

        this.scraperService.scrap(bank).then((scrapedDiscounts) => {
            scrapedDiscounts.map((discount, _index) => {
                this.discountService.createDiscount(discount);
            });

            if(scrapedDiscounts.length)
                console.log("✅ " + scrapedDiscounts.length + " discounts scraped from " + bank.name + "!");
            else
                console.log("❔ no " + bank.name + " discounts found.");

        }).catch((e) => {
            console.log("❌ " + bank.name + " scraping failed.");
            console.error(e);
        });
    }
}