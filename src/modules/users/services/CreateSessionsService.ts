import AppError from "shared/errors/AppError"
import User from "../typeorm/entities/User"
import UsersRepository from "../typeorm/repositories/implementations/UsersRepository"
import { compare } from "bcryptjs"

interface IRequest {
    email: string
    password: string
}
interface IResponse {
    user: User
}
class CreateSessionsService {
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const usersRepository = new UsersRepository()

        const user = await usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError("Incorrect email or password", 401)
        }

        const comparePass = await compare(password, user.password)

        if (!comparePass) {
            throw new AppError("Incorrect email or password", 401)
        }

        return { user }
    }
}

export { CreateSessionsService }
