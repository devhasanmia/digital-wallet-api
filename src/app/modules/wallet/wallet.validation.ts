import { z } from "zod";

const WalletSchema = z.object({
  user: z.string({ error: "User ID is required" }),
  balance: z.number({ error: "Balance must be a number" }),
  isBlocked: z.boolean({ error: "isBlocked must be a boolean" }),
});

const SendMoneyPayloadSchema = z.object({
  receiverPhone: z
    .string({ error: "Receiver phone is required" })
    .min(1, { error: "Receiver phone is required" })
    .regex(/^01\d{9}$/, { error: "Phone number must be 11 digits and start with 01" }),
  amount: z.number({ error: "Amount must be a number" }),
  note: z.string({ error: "Note Must be String" }).optional(),
});

const WithdrawToAgentPayloadSchema = z.object({
  agentPhone: z
    .string({ error: "Agent phone is required" })
    .min(1, { error: "Agent phone is required" })
    .regex(/^01\d{9}$/, { error: "Phone number must be 11 digits and start with 01" }),
  amount: z.number({ error: "Amount must be a number" }),
  note: z.string({ error: "Note is required" }).optional(),
});

const AddMoney = z.object({
  amount: z.number({ error: "Amount must be a number" }).positive(),
  note: z.string({error: "Note must be String"}).optional()
})

const CashInPayloadSchema = z.object({
  receiverPhone: z
    .string({ error: "Receiver phone is required" })
    .min(1, { error: "Receiver phone is required" })
    .regex(/^01\d{9}$/, { error: "Phone number must be 11 digits and start with 01" }),
  amount: z.number({ error: "Amount must be a number" }),
  note: z.string({ error: "Note Must be String" }).optional(),
});

const CashOutPayloadSchema = z.object({
  receiverPhone: z
    .string({ error: "Receiver phone is required" })
    .min(1, { error: "Receiver phone is required" })
    .regex(/^01\d{9}$/, { error: "Phone number must be 11 digits and start with 01" }),
  amount: z.number({ error: "Amount must be a number" }),
  note: z.string({ error: "Note Must be String" }).optional(),
});

export const WalletValidation = {
  WalletSchema,
  SendMoneyPayloadSchema,
  WithdrawToAgentPayloadSchema,
  AddMoney,
  CashInPayloadSchema,
  CashOutPayloadSchema
};


