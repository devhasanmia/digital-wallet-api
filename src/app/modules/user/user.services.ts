import { IAuthUser } from "../../interfaces/auth.interface";
import User from "./user.model";


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
