import AppError from "shared/erros/AppError"
import { ProductRepository } from "../typeorm/repositories/implementation/ProductRepository"

interface IRequest {
    id: string
}
class DeleteProductService {
    async execute({ id }: IRequest): Promise<void> {
        const productsRepository = new ProductRepository()

        const product = await productsRepository.findById(id)

        if (!product) {
            throw new AppError("Product not found")
        }

        await productsRepository.delete(id)
    }
}

export { DeleteProductService }
