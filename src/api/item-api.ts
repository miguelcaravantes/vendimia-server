import { Item } from "../domain/entities/item";
import { container } from '../inversify.config';
import { UpdateItem } from "../domain/use-cases/items/update-item";
import { RootApi } from "./root-api";
import { GetItemsQuery } from "../domain/use-cases/items/get-items";
import { CreateItemCommand } from "../domain/use-cases/items/create-item";
import { v4 as uuid } from 'uuid';
import { DeleteItemCommand } from "../domain/use-cases/items/delete-item";
import { GetItemNextCodeQuery } from "../domain/use-cases/items/get-item-next-code";
import { GetItemQuery } from "../domain/use-cases/items/get-item";

export class ItemApi extends RootApi {
    items(): Promise<Item[]> {
        return this.executor.handle(new GetItemsQuery());
    }
    item({ id }: { id: string }): Promise<Item> {
        const query = new GetItemQuery(id);
        return this.executor.handle(query);
    }
    createItem({ item }: any): Promise<string> {
        const command = new CreateItemCommand();
        Object.assign(command, { id: uuid(), ...item });
        return this.executor.handle(command).then(() => command.id);
    }
    updateItem({ id, item }: any): Promise<void> {
        const updateItem = container.get(UpdateItem);
        item.id = id;
        return updateItem.handle(item);
    }
    deleteItem({ id }: { id: string }): Promise<void> {
        const command = new DeleteItemCommand(id);
        return this.executor.handle(command);
    }
    itemNextCode(): Promise<number> {
        const query = new GetItemNextCodeQuery();
        return this.executor.handle(query);
    }
}
