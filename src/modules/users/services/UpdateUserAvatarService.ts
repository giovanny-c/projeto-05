import AppError from "@shared/errors/AppError"
import User from "../typeorm/entities/User"
import UsersRepository from "../typeorm/repositories/implementations/UsersRepository"
import uploadConfig from "@config/upload"
import path from "path"
import * as fs from "fs"

interface IRequest {
    user_id: string
    avatarFileName: string
}

export default class UpdateUserAvatarService {
    async execute({ avatarFileName, user_id }: IRequest): Promise<User> {
        const usersRepository = new UsersRepository()

        const user = await usersRepository.findById(user_id)

        if (!user) {
            throw new AppError("User not found")
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        return await usersRepository.save({ ...user, avatar: avatarFileName })
    }
}
