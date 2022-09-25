import AppError from "@shared/errors/AppError"
import Order from "../typeorm/entities/Order"
import { OrderRepository } from "../typeorm/repositories/implementations/OrderRepository"

interface IRequest {
    id: string
}

class ShowOrderService {
    async execute({ id }: IRequest): Promise<Order> {
        const ordersRepository = new OrderRepository()

        const order = await ordersRepository.findById(id)

        if (!order) {
            throw new AppError("Order not found", 400)
        }

        return order
    }
}

export { ShowOrderService }
