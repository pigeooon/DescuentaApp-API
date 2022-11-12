import puppeteer, { Browser, Page } from "puppeteer";
import { Bank } from "../models/bank.model";
import { Scraper } from "../models/scraper.model";
import { IBank, IBankCategory } from "../interfaces/bank.interface";
import { IDiscount } from "../interfaces/discount.interface";
import { DiscountService } from "./discount.service";

import { extractLocationFromString } from "../utils/location-extractor";
import { extractDateFromString } from "../utils/date-extractor";
import { extractPercentageFromString } from "../utils/percentage-extractor";
import { extractCardsFromString } from "../utils/card-extractor";

export class ScraperService {
    constructor() {
    }

    //borra los descuentos existentes y llama a los servicios de scraping
    public static async launchScraping() {
        await DiscountService.deleteDiscounts();
        const banks = await Bank.find();
        const scraper = new Scraper(banks);
        scraper.scrap();
    }

    public async scrap(bank: IBank, bankCategory: IBankCategory): Promise<IDiscount[]> {
        const browser: Browser = await puppeteer.launch();
        const page: Page = await browser.newPage();

        await page.goto(bank.url, { waitUntil:["load", "domcontentloaded", "networkidle0", "networkidle2"] });    
        
        let categorySelector = bankCategory.bank_category_selector.replace('$', bankCategory.bank_category_name);
        await page.waitForSelector(categorySelector);
        await page.click(categorySelector);

        //llamadas a distintos métodos de selección de atributos
        const discounts_name_vector = await this.scrapPlainText(page, bank.discount_name_selector);
        const discounts_img_vector = await this.scrapImgUrl(page, bank.discount_img_url_selector, bank.img_source_url);
        const discounts_description_vector = await this.scrapPlainText(page, bank.discount_description_selector);

        //cerramos la instancia del browser
        await browser.close();

        //construimos el array de IDiscounts
        const discountsArray: IDiscount[] = [];
        discounts_name_vector.map((_value, index) => {
            discountsArray.push({
                name: discounts_name_vector[index],
                img_url: discounts_img_vector[index],
                description: discounts_description_vector[index],
                location: extractLocationFromString(discounts_description_vector[index]),
                date: extractDateFromString(discounts_description_vector[index]),
                percentage: extractPercentageFromString(discounts_description_vector[index]),
                cards: extractCardsFromString(discounts_description_vector[index]),
                bank: bank.name,
                category: bankCategory.category,
            });

        });
        return discountsArray;
    }

    private async scrapPlainText(page: Page, selector: string) {
        const results = await page.$$eval(selector, item => item.map((item) => item.innerHTML));
        return results;
    } 

    private async scrapImgUrl(page: Page, selector: string, base_url: string) {
        const results = await page.$$eval(selector, item => item.map((item) => item.getAttribute('src')));
        const formattedResults: any[] = [];

        results.map((value, _index) => {
            formattedResults.push((base_url + value).replace(/ /g, '%20')); //cambiar espacios por %20
        });
        return formattedResults;
    }

}