import { Container } from 'inversify';
import { RootApi } from './api/root-api';
import { CustomerRepository } from './domain/contracts/repositories/customer-repository';
import { MongoCustomerRepository } from './data/repositories/mongo-customer-repository';

import { ItemRepository } from './domain/contracts/repositories/item-repository';
import { MongoItemRepository } from './data/repositories/mongo-item-repository';
import { ConfigurationRepository } from './domain/contracts/repositories/configuration-repository';
import { MongoConfigurationRepository } from './data/repositories/mongo-configuration-repository';
import { Executor } from './domain/core/executor';
import { SaleCalculator } from './domain/services/sale-calculator';

const container = new Container({ autoBindInjectable: true });

container.bind<Executor>(Executor).toSelf().inSingletonScope();
container.bind<RootApi>(RootApi).toSelf();
container.bind<SaleCalculator>(SaleCalculator).toSelf();
container.bind<CustomerRepository>(CustomerRepository).to(MongoCustomerRepository);
container.bind<ItemRepository>(ItemRepository).to(MongoItemRepository);
container.bind<ConfigurationRepository>(ConfigurationRepository).to(MongoConfigurationRepository);

container.bind<Container>(Container).toConstantValue(container);
export { container };
