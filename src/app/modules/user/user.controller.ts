import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.services";
import { IAuthUser } from "../../interfaces/auth.interface";

const profile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authenticatedUser = req.user;
    const data = await UserServices.profile(authenticatedUser as IAuthUser);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Profile fetched successfully",
        data,
    });
});




export const UserController = {
    profile
};
