import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { setCookie } from "../../utils/setCookie";
import { AuthServices } from "./auth.services";

const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await AuthServices.register(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User registered successfully",
        data: user,
    });
});

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await AuthServices.login(req.body);
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
        secure: true,
        sameSite: "none",
    });
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User Logout successfully",
        data: null,
    });
});


export const AuthController = {
    register,
    login,
    logout
};
