import { Configuration } from "../../domain/entities/configuration";
import { injectable } from "inversify";
import { ConfigurationModel } from "../models/configuration.model";
import { ConfigurationRepository } from "../../domain/contracts/repositories/configuration-repository";

@injectable()
export class MongoConfigurationRepository implements ConfigurationRepository {
    get(): Promise<Configuration> {
        return ConfigurationModel.findOne().exec().then(c => c || {});
    }

    async update(configuration: Configuration): Promise<void> {
        const count = await ConfigurationModel.count({}).exec();
        if (count > 0) {
            return ConfigurationModel.findOneAndUpdate({}, configuration).then(() => null);
        } else {
            return ConfigurationModel.create(configuration).then(() => null);
        }

    }
}
