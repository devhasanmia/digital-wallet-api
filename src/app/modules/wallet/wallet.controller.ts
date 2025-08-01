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
        message: "Wallet fetched successfully",
        data,
    });
})


export const walletController = {
    wallet,
    SendMoney
}