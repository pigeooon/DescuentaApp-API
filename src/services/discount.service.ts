import { Discount } from "../models/discount.model";
import { DiscountDocument, DiscountType } from "../types/discount.type";

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

    public static async createDiscount(discountData: any) {
        const newDiscount = discountData as DiscountType;

        const newDiscountResponse = await new Discount(newDiscount).save();
        return newDiscountResponse;
    }

    public static async deleteDiscounts() {
        console.log("🗑️  Deleting all discounts from database...");
        return await Discount.deleteMany();
    }
}