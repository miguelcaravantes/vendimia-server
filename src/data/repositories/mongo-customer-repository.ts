import { Customer } from "../../domain/entities/customer";
import { injectable } from "inversify";
import { CustomerModel } from "../models/customer.model";
import { CustomerRepository } from "../../domain/contracts/repositories/customer-repository";

@injectable()
export class MongoCustomerRepository implements CustomerRepository {

    getList(): Promise<Customer[]> {
        return CustomerModel.find().exec();
    }

    get(id: string): Promise<Customer> {
        return CustomerModel.findOne({ id }).exec();
    }

    create(customer: Customer): Promise<void> {
        return CustomerModel.create(customer).then(() => null);
    }

    update(customer: Customer): Promise<void> {
        return CustomerModel.findOneAndUpdate({ id: customer.id }, customer).then(() => null);
    }

    delete(id: string): Promise<void> {
        return CustomerModel.findOneAndRemove({ id }).then(() => null);
    }

    nextCode(): Promise<number> {
        return CustomerModel.find().sort('-code').limit(1).then(c => {
            return (c[0] ? c[0].code : 0) + 1;
        }
        );
    }
}
