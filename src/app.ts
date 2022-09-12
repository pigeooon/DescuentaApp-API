import mongoose from "mongoose";
import 'dotenv/config';

mongoose.connect(String(process.env.DB_CONN_STRING)).then(
    () => { console.log("✅ Connected successfully to MongoDB."); },
).catch((err) => {
    console.log("❌ MongoDB connection error.");
    console.error(err);
});

/*import { Scraper } from "./models/scraper.model";
import { Bank } from "./types/bank.type";

const banks: Bank[] = [
    {
        name: "Scotiabank",
        url: "https://www.scotiaclub.cl/scclubfront/categoria/mundos/descuentos",
        img_source_url: "https://www.scotiaclub.cl/",
        discount_name_selector: "#row-descuentos > .descuento > .card > .card-body > .scotia-headline",
        discount_img_selector: "#row-descuentos > .descuento > .card > img",
        discount_description_selector: "#row-descuentos > .descuento > .card > .card-body > .mb-1",
        discount_details_url_selector: "#row-descuentos > .descuento > .card > .card-body > .mb-1"
    },
];

const scraper = new Scraper(banks);
scraper.scrap();*/