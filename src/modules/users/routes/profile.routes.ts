import { Router } from "express"
import { celebrate, Joi, Segments } from "celebrate" // @types/joi tbm

import isAuthenticated from "../../../shared/infra/http/middlewares/isAuthenticated"
import multer from "multer"
import uploadConfig from "@config/upload"
import ProfileController from "../controllers/ProfileController"
import UsersAvatarController from "../controllers/UserAvatarController"

const upload = multer(uploadConfig)

const profileRoutes = Router()

profileRoutes.use(isAuthenticated)

const profileController = new ProfileController()
const usersAvatarController = new UsersAvatarController()

profileRoutes.get("/", profileController.show)

profileRoutes.post(
    "/update",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            new_password: Joi.string().optional(),
            new_password_confirmation: Joi.string()
                .valid(Joi.ref("new_password")) // compara com o campo
                .when("new_password", {
                    is: Joi.exist(), // se new pass existir
                    then: Joi.required(), // entao confirmation é obrigatorio
                }),
            //e se o new_pass for preenchido
            //newpassCon é obrigatório
            //e compara o newpass com o newpassCon
        },
    }),
    profileController.update,
)

profileRoutes.patch("/avatar", upload.single("avatar"), usersAvatarController.update)

export default profileRoutes
