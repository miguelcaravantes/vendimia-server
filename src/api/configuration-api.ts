import { container } from '../inversify.config';
import { Configuration } from '../domain/entities/configuration';
import { GetConfigurationQuery } from '../domain/use-cases/configuration/get-configuration';
import { RootApi } from './root-api';
import { UpdateConfigurationCommand } from '../domain/use-cases/configuration/update-configuration';

export class ConfigurationApi extends RootApi {

    configuration({ id }: { id: string }): Promise<Configuration> {
        const query = new GetConfigurationQuery();
        return this.executor.handle(query);
    }
    updateConfiguration({ id, configuration }: any): Promise<void> {
        const command = new UpdateConfigurationCommand();
        Object.assign(command, configuration);
        return this.executor.handle(command);
    }

}
