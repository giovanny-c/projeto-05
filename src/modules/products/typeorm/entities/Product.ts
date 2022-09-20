import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm"
import { v4 as uuidV4 } from "uuid"

@Entity("products")
class Product {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column("decimal")
    price: number

    @Column("int")
    quantity: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }
}

export { Product }
