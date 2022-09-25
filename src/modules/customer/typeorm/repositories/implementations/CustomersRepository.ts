import ISaveCustomerDTO from "@modules/customer/dtos/ISaveCustomerDTO"
import { dataSource } from "@shared/infra/typeorm"
import { Repository } from "typeorm"
import Customer from "../../entities/Customer"
import ICustomerRepository from "../ICustomersRepository"

export default class CustomersRepository implements ICustomerRepository {
    private repository: Repository<Customer>

    constructor() {
        this.repository = dataSource.getRepository(Customer)
    }

    async save({ id, name, email }: ISaveCustomerDTO): Promise<Customer> {
        const customer = this.repository.create({
            id,
            name,
            email,
        })

        return await this.repository.save(customer)
    }
    async find(): Promise<Customer[]> {
        return await this.repository.find()
    }
    async findById(id: string): Promise<Customer> {
        return (await this.repository.findOne({ where: { id } })) as Customer
    }
    async findByEmail(email: string): Promise<Customer> {
        return (await this.repository.findOne({ where: { email } })) as Customer
    }
    async findByName(name: string): Promise<Customer> {
        return (await this.repository.findOne({ where: { name } })) as Customer
    }
    async delete(id: string): Promise<void> {
        await this.repository.delete(id)
    }
}
