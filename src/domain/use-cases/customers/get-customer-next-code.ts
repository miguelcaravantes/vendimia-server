import { injectable } from "inversify";
import { CustomerRepository } from "../../contracts/repositories/customer-repository";
import { Query } from "../../core/query";
import { AsyncQueryHandler } from "../../core/query-handler";
import { handle } from "../../core/handler-decorator";

export class GetCustomerNextCodeQuery extends Query<number> {
}

@injectable()
@handle(GetCustomerNextCodeQuery)
export class GetCustomerNextCode implements AsyncQueryHandler<GetCustomerNextCodeQuery, number> {

    constructor(private customerRepository: CustomerRepository) {
    }

    handle(query: GetCustomerNextCodeQuery): Promise<number> {
        return this.customerRepository.nextCode();
    }

}

