import User from "../typeorm/entities/User"
import UsersRepository from "../typeorm/repositories/implementations/UsersRepository"

// interface IRequest {
//     name: string
//     email: string
//     password: string
// }

class ListUserService {
    async execute(): Promise<User[]> {
        const usersRepository = new UsersRepository()

        return await usersRepository.find()
    }
}

export { ListUserService }
