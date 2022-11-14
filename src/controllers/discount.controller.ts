import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { DiscountService } from "../services/discount.service";

class DiscountController {

    constructor() {
    }

    getDiscounts = async (req: Request, res: Response) => {
        DiscountService.getDiscounts().then((data) => {
            if(!data || data === null) return res.status(StatusCodes.NOT_FOUND);
            return res.status(StatusCodes.OK).json(data);
        })
        .catch((error) => {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Error interno del servidor.", error: error});
        });
    }

    getDiscountById = async (req: Request, res: Response) => {
        const discountId = req.params.id;
        
        DiscountService.getDiscountById(discountId).then((data) => {
            if(!data || data === null) return res.status(StatusCodes.NOT_FOUND);
            return res.status(StatusCodes.OK).json(data);
        })
        .catch((error) => {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Error interno del servidor.", error: error});
        });
    }

    getFeaturedDiscounts = async (req: Request, res: Response) => {
        DiscountService.getFeaturedDiscounts().then((data) => {
            if(!data || data === null) return res.status(StatusCodes.NOT_FOUND);
            return res.status(StatusCodes.OK).json(data);
        })
        .catch((error) => {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Error interno del servidor.", error: error});
        });
    }
}

export const discountController = new DiscountController();