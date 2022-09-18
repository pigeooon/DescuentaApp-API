import { Router } from "express";
import BankRoutes from "./bank.routes";

const router = Router();

const bankRoutes = new BankRoutes();

router.use('/', bankRoutes.getRouter());

export default router;