import { Router } from "express";

import bankRoutes from "./bank.routes";
import discountRoutes from "./discount.routes";
import scraperRoutes from "./scraper.routes";
import authRoutes from "./auth.routes";
import accountRoutes from "./account.routes";

const router = Router();

router.use('/api', bankRoutes);
router.use('/api', discountRoutes);
router.use('/api', scraperRoutes);
router.use('/api', scraperRoutes);
router.use('/api', authRoutes);
router.use('/api', accountRoutes);

export { router };