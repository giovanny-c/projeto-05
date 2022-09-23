import { Router } from "express"
import { celebrate, Joi, Segments } from "celebrate" // @types/joi tbm
import UsersController from "../controllers/UsersController"

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.get("/", usersController.index)

usersRoutes.post(
    "/create",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    usersController.create,
)

export default usersRoutes
