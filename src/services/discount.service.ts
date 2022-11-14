import { Discount } from "../models/discount.model";
import { DiscountDocument, IDiscount } from "../interfaces/discount.interface";

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