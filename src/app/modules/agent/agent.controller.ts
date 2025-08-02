import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { IAuthUser } from "../../interfaces/auth.interface";
import { AgentService } from "./agent.service";

const agentCashIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authenticatedUser = req.user as IAuthUser;
    const result = await AgentService.agentCashIn(req.body, authenticatedUser);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Cash In successfully`,
      data: result,
    });
  }
);

const agentCashOut = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authenticatedUser = req.user as IAuthUser;
    const { amount, userPhone } = req.body;

    const result = await AgentService.agentCashOut(req.body, authenticatedUser);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `৳${amount} withdrawn successfully from user ${userPhone}'s wallet.`,
      data: result,
    });
  }
);

export const AgentController = {
  agentCashIn,
  agentCashOut
}