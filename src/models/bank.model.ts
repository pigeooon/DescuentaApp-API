import mongoose from "mongoose";
import { BankDocument } from "../interfaces/bank.interface";

const bankSchema = new mongoose.Schema<BankDocument> (
    {
        name: String,
        url: String,
        img_source_url: String,
        discount_name_selector: String,
        discount_img_url_selector: String,
        discount_description_selector: String,
        discount_details_button_selector: String,
        discount_details_selector: String,
        discount_location_selector: String,
        discount_date_selector: String,
        discount_categories: [
            {
                category: String,
                bank_category_name: String,
                bank_category_selector: String
            }
        ]
    }
);

export const Bank = mongoose.model<BankDocument>("Bank", bankSchema);