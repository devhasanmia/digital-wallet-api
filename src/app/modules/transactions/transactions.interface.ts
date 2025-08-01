import { Types } from "mongoose";

export type TTransactionType = "send_money" | "withdraw" | "cash_in" | "cash_out" | "add-money";
export type TTransactionStatus = "success" | "failed" | "reversed";

export interface ITransaction {
    type: TTransactionType;
    amount: number;
    from?: Types.ObjectId;
    to?: Types.ObjectId;
    status?: TTransactionStatus;
    note?: string;
}
