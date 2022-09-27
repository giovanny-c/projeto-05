import ISaveProduct from "@modules/products/dtos/ISaveProductDTO"
import { dataSource } from "@shared/infra/typeorm"
import { In, Repository } from "typeorm"
import { Product } from "../../entities/Product"
import { IProductRepository } from "../IProductsRepository"
import IFindProducts from "@modules/products/dtos/IFindProducts"

class ProductRepository implements IProductRepository {
    private repository: Repository<Product>

    constructor() {
        this.repository = dataSource.getRepository(Product)
    }

    async save({ id, name, price, quantity }: ISaveProduct): Promise<Product> {
        const product = this.repository.create({
            id,
            name,
            price,
            quantity,
        })

        return await this.repository.save(product)
    }

    async saveMany(products: ISaveProduct[]): Promise<Product[]> {
        return await this.repository.save(products)
    }

    async findById(id: string): Promise<Product> {
        const product = (await this.repository.findOne({
            where: { id },
        })) as Product

        return product
    }

    async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
        const productsIds = products.map(product => product.id)

        return await this.repository.find({ where: { id: In(productsIds) } })
        //acha todos os produtos com os ids passados
    }

    async findByName(name: string): Promise<Product> {
        const product = (await this.repository.findOne({
            where: { name },
        })) as Product

        return product
    }

    async findProducts(skip = 0, take = 10): Promise<Product[]> {
        return await this.repository.find({
            skip,
            take,
        })
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id)
    }
}

export { ProductRepository }
