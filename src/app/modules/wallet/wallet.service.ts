import { IAuthUser } from "../../interfaces/auth.interface";
import Wallet from "./wallet.model";
import User from "../user/user.model";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { ISendMoneyPayload, IWithdrawToAgentPayload } from "./wallet.interface";
import mongoose, { Types } from "mongoose";
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

const SendMoney = async (
    payload: ISendMoneyPayload,
    authenticatedUser: IAuthUser
) => {
    const { receiverPhone, amount, note } = payload;

    // Start transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        if (receiverPhone === authenticatedUser.phone) {
            throw new AppError(httpStatus.BAD_REQUEST, "Cannot send money to your own wallet");
        }

        const senderWallet = await Wallet.findOne({ user: authenticatedUser._id }).session(session);
        if (!senderWallet) throw new AppError(httpStatus.NOT_FOUND, "Sender wallet not found");
        if (senderWallet.isBlocked) throw new AppError(httpStatus.FORBIDDEN, "Your wallet is blocked");
        if (senderWallet.balance < amount) throw new AppError(httpStatus.BAD_REQUEST, "Insufficient balance");

        const receiver = await User.findOne({ phone: receiverPhone }).session(session);
        if (!receiver) throw new AppError(httpStatus.NOT_FOUND, "Receiver not found");

        const receiverWallet = await Wallet.findOne({ user: receiver._id }).session(session);
        if (!receiverWallet || receiverWallet.isBlocked) {
            throw new AppError(httpStatus.BAD_REQUEST, "Receiver's wallet not found or blocked");
        }

        senderWallet.balance -= amount;
        receiverWallet.balance += amount;

        await senderWallet.save({ session });
        await receiverWallet.save({ session });
        const generatedNote = `৳${amount} sent to ${receiver.name || receiver.phone}`;
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

        await session.commitTransaction();
        session.endSession();

        return {
            message: `$${amount} sent successfully to ${receiver.phone}`,
            senderBalance: senderWallet.balance,
        };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

const getMyTransactions = async (authenticatedUser: IAuthUser) => {
    const { _id } = authenticatedUser;
    const query: any = {
        $or: [{ from: _id }, { to: _id }],
    };
    const transactions = await Transaction.find(query)
        .populate("from", "name phone")
        .populate("to", "name phone")
        .sort({ createdAt: -1 })
        .lean();
    return transactions;
};

export interface IAddMoneyPayload {
    amount: number;
    note?: string;
}

const addMoneyToWallet = async (
    payload: IAddMoneyPayload,
    authenticatedUser: IAuthUser
) => {
    const { amount, note } = payload;

    if (
        amount === undefined ||
        amount === null ||
        isNaN(amount) ||
        typeof amount !== "number" ||
        amount <= 0
    ) {
        throw new AppError(httpStatus.BAD_REQUEST, "Amount is required and must be a positive number");
    }
    if (amount <= 0) {
        throw new AppError(httpStatus.BAD_REQUEST, "Amount must be greater than 0");
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const wallet = await Wallet.findOne({ user: authenticatedUser._id }).session(session);
        if (!wallet) {
            throw new AppError(httpStatus.NOT_FOUND, "Wallet not found");
        }

        if (wallet.isBlocked) {
            throw new AppError(httpStatus.FORBIDDEN, "Your wallet is blocked");
        }

        wallet.balance += amount;
        await wallet.save({ session });

        const autoNote = `You added ৳${amount}`;

        await Transaction.create(
            [
                {
                    type: "add-money",
                    amount,
                    to: authenticatedUser._id,
                    note: note?.trim() || autoNote,
                },
            ],
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return {
            message: `৳${amount} added to your wallet successfully.`,
            currentBalance: wallet.balance,
        };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};


const withdrawToAgent = async (
    payload: IWithdrawToAgentPayload,
    authenticatedUser: IAuthUser
) => {
    const { agentPhone, amount, note } = payload;

    if (amount <= 0) {
        throw new AppError(httpStatus.BAD_REQUEST, "Amount must be greater than 0");
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const senderWallet = await Wallet.findOne({ user: authenticatedUser._id }).session(session);
        if (!senderWallet) {
            throw new AppError(httpStatus.NOT_FOUND, "Your wallet not found");
        }
        if (senderWallet.isBlocked) {
            throw new AppError(httpStatus.FORBIDDEN, "Your wallet is blocked");
        }
        if (senderWallet.balance < amount) {
            throw new AppError(httpStatus.BAD_REQUEST, "Insufficient balance");
        }
        const agent = await User.findOne({ phone: agentPhone, role: "agent" }).session(session);
        if (!agent) {
            throw new AppError(httpStatus.NOT_FOUND, "Agent not found with this phone number");
        }
        if (agent.approvalStatus !== "approved") {
            throw new AppError(httpStatus.BAD_REQUEST, "Agent is not approved yet");
        }
        const agentWallet = await Wallet.findOne({ user: agent._id }).session(session);
        if (!agentWallet || agentWallet.isBlocked) {
            throw new AppError(httpStatus.BAD_REQUEST, "Agent's wallet is blocked or missing");
        }
        senderWallet.balance -= amount;
        agentWallet.balance += amount;
        await senderWallet.save({ session });
        await agentWallet.save({ session });
        const autoNote = `Withdraw ৳${amount} to Agent ${agent.phone}`;
        await Transaction.create(
            [
                {
                    type: "cash_out",
                    amount,
                    from: authenticatedUser._id,
                    to: agent._id,
                    note: note?.trim() || autoNote,
                },
            ],
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return {
            message: `৳${amount} withdrawn to Agent (${agent.phone}) successfully.`,
            currentBalance: senderWallet.balance,
        };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};


export const WalletService = {
    getWallet,
    SendMoney,
    getMyTransactions,
    addMoneyToWallet,
    withdrawToAgent,
};
