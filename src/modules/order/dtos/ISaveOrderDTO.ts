import User from "@modules/users/typeorm/entities/User"

interface IProductforOrder {
    product_id: string
    price: number
    quantity: number
}

export default interface ISaveOrder {
    id?: string
    customer: User
    products: IProductforOrder[]
}
