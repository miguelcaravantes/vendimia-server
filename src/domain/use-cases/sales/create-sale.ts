import { injectable } from "inversify";
import { Sale, SaleDetail } from "../../entities/sale";
import { SaleRepository } from "../../contracts/repositories/sale-repository";
import { AsyncCommandHandler } from "../../core/command-handler";
import { Command } from "../../core/command";
import { handle } from "../../core/handler-decorator";
import { SaleCalculator } from "../../services/sale-calculator";
import { ItemRepository } from "../../contracts/repositories/item-repository";
import { ConfigurationRepository } from "../../contracts/repositories/configuration-repository";
import { Item } from "../../entities/item";

export class CreateSaleCommand extends Command {
    id: string;
    customerId: string;
    details: Array<{
        itemId: string,
        quantity: number,
    }>;
    numberOfMonths: number;
}

@injectable()
@handle(CreateSaleCommand)
export class CreateSale implements AsyncCommandHandler<CreateSaleCommand> {

    constructor(
        private saleRepository: SaleRepository,
        private itemRepository: ItemRepository,
        private configurationRepository: ConfigurationRepository,
        private calc: SaleCalculator
    ) {
    }

    async handle(request: CreateSaleCommand): Promise<void> {
        const newCode = await this.saleRepository.nextCode();

        const itemPromises: Array<Promise<Item>> = [];
        request.details.forEach(d => {
            const itemPromise = this.itemRepository.get(d.itemId);
            itemPromises.push(itemPromise);
        });
        const configurationPromise = this.configurationRepository.get();
        const items = await Promise.all(itemPromises);
        const conf = await configurationPromise;

        const maxDeadline = this.calc.calculateWithMaxDeadline(request, items, conf);
        const total = this.calc.totalPayment(maxDeadline.total, request.numberOfMonths, conf);

        const sale = new Sale(
            request.id,
            newCode,
            request.customerId,
            request.details.map(d => new SaleDetail(
                d.quantity,
                d.itemId
            )),
            request.numberOfMonths,
            total
        );
        Object.assign(sale, request);
        await this.saleRepository.create(sale);
    }

}
