import { Router } from "express"
import { celebrate, Joi, Segments } from "celebrate" // @types/joi tbm
import OrdersController from "../controller/OrderController"
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated"

const ordersRoutes = Router()

const ordersController = new OrdersController()
ordersRoutes.use(isAuthenticated)

ordersRoutes.post(
    "/create",
    celebrate({
        [Segments.BODY]: {
            customer_id: Joi.string().uuid().required(),
            products: Joi.required(),
        },
    }),

    ordersController.create,
)

ordersRoutes.get(
    "/:id",
    celebrate({
        //middleware
        [Segments.PARAMS]: {
            // do req.params
            id: Joi.string().uuid().required(), // id do tipo string(uuid), obrigatorio
        },
    }),
    ordersController.show,
)

ordersRoutes.get(
    "/customer-orders",
    celebrate({
        [Segments.BODY || Segments.COOKIES /*?*/]: {
            id: Joi.string().uuid().required(),
        },
    }),
    ordersController.showCustomerOrders,
)

export default ordersRoutes
