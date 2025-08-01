import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { walletController } from "./wallet.controller";

const router = express.Router();

router.get("/", checkAuth('admin', 'user', 'agent'), walletController.wallet);
router.post("/send-money", checkAuth('user'), walletController.SendMoney);


export const WalletRoutes = router;