import { injectable } from "inversify";
import { ItemRepository } from "../../contracts/repositories/item-repository";
import { AsyncCommandHandler } from "../../core/command-handler";
import { Command } from "../../core/command";
import { handle } from "../../core/handler-decorator";



export class DeleteItemCommand extends Command {
    constructor(public id: string) {
        super();
    }
}

@injectable()
@handle(DeleteItemCommand)
export class DeleteItem implements AsyncCommandHandler<DeleteItemCommand> {

    constructor(private itemRepository: ItemRepository) {
    }

    handle(command: DeleteItemCommand): Promise<void> {
        return this.itemRepository.delete(command.id);
    }

}

