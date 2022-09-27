import { Router } from "express"
import ProductsController from "../controllers/ProductsController"
import { celebrate, Joi, Segments } from "celebrate" // @types/joi tbm
const productRoutes = Router()

const productsController = new ProductsController()

productRoutes.get("/", productsController.index)

productRoutes.post(
    "/create",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required(),
        },
    }),
    productsController.create,
)

productRoutes.get(
    "/:id",
    celebrate({
        //middleware
        [Segments.PARAMS]: {
            // do req.params
            id: Joi.string().uuid().required(), // id do tipo string(uuid), obrigatorio
        },
    }),
    productsController.show,
)

productRoutes.put(
    "/:id/update",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required(),
        },
    }),
    productsController.update,
)

productRoutes.delete(
    "/:id/delete",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    productsController.delete,
)

export default productRoutes
