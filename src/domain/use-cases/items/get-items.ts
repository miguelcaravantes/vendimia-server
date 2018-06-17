import { injectable } from "inversify";
import { Item } from "../../entities/item";
import { ItemRepository } from "../../contracts/repositories/item-repository";
import { AsyncQueryHandler } from "../../core/query-handler";
import { Query } from "../../core/query";
import { handle } from "../../core/handler-decorator";

export class GetItemsQuery extends Query<Item[]> {
}


@injectable()
@handle(GetItemsQuery)
export class GetItems implements AsyncQueryHandler<GetItemsQuery, Item[]> {
    constructor(private itemRepository: ItemRepository) {
    }

    handle(request: GetItemsQuery): Promise<Item[]> {
        return this.itemRepository.getList();
    }
}


