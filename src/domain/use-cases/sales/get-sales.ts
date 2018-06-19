import { injectable } from "inversify";
import { Sale } from "../../entities/sale";
import { SaleRepository } from "../../contracts/repositories/sale-repository";
import { AsyncQueryHandler } from "../../core/query-handler";
import { Query } from "../../core/query";
import { handle } from "../../core/handler-decorator";

export class GetSalesQuery extends Query<Sale[]> {
}


@injectable()
@handle(GetSalesQuery)
export class GetSales implements AsyncQueryHandler<GetSalesQuery, Sale[]> {
    constructor(private saleRepository: SaleRepository) {
    }

    handle(request: GetSalesQuery): Promise<Sale[]> {
        return this.saleRepository.getList();
    }
}


