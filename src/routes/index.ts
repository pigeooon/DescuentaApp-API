import { Router } from "express";

import bankRoutes from "./bank.routes";
import discountRoutes from "./discount.routes";
import scraperRoutes from "./scraper.routes";

const router = Router();

router.use('/api', bankRoutes);
router.use('/api', discountRoutes);
router.use('/api', scraperRoutes);

export { router };