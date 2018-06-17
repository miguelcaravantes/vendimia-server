import { Item } from "../../entities/item";

export abstract class ItemRepository {
    abstract getList(): Promise<Item[]>;
    abstract get(id: string): Promise<Item>;
    abstract create(item: Item): Promise<void>;
    abstract update(item: Item): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract nextCode(): Promise<number>;
}
