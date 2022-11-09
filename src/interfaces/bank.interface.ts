import mongoose from "mongoose";

export interface IBank { 
    name: string;
    url: string;
    img_source_url: string;
    discount_name_selector: string; 
    discount_img_url_selector: string;
    discount_description_selector: string;
    discount_details_selector?: string;
    discount_location_selector?: string;
    discount_date_selector?: string;
    discount_categories: IBankCategory[];
}

export interface IBankCategory {
    category: string;
    bank_category_name: string;
    bank_category_selector: string;
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
    discount_categories: IBankCategory[];
}