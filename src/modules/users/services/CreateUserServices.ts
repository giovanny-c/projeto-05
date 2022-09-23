import { hash } from "bcryptjs"
import AppError from "shared/errors/AppError"
import User from "../typeorm/entities/User"
import UsersRepository from "../typeorm/repositories/implementations/UsersRepository"

interface IRequest {
    name: string
    email: string
    password: string
}

class CreateUserService {
    async execute({ name, email, password }: IRequest): Promise<User> {
        const usersRepository = new UsersRepository()

        const UserExists = await usersRepository.findByEmail(email)

        if (UserExists) {
            throw new AppError("There is already a User with this email", 400)
        }

        const hashPass = await hash(password, 8)

        return await usersRepository.save({ name, email, password: hashPass })
    }
}

export { CreateUserService }
