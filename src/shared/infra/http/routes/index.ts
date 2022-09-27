import { Router } from "express"
import productRoutes from "@modules/products/routes/products.routes"
import sessionsRoutes from "@modules/users/routes/session.routes"
import usersRoutes from "@modules/users/routes/users.routes"
import profileRoutes from "@modules/users/routes/profile.routes"
import ordersRoutes from "@modules/order/routes/orders.routes"

const routes = Router()

routes.use("/products", productRoutes)
routes.use("/users", usersRoutes)
routes.use("/session", sessionsRoutes)
routes.use("/profile", profileRoutes)
routes.use("/orders", ordersRoutes)

export default routes
