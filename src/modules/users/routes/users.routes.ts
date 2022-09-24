import { Router } from "express"
import { celebrate, Joi, Segments } from "celebrate" // @types/joi tbm
import UsersController from "../controllers/UsersController"
import isAuthenticated from "../../../shared/infra/http/middlewares/isAuthenticated"
import multer from "multer"
import uploadConfig from "@config/upload"
import UsersAvatarController from "../controllers/UserAvatarController"

const upload = multer(uploadConfig)

const usersRoutes = Router()

const usersController = new UsersController()
const usersAvatarController = new UsersAvatarController()

usersRoutes.get("/", isAuthenticated, usersController.index)

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

usersRoutes.patch("/avatar", isAuthenticated, upload.single("avatar"), usersAvatarController.update)

export default usersRoutes
