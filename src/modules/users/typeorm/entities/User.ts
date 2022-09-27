import Order from "@modules/order/typeorm/entities/Order"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm"
import { v4 as uuidV4 } from "uuid"
import { Exclude, Expose } from "class-transformer"

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
    @Exclude()
    password: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => Order, order => order.customer)
    orders: Order[]

    @Expose({ name: "avatar_url" })
    getAvatarUrl(): string | null {
        if (!this.avatar) {
            return null
        }
        return `${process.env.APP_API_URL}/files/${this.avatar}`
    }

    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }
}

export default User
