import AppError from "../../errorHelpers/AppError";
import Transaction from "../transactions/transactions.model";
import User from "../user/user.model";
import Wallet from "../wallet/wallet.model";

const getAllUser = async () => {
  const users = await User.find({ role: "user" }).select("-password");
  if (!users.length) {
    throw new AppError(404, "No users found");
  }
  return users;
};

const userBlockToggle = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(404, "User not found");
  }
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { isBlocked: !user.isBlocked },
    { new: true }
  ).select("-password");
  await Wallet.findOneAndUpdate(
    { user: id },
    { isBlocked: !user.isBlocked })
  return updatedUser;
};

const getAllAgent = async () => {
  const agents = await User.find({ role: "agent" }).select("-password");
  if (!agents.length) {
    throw new AppError(404, "No agents found");
  }
  return agents;
};

const getAllWallets = async () => {
  const wallets = await Wallet.find().populate("user", "name phone role");
  if (!wallets.length) {
    throw new AppError(404, "No wallets found");
  }
  return wallets;
};

const toggleWalletBlock = async (walletId: string, block: boolean) => {
  const wallet = await Wallet.findById(walletId).populate(
    "user",
    "name phone role"
  );
  if (!wallet) {
    throw new AppError(404, "Wallet not found");
  }
  wallet.isBlocked = block;
  await wallet.save();
  return {
    message: `Wallet has been ${block ? "blocked" : "unblocked"} successfully`,
    wallet,
  };
};
const updateAgentStatus = async (agentId: string) => {
  // toggle between 'approved' and 'rejected
  const agent = await User.findById(agentId);
  if (!agent || agent.role !== "agent") {
    throw new AppError(404, "Agent not found");
  }
  agent.approvalStatus =
    agent.approvalStatus === "approved" ? "rejected" : "approved";
  await agent.save();
  return {
    message: `Agent has been ${agent.approvalStatus}`,
    agent
  }
};


const getAllTransactions = async () => {
  const transactions = await Transaction.find().populate(
    "from to",
    "name phone"
  );
  if (!transactions.length) {
    throw new AppError(404, "No transactions found");
  }
  return transactions;
};

export const AdminServices = {
  getAllUser,
  getAllAgent,
  getAllWallets,
  getAllTransactions,
  toggleWalletBlock,
  updateAgentStatus,
  userBlockToggle
};
