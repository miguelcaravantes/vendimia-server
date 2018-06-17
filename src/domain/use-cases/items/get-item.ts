import { injectable } from "inversify";
import { Item } from "../../entities/item";
import { ItemRepository } from "../../contracts/repositories/item-repository";
import { Query } from "../../core/query";
import { AsyncQueryHandler } from "../../core/query-handler";
import { handle } from "../../core/handler-decorator";

export class GetItemQuery extends Query<number> {
    constructor(public id: string) {
        super();
    }
}

@injectable()
@handle(GetItemQuery)
export class GetItem implements AsyncQueryHandler<GetItemQuery, Item> {

    constructor(private itemRepository: ItemRepository) {
    }

    handle(request: GetItemQuery): Promise<Item> {
        return this.itemRepository.get(request.id);
    }

}

