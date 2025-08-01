// src/modules/transaction/transaction.model.ts

import { Schema, model } from "mongoose";


const transactionSchema = new Schema(
    {
        type: {
            type: String,
            enum: ["send_money", "withdraw", "cash_in", "cash_out", "top_up"],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        from: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        to: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            enum: ["success", "failed", "reversed"],
            default: "success",
        },
        note: {
            type: String,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Transaction = model("Transaction", transactionSchema);
export default Transaction;
