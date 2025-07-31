import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.services";

const profile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authenticatedUser = req.user;
    console.log(authenticatedUser)
    const data = await UserServices.profile(authenticatedUser)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User registered successfully",
        data,
    });
});

export const UserController = {
    profile
};
