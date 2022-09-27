import { Product } from "../typeorm/entities/Product"
import { ProductRepository } from "../typeorm/repositories/implementation/ProductRepository"
import RedisCache from "@shared/cache/RedisCache"

class ListProductsService {
    async execute(): Promise<Product[]> {
        const productsRepository = new ProductRepository()

        const redisCache = new RedisCache()

        let products = await redisCache.recover<Product[]>("api-vendas-PRODUCTS_LIST")

        if (!products) {
            products = await productsRepository.findProducts()

            await redisCache.save("api-vendas-PRODUCTS_LIST", products)
        }

        return products
    }
}

export { ListProductsService }
