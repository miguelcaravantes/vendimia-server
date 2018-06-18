import { Item } from "../../domain/entities/item";
import { injectable } from "inversify";
import { ItemModel } from "../models/item.model";
import { ItemRepository } from "../../domain/contracts/repositories/item-repository";

@injectable()
export class MongoItemRepository implements ItemRepository {

    getList(): Promise<Item[]> {
        return ItemModel.find().exec();
    }

    get(id: string): Promise<Item> {
        return ItemModel.findById(id).exec();
    }

    create(item: Item): Promise<void> {
        return ItemModel.create(item).then(() => null);
    }

    update(item: Item): Promise<void> {
        return ItemModel.findByIdAndUpdate(item.id, item).then(() => null);
    }

    delete(id: string): Promise<void> {
        return ItemModel.findByIdAndRemove(id).then(() => null);
    }

    nextCode(): Promise<number> {
        return ItemModel.find().sort('-code').limit(1).then(i =>
            (i[0] ? i[0].code : 0) + 1
        );
    }
}
