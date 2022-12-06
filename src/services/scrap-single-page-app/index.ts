import puppeteer, { Browser, Page } from "puppeteer";

import { IBank, IBankCategory } from "../../interfaces/bank.interface";
import { IDiscount } from "../../interfaces/discount.interface";

import { extractCardsFromString } from "../../utils/card-extractor";
import { defaultDays, extractDateFromString } from "../../utils/date-extractor";
import { generateSlug } from "../../utils/generateSlug";
import { extractLocationFromString } from "../../utils/location-extractor";
import { extractPercentageFromString } from "../../utils/percentage-extractor";
import { removeExtraCharacters } from "../../utils/removeExtraCharacters";
    
export const scrapSinglePageApp = async (bank: IBank, bankCategory: IBankCategory): Promise<IDiscount[]> => {
    const discountsArray: IDiscount[] = [];

    const browser: Browser = await puppeteer.launch();
    const page: Page = await browser.newPage();
    
    await page.setDefaultNavigationTimeout(0); 
    await page.goto(bank.url, { waitUntil:["load", "domcontentloaded", "networkidle0", "networkidle2"], timeout: 0 });    
    
    let categorySelector = bankCategory.bank_category_selector.replace('$', bankCategory.bank_category_name);

    await page.waitForSelector(categorySelector);
    await page.click(categorySelector);

    //llamadas a distintos métodos de selección de atributos
    const discounts_name_vector = await scrapPlainText(page, bank.discount_name_selector);
    const discounts_img_vector = await scrapImgUrl(page, bank.discount_img_url_selector, bank.img_source_url, bank.name);
    const discounts_description_vector = await scrapPlainText(page, bank.discount_description_selector);

    //caso detalles en modal: discount_details_button_selector + modal discount_details_selector
    let discounts_details_vector: any[] = [];
    if(bank.discount_details_button_selector && bank.discount_details_selector) {
        const detailsButtons = await page.$$(bank.discount_details_button_selector);
        for (let buttom of detailsButtons) {
            await buttom.hover();
            await buttom.click();
            await page.waitForSelector(bank.discount_details_selector);
            discounts_details_vector.push(await page.$$eval(bank.discount_details_selector, item => item.map((item) => item.innerHTML)));
        }
    }

    //cerramos la instancia del browser
    await browser.close();

    //construimos el array de IDiscounts
    let detailsString: string | null = "";
    let locationString: string | null = "";
    let dateArray: string[];
    let percentageString: string | null = "";
    let cardsArray = [];

    discounts_name_vector.map((_value, index) => {
        detailsString = removeExtraCharacters(String(discounts_details_vector[index]));
        if(detailsString === "") detailsString = null;

        locationString = extractLocationFromString(String(discounts_details_vector[index]));
        if(!locationString) locationString = extractLocationFromString(discounts_description_vector[index]);
        if(locationString === "") locationString = null;

        dateArray = extractDateFromString(String(discounts_details_vector[index]));
        if(!dateArray.length) dateArray = extractDateFromString(discounts_description_vector[index]);
        if(!dateArray.length) dateArray = defaultDays;
        
        percentageString = extractPercentageFromString(String(discounts_details_vector[index]));
        if(!percentageString) percentageString = extractPercentageFromString(discounts_description_vector[index]);
        if(percentageString === "") percentageString = null;
        
        cardsArray = extractCardsFromString(String(discounts_details_vector[index]));
        if(!cardsArray) cardsArray = extractCardsFromString(discounts_description_vector[index]);

        discountsArray.push({
            name: removeExtraCharacters(discounts_name_vector[index]),
            slug: generateSlug(bank.name, removeExtraCharacters(discounts_name_vector[index])),
            img_url: discounts_img_vector[index],
            description: removeExtraCharacters(discounts_description_vector[index]),
            details: detailsString || undefined,
            location: locationString || undefined,
            date: dateArray,
            percentage: percentageString || undefined,
            cards: cardsArray,
            bank: bank.name,
            category: bankCategory.category,
        });1

    });
    return discountsArray;
}

const scrapPlainText = async (page: Page, selector: string) => {
    const results = await page.$$eval(selector, item => item.map((item) => item.innerHTML));
    return results;
} 

const scrapImgUrl = async (page: Page, selector: string, base_url: string, bank_name: string) => {
    const results = await page.$$eval(selector, item => item.map((item) => item.getAttribute('src')));
    const formattedResults: any[] = [];

    results.map((value, _index) => {
        if(bank_name === "Scotiabank") formattedResults.push((base_url + value).replace(/ /g, '%20'));
        else formattedResults.push(value.replace(/ /g, '%20'));
    });
    return formattedResults;
}