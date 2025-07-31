import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import AppError from "../../errorHelpers/AppError";
import Wallet from "../wallet/wallet.model";
import httpStatus from "http-status-codes"
import { createUserToken, refreshAccessToken } from "../../utils/userToken";
import { setCookie } from "../../utils/setCookie";

const register = async (payload: IUser) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const isExist = await User.findOne({ phone: payload.phone }).session(session);
        if (isExist) {
            throw new AppError(409, "User already exists with this phone number");
        }
        const hashedPassword = await bcrypt.hash(payload.password, 10);
        const createdUser = await User.create([{
            ...payload,
            password: hashedPassword,
            role: payload.role || "user",
            isBlocked: false,
            approvalStatus: payload.role === "agent" ? 'pending' : 'approved',
        }], { session });
        await Wallet.create([{
            user: createdUser[0]._id,
            balance: 50,
            isBlocked: false,
        }], { session });
        await session.commitTransaction();
        session.endSession();
        const { password, ...userWithoutPassword } = createdUser[0].toObject();
        return userWithoutPassword;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};


const login = async (payload: Partial<IUser>) => {
    const { phone, password } = payload;
    const user = await User.findOne({ phone });
    if (!user) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "User with this phone does not exist"
        );
    }
    const isPasswordValid = await bcrypt.compare(password as string, user.password);
    if (!isPasswordValid) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect password");
    }
    const userToken = createUserToken(user);
    return {
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        user: {
            name: user.name,
            email: user.email
        },
    };
};

const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await refreshAccessToken(refreshToken)
    return {
        accessToken: newAccessToken,
    };
};


export const UserServices = {
    register,
    login,
    getNewAccessToken
}
