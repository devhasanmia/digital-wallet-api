import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { walletController } from "../wallet/wallet.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { WalletValidation } from "../wallet/wallet.validation";

const router = express.Router();

router.get("/me", checkAuth('user', 'agent'), walletController.getMyTransactions);
router.post("/add-money", checkAuth('user'), validateRequest(WalletValidation.AddMoney), walletController.addMoneyToWallet);

export const TransactionRoutes = router;