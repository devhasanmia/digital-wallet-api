import { Router } from "express"
import { AuthRoutes } from "../modules/auth/auth.route"
import { UserRoutes } from "../modules/user/user.route"
import { WalletRoutes } from "../modules/wallet/wallet.route"
import { TransactionRoutes } from "../modules/transactions/transactions.route"
import { AgentRoutes } from "../modules/agent/agent.route"
import { AdminRoutes } from "../modules/admin/admin.route"
export const router = Router()

const apiRoutes = [
    {
        path: "/auth",
        route: AuthRoutes
    },
    
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/wallet",
        route: WalletRoutes
    },
    {
        path: "/transactions",
        route: TransactionRoutes
    },
    {
        path: "/agent",
        route: AgentRoutes
    },
    {
        path: "/admin",
        route: AdminRoutes
    }
]

apiRoutes.forEach((route) => {
    router.use(route.path, route.route)
})


