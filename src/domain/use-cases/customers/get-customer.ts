import { injectable } from "inversify";
import { Customer } from "../../entities/customer";
import { CustomerRepository } from "../../contracts/repositories/customer-repository";
import { Query } from "../../core/query";
import { AsyncQueryHandler } from "../../core/query-handler";
import { handle } from "../../core/handler-decorator";

export class GetCustomerQuery extends Query<number> {
    constructor(public id: string) {
        super();
    }
}

@injectable()
@handle(GetCustomerQuery)
export class GetCustomer implements AsyncQueryHandler<GetCustomerQuery, Customer> {

    constructor(private customerRepository: CustomerRepository) {
    }

    handle(request: GetCustomerQuery): Promise<Customer> {
        return this.customerRepository.get(request.id);
    }

}


