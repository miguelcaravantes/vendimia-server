import { RootApi } from './root-api';
import { CalculateSaleQuery, CalculateSaleResponse } from '../domain/use-cases/sales/calculate-sale';
import { CreateSaleCommand } from '../domain/use-cases/sales/create-sale';
import { v4 as uuid } from 'uuid';
import { Sale } from '../domain/entities/sale';
import { GetSalesQuery } from '../domain/use-cases/sales/get-sales';
import { GetSaleNextCodeQuery } from '../domain/use-cases/sales/get-sale-next-code';

export class SaleApi extends RootApi {
    sales(): Promise<Sale[]> {
        return this.executor.handle(new GetSalesQuery());
    }

    calculateSale({ sale }): Promise<CalculateSaleResponse> {
        const query = new CalculateSaleQuery();
        Object.assign(query, sale)
        return this.executor.handle(query);
    }
    createSale({ sale }: any): Promise<string> {
        const command = new CreateSaleCommand();
        Object.assign(command, { id: uuid(), ...sale });
        return this.executor.handle(command).then(() => command.id);
    }

    saleNextCode(): Promise<number> {
        const query = new GetSaleNextCodeQuery();
        return this.executor.handle(query);
    }
}
