import AppError from "@shared/errors/AppError"
import User from "../typeorm/entities/User"
import UsersRepository from "../typeorm/repositories/implementations/UsersRepository"
import { compare, hash } from "bcryptjs"

interface IRequest {
    id: string
    name: string
    email: string
    old_password?: string
    new_password?: string
}

class UpdateProfileService {
    async execute({ id, email, name, new_password, old_password }: IRequest): Promise<User> {
        const usersRepository = new UsersRepository()

        const user = await usersRepository.findById(id)

        const emailExists = await usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError("User not found", 400)
        }
        if (emailExists && emailExists.id !== id) {
            throw new AppError("There is already a user with this email", 400)
        }

        //check se o email é valido

        //manda um email para o novo email
        //salva o novo email no redis esparando que o user digite a
        //confirmação de email em uma nova rota
        //nessa nova rota faz o update do email

        if (new_password && !old_password) {
            throw new AppError("You have to insert your current password to chage for a new one", 400)
        }
        if (old_password && (!new_password || new_password === "")) {
            throw new AppError("invalid new password", 400)
        }
        //como fazer para o user mandar a senha com os caracter certos
        //expressao regular com match()

        if (new_password && old_password) {
            const checkOldPass = await compare(old_password, user.password)

            if (!checkOldPass) {
                throw new AppError("old password does not match", 400)
            }

            // (/^
            // (?!.*[^a-zA-Z0-9!@#$%^&*_.-])//so pode conter esses chars
            // (?=.*\d)                     //conter 1 ou mais digitos
            // (?=.*[!@#$%^&*_.-])          //conter 1+ caracter especial
            // (?=.*[a-z])                  //conter 1+ letra minuscula
            // (?=.*[A-Z])                  //conter 1+ letra maiuscula
            // (?!.* )                      //nao pode conter o char espaço
            // .{8,64}                      //"." menos quebra de linha + de 8 a 64 chars
            // $/)
            //

            if (
                !new_password.match(
                    /^(?!.*[^a-zA-Z0-9!@#$%^&*_.-])(?=.*\d)(?=.*[!@#$%^&*_.-])(?=.*[a-z])(?=.*[A-Z]).{8,64}$/,
                )
            ) {
                throw new AppError(
                    "Your password should contain at least 1 number, 1 especial caracter, 1 lower and an uppercase chareacters, and not contain the space caracter",
                    400,
                )
            }

            user.password = await hash(new_password, 8)
        }

        if (!name || name === "" || !name.match(/^(?!.*[^a-zA-Z0-9 ._!@*"'$`´^~ªº°-]).{1,40}$/)) {
            //match só pode conter os chars listado dentro dos colchetes

            throw new AppError("Invalid user name", 40)
        }

        user.name = name
        //user.email = email // só quando tiver a rota de confirmaçao

        return await usersRepository.save(user)
    }
}

export { UpdateProfileService }
