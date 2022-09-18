import { Request, Response } from "express";
import { DiscountService } from "../services/discount.service";

export default class DiscountController {

    constructor() {
    }

    public getDiscounts(req: Request, res: Response) {
        DiscountService.getDiscounts().then((data) => {
            if(!data || data === null) return res.status(404);
            return res.status(200).json(data);
        })
        .catch((error) => {
            return res.status(500).json(error);
        });
    }

    public getDiscountById(req: Request, res: Response) {
        const discountId = req.params.id;
        
        DiscountService.getDiscountById(discountId).then((data) => {
            if(!data || data === null) return res.status(404);
            return res.status(200).json(data);
        })
        .catch((error) => {
            return res.status(500).json(error);
        });
    }
}