import { Product } from "../typeorm/entities/Product"
import { ProductRepository } from "../typeorm/repositories/implementation/ProductRepository"

class ListProductsService {
    async execute(): Promise<Product[]> {
        const productsRepository = new ProductRepository()

        return await productsRepository.findProducts()
    }
}

export { ListProductsService }
