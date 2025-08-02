import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { walletController } from "./wallet.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { WalletValidation } from "./wallet.validation";

const router = express.Router();

router.get("/", checkAuth('user', 'agent'), walletController.wallet);
router.post("/send-money", checkAuth('user'), validateRequest(WalletValidation.SendMoneyPayloadSchema), walletController.SendMoney);
router.post("/withdraw", checkAuth('user'), validateRequest(WalletValidation.WithdrawToAgentPayloadSchema), walletController.withdrawToAgent);



export const WalletRoutes = router;