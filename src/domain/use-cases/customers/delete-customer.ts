import { injectable } from "inversify";
import { CustomerRepository } from "../../contracts/repositories/customer-repository";
import { AsyncCommandHandler } from "../../core/command-handler";
import { Command } from "../../core/command";
import { handle } from "../../core/handler-decorator";

export class DeleteCustomerCommand extends Command {
    constructor(public id: string) {
        super();
    }
}

@injectable()
@handle(DeleteCustomerCommand)
export class DeleteCustomer implements AsyncCommandHandler<DeleteCustomerCommand> {

    constructor(private customerRepository: CustomerRepository) {
    }

    handle(command: DeleteCustomerCommand): Promise<void> {
        return this.customerRepository.delete(command.id);
    }

}
