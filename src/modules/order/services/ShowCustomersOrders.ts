import Order from "../typeorm/entities/Order"
import { OrderRepository } from "../typeorm/repositories/implementations/OrderRepository"

interface IRequest {
    customer_id: string
}

class ShowCustomersOrdersService {
    async execute({ customer_id }: IRequest): Promise<Order[]> {
        const ordersRepository = new OrderRepository()

        const orders = await ordersRepository.findByCustomerId(customer_id)

        return orders
    }
}

export { ShowCustomersOrdersService }
