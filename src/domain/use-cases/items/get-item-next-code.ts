import { injectable } from "inversify";
import { ItemRepository } from "../../contracts/repositories/item-repository";
import { Query } from "../../core/query";
import { AsyncQueryHandler } from "../../core/query-handler";
import { handle } from "../../core/handler-decorator";

export class GetItemNextCodeQuery extends Query<number> {
}

@injectable()
@handle(GetItemNextCodeQuery)
export class GetItemNextCode implements AsyncQueryHandler<GetItemNextCodeQuery, number> {

    constructor(private itemRepository: ItemRepository) {
    }

    handle(query: GetItemNextCodeQuery): Promise<number> {
        return this.itemRepository.nextCode();
    }

}

