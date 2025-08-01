import mongoose from "mongoose";
import AppError from "../../errorHelpers/AppError";
import { IAuthUser } from "../../interfaces/auth.interface";
import { IAddMoneyPayload } from "../wallet/wallet.service";
import User from "../user/user.model";
import httpStatus from "http-status-codes"
import Wallet from "../wallet/wallet.model";
import Transaction from "../transactions/transactions.model";
interface IAgentCashInPayload extends IAddMoneyPayload {
    receiverPhone: string;
}
const agentCashIn = async (
    payload: IAgentCashInPayload,
    authenticatedUser: IAuthUser
) => {
    const { receiverPhone, amount, note } = payload;

    if (amount <= 0) {
        throw new AppError(httpStatus.BAD_REQUEST, "Amount must be greater than 0");
    }

    if (authenticatedUser.role !== "agent") {
        throw new AppError(httpStatus.FORBIDDEN, "Only agents can perform cash-in");
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Find agent's wallet
        const agentWallet = await Wallet.findOne({ user: authenticatedUser._id }).session(session);
        if (!agentWallet) {
            throw new AppError(httpStatus.NOT_FOUND, "Agent wallet not found");
        }
        if (agentWallet.isBlocked) {
            throw new AppError(httpStatus.FORBIDDEN, "Agent wallet is blocked");
        }
        if (agentWallet.balance < amount) {
            throw new AppError(httpStatus.BAD_REQUEST, "Agent has insufficient balance");
        }
        const receiver = await User.findOne({ phone: receiverPhone }).session(session);
        if (!receiver) {
            throw new AppError(httpStatus.NOT_FOUND, "Receiver user not found");
        }
        const receiverWallet = await Wallet.findOne({ user: receiver._id }).session(session);
        if (!receiverWallet || receiverWallet.isBlocked) {
            throw new AppError(httpStatus.BAD_REQUEST, "Receiver's wallet is blocked or not found");
        }
        agentWallet.balance -= amount;
        await agentWallet.save({ session });
        receiverWallet.balance += amount;
        await receiverWallet.save({ session });
        const autoNote = `Agent added ৳${amount}`;
        await Transaction.create(
            [
                {
                    type: "cash_in",
                    amount,
                    from: authenticatedUser._id,
                    to: receiver._id,
                    note: note?.trim() || autoNote,
                },
            ],
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return {
            message: `৳${amount} successfully transferred from agent wallet to ${receiver.phone}.`,
            agentBalance: agentWallet.balance,
            receiverBalance: receiverWallet.balance,
        };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

interface IAgentCashOutPayload {
    userPhone: string;
    amount: number;
    note?: string;
}

export const agentCashOut = async (
    payload: IAgentCashOutPayload,
    authenticatedUser: IAuthUser
) => {
    const { userPhone, amount, note } = payload;

    if (amount <= 0) {
        throw new AppError(httpStatus.BAD_REQUEST, "Amount must be greater than 0");
    }
    if (authenticatedUser.role !== "agent") {
        throw new AppError(httpStatus.FORBIDDEN, "Only agents can perform cash-out");
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const agentWallet = await Wallet.findOne({ user: authenticatedUser._id }).session(session);
        if (!agentWallet) {
            throw new AppError(httpStatus.NOT_FOUND, "Agent wallet not found");
        }
        if (agentWallet.isBlocked) {
            throw new AppError(httpStatus.FORBIDDEN, "Agent wallet is blocked");
        }
        const user = await User.findOne({ phone: userPhone }).session(session);
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, "User not found");
        }
        const userWallet = await Wallet.findOne({ user: user._id }).session(session);
        if (!userWallet || userWallet.isBlocked) {
            throw new AppError(httpStatus.BAD_REQUEST, "User wallet is blocked or not found");
        }

        if (userWallet.balance < amount) {
            throw new AppError(httpStatus.BAD_REQUEST, "User has insufficient balance");
        }
        userWallet.balance -= amount;
        await userWallet.save({ session });
        agentWallet.balance += amount;
        await agentWallet.save({ session });
        const autoNote = `Agent withdrew ৳${amount}`;
        await Transaction.create(
            [
                {
                    type: "cash_out",
                    amount,
                    from: user._id,
                    to: authenticatedUser._id,
                    note: note?.trim() || autoNote,
                },
            ],
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return {
            message: `৳${amount} withdrawn from ${user.phone}'s wallet successfully.`,
            userBalance: userWallet.balance,
        };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};



export const AgentService = {
    agentCashIn,
    agentCashOut
}