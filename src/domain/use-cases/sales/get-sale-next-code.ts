import { injectable } from "inversify";
import { SaleRepository } from "../../contracts/repositories/sale-repository";
import { Query } from "../../core/query";
import { AsyncQueryHandler } from "../../core/query-handler";
import { handle } from "../../core/handler-decorator";

export class GetSaleNextCodeQuery extends Query<number> {
}

@injectable()
@handle(GetSaleNextCodeQuery)
export class GetSaleNextCode implements AsyncQueryHandler<GetSaleNextCodeQuery, number> {

    constructor(private saleRepository: SaleRepository) {
    }

    handle(query: GetSaleNextCodeQuery): Promise<number> {
        return this.saleRepository.nextCode();
    }

}

