import { Request, Response } from "express";
import { DiscountService } from "../services/discount.service";

class DiscountController {

    constructor() {
    }

    getDiscounts = async (req: Request, res: Response) => {
        console.log("buenas :D");
        
        DiscountService.getDiscounts().then((data) => {
            if(!data || data === null) return res.status(404);
            return res.status(200).json(data);
        })
        .catch((error) => {
            return res.status(500).json(error);
        });
    }

    getDiscountById = async (req: Request, res: Response) => {
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

export const discountController = new DiscountController();