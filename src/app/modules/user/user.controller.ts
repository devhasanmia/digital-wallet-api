import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.services";
import { sendResponse } from "../../utils/sendResponse";

const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.register(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User registered successfully",
        data: user,
    });
});

export const UserController = {
    register,
};
