import express from "express";
import { UserController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import userValidationSchema from "./user.validation";
const router = express.Router();

router.get("/profile", checkAuth('admin', 'user', 'agent'), UserController.profile);


export const UserRoutes = router;