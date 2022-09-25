import { Request, Response } from "express"
import { SaveOrderService } from "../services/CreateOrderService"
import { ShowCustomersOrdersService } from "../services/ShowCustomersOrders"
import { ShowOrderService } from "../services/ShowOrderService"

export default class OrdersController {
    async showCustomerOrders(req: Request, res: Response): Promise<Response> {
        const showCustomerOrders = new ShowCustomersOrdersService()

        const { id: customer_id } = req.user

        const orders = await showCustomerOrders.execute({ customer_id })

        return res.json(orders)
    }

    async show(req: Request, res: Response): Promise<Response> {
        const { id: order_id } = req.params

        const showOrder = new ShowOrderService()

        const order = await showOrder.execute({ id: order_id })

        return res.json(order)
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { id: customer_id } = req.user || req.body
        const { products } = req.body

        const createOrder = new SaveOrderService()

        const order = await createOrder.execute({ customer_id, products })

        return res.json(order)
    }
}
