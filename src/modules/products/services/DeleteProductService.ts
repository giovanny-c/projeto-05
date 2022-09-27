import RedisCache from "@shared/cache/RedisCache"
import AppError from "@shared/errors/AppError"
import { ProductRepository } from "../typeorm/repositories/implementation/ProductRepository"

interface IRequest {
    id: string
}
class DeleteProductService {
    async execute({ id }: IRequest): Promise<void> {
        const productsRepository = new ProductRepository()
        const redisCache = new RedisCache()

        const product = await productsRepository.findById(id)

        if (!product) {
            throw new AppError("Product not found")
        }

        await redisCache.invalidate("api-vendas-PRODUCTS_LIST")

        await productsRepository.delete(id)
    }
}

export { DeleteProductService }
