import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { IAuthUser } from "../../interfaces/auth.interface";
import { WalletService } from "./wallet.service";

const wallet = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authenticatedUser = req.user;
    const data = await WalletService.getWallet(authenticatedUser as IAuthUser);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Wallet fetched successfully",
        data,
    });
});

const SendMoney = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authenticatedUser = req.user;
    const data = await WalletService.SendMoney(req.body, authenticatedUser as IAuthUser)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Send Money successfully",
        data,
    });
})

const getMyTransactions = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authenticatedUser = req.user;
    const data = await WalletService.getMyTransactions(authenticatedUser as IAuthUser)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Wallet fetched successfully",
        data,
    });
})

const addMoneyToWallet = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authenticatedUser = req.user;
    const data = await WalletService.addMoneyToWallet(req.body, authenticatedUser as IAuthUser)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Money has been successfully added to your wallet.",
        data,
    });
})

const withdrawToAgent = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const authenticatedUser = req.user as IAuthUser;
        const result = await WalletService.withdrawToAgent(req.body, authenticatedUser);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: `৳${req.body.amount} withdrawn to agent ${req.body.agentPhone} successfully.`,
            data:result,
        });
    }
);

const agentCashIn = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const authenticatedUser = req.user as IAuthUser;
        const result = await WalletService.withdrawToAgent(req.body, authenticatedUser);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: `৳${req.body.amount} withdrawn to agent ${req.body.agentPhone} successfully.`,
            data:result,
        });
    }
);




export const walletController = {
    wallet,
    SendMoney,
    getMyTransactions,
    addMoneyToWallet,
    withdrawToAgent,
    agentCashIn
}