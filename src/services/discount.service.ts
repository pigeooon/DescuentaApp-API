import { Discount } from "../models/discount.model";
import { DiscountDocument, IDiscount } from "../interfaces/discount.interface";
import { IDiscountFilters } from "../interfaces/discountFilters.interface";

export class DiscountService {

    constructor() {
    }

    public static async getDiscounts() {
        const allDiscounts = await Discount.find().lean();
        return allDiscounts;
    }

    public static async getDiscountById(discountId: any) {
        const singleDiscount = await Discount.findOne({_id: discountId}).lean();
        return singleDiscount;
    }

    public static async getFilteredDiscounts(filters: IDiscountFilters) {
        const filtersData = {
            name: filters.name ? filters.name : undefined,
            categories: (Array.isArray(filters.categories) && filters.categories.length) ? filters.categories : undefined,
            banks: (Array.isArray(filters.banks) && filters.banks.length) ? filters.banks : undefined,
            cards: (Array.isArray(filters.cards) && filters.cards.length) ? filters.cards : undefined,
            dates: (Array.isArray(filters.dates) && filters.dates.length) ? filters.dates : undefined,
            locations: (Array.isArray(filters.locations) && filters.locations.length) ? filters.locations : undefined
        }
        const mongoFilters = {
            ...(filtersData.name && {name: {"$regex": new RegExp(filtersData.name), "$options": "i"}}),
            ...(filtersData.categories && {category:  {"$in" : filtersData.categories}}),
            ...(filtersData.banks && {bank:  {"$in" : filtersData.banks}}),
            ...(filtersData.cards && {cards:  {"$in" : filtersData.cards}}),
            ...(filtersData.dates && {date:  {"$in" : filtersData.dates}}),
            ...(filtersData.locations && {location:  {"$in" : filtersData.locations}}),
        }
        const filteredDiscounts = await Discount.find(mongoFilters).lean();
        return filteredDiscounts;
    }

    public static async getFeaturedDiscounts() {
        const featuredDiscounts = await Discount
            .find({ percentage: { "$in" : ["90%", "80%", "70%", "60%", "50%"]} })
            .sort({ percentage: -1 })
            .limit(15)
            .lean();
        return featuredDiscounts;
    }

    public static async createDiscount(discountData: any) {
        const newDiscount = discountData as IDiscount;

        const newDiscountResponse = await new Discount(newDiscount).save();
        return newDiscountResponse;
    }

    public static async deleteDiscounts() {
        console.log("🗑️  Deleting all discounts from database...");
        return await Discount.deleteMany();
    }
}