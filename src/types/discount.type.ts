import mongoose from "mongoose";

export type DiscountType = {
    name: string;
    img: string | null;
    description: string;
    details_url?: string;
    bank: string;
    category: string,
    location?: string,
    date?: string,
};

export type DiscountDocument = mongoose.Document & {
    name: string;
    img: string;
    description: string;
    details_url: string;
    bank: string;
    category: string;
    location: string;
    date: string;
};
