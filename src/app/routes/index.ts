import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route"
export const router = Router()

const apiRoutes = [
    {
        path: "/auth",
        route: UserRoutes
    },
]

apiRoutes.forEach((route) => {
    router.use(route.path, route.route)
})


