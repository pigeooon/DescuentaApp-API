import puppeteer, { Browser, Page } from "puppeteer";
import { DiscountsRepository } from "../types/discounts_repository.type";
import { Discount } from "../types/discount";

export class Scraper {
    constructor(private readonly discountsRepository: DiscountsRepository) {
    }

    get getDiscountsRepository(): DiscountsRepository {
        return this.discountsRepository;
    }

    async scrap() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(this.discountsRepository.url, {
            waitUntil:["load", "domcontentloaded", "networkidle0", "networkidle2"]
        });
    
        const discounts_name_vector = await page.$$eval(this.discountsRepository.discount_name_path, item => item.map((item) => item.innerHTML));
        const discounts_img_vector = await page.$$eval(this.discountsRepository.discount_img_path, item => item.map((item) => item.getAttribute('src')));
        const discounts_description_vector = await page.$$eval(this.discountsRepository.discount_description_path, item => item.map((item) => item.innerHTML));
        const discounts_details_url_vector = await page.$$eval(this.discountsRepository.discount_details_url_path, item => item.map((item) => item.innerHTML));

        const discountsArray: Discount[] = [];
        
        discounts_name_vector.map((_value, index) => {
            discountsArray.push({
                name: discounts_name_vector[index],
                img: discounts_img_vector[index],
                description: discounts_description_vector[index],
                details_url: '#',
            });

        });

        await browser.close();
    
        const json = JSON.stringify(discountsArray);
        console.log(json);
    }
}