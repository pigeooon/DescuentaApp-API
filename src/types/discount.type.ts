import mongoose from "mongoose";

export type DiscountType = {
    name: string;
    img_url: string;
    description: string;
    details_url?: string;
    bank: string;
    category: string;
    location?: string;
    date?: string;
};

export type DiscountDocument = mongoose.Document & {
    name: string;
    img_url: string;
    description: string;
    details_url: string;
    bank: string;
    category: string;
    location: string;
    date: string;
};
