import { model, Schema } from "mongoose";
import { IWallet } from "./wallet.interface";

const walletSchema = new Schema<IWallet>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

const Wallet = model<IWallet>("Wallet", walletSchema);