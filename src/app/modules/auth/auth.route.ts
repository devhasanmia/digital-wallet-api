import express from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import AuthValidation from "../user/user.validation";
const router = express.Router();

router.post("/register", validateRequest(AuthValidation.userValidationSchema), AuthController.register);
router.post("/login", validateRequest(AuthValidation.loginSchema), AuthController.login);
router.post("/logout", AuthController.logout);

export const AuthRoutes = router;