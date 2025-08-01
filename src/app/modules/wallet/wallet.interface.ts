import { Types } from "mongoose";


export interface IWallet {
    user: Types.ObjectId;
    balance: number;
    isBlocked: boolean;
}

export interface ISendMoneyPayload {
    receiverPhone: string;
    amount: number;
    note: string
}