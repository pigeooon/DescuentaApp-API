import express from "express";
import { authController } from "../controllers/auth.controller";

const router = express.Router();
const prefix = "/auth"

router.get(`${prefix}/session`, authController.validateJwt);
router.post(`${prefix}/signup`, authController.signUp);
router.post(`${prefix}/login`, authController.logIn);

export default router;