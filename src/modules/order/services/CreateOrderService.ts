import { ProductRepository } from "@modules/products/typeorm/repositories/implementation/ProductRepository"
import UsersRepository from "@modules/users/typeorm/repositories/implementations/UsersRepository"
import AppError from "@shared/errors/AppError"
import Order from "../typeorm/entities/Order"
import { OrderRepository } from "../typeorm/repositories/implementations/OrderRepository"

interface IProductforOrder {
    id: string
    quantity: number
}

interface IRequest {
    id?: string
    customer_id: string
    products: IProductforOrder[]
}

class SaveOrderService {
    async execute({ id, customer_id, products }: IRequest): Promise<Order> {
        const ordersRepository = new OrderRepository()
        const usersRepository = new UsersRepository()
        const productsRepository = new ProductRepository()

        //costumer validations
        const customerExists = await usersRepository.findById(customer_id)

        if (!customerExists) {
            throw new AppError("Customer not find!", 400)
        }

        //products validations
        const foundProducts = await productsRepository.findAllByIds(products)

        if (!foundProducts.length) {
            throw new AppError("Could not find any products", 400)
        }

        //se algum produto nao foi encontrado
        const existingProductsIds = foundProducts.map(product => product.id)

        const checkUnexistentProducts = products.filter(
            product => !existingProductsIds.includes(product.id), // pega todos os ids que nao estao em existingProductsIds
        )

        if (checkUnexistentProducts.length) {
            throw new AppError(`Could not find product ${checkUnexistentProducts[0].id}`, 400)
        }

        //se tem quantidade suficente disponivel dos produtos selecionados para a compra

        const quantityAvailable = products.filter(product => foundProducts.filter(p => p.id === product.id)[0].quantity < product.quantity)
        //filtra onde o produto tem o mesmo id que um produtoExistente
        //se tem
        //filtra se o produto existente tem quantidade suficiente disponivel menor do que o da compra
        //se tem retorna esse produto

        if (quantityAvailable.length) {
            throw new AppError(`We do not have ${quantityAvailable[0].quantity} of this product: ${quantityAvailable[0].id}, available at the moment`, 400)
        }

        //monta o array de obj de products para fazer a order
        const serializedProducts = products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            price: foundProducts.filter(p => p.id === product.id)[0].price,
        }))

        const order = await ordersRepository.save({
            id,
            customer: customerExists,
            products: serializedProducts,
        })

        //deduzir a quantidade de produtos comprados da order no banco

        const { order_products } = order
        //array de obj com cada produto que pertence a essa order

        const updatedProductQuantity = order_products.map(product => ({
            id: product.product_id,
            quantity: foundProducts.filter(p => p.id === product.id)[0].quantity - product.quantity,
        }))
        //pega o id desses produtos
        //e a quantidade atual deles - (menos) a quantidade que foi pedida na order
        //e poe num array

        //att os produtos
        await productsRepository.save(updatedProductQuantity)

        return order
    }
}

export { SaveOrderService }
