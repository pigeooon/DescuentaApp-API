import puppeteer, { Browser, Page } from "puppeteer";
import { BankType } from "../types/bank.type";
import { DiscountType } from "../types/discount.type";

export class ScraperService {
    constructor() {
    }

    public async scrap(bank: BankType): Promise<DiscountType[]> {
        const browser: Browser = await puppeteer.launch();
        const page: Page = await browser.newPage();

        await page.goto(bank.url, {
            waitUntil:["load", "domcontentloaded", "networkidle0", "networkidle2"]
        });
    
        //llamadas a distintos métodos de selección
        const discounts_name_vector = await this.scrapPlainText(page, bank.discount_name_selector);
        const discounts_img_vector = await this.scrapImgUrl(page, bank.discount_img_url_selector, bank.img_source_url);
        const discounts_description_vector = await this.scrapPlainText(page, bank.discount_description_selector);
        const discounts_details_vector = await this.scrapPlainText(page, bank.discount_details_selector || " ");
        const discounts_location_vector = await this.scrapPlainText(page, bank.discount_location_selector || " ");
        const discounts_date_vector = await this.scrapPlainText(page, bank.discount_date_selector || " ");

        //cerramos la instancia del browser
        await browser.close();

        //construimos el array de DiscountTypes
        const discountsArray: DiscountType[] = [];
        discounts_name_vector.map((_value, index) => {
            discountsArray.push({
                name: discounts_name_vector[index],
                img_url: discounts_img_vector[index],
                description: discounts_description_vector[index],
                details: discounts_details_vector[index],
                bank: bank.name,
                category: ' ',
                location: discounts_location_vector[index],
                date: discounts_date_vector[index],
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