import mongoose from "mongoose";

export type DiscountType = {
    name: string;
    img: string | null;
    description: string;
    details_url: string | null;
    bank: string;
};

export type DiscountDocument = mongoose.Document & {
    name: string;
    img: string;
    description: string;
    details_url: string;
    bank: string;
};
