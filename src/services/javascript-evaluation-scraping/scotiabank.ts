import puppeteer, { Browser, Page } from "puppeteer";
import { IDiscount } from "../../interfaces/discount.interface";
import { extractCardsFromString } from "../../utils/card-extractor";
import { extractDateFromString } from "../../utils/date-extractor";
const HTMLDecoderEncoder = require("html-encoder-decoder");
import { extractLocationFromString } from "../../utils/location-extractor";
import { extractPercentageFromString } from "../../utils/percentage-extractor";

const bank = {
    name: "Banco Scotiabank",
    url: "https://www.scotiaclub.cl/scclubfront/categoria/mundos/descuentos",
    evaluate: "descuentos",
    img_base_url: "https://www.scotiaclub.cl",
};

const transformScotiabankCategory = (category: string) => {
    switch (category) {
        case "Alimentos y bebidas":
            return "Alimentos";
        case "Entretención": 
            return "Entretención";
        case "Hobbies": 
            return "Entretención";
        case "Hogar": 
            return "Hogar";
        case "Tecnología": 
            return "Tecnología";
        case "Otros": 
            return "Otros";
        case "E-commerce": 
            return "Apps";
        case "Vestuario y Calzado": 
            return "Ropa";
        case "Deportes y Wellness": 
            return "Deportes";
        case "Salud y Belleza": 
            return "Salud y belleza";
        case "Apps": 
            return "Apps";
        case "Supermercado": 
            return "Alimentos";
        case "Viajes": 
            return "Viajes";
        case "Transporte": 
            return "Transporte";
        case "Automotriz": 
            return "Autos";
        default:
            return "Otros";
    }
}

export const evaluateScotiabankJavascript = async () => {
    try {
        const discountsArray: IDiscount[] = [];
        
        const browser: Browser = await puppeteer.launch();
        const page: Page = await browser.newPage();

        await page.setDefaultNavigationTimeout(0); 
        await page.goto(bank.url, { waitUntil:["load", "domcontentloaded", "networkidle0", "networkidle2"], timeout: 0 });

        const result:any = await page.evaluate(bank.evaluate);
        await page.close();
        
        let imageString: string | null = "";
        let locationString: string | null = "";
        let dateString: string | null = "";
        let cardsArray = [];

        result.map((discount: any) => {
            imageString = (bank.img_base_url + discount.imagen).replace(/ /g, '%20');

            locationString = extractLocationFromString(HTMLDecoderEncoder.decode(discount.acceder));
            if(!locationString) locationString = extractLocationFromString(HTMLDecoderEncoder.decode(discount.descripcion));
            if(locationString === "") locationString = null;

            dateString = extractDateFromString(HTMLDecoderEncoder.decode(discount.acceder));
            if(!dateString) locationString = extractDateFromString(HTMLDecoderEncoder.decode(discount.descripcion));
            if(dateString === "") locationString = null;

            cardsArray = extractCardsFromString(HTMLDecoderEncoder.decode(discount.direcciones));
            if(!cardsArray.length) cardsArray = extractCardsFromString(HTMLDecoderEncoder.decode(discount.acceder));
            if(!cardsArray.length) cardsArray = extractCardsFromString(HTMLDecoderEncoder.decode(discount.descripcion));
            if(!cardsArray.length) cardsArray = extractCardsFromString(HTMLDecoderEncoder.decode(discount.terminosYCondiciones));

            discountsArray.push({
                name: discount.titulo,
                img_url: imageString,
                description: discount.descuento,
                details: HTMLDecoderEncoder.decode(discount.direcciones + discount.acceder + discount.condicionesComercio + discount.direcciones + discount.terminosYCondiciones),
                location: locationString || undefined,
                date: dateString || undefined,
                percentage: extractPercentageFromString(discount.descuento),
                cards: cardsArray,
                bank: bank.name,
                category: transformScotiabankCategory(discount.tags[0].nombre),
            });
        });

        return discountsArray;
    }
    catch (error) {
        throw error;
    }
}