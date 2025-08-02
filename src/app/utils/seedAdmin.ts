import config from "../config";
import { IUser } from "../modules/user/user.interface";
import User from "../modules/user/user.model";
import bcrypt from "bcrypt"
export const seedAdmin = async () => {
    try {
        const isSuperAdminExist = await User.findOne({ email: config.seed_admin.email });
        if (isSuperAdminExist) {
            return
        }
        const hashPassword = await bcrypt.hash(config.seed_admin.password as string, 10);
        const payload: IUser = {
            name: config.seed_admin.name,
            email: config.seed_admin.email,
            phone: config.seed_admin.phone,
            password: hashPassword,
            role: config.seed_admin.role,
            isBlocked: false
        }
        const superAdmin = await User.create(payload)
        console.log("Super Admin Created Successfull");
        console.log(superAdmin)

    } catch (error) {
        console.log(error)
    }
}