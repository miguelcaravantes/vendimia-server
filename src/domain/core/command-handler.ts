import { Command } from "./command";
import { AsyncHandler } from "./async-handler";

export interface AsyncCommandHandler<TRequest extends Command> extends AsyncHandler<TRequest> {
    handle(command: TRequest): Promise<void>;
}
