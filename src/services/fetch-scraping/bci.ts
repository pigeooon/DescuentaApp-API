const fetch = require('node-fetch');
const HTMLDecoderEncoder = require("html-encoder-decoder");
import { IDiscount } from "../../interfaces/discount.interface";
import { extractCardsFromString } from "../../utils/card-extractor";
import { defaultDays, extractDateFromString } from "../../utils/date-extractor";
import { generateSlug } from "../../utils/generateSlug";
import { extractLocationFromString } from "../../utils/location-extractor";
import { extractPercentageFromString } from "../../utils/percentage-extractor";

const bank = {
    name: "Banco BCI",
    url: [
        "https://www.bci.cl/api/content/spaces/vivir-con-beneficios-beneficios/types/beneficios/entries?per_page=100&page=1",
        "https://www.bci.cl/api/content/spaces/vivir-con-beneficios-beneficios/types/beneficios/entries?per_page=100&page=2",
        "https://www.bci.cl/api/content/spaces/vivir-con-beneficios-beneficios/types/beneficios/entries?per_page=100&page=3",
    ]
};

const transformBCICategory = (category: string) => {
    switch (category) {
        case "categoria-salud-y-bienestar":
            return "Salud y belleza";
        case "categoria-sabores":
            return "Alimentos";    
        case "categoria-sustentable":
            return "Sustentable";  
        case "categoria-moda":
            return "Ropa";
        case "categoria-hogar-y-tecnologia":
            return "Hogar";
        case "categoria-viajes-panoramas":
            return "Viajes";
        case "categoria-deportesbci":
            return "Deportes";
        default:
            return "Otros";
    }
}

export const fetchBCIDiscounts = async () => {
    try {
        const discountsArray: IDiscount[] = [];

        for(let url of bank.url) {
            const response = await fetch(url);
            const discounts:any = await response.json();

            let imageString: string | null = "";
            let percentageString: string | null = "";
            let locationString: string | null = "";
            let dateArray: string[];
            let cardsArray = [];

            discounts.entries.map((discount: any) => {
                imageString = discount.fields["Portada"].url.replace(/ /g, '%20');

                percentageString = extractPercentageFromString(discount.meta.name || "");
                if(!percentageString) percentageString = extractPercentageFromString(discount.fields["Bajada texto"] || "");
                if(!percentageString) percentageString = extractPercentageFromString(discount.fields["Descripción"] || "");
                if(percentageString === "") percentageString = null;

                locationString = extractLocationFromString(HTMLDecoderEncoder.decode(discount.fields["Regiones"].toString() || ""));
                if(!locationString) locationString = extractLocationFromString(HTMLDecoderEncoder.decode(discount.fields["Bajada texto"] || ""));
                if(!locationString) locationString = extractLocationFromString(HTMLDecoderEncoder.decode(discount.fields["Descripción"] || ""));
                if(locationString === "") locationString = null;

                dateArray = extractDateFromString(HTMLDecoderEncoder.decode(discount.fields["Descripción"] || ""));
                if(!dateArray.length) dateArray = extractDateFromString(HTMLDecoderEncoder.decode(discount.fields["Bajada texto"] || ""));
                if(!dateArray.length) dateArray = defaultDays;

                cardsArray = extractCardsFromString(HTMLDecoderEncoder.decode(discount.fields["Descripción"] || ""));
                if(!cardsArray.length) cardsArray = extractCardsFromString(HTMLDecoderEncoder.decode(discount.fields["Bajada texto"] || ""));

                discountsArray.push({
                    name: discount.meta.name,
                    slug: generateSlug(bank.name, discount.meta.name),
                    img_url: imageString || "",
                    description: discount.fields["Bajada texto"],
                    details: HTMLDecoderEncoder.decode(
                        (
                            (discount.conditions? ("<p>" + discount.conditions + "</p>") : "") +
                            (discount.fields["Descripción"]? ("<p>" + discount.fields["Descripción"] + "</p>") : ""))
                            || ""
                        ),
                    location: locationString || undefined,
                    date: dateArray,
                    percentage: percentageString || undefined,
                    cards: cardsArray,
                    bank: bank.name,
                    category: transformBCICategory(discount.meta.tags[0]),
                });
            });
        }
        return discountsArray;
    }
    catch (error) {
        throw error;
    }
}