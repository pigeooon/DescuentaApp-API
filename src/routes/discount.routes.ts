import express from "express";
import { discountController } from "../controllers/discount.controller";

const router = express.Router();
const prefix = "/discounts";

router.get(`${prefix}`, discountController.getDiscounts);
router.get(`${prefix}/featured`, discountController.getFeaturedDiscounts);
router.get(`${prefix}/categories`, discountController.getDiscountCategories);
router.post(`${prefix}/filter`, discountController.getFilteredDiscounts);
router.get(`${prefix}/:slug/slug`, discountController.getDiscountBySlug);
router.get(`${prefix}/:id`, discountController.getDiscountById);

export default router;