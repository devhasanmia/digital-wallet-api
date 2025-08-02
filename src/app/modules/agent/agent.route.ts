import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { AgentController } from "./agent.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { WalletValidation } from "../wallet/wallet.validation";
const router = express.Router();

router.post("/cash-in", checkAuth('agent'), validateRequest(WalletValidation.CashInPayloadSchema), AgentController.agentCashIn);
router.post("/withdraw", checkAuth('agent'), validateRequest(WalletValidation.CashOutPayloadSchema), AgentController.agentCashOut);


export const AgentRoutes = router;