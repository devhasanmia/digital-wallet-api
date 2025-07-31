import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.services";
import { sendResponse } from "../../utils/sendResponse";
import { setCookie } from "../../utils/setCookie";

const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.register(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User registered successfully",
        data: user,
    });
});

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.login(req.body);
    setCookie(res, user)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User Login successfully",
        data: user,
    });
});

const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false
    })
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false
    })
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User Logout successfully",
        data: null,
    });
});

export const UserController = {
    register,
    login,
    logout
};
