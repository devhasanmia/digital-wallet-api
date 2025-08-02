import express from "express";
import { AdminController } from "./admin.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = express.Router();

router.get("/users", checkAuth("admin"), AdminController.getAllUser);
router.get("/agents", checkAuth("admin"), AdminController.getAllAgent);
router.patch("/agents/:agentId", checkAuth("admin"), AdminController.updateAgentStatus);
router.get("/wallets", checkAuth("admin"), AdminController.getAllWallets);
router.patch("/wallets/:walletId/block", checkAuth("admin"), AdminController.toggleWalletBlock);
router.get("/transactions", checkAuth("admin"), AdminController.getAllTransactions);

export const AdminRoutes = router;
