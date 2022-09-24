import { Request, Response } from "express"
import UpdateUserAvatarService from "../services/UpdateUserAvatarService"

export default class UsersAvatarController {
    async update(req: Request, res: Response): Promise<Response> {
        const updateAvatar = new UpdateUserAvatarService()

        const { id } = req.user

        const { file } = req

        const user = updateAvatar.execute({
            avatarFileName: file?.filename as string,
            user_id: id,
        })

        return res.json(user)
    }
}
