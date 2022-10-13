import { Router } from "express";

import BankRoutes from "./bank.routes";
import DiscountRoutes from "./discount.routes";
import ScraperRoutes from "./scraper.routes";

const router = Router();

const bankRoutes = new BankRoutes();
const discountRoutes = new DiscountRoutes();
const scraperRoutes = new ScraperRoutes();

router.use('/', bankRoutes.getRouter());
router.use('/', discountRoutes.getRouter());
router.use('/', scraperRoutes.getRouter());

export default router;