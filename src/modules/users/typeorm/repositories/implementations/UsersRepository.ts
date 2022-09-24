import ISaveUserDTO from "@modules/users/dtos/ISaveUserDTO"
import { dataSource } from "@shared/infra/typeorm"
import { Repository } from "typeorm"
import User from "../../entities/User"
import IUsersRepository from "../IUsersRepository"

export default class UsersRepository implements IUsersRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = dataSource.getRepository(User)
    }

    async save({ id, avatar, email, name, password }: ISaveUserDTO): Promise<User> {
        const user = this.repository.create({
            id,
            avatar,
            email,
            name,
            password,
        })

        return await this.repository.save(user)
    }

    async find(): Promise<User[]> {
        return await this.repository.find()
    }

    async findById(id: string): Promise<User> {
        return (await this.repository.findOne({
            where: { id },
        })) as User
    }

    async findByEmail(email: string): Promise<User> {
        return (await this.repository.findOne({
            where: { email },
        })) as User
    }

    async findByName(name: string): Promise<User> {
        return (await this.repository.findOne({
            where: { name },
        })) as User
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id)
    }
}
