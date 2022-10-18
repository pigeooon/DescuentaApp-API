import { ScraperService } from "../services/scraper.service";
import { DiscountService } from "../services/discount.service";
import { BankType, BankCategoryType } from "../types/bank.type";

export class Scraper {
    private scraperService: ScraperService;

    constructor(private readonly banks: BankType[]) {
        this.scraperService = new ScraperService(); 
    }

    public async scrap() {
        this.banks.map((bank, _index) => {
            this.scrapingCall(bank);
        });
    }

    private scrapingCall(bank: BankType) {
        console.log("🔧 Starting to scrape at " + bank.name + "...");
        
        bank.discount_categories.map((category: BankCategoryType, _index) => {
            
            this.scraperService.scrap(bank, category).then((scrapedDiscounts) => {
                scrapedDiscounts.map((discount, _index) => {
                    DiscountService.createDiscount(discount);
                });
    
                if(scrapedDiscounts.length)
                    console.log("🏦 " + bank.name + ": ✅ " + scrapedDiscounts.length + " discounts scraped from " + category.bank_category_name + " category!");
                else
                    console.log("🏦 " + bank.name + ": ❔ no discounts on " + category.bank_category_name + " category.");
    
            }).catch((e) => {
                console.log("🏦 " + bank.name + ": ❌ " + category.bank_category_name + " category scraping failed.");
                console.error(e);
            });
        });
    }
}