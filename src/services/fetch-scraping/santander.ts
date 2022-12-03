const fetch = require('node-fetch');
const HTMLDecoderEncoder = require("html-encoder-decoder");
import { IDiscount } from "../../interfaces/discount.interface";
import { extractCardsFromString } from "../../utils/card-extractor";
import { extractDateFromString } from "../../utils/date-extractor";
import { extractLocationFromString } from "../../utils/location-extractor";
import { extractPercentageFromString } from "../../utils/percentage-extractor";

const bank = {
    name: "Banco Santander",
    url: "https://banco.santander.cl/beneficios/promociones.json?per_page=1000&custom_fields=true&order_by=updated_at&desc=true",
};

const transformSantanderCategory = (category: string) => {
    switch (category) {
        case "shopping":
            return "Tiendas";
        case "sabores":
            return "Alimentos";    
        case "hogar":
            return "Hogar";  
        case "salud-y-educacion":
            return "Salud y educación";
        case "turismo":
            return "Viajes";
        case "empresas":
            return "Tiendas";
        default:
            return "Otros";
    }
}

export const fetchSantanderDiscounts = async () => {
    try {
        const discountsArray: IDiscount[] = [];

        const response = await fetch(bank.url);
        const discounts:any = await response.json();

        let imageString: string | null = "";
        let percentageString: string | null = "";
        let locationString: string | null = "";
        let dateString: string | null = "";
        let cardsArray = [];

        discounts.promociones.map((discount: any) => {
            imageString = discount.covers[1].replace(/ /g, '%20');

            percentageString = extractPercentageFromString(discount.title || "");
            if(!percentageString) percentageString = extractPercentageFromString(discount.custom_fields["Bajada externa"].value || "");
            if(!percentageString) percentageString = extractPercentageFromString(discount.description || "");
            if(percentageString === "") percentageString = null;

            locationString = extractLocationFromString(HTMLDecoderEncoder.decode(discount.custom_fields["Bajada externa"].value || ""));
            if(!locationString) locationString = extractLocationFromString(HTMLDecoderEncoder.decode(discount.description || ""));
            if(locationString === "") locationString = null;

            dateString = extractDateFromString(HTMLDecoderEncoder.decode(discount.description || ""));
            if(!dateString) locationString = extractDateFromString(HTMLDecoderEncoder.decode(discount.custom_fields["Bajada externa"].value || ""));
            if(dateString === "") locationString = null;

            cardsArray = extractCardsFromString(HTMLDecoderEncoder.decode(discount.description || ""));
            if(!cardsArray.length) cardsArray = extractCardsFromString(HTMLDecoderEncoder.decode(discount.custom_fields["Bajada externa"].value || ""));
            if(!cardsArray.length) cardsArray = extractCardsFromString(HTMLDecoderEncoder.decode(discount.conditions.value || ""));
            if(!cardsArray.length) cardsArray = extractCardsFromString(HTMLDecoderEncoder.decode(discount.description.value || ""));

            discountsArray.push({
                name: discount.title,
                img_url: imageString || "",
                description: discount.custom_fields["Bajada externa"].value,
                details: HTMLDecoderEncoder.decode(
                    (
                        (discount.conditions? ("<p>" + discount.conditions + "</p>") : "") +
                        (discount.description? ("<p>" + discount.description + "</p>") : ""))
                        || ""
                    ),
                location: locationString || undefined,
                date: dateString || undefined,
                percentage: percentageString || undefined,
                cards: cardsArray,
                bank: bank.name,
                category: transformSantanderCategory(discount.category),
            });
        });
        return discountsArray;
    }
    catch (error) {
        throw error;
    }
}