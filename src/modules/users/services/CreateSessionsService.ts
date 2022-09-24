import AppError from "@shared/errors/AppError"

import UsersRepository from "../typeorm/repositories/implementations/UsersRepository"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import authConfig from "@config/auth"

interface IRequest {
    email: string
    password: string
}
interface IResponse {
    user: {
        name: string
        email: string
    }
    token: string
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

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        })

        return {
            user: {
                name: user.name,
                email: user.email,
            },
            token,
        }
    }
}

export { CreateSessionsService }
