import { Router } from "express";

import BankRoutes from "./bank.routes";
import DiscountRoutes from "./discount.routes";

const router = Router();

const bankRoutes = new BankRoutes();
const discountRoutes = new DiscountRoutes();

router.use('/', bankRoutes.getRouter());
router.use('/', discountRoutes.getRouter());

export default router;