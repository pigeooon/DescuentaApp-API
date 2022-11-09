import express from "express";
import { bankController } from "../controllers/bank.controller";

const router = express.Router();
const prefix = "/banks"

router.get(`${prefix}`, bankController.getBanks);
router.get(`${prefix}/:id`, bankController.getBankById);
router.post(`${prefix}`, bankController.createBank);
router.put(`${prefix}/:id`, bankController.updateBank);
router.delete(`${prefix}/:id`, bankController.deleteBank);

export default router;