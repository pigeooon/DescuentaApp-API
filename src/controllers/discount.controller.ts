import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IDiscountFilters } from "../interfaces/discountFilters.interface";

import { DiscountService } from "../services/discount.service";
import { discountCategories } from "../utils/discountCategories";

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

    getDiscountBySlug = async (req: Request, res: Response) => {
        const discountSlug = req.params.slug;
        
        DiscountService.getDiscountBySlug(discountSlug).then((data) => {
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

    getFilteredDiscounts = async (req: Request, res: Response) => {
        const filters: IDiscountFilters = req.body as IDiscountFilters;

        DiscountService.getFilteredDiscounts(filters).then((data) => {
            if(!data || data === null) return res.status(StatusCodes.NOT_FOUND);
            return res.status(StatusCodes.OK).json(data);
        })
        .catch((error) => {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Error interno del servidor.", error: error});
        });
    }

    getDiscountCategories = async (req: Request, res: Response) => {
        return res.status(StatusCodes.OK).json(discountCategories);
    }
}

export const discountController = new DiscountController();