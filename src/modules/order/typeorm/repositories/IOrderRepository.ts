import ISaveOrder from "@modules/order/dtos/ISaveOrderDTO"
import Order from "../entities/Order"

export default interface IOrderRepository {
    save(data: ISaveOrder): Promise<Order>
    find(): Promise<Order[]>
    findById(id: string): Promise<Order>
    findByCustomerId(customer_id: string): Promise<Order[]>
}
