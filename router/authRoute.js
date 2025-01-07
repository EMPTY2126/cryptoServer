import { Router } from "express";
import authController from "../controllers/authController.js";


export const router = Router();

router.post('/api/signup',authController.signup);
router.post('/api/login',authController.login);
router.post('/api/auth/google', authController.googleLogin);

