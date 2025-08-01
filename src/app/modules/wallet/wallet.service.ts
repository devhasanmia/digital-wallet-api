import { IAuthUser } from "../../interfaces/auth.interface";
import Wallet from "./wallet.model";
import User from "../user/user.model";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { ISendMoneyPayload } from "./wallet.interface";
import mongoose from "mongoose";
import Transaction from "../transactions/transactions.model";

const getWallet = async (authenticatedUser: IAuthUser) => {
    try {
        const result = await Wallet.findOne({ user: authenticatedUser._id })
            .populate({
                path: "user",
                select: "name email phone",
            }).select('-isBlocked');

        return result;
    } catch (error) {
        throw error;
    }
};

export const SendMoney = async (
    payload: ISendMoneyPayload,
    authenticatedUser: IAuthUser
) => {
    const { receiverPhone, amount, note } = payload;

    // Start transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // 1️⃣ Self-send block
        if (receiverPhone === authenticatedUser.phone) {
            throw new AppError(httpStatus.BAD_REQUEST, "Cannot send money to your own wallet");
        }

        // 2️⃣ Sender wallet
        const senderWallet = await Wallet.findOne({ user: authenticatedUser._id }).session(session);
        if (!senderWallet) throw new AppError(httpStatus.NOT_FOUND, "Sender wallet not found");
        if (senderWallet.isBlocked) throw new AppError(httpStatus.FORBIDDEN, "Your wallet is blocked");
        if (senderWallet.balance < amount) throw new AppError(httpStatus.BAD_REQUEST, "Insufficient balance");

        // 3️⃣ Receiver user + wallet
        const receiver = await User.findOne({ phone: receiverPhone }).session(session);
        if (!receiver) throw new AppError(httpStatus.NOT_FOUND, "Receiver not found");

        const receiverWallet = await Wallet.findOne({ user: receiver._id }).session(session);
        if (!receiverWallet || receiverWallet.isBlocked) {
            throw new AppError(httpStatus.BAD_REQUEST, "Receiver's wallet not found or blocked");
        }

        // 4️⃣ Balance update
        senderWallet.balance -= amount;
        receiverWallet.balance += amount;

        await senderWallet.save({ session });
        await receiverWallet.save({ session });
        const generatedNote = `৳${amount} sent to ${receiver.name || receiver.phone}`;
        // 5️⃣ Transaction log
        await Transaction.create(
            [
                {
                    type: "send_money",
                    amount,
                    from: authenticatedUser._id,
                    to: receiver._id,
                    note: payload.note?.trim() || generatedNote,
                },
            ],
            { session }
        );

        // ✅ Commit if all good
        await session.commitTransaction();
        session.endSession();

        return {
            message: `$${amount} sent successfully to ${receiver.phone}`,
            senderBalance: senderWallet.balance,
        };
    } catch (error) {
        // Rollback if any fail
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};




export const WalletService = {
    getWallet,
    SendMoney
};
