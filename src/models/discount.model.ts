import mongoose from "mongoose";
import { DiscountDocument } from "../types/discount.type";

const discountSchema = new mongoose.Schema<DiscountDocument> (
    {
        name: String,
        img: String,
        description: String,
        details_url: String,
        bank: String
    }
);

export const Discount = mongoose.model<DiscountDocument>("Discount", discountSchema);