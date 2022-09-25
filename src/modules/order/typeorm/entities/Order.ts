import User from "@modules/users/typeorm/entities/User"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm"
import { v4 as uuidV4 } from "uuid"
import OrdersProducts from "./OrdersProducts"

@Entity("orders")
class Order {
    @PrimaryColumn()
    id: string

    @OneToMany(() => OrdersProducts, order_products => order_products.order, { cascade: true })
    order_products: OrdersProducts[]

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column()
    customer_id: string

    @ManyToOne(() => User)
    @JoinColumn({ name: "customer_id" })
    customer: User

    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }
}

export default Order
