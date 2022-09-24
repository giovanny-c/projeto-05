import AppError from "@shared/errors/AppError"
import User from "../typeorm/entities/User"
import UsersRepository from "../typeorm/repositories/implementations/UsersRepository"

interface IRequest {
    id: string
}

class ShowProfileService {
    async execute({ id }: IRequest): Promise<User> {
        const usersRepository = new UsersRepository()

        const user = await usersRepository.findById(id)

        if (!user) {
            throw new AppError("User not found")
        }

        return user
    }
}

export { ShowProfileService }
