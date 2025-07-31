import { Router } from "express"
import { AuthRoutes } from "../modules/auth/auth.route"
import { UserRoutes } from "../modules/user/user.route"
export const router = Router()

const apiRoutes = [
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/user",
        route: UserRoutes
    }
]

apiRoutes.forEach((route) => {
    router.use(route.path, route.route)
})


