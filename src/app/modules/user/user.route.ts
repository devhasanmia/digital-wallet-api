import express from "express";
import { UserController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
const router = express.Router();

router.get("/profile", checkAuth('admin', 'user', 'agent'), UserController.profile);


export const UserRoutes = router;