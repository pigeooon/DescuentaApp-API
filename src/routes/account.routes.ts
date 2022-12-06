import express from "express";
import { accountController } from "../controllers/account.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();
const prefix = "/account"

router.patch(`${prefix}`, [authMiddleware], accountController.updateAccount);

export default router;