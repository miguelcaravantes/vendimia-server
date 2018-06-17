import { injectable, Container } from "inversify";
import { Executor } from "../domain/core/executor";

@injectable()
export class RootApi {
    constructor(protected executor: Executor) {
    }
}
