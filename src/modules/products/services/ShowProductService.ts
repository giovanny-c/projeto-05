import RedisCache from "@shared/cache/RedisCache"
import AppError from "@shared/errors/AppError"
import { Product } from "../typeorm/entities/Product"
import { ProductRepository } from "../typeorm/repositories/implementation/ProductRepository"

interface IRequest {
    id: string
}
class ShowProductService {
    async execute({ id }: IRequest): Promise<Product> {
        const productsRepository = new ProductRepository()

        const redisCache = new RedisCache()

        let product
        //PROCURAR em products ou criar uma chave só para um product

        const products = await redisCache.recover<Product[]>("api-vendas-PRODUCTS_LIST")

        if (products) {
            product = products.find(p => p.id === id)
        }

        if (!product) {
            product = await productsRepository.findById(id)

            if (!product) {
                throw new AppError("Product not found", 400)
            }
        }

        return product
    }
}

export { ShowProductService }
