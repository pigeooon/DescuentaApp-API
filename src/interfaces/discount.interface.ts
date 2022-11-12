import mongoose from "mongoose";

export interface IDiscount {
    name: string;
    img_url: string;
    description: string;
    details?: string;
    bank: string;
    category: string;
    location?: string;
    percentage?: string;
    date?: string;
    cards: string[];
};

export type DiscountDocument = mongoose.Document & {
    name: string;
    img_url: string;
    description: string;
    details: string;
    bank: string;
    category: string;
    location: string;
    percentage: string;
    date: string;
    cards: string[];
};
