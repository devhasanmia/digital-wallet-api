import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AdminServices } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";
import AppError from "../../errorHelpers/AppError";

const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AdminServices.getAllUser();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Users retrieved successfully`,
      data: result,
    });
  }
);

const getAllAgent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AdminServices.getAllAgent();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Agents retrieved successfully`,
      data: result,
    });
  }
);

const getAllWallets = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AdminServices.getAllWallets();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Wallets retrieved successfully`,
      data: result,
    });
  }
);

const getAllTransactions = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AdminServices.getAllTransactions();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Transactions retrieved successfully`,
      data: result,
    });
  }
);

const toggleWalletBlock = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { walletId } = req.params;
    const { block } = req.body;
    if (typeof block !== "boolean") {
      throw new AppError(
        400,
        "'block' field is required and must be a boolean (true or false)"
      );
    }
    const result = await AdminServices.toggleWalletBlock(walletId, block);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result.message,
      data: result.wallet,
    });
  }
);

const updateAgentStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { agentId } = req.params;
    const result = await AdminServices.updateAgentStatus(agentId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result.message,
      data: result.agent,
    });
  }
);

const userBlockToggle = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const result = await AdminServices.userBlockToggle(userId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User Update Success",
      data: result,
    });
  }
);

export const AdminController = {
  getAllUser,
  getAllAgent,
  getAllWallets,
  getAllTransactions,
  toggleWalletBlock,
  updateAgentStatus,
  userBlockToggle
};
