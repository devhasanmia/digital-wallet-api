
type Role = 'user' | 'agent' | 'admin';

type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface IUser {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: Role;
    picture?: string;
    approvalStatus?: ApprovalStatus;
    isBlocked: boolean;
}
