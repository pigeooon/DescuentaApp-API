import express from "express";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();
const prefix = "/auth"

router.get(`${prefix}/session`, [authMiddleware], authController.getProfile);
router.post(`${prefix}/signup`, authController.signUp);
router.post(`${prefix}/login`, authController.logIn);

export default router;