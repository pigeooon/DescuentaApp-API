import mongoose from "mongoose";
import { BankDocument } from "../types/bank.type";

const bankSchema = new mongoose.Schema<BankDocument> (
    {
        name: String,
        url: String,
        img_source_url: String,
        discount_name_selector: String,
        discount_img_selector: String,
        discount_description_selector: String,
        discount_details_url_selector: String
    }
);

export const Bank = mongoose.model<BankDocument>("Bank", bankSchema);