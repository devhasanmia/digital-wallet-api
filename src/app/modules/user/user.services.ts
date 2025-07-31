import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import AppError from "../../errorHelpers/AppError";
import Wallet from "../wallet/wallet.model";

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
            isApproved: payload.role === "agent" ? false : true,
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

export const UserServices = {
    register
}
