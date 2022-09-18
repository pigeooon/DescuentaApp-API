import { Router } from "express";
import DiscountController from "../controllers/discount.controller";

export default class DiscountRoutes {
    private path = '/discounts';
    private router = Router();
    private discountController = new DiscountController();

    constructor() {
        this.createRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    private createRoutes() {
        this.router.get(`${this.path}`, this.discountController.getDiscounts);

        this.router.get(`${this.path}/:id`, this.discountController.getDiscountById);
    }
}