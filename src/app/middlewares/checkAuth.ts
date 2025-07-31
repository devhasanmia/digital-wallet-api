import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelpers/AppError";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new AppError(403, "No Token Recieved")
        }
        const verifiedToken = verifyToken(accessToken, config.jwt.secret) as JwtPayload;
        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You are not permitted to view this route!!!")
        }
        req.user = verifiedToken
        next()
    } catch (error) {
        next(error)
    }
}