import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { AgentController } from "./agent.controller";
const router = express.Router();

router.post("/cash-in", checkAuth('agent'), AgentController.agentCashIn);
router.post("/withdraw", checkAuth('agent'), AgentController.agentCashOut);


export const AgentRoutes = router;