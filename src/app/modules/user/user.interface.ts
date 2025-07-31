import { Types } from "mongoose";

type Role = 'user' | 'agent' | 'admin';

type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface IUser {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: Role;
    // wallet: Types.ObjectId
    approvalStatus?: ApprovalStatus;
    isBlocked: boolean;
}
