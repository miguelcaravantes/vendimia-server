import { RootApi } from './root-api';
import { UpdateConfigurationCommand } from '../domain/use-cases/configuration/update-configuration';
import { CalculateSaleQuery, CalculateSaleResponse } from '../domain/use-cases/sales/calculate-sale';

export class SaleApi extends RootApi {

    calculateSale({ sale }): Promise<CalculateSaleResponse> {
        const query = new CalculateSaleQuery();
        Object.assign(query, sale)
        return this.executor.handle(query);
    }
    
}
