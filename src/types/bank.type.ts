import mongoose from "mongoose";

export type BankType = { 
    name: string;
    url: string;
    img_source_url: string;
    discount_name_selector: string; 
    discount_img_selector: string;
    discount_description_selector: string;
    discount_details_url_selector: string;
}

export type BankDocument = mongoose.Document & { 
    name: string;
    url: string;
    img_source_url: string;
    discount_name_selector: string; 
    discount_img_selector: string;
    discount_description_selector: string;
    discount_details_url_selector: string;
}