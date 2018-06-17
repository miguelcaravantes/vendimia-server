import { injectable } from "inversify";
import { Customer } from "../../entities/customer";
import { CustomerRepository } from "../../contracts/repositories/customer-repository";
import { AsyncCommandHandler } from "../../core/command-handler";
import { Command } from "../../core/command";
import { handle } from "../../core/handler-decorator";

export class CreateCustomerCommand extends Command {
    id: string;
    firstName: string;
    lastName: string;
    mothersLastName: string;
    rfc: string;
}

@injectable()
@handle(CreateCustomerCommand)
export class CreateCustomer implements AsyncCommandHandler<CreateCustomerCommand> {

    constructor(private customerRepository: CustomerRepository) {
    }

    async handle(request: CreateCustomerCommand): Promise<void> {
        const newCode = await this.customerRepository.nextCode();
        const customer = new Customer(newCode);
        Object.assign(customer, request);
        await this.customerRepository.create(customer);
    }

}
