import { Configuration } from "../../entities/configuration";

export abstract class ConfigurationRepository {
    abstract get(): Promise<Configuration>;
    abstract update(configuration: Configuration): Promise<void>;
}
