import { Discount } from "../models/discount.model";
import { DiscountDocument, DiscountType } from "../types/discount.type";

export class DiscountService {

    constructor() {
    }

    public async getDiscounts() {
    }

    public getDiscountById() {
    }

    public createDiscount(discount: DiscountType) {
        const discount_ = new Discount(discount);
        discount_.save();
    }

    public updateDiscount() {
    }

    public deleteDiscount() {
    }
}