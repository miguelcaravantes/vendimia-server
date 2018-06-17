import { injectable } from "inversify";
import { ItemRepository } from "../../contracts/repositories/item-repository";
import { AsyncCommandHandler } from "../../core/command-handler";
import { Command } from "../../core/command";
import { handle } from "../../core/handler-decorator";
import { CreateItemCommand } from "./create-item";


@injectable()
@handle(CreateItemCommand)
export class UpdateItem implements AsyncCommandHandler<UpdateItemCommand> {

    constructor(private itemRepository: ItemRepository) {
    }

    async handle(request: UpdateItemCommand): Promise<void> {
        const item = await this.itemRepository.get(request.id);
        Object.assign(item, request);
        await this.itemRepository.update(item);
    }

}


export class UpdateItemCommand extends Command {
    id: string;
    firstName: string;
    lastName: string;
    mothersLastName: string;
    rfc: string;
}
