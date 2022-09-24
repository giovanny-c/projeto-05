import ISaveCustomer from "@modules/costumers/dtos/ISaveCustomerDTO"
import Customer from "../entities/Customer"

export default interface ICustomerRepository {
    save(data: ISaveCustomer): Promise<Customer>
    find(): Promise<Customer[]>
    findById(id: string): Promise<Customer>
    findByEmail(email: string): Promise<Customer>
    findByName(name: string): Promise<Customer>
    delete(id: string): Promise<void>
}
