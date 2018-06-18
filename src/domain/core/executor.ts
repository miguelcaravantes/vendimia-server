import { Command } from "./command";
import { Query } from "./query";
import { injectable, Container } from "inversify";
import { AsyncCommandHandler } from "./command-handler";
import { AsyncQueryHandler } from "./query-handler";
import { AsyncHandler } from "./async-handler";
import { handlers as defaultHandlers } from './handler-decorator';

@injectable()
export class Executor {
    private handlers: Array<{
        requestType: TypeRequest,
        handlerType: TypeHandler<AsyncHandler<any, any>>
    }> = [];

    constructor(private container: Container) {
        this.handlers = defaultHandlers.slice();
    }
    handle<TResponse = any>(request: Command | Query<any>): Promise<TResponse> {
        const handlerType = this.handlers.find(i => request instanceof i.requestType).handlerType;
        const handler = this.container.get(handlerType);
        return handler.handle(request);
    }
}

export interface TypeHandler<T extends AsyncCommandHandler<any> | AsyncQueryHandler<any, any>> extends Function {
    new(...args: any[]): T;
}

export interface TypeRequest<T = Command | Query<any>> extends Function {
    new(...args: any[]): T;
}
