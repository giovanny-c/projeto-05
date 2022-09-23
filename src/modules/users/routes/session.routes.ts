import { Router } from "express"
import { celebrate, Joi, Segments } from "celebrate" // @types/joi tbm
import SessionsController from "../controllers/SessionController"

const sessionsRoutes = Router()

const sessionsController = new SessionsController()

sessionsRoutes.post(
    "/create",
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    sessionsController.create,
)

export default sessionsRoutes
