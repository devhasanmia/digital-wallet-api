import User from "../modules/user/user.model";

export const seedSuperAdmin = async () => {
    try {

        const adminPaylod = {
            name: "MD. HASAN MIA",
            email: "hasanmiaweb@gmail.com"
        }



        const isSuperAdminExist = await User.findOne({ email: config.superAdmin.email });
        if (isSuperAdminExist) {
            return
        }
        const authProvider: IAuthProvider = {
            provider: "credentials",
            providerid: config.superAdmin.email
        }
    const hashPassword = await bcrypt.hash(config.superAdmin.password as string, config.bcrypt.salt_rounds);
      
        const payload: IUser = {
            name: config.superAdmin.name,
            email: config.superAdmin.email,
            password: hashPassword,
            isActive: IsActive.ACTIVE,
            isVerified: true,
            role: Role.SUPER_ADMIN,
            auths: [authProvider],
        }
        const superAdmin = await User.create(payload)
        console.log("Super Admin Created Successfull");
        console.log(superAdmin)

    } catch (error) {
        console.log(error)
    }
}