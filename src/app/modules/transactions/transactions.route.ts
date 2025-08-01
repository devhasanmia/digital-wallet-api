import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { walletController } from "../wallet/wallet.controller";

const router = express.Router();

router.get("/me", checkAuth('user', 'agent'), walletController.getMyTransactions);
router.post("/add-money", checkAuth('user'), walletController.addMoneyToWallet);

export const TransactionRoutes = router;