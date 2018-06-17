import { TypeHandler, TypeRequest } from "./executor";
import { AsyncHandler } from "./async-handler";

const handlers: Array<{
    requestType: TypeRequest,
    handlerType: TypeHandler<AsyncHandler<any, any>>
}> = [];

export function handle(
    handleFor: TypeRequest
) {
    return (target: any) => {
        handlers.push({ requestType: handleFor, handlerType: target });
    };
}

export { handlers }