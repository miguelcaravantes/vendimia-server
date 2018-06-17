import { injectable } from "inversify";
import { ConfigurationRepository } from "../../contracts/repositories/configuration-repository";
import { AsyncCommandHandler } from "../../core/command-handler";
import { Command } from "../../core/command";
import { handle } from "../../core/handler-decorator";


export class UpdateConfigurationCommand extends Command {
    financeRate: number;
    downPayment: number;
    deadline: number;
}

@injectable()
@handle(UpdateConfigurationCommand)
export class UpdateConfiguration implements AsyncCommandHandler<UpdateConfigurationCommand> {

    constructor(private configurationRepository: ConfigurationRepository) {
    }

    handle(configuration: UpdateConfigurationCommand): Promise<void> {
        return this.configurationRepository.update(configuration);
    }

}
