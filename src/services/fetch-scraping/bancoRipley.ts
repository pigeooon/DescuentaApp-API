const fetch = require('node-fetch');
const HTMLDecoderEncoder = require("html-encoder-decoder");
import { IDiscount } from "../../interfaces/discount.interface";
import { extractCardsFromString } from "../../utils/card-extractor";
import { defaultDays, extractDateFromString } from "../../utils/date-extractor";
import { generateSlug } from "../../utils/generateSlug";
import { extractLocationFromString } from "../../utils/location-extractor";
import { extractPercentageFromString } from "../../utils/percentage-extractor";

const bank = {
    name: "Banco Ripley",
    url: "https://www.bancoripley.cl/api/beneficios/get-active-beneficio",
    sections: [
        {
            name: "Alimentos",
            id: "beneficio12"
        },
        {
            name: "Salud y belleza",
            id: "beneficio10"
        },
        {
            name: "Viajes",
            id: "beneficio11"
        },
        {
            name: "Entretención",
            id: "beneficio9"
        },
        {
            name: "Otros",
            id: "beneficio14"
        },
        {
            name: "Otros",
            id: "beneficio13"
        },
    ]
};

export const fetchRipleyDiscounts = async () => {
    try {
        const discountsArray: IDiscount[] = [];

        for(let section of bank.sections) {
            const response = await fetch(bank.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "idSection": section.id }),
            });
            const discounts:any = await response.json();

            let imageString: string | null = "";
            let descriptionString: string | null = "";
            let percentageString: string | null = "";
            let locationString: string | null = "";
            let dateArray: string[];
            let cardsArray = [];

            discounts.data.map((discount: any) => {
                imageString = discount.params.imgBackground.value.replace(/ /g, '%20');

                descriptionString = HTMLDecoderEncoder.decode(discount.params.txtDetalleCard.value || "");
                if(descriptionString === "") descriptionString = HTMLDecoderEncoder.decode(discount.params.txtSubtitulo.value || "");
                if(descriptionString === "") descriptionString = null;

                percentageString = extractPercentageFromString(HTMLDecoderEncoder.decode(discount.params.txtDescuento.value || ""));
                if(!percentageString) percentageString = extractPercentageFromString(HTMLDecoderEncoder.decode(discount.params.txtSubtitulo.value || ""));
                if(!percentageString) percentageString = extractPercentageFromString(HTMLDecoderEncoder.decode(discount.params.txtDetalle.value || ""));
                if(percentageString === "") percentageString = null;

                locationString = extractLocationFromString(HTMLDecoderEncoder.decode(discount.params.txtDetalleCard.value || ""));
                if(!locationString) locationString = extractLocationFromString(HTMLDecoderEncoder.decode(discount.params.txtSubtitulo.value || ""));
                if(!locationString) locationString = extractLocationFromString(HTMLDecoderEncoder.decode(discount.params.txtDetalle.value || ""));
                if(locationString === "") locationString = null;

                dateArray = extractDateFromString(HTMLDecoderEncoder.decode(discount.params.txtValidezBeneficio.value || ""));
                if(!dateArray.length) dateArray = extractDateFromString(HTMLDecoderEncoder.decode(discount.params.txtSubtitulo.value || ""));
                if(!dateArray.length) dateArray = extractDateFromString(HTMLDecoderEncoder.decode(discount.params.txtDetalle.value || ""));
                if(!dateArray.length) dateArray = defaultDays;

                cardsArray = extractCardsFromString(HTMLDecoderEncoder.decode(discount.params.boxRestricciones.boxTarjetas.valueBox || ""));
                if(!cardsArray.length) cardsArray = extractCardsFromString(HTMLDecoderEncoder.decode(discount.params.txtDetalle.value || ""));
                if(!cardsArray.length) cardsArray = extractCardsFromString(HTMLDecoderEncoder.decode(discount.params.txtSubtitulo.value || ""));

                discountsArray.push({
                    name: discount.params.txtNameComercio.value,
                    slug: generateSlug(bank.name, discount.params.txtNameComercio.value),
                    img_url: imageString || "",
                    description: descriptionString || "",
                    details: HTMLDecoderEncoder.decode(
                        (
                            (discount.params.txtDetalle.value? ("<p>" + discount.params.txtDetalle.value + "</p>") : ""))
                            || ""
                        ),
                    location: locationString || undefined,
                    date: dateArray,
                    percentage: percentageString || undefined,
                    cards: cardsArray,
                    bank: bank.name,
                    category: section.name
                });
            });
        }
        return discountsArray;
    }
    catch (error) {
        throw error;
    }
}