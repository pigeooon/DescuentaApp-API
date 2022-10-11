import mongoose from "mongoose";
import { BankDocument } from "../types/bank.type";

const bankSchema = new mongoose.Schema<BankDocument> (
    {
        name: String,
        url: String,
        img_source_url: String,
        discount_name_selector: String,
        discount_img_url_selector: String,
        discount_description_selector: String,
        discount_details_url_selector: String,
        discount_location_selector: String,
        discount_date_selector: String,
        discount_categories: [
            {
                category_name: String,
                category_url: String
            }
        ]
    }
);

export const Bank = mongoose.model<BankDocument>("Bank", bankSchema);