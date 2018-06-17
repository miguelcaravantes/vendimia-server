import { injectable } from "inversify";
import { CustomerRepository } from "../../contracts/repositories/customer-repository";
import { AsyncCommandHandler } from "../../core/command-handler";
import { Command } from "../../core/command";
import { handle } from "../../core/handler-decorator";

export class UpdateCustomerCommand extends Command {
    id: string;
    firstName: string;
    lastName: string;
    mothersLastName: string;
    rfc: string;
}

@injectable()
@handle(UpdateCustomerCommand)
export class UpdateCustomer implements AsyncCommandHandler<UpdateCustomerCommand> {

    constructor(private customerRepository: CustomerRepository) {
    }

    async handle(request: UpdateCustomerCommand): Promise<void> {
        const customer = await this.customerRepository.get(request.id);
        Object.assign(customer, request);
        await this.customerRepository.update(customer);
    }

}


