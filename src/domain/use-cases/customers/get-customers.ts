import { injectable } from "inversify";
import { Customer } from "../../entities/customer";
import { CustomerRepository } from "../../contracts/repositories/customer-repository";
import { AsyncQueryHandler } from "../../core/query-handler";
import { Query } from "../../core/query";
import { handle } from "../../core/handler-decorator";

export class GetCustomersQuery extends Query<Customer[]> {
}


@injectable()
@handle(GetCustomersQuery)
export class GetCustomers implements AsyncQueryHandler<GetCustomersQuery, Customer[]> {
    constructor(private customerRepository: CustomerRepository) {
    }

    handle(request: GetCustomersQuery): Promise<Customer[]> {
        return this.customerRepository.getList();
    }
}


