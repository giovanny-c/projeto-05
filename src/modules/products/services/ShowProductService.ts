import AppError from "shared/erros/AppError"
import { Product } from "../typeorm/entities/Product"
import { ProductRepository } from "../typeorm/repositories/implementation/ProductRepository"

interface IRequest {
    id: string
}
class ShowProductsService {
    async execute({ id }: IRequest): Promise<Product> {
        const productsRepository = new ProductRepository()

        const product = await productsRepository.findById(id)

        if (!product) {
            throw new AppError("Product not found")
        }

        return product
    }
}

export { ShowProductsService }
