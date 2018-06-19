import { injectable } from "inversify";
import { Sale } from "../../entities/sale";
import { SaleRepository } from "../../contracts/repositories/sale-repository";
import { handle } from "../../core/handler-decorator";
import { Query } from "../../core/query";
import { AsyncQueryHandler } from "../../core/query-handler";
import { ItemRepository } from "../../contracts/repositories/item-repository";
import { ConfigurationRepository } from "../../contracts/repositories/configuration-repository";
import { Item } from "../../entities/item";
import { SaleCalculator } from "../../services/sale-calculator";

export class CalculateSaleQuery extends Query<any> {
    details: Array<{
        itemId: string,
        quantity: number,
    }>;

}


export class CalculateSaleResponse {
    details: Array<{
        itemId: string,
        quantity: number,
        price: number,
        amount: number
    }>;
    downPayment: number;
    downPaymentBonus: number;
    total: number;

    monthlyPayments: Array<{
        numberOfMonths: number,
        monthlyPayment: number,
        total: number,
        saving: number
    }>;
}

@injectable()
@handle(CalculateSaleQuery)
export class CalculateSale implements AsyncQueryHandler<CalculateSaleQuery, any> {

    constructor(
        private itemRepository: ItemRepository,
        private configurationRepository: ConfigurationRepository,
        private calc: SaleCalculator
    ) {
    }

    async handle(request: CalculateSaleQuery): Promise<any> {


        const itemPromises: Array<Promise<Item>> = [];
        request.details.forEach(d => {
            const itemPromise = this.itemRepository.get(d.itemId);
            itemPromises.push(itemPromise);
        });
        const configurationPromise = this.configurationRepository.get();
        const items = await Promise.all(itemPromises);
        const conf = await configurationPromise;

        const response = this.calc.calculateWithMaxDeadline(request, items, conf);
        response.monthlyPayments = this.calc.calculateMonthlyPayments(response.total, conf);
        return response;
    }

}
