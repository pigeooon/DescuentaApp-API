import { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
const fetch = require('node-fetch');
const HTMLDecoderEncoder = require("html-encoder-decoder");
import { IDiscount } from "../../interfaces/discount.interface";
import { extractCardsFromString } from "../../utils/card-extractor";
import { extractDateFromString } from "../../utils/date-extractor";
import { generateSlug } from "../../utils/generateSlug";
import { extractLocationFromString } from "../../utils/location-extractor";
import { extractPercentageFromString } from "../../utils/percentage-extractor";
import { removeHTMLTags } from "../../utils/removeHTMLTags";

const bank = {
    name: "Banco de Chile",
    url: [
        "https://portales.bancochile.cl/personas/beneficios/promociones/contenidos.json?limit=999",
        "https://portales.bancochile.cl/personas/beneficios/beneficios-y-descuentos/contenidos.json?limit=999",
        "https://portales.bancochile.cl/personas/beneficios/restaurantes/contenidos.json?limit=999",
        "https://portales.bancochile.cl/personas/beneficios/delivery/contenidos.json?limit=999",
        "https://portales.bancochile.cl/personas/beneficios/viajes/contenidos.json?limit=999",
        "https://portales.bancochile.cl/personas/beneficios/panoramas/contenidos.json?limit=999",
        "https://portales.bancochile.cl/personas/beneficios/catalogo-productos/contenidos.json?limit=999",
    ]
};

const transformBancoChileCategory = (category: string) => {
    switch (category) {
        case "vestuario-y-calzado":
            return "Ropa";
        case "belleza-y-salud":
            return "Salud y belleza";
        case "hogar":
            return "Hogar";
        case "musica-y-espectaculos":
            return "Entretención";
        case "entretencion":
            return "Entretención";
        case "beneficios/restaurantes":
            return "Alimentos";
        case "beneficios/viajes":
            return "Viajes";
        default:
            return "Otros";
    }
}

export const fetchBancoChileDiscounts = async () => {
    try {
        const discountsArray: IDiscount[] = [];

        const browser: Browser = await puppeteer.use(StealthPlugin()).launch();
        const page: Page = await browser.newPage();

        await page.setDefaultNavigationTimeout(0); 

        for(let url of bank.url) {
            await page.goto(url, { waitUntil:["load", "domcontentloaded", "networkidle0", "networkidle2"], timeout: 0 });
            const pageBody: any = await page.evaluate("document.querySelector('body').innerText");
            const discounts = JSON.parse(pageBody);

            let imageString: string | null = "";
            let descriptionString: string | null = "";
            let percentageString: string | null = "";
            let locationString: string | null = "";
            let dateString: string | null = "";
            let categoryString: string | null = "";
            let cardsArray = [];

            discounts.contenidos.map((discount: any) => {
                imageString = discount.covers[0].replace(/ /g, '%20');

                descriptionString = removeHTMLTags(HTMLDecoderEncoder.decode(discount.excerpt || ""));

                percentageString = extractPercentageFromString(discount.title || "");
                if(!percentageString) percentageString = extractPercentageFromString(discount.excerpt || "");
                if(!percentageString) percentageString = extractPercentageFromString(discount.description || "");
                if(percentageString === "") percentageString = null;

                locationString = extractLocationFromString(HTMLDecoderEncoder.decode(discount.excerpt || ""));
                if(!locationString) locationString = extractLocationFromString(HTMLDecoderEncoder.decode(discount.description || ""));
                if(locationString === "") locationString = null;

                dateString = extractDateFromString(HTMLDecoderEncoder.decode(discount.description || ""));
                if(!dateString) locationString = extractDateFromString(HTMLDecoderEncoder.decode(discount.excerpt || ""));
                if(dateString === "") locationString = null;

                cardsArray = extractCardsFromString(HTMLDecoderEncoder.decode(discount.description || ""));
                if(!cardsArray.length) cardsArray = extractCardsFromString(HTMLDecoderEncoder.decode(discount.excerpt || ""));

                if(discount.tags[0]) categoryString = transformBancoChileCategory(discount.tags[0].toString() || "");
                if(!categoryString || categoryString === "Otros") categoryString = transformBancoChileCategory(discount.category || "");
                if(categoryString === "") categoryString = "Otros";

                discountsArray.push({
                    name: discount.title,
                    slug: generateSlug(bank.name, discount.title),
                    img_url: imageString || "",
                    description: descriptionString,
                    details: HTMLDecoderEncoder.decode(
                        (
                            (discount.description? ("<p>" + discount.description + "</p>") : ""))
                            || ""
                        ),
                    location: locationString || undefined,
                    date: dateString || undefined,
                    percentage: percentageString || undefined,
                    cards: cardsArray,
                    bank: bank.name,
                    category: categoryString,
                });
            });
        }
        await page.close();
        return discountsArray;
    }
    catch (error) {
        throw error;
    }
}