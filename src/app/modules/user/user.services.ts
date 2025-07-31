import User from "./user.model";
export interface IAuthUser {
    _id: string
    email: string
    phone: string
    role: string
    iat: number
    exp: number
}

const profile = async (authenticatedUser: IAuthUser) => {
    try {
        const result = User.findById(authenticatedUser._id).select('-password')

        return result
    } catch (error) {
        throw error;
    }
};

export const UserServices = {
    profile
}
