import { IAddMoneyPayload } from "../wallet/wallet.service";

export interface IAgentCashOutPayload {
    receiverPhone: string;
    amount: number;
    note?: string;
}

export interface IAgentCashInPayload extends IAddMoneyPayload {
    receiverPhone: string;
}