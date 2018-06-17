import { Customer } from "../domain/entities/customer";
import { container } from '../inversify.config';
import { UpdateCustomer } from "../domain/use-cases/customers/update-customer";
import { RootApi } from "./root-api";
import { GetCustomersQuery } from "../domain/use-cases/customers/get-customers";
import { CreateCustomerCommand } from "../domain/use-cases/customers/create-customer";
import { v4 as uuid } from 'uuid';
import { DeleteCustomerCommand } from "../domain/use-cases/customers/delete-customer";
import { GetCustomerNextCodeQuery } from "../domain/use-cases/customers/get-customer-next-code";
import { GetCustomerQuery } from "../domain/use-cases/customers/get-customer";

export class CustomerApi extends RootApi {
    customers(): Promise<Customer[]> {
        return this.executor.handle(new GetCustomersQuery());
    }
    customer({ id }: { id: string }): Promise<Customer> {
        const query = new GetCustomerQuery(id);
        return this.executor.handle(query);
    }
    createCustomer({ customer }: any): Promise<string> {
        const command = new CreateCustomerCommand();
        Object.assign(command, { id: uuid(), ...customer });
        return this.executor.handle(command).then(() => command.id);
    }
    updateCustomer({ id, customer }: any): Promise<void> {
        const updateCustomer = container.get(UpdateCustomer);
        customer.id = id;
        return updateCustomer.handle(customer);
    }
    deleteCustomer({ id }: { id: string }): Promise<void> {
        const command = new DeleteCustomerCommand(id);
        return this.executor.handle(command);
    }
    customerNextCode(): Promise<number> {
        const query = new GetCustomerNextCodeQuery();
        return this.executor.handle(query);
    }
}
