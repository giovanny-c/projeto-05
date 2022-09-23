import AppError from "shared/errors/AppError"
import { Product } from "../typeorm/entities/Product"
import { ProductRepository } from "../typeorm/repositories/implementation/ProductRepository"

interface IRequest {
    id: string
    name: string
    price: number
    quantity: number
}
class UpdateProductService {
    async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
        const productsRepository = new ProductRepository()

        const product = await productsRepository.findById(id)

        if (!product) {
            throw new AppError("Product not found", 400)
        }

        const productExists = await productsRepository.findByName(
            name as string,
        )

        if (productExists && name !== product.name) {
            throw new AppError("There is already a product with this name", 400)
        }

        return await productsRepository.save({ name, price, quantity, id })
    }
}

export { UpdateProductService }
