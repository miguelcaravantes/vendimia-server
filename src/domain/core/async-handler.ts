export interface AsyncHandler<TRequest, TResponse = void> {
    handle(request: TRequest): Promise<TResponse>;
}
