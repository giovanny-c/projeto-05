import { Request, Response } from "express"
import { ShowProfileService } from "../services/ShowProfileService"
import { UpdateProfileService } from "../services/UpdateProfileService"
import { instanceToInstance } from "class-transformer"
export default class ProfileController {
    async show(req: Request, res: Response): Promise<Response> {
        const showProfile = new ShowProfileService()

        const { id } = req.user

        const user = await showProfile.execute({ id })

        return res.json(instanceToInstance(user))
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { name, email, new_password, old_password } = req.body
        const { id } = req.user

        const updateProfile = new UpdateProfileService()

        const user = await updateProfile.execute({ id, name, email, new_password, old_password })

        return res.json(user)
    }
}
