import { Query } from "./query";
import { AsyncHandler } from "./async-handler";

export interface AsyncQueryHandler<TRequest extends Query<TResponse>, TResponse>
    extends AsyncHandler<TRequest, TResponse> {
    handle(query: TRequest): Promise<TResponse>;
}
