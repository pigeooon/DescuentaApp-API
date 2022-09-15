import puppeteer, { Browser, Page } from "puppeteer";
import { BankType } from "../types/bank.type";
import { DiscountType } from "../types/discount.type";

export class ScraperService {
    constructor() {
    }

    async scrap(bank: BankType): Promise<DiscountType[]> {
        const browser: Browser = await puppeteer.launch();
        const page: Page = await browser.newPage();

        await page.goto(bank.url, {
            waitUntil:["load", "domcontentloaded", "networkidle0", "networkidle2"]
        });
    
        //falta manejar cuando $$eval no encuentra el item (retorna una promesa)
        const discounts_name_vector = await page.$$eval(bank.discount_name_selector, item => item.map((item) => item.innerHTML));
        const discounts_img_vector = await page.$$eval(bank.discount_img_selector, item => item.map((item) => item.getAttribute('src')));
        const discounts_description_vector = await page.$$eval(bank.discount_description_selector, item => item.map((item) => item.innerHTML));
        const discounts_details_url_vector = await page.$$eval(bank.discount_details_url_selector, item => item.map((item) => item.innerHTML));

        await browser.close();

        const discountsArray: DiscountType[] = [];
        
        discounts_name_vector.map((_value, index) => {
            discountsArray.push({
                bank: bank.name,
                name: discounts_name_vector[index],
                img: bank.img_source_url + discounts_img_vector[index],
                description: discounts_description_vector[index],
                details_url: '#', // no todos los casos tienen url, algunos tienen el detalle en js
            });

        });
        return discountsArray;
    }
}