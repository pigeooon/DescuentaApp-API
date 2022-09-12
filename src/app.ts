import { Scraper } from "./models/scraper.model";
import { Bank } from "./types/bank.type";

const banks: Bank[] = [
    {
        name: "Scotiabank",
        url: "https://www.scotiaclub.cl/scclubfront/categoria/mundos/descuentos",
        discount_name_selector: "#row-descuentos > .descuento > .card > .card-body > .scotia-headline",
        discount_img_selector: "#row-descuentos > .descuento > .card > img",
        discount_description_selector: "#row-descuentos > .descuento > .card > .card-body > .mb-1",
        discount_details_url_selector: "#row-descuentos > .descuento > .card > .card-body > .mb-1"
    },
];

const scraper = new Scraper(banks);
scraper.scrap();