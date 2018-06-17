import { container } from "./inversify.config";
import { Executor } from "./domain/core/executor";
import { GetCustomers, GetCustomersQuery } from "./domain/use-cases/customers/get-customers";
import { GetCustomer, GetCustomerQuery } from "./domain/use-cases/customers/get-customer";
import { CreateCustomer, CreateCustomerCommand } from "./domain/use-cases/customers/create-customer";
import { UpdateCustomer, UpdateCustomerCommand } from "./domain/use-cases/customers/update-customer";
import { DeleteCustomer, DeleteCustomerCommand } from "./domain/use-cases/customers/delete-customer";
import { GetCustomerNextCode, GetCustomerNextCodeQuery } from "./domain/use-cases/customers/get-customer-next-code";

export function configureHandlers() {
    const executor = container.get(Executor);
    executor.addHandler(GetCustomersQuery, GetCustomers);
    executor.addHandler(GetCustomerQuery, GetCustomer);
    executor.addHandler(GetCustomerNextCodeQuery, GetCustomerNextCode);
    executor.addHandler(CreateCustomerCommand, CreateCustomer);
    executor.addHandler(UpdateCustomerCommand, UpdateCustomer);
    executor.addHandler(DeleteCustomerCommand, DeleteCustomer);
}
