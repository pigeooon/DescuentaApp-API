import mongoose from "mongoose";
import { DiscountDocument } from "../interfaces/discount.interface";

const discountSchema = new mongoose.Schema<DiscountDocument> (
    {
        name: String,
        slug: String,
        img_url: String,
        description: String,
        details: {type: String, required: false},
        bank: String,
        category: String,
        location: {type: String, required: false},
        percentage: {type: String, required: false},
        date: {type: String, required: false},
        cards: [],
    },
    {
        timestamps: { 
            createdAt : "createdAt",
        }
    }
);

export const Discount = mongoose.model<DiscountDocument>("Discount", discountSchema);