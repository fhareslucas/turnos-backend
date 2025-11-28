import express from "express";
const router = express.Router();
import controllers from "../controllers/index.js";
const { authController } = controllers;
import { authenticate } from "../middleware/index.js";
import { validate } from "../middleware/index.js";
import { registerSchema } from "../validators/auth.validator.js";
import { loginSchema } from "../validators/auth.validator.js";

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/profile", authenticate, authController.getProfile);

export default router;
