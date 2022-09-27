import RedisCache from "@shared/cache/RedisCache"
import AppError from "@shared/errors/AppError"
import { Product } from "../typeorm/entities/Product"
import { ProductRepository } from "../typeorm/repositories/implementation/ProductRepository"

interface IRequest {
    name: string
    price: number
    quantity: number
}

class CreateProductService {
    async execute({ name, price, quantity }: IRequest): Promise<Product> {
        const productsRepository = new ProductRepository()

        const redisCache = new RedisCache()

        const productExists = await productsRepository.findByName(name)

        if (productExists) {
            throw new AppError("There is already a product with this name")
        }

        await redisCache.invalidate("api-vendas-PRODUCTS_LIST")

        return await productsRepository.save({ name, price, quantity })
    }
}

export { CreateProductService }
