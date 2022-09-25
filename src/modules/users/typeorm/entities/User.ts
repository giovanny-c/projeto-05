import Order from "@modules/order/typeorm/entities/Order"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm"
import { v4 as uuidV4 } from "uuid"

@Entity("users")
class User {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    avatar: string

    @Column()
    password: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => Order, order => order.customer)
    orders: Order[]

    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }
}

export default User
