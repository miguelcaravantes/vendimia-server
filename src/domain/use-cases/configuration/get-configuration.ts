import { injectable } from "inversify";
import { Configuration } from "../../entities/configuration";
import { ConfigurationRepository } from "../../contracts/repositories/configuration-repository";
import { AsyncQueryHandler } from "../../core/query-handler";
import { Query } from "../../core/query";
import { handle } from "../../core/handler-decorator";

export class GetConfigurationQuery extends Query<Configuration>
{

}

@injectable()
@handle(GetConfigurationQuery)
export class GetConfiguration implements AsyncQueryHandler<GetConfigurationQuery, Configuration> {

    constructor(private configurationRepository: ConfigurationRepository) {
    }

    handle(): Promise<Configuration> {
        return this.configurationRepository.get();
    }

}


