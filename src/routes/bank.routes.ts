import express from "express";
import { bankController } from "../controllers/bank.controller";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();
const prefix = "/banks"

router.get(`${prefix}`, [authMiddleware], bankController.getBanks);
router.get(`${prefix}/:id`, [authMiddleware], bankController.getBankById);
router.post(`${prefix}`, [authMiddleware, adminMiddleware], bankController.createBank);
router.put(`${prefix}/:id`, [authMiddleware, adminMiddleware], bankController.updateBank);
router.delete(`${prefix}/:id`, [authMiddleware, adminMiddleware], bankController.deleteBank);

export default router;