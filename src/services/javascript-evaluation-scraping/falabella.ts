import puppeteer, { Browser, Page } from "puppeteer";
import { IDiscount } from "../../interfaces/discount.interface";
import { extractCardsFromString } from "../../utils/card-extractor";
import { defaultDays, extractDateFromString } from "../../utils/date-extractor";
import { generateSlug } from "../../utils/generateSlug";
const HTMLDecoderEncoder = require("html-encoder-decoder");
import { extractLocationFromString } from "../../utils/location-extractor";
import { extractPercentageFromString } from "../../utils/percentage-extractor";

const bank = {
    name: "Banco Falabella",
    url: "https://www.bancofalabella.cl/descuentos",
    evaluate: "window.sessionStorage.getItem('benefits')",
    img_base_url: "https://www.scotiaclub.cl",
};

const transformFalabellaCategory = (category: string) => {
    switch (category) {
        case "Restauranes":
            return "Alimentos";
        case "Antojos":
            return "Alimentos";    
        case "Salud y Belleza":
            return "Salud y belleza";  
        case "Educación":
            return "Educación";
        case "Viajes":
            return "Viajes";
        case "Entretención":
            return "Entretención";
        case "Sostenible":
            return "Sustentable";
        case "Mascotas":
            return "Mascotas";
        case "Tus Apps":
            return "Apps";
        default:
            return "Otros";
    }
}

export const evaluateFalabellaJavascript = async () => {
    try {
        const discountsArray: IDiscount[] = [];
        
        const browser: Browser = await puppeteer.launch();
        const page: Page = await browser.newPage();

        await page.setDefaultNavigationTimeout(0); 
        await page.goto(bank.url, { waitUntil:["load", "domcontentloaded", "networkidle0", "networkidle2"], timeout: 0 });

        const result: any = await page.evaluate(bank.evaluate);
        await page.close();
        
        const discounts = JSON.parse(result);

        let imageString: string | null = "";
        let percentageString: string | null = "";
        let locationString: string | null = "";
        let dateArray: string[];
        let cardsArray = [];

        discounts.map((discount: any) => {
            let imageField;
            try {
                imageField = discount.fields.imagenCajaV2.fields.file.url;
            }
            catch (err) {
                imageField = "";
            }

            imageString = ("https:" + imageField).replace(/ /g, '%20');

            percentageString = extractPercentageFromString(discount.fields.tituloCajaV2 || "");
            if(!percentageString) percentageString = extractPercentageFromString(discount.fields.subtituloCajaV2 || "");
            if(!percentageString) percentageString = extractPercentageFromString(discount.fields.textoDetalleLia || "");
            if(percentageString === "") percentageString = null;

            locationString = extractLocationFromString(HTMLDecoderEncoder.decode(discount.fields.subtituloCajaV2 || ""));
            if(!locationString) locationString = extractLocationFromString(HTMLDecoderEncoder.decode(discount.fields.textoDetalleLia || ""));
            if(locationString === "") locationString = null;

            dateArray = extractDateFromString(HTMLDecoderEncoder.decode(discount.fields.diasCajaV2 || ""));
            if(!dateArray.length) dateArray = extractDateFromString(HTMLDecoderEncoder.decode(discount.fields.subtituloCajaV2 || ""));
            if(!dateArray.length) dateArray = defaultDays;

            cardsArray = extractCardsFromString(HTMLDecoderEncoder.decode(discount.fields.textoDetalleLia || ""));
            if(!cardsArray.length) cardsArray = extractCardsFromString(HTMLDecoderEncoder.decode(discount.fields.subtituloCajaV2 || ""));
            if(!cardsArray.length) cardsArray = extractCardsFromString(HTMLDecoderEncoder.decode(discount.fields.legalesV2 || ""));

            if(discount.fields.fechaTerminoV2 >= new Date().toISOString()) {
                discountsArray.push({
                    name: discount.fields.tituloCajaV2,
                    slug: generateSlug(bank.name, discount.fields.tituloCajaV2),
                    img_url: imageString || "",
                    description: discount.fields.subtituloCajaV2,
                    details: HTMLDecoderEncoder.decode(
                        (
                            (discount.fields.textoDetalleLia? ("<p>" + discount.fields.textoDetalleLia + "</p>") : "") +
                            (discount.fields.legalesV2? ("<p>" + discount.fields.legalesV2 + "</p>") : "") +
                            (discount.fields.validoHastaV2? ("<p>" + discount.fields.validoHastaV2 + "</p>") : ""))
                            || ""
                        ),
                    location: locationString || undefined,
                    date: dateArray,
                    percentage: percentageString || undefined,
                    cards: cardsArray,
                    bank: bank.name,
                    category: transformFalabellaCategory((discount.fields.categoriaV2? discount.fields.categoriaV2[0] : "Otros") || "Otros"),
                });
            }
        });
        return discountsArray;
    }
    catch (error) {
        throw error;
    }
}