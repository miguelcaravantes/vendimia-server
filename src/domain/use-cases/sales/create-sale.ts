import { injectable } from "inversify";
import { Sale } from "../../entities/sale";
import { SaleRepository } from "../../contracts/repositories/sale-repository";
import { AsyncCommandHandler } from "../../core/command-handler";
import { Command } from "../../core/command";
import { handle } from "../../core/handler-decorator";

export class CreateSaleCommand extends Command {
    id: string;
    firstName: string;
    lastName: string;
    mothersLastName: string;
    rfc: string;
}

@injectable()
@handle(CreateSaleCommand)
export class CreateSale implements AsyncCommandHandler<CreateSaleCommand> {

    constructor(private saleRepository: SaleRepository) {
    }

    async handle(request: CreateSaleCommand): Promise<void> {
        const newCode = await this.saleRepository.nextCode();
        const sale = new Sale(newCode);
        Object.assign(sale, request);
        await this.saleRepository.create(sale);
    }

}

