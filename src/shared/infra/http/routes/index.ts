import { Router } from "express"
import productRoutes from "@modules/products/routes/products.routes"
import sessionsRoutes from "@modules/users/routes/session.routes"
import usersRoutes from "@modules/users/routes/users.routes"

const routes = Router()

routes.use("/products", productRoutes)
routes.use("/users", usersRoutes)
routes.use("/session", sessionsRoutes)

export default routes
