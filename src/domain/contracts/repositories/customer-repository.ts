import { Customer } from "../../entities/customer";

export abstract class CustomerRepository {
    abstract getList(): Promise<Customer[]>;
    abstract get(id: string): Promise<Customer>;
    abstract create(customer: Customer): Promise<void>;
    abstract update(customer: Customer): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract nextCode(): Promise<number>;
}
