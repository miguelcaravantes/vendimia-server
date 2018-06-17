import { injectable } from "inversify";
import { Item } from "../../entities/item";
import { ItemRepository } from "../../contracts/repositories/item-repository";
import { AsyncCommandHandler } from "../../core/command-handler";
import { Command } from "../../core/command";
import { handle } from "../../core/handler-decorator";

export class CreateItemCommand extends Command {
    id: string;
    firstName: string;
    lastName: string;
    mothersLastName: string;
    rfc: string;
}


@injectable()
@handle(CreateItemCommand)
export class CreateItem implements AsyncCommandHandler<CreateItemCommand> {

    constructor(private itemRepository: ItemRepository) {
    }

    async handle(request: CreateItemCommand): Promise<void> {
        const newCode = await this.itemRepository.nextCode();
        const item = Object.assign(new Item(newCode), request) as Item;
        await this.itemRepository.create(item);
    }

}
