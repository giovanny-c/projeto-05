import ISaveProduct from "modules/products/dtos/ISaveProductDTO"
import { dataSource } from "shared/infra/typeorm"
import { Repository } from "typeorm"
import { Product } from "../../entities/Product"
import { IProductRepository } from "../IProductsRepository"

class ProductRepository implements IProductRepository {
    private repository: Repository<Product>

    constructor() {
        this.repository = dataSource.getRepository(Product)
    }

    async save({ name, price, quantity }: ISaveProduct): Promise<Product> {
        const product = await this.repository.create({
            name,
            price,
            quantity,
        })

        return await this.repository.save(product)
    }

    async findById(id: string): Promise<Product> {
        const product = (await this.repository.findOne({
            where: { id },
        })) as Product

        return product
    }

    async findByName(name: string): Promise<Product> {
        const product = (await this.repository.findOne({
            where: { name },
        })) as Product

        return product
    }

    async findProducts(): Promise<Product[]> {
        return await this.repository.find()
    }

    async delete(): Promise<void> {
        throw new Error("Method not implemented.")
    }
}

export { ProductRepository }
