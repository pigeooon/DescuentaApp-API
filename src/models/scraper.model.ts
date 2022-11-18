import { ScraperService } from "../services/scraper.service";
import { DiscountService } from "../services/discount.service";
import { IBank, IBankCategory } from "../interfaces/bank.interface";

export class Scraper {
    private scraperService: ScraperService;

    constructor(private readonly bank: any) {
        this.scraperService = new ScraperService(); 
    }

    scrapingDiscounts = () => {
        console.log("🔧 Starting to scrape at " + this.bank.name + "...");
        
        this.bank.discount_categories.map(async (category: IBankCategory, _index: any) => {
            await this.scraperService.scrap(this.bank, category).then((scrapedDiscounts) => {
                scrapedDiscounts.map((discount, _index) => {
                    DiscountService.createDiscount(discount);
                });
    
                if(scrapedDiscounts.length)
                    console.log("🏦 " + this.bank.name + ": ✅ " + scrapedDiscounts.length + " discounts scraped to " + category.category + " category!");
                else
                    console.log("🏦 " + this.bank.name + ": ❔ no discounts on " + category.bank_category_name + " category.");
    
            }).catch((e) => {
                console.log("🏦 " + this.bank.name + ": ❌ " + category.bank_category_name + " category scraping failed.");
                console.error(e);
            });
        });
    }
}