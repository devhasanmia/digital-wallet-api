import { IAuthUser } from "../../interfaces/auth.interface";
import User from "./user.model";
import bcrypt from "bcrypt";

const profile = async (authenticatedUser: IAuthUser) => {
    try {
        const result = User.findById(authenticatedUser._id).select('-password')
        return result
    } catch (error) {
        throw error;
    }
};

const updateProfile = async (
    authenticatedUser: IAuthUser,
    updateData: any
) => {
    try {
        if (updateData.password && updateData.password.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(updateData.password, salt);
            updateData.password = hashedPassword;
        } else {
            delete updateData.password;
        }
        const result = await User.findByIdAndUpdate(
            authenticatedUser._id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select("-password");
        if (!result) {
            throw new Error("User not found");
        }
        return result;
    } catch (error) {
        throw error;
    }
};

export const UserServices = {
    profile,
    updateProfile
}
