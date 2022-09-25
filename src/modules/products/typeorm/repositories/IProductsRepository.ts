import IFindProducts from "@modules/products/dtos/IFindProducts"
import ISaveProduct from "@modules/products/dtos/ISaveProductDTO"
import { Product } from "../entities/Product"

interface IProductRepository {
    save(data: ISaveProduct): Promise<Product>
    findById(id: string): Promise<Product>
    findAllByIds(products: IFindProducts[]): Promise<Product[]>
    findByName(name: string): Promise<Product>
    findProducts(): Promise<Product[]>
    delete(id: string): Promise<void>
}

export { IProductRepository }
