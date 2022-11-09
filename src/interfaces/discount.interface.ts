import mongoose from "mongoose";

export interface IDiscount {
    name: string;
    img_url: string;
    description: string;
    details?: string;
    bank: string;
    category: string;
    location?: string;
    date?: string;
};

export type DiscountDocument = mongoose.Document & {
    name: string;
    img_url: string;
    description: string;
    details: string;
    bank: string;
    category: string;
    location: string;
    date: string;
};
