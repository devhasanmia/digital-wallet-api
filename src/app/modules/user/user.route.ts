import express from "express";
import { UserController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
const router = express.Router();

router.get("/profile", checkAuth('admin', 'user', 'agent'), UserController.profile);
router.put("/profile-update", checkAuth('admin', 'user', 'agent'), UserController.UpdateProfile);


export const UserRoutes = router;