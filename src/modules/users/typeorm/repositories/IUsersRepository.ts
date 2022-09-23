import ISaveUser from "modules/users/dtos/ISaveUserDTO"
import User from "../entities/User"

export default interface IUsersRepository {
    save(data: ISaveUser): Promise<User>
    find(): Promise<User[]>
    findById(id: string): Promise<User>
    findByEmail(email: string): Promise<User>
    findByName(name: string): Promise<User>
    delete(id: string): Promise<void>
}
