import ISaveOrder from "@modules/order/dtos/ISaveOrderDTO"
import { dataSource } from "@shared/infra/typeorm"
import { Repository } from "typeorm"
import Order from "../../entities/Order"
import IOrderRepository from "../IOrderRepository"

class OrderRepository implements IOrderRepository {
    private repository: Repository<Order>

    constructor() {
        this.repository = dataSource.getRepository(Order)
    }

    async save({ customer, products, id }: ISaveOrder): Promise<Order> {
        const order = this.repository.create({
            id,
            customer,
            order_products: products, // é um array
        })

        //quando salvar vai salvar na order_products tbm
        return await this.repository.save(order)
    }
    async findById(id: string): Promise<Order> {
        return (await this.repository.findOne({
            relations: {
                order_products: true,
                customer: true,
            },
            where: { id },
        })) as Order
    }

    async find(): Promise<Order[]> {
        throw new Error("Method not implemented.")
    }
    async findByCustomerId(customer_id: string): Promise<Order[]> {
        return await this.repository.find({
            relations: {
                customer: true,
                order_products: true,
            },
            where: { customer_id },
        })
    }
}

export { OrderRepository }
