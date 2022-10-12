import mongoose from "mongoose";

export type BankType = { 
    name: string;
    url: string;
    img_source_url: string;
    discount_name_selector: string; 
    discount_img_url_selector: string;
    discount_description_selector: string;
    discount_details_selector?: string;
    discount_location_selector?: string;
    discount_date_selector?: string;
    discount_categories: 
    {
        category_name: string;
        category_url: string;
    }[];
}

export type BankDocument = mongoose.Document & { 
    name: string;
    url: string;
    img_source_url: string;
    discount_name_selector: string; 
    discount_img_url_selector: string;
    discount_description_selector: string;
    discount_details_selector: string;
    discount_location_selector: string;
    discount_date_selector: string;
    discount_categories: 
    {
        category_name: string;
        category_url: string;
    }[];
}