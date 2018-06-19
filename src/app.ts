import * as express from 'express';
import { buildSchema } from 'graphql';
import * as graphqlHTTP from 'express-graphql';
import graphqlSchema from './api/schema/schema.graphql';
import { RootApi } from './api/root-api';
import { container } from './inversify.config';
import * as mongoose from 'mongoose';
import { CustomerApi } from './api/customer-api';
import { ItemApi } from './api/item-api';
import { ConfigurationApi } from './api/configuration-api';
import { SaleApi } from './api/sale-api';

const connectionString = process.env.MONGO_URI || 'mongodb://localhost/vendimia';
mongoose.connect(connectionString);

const app = express();

const schema = buildSchema(graphqlSchema);
applyMixins(RootApi, [CustomerApi, ItemApi, ConfigurationApi, SaleApi]);

const rootValue = container.resolve(RootApi);


app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

app.get('/', (req, res) => {
  res.send('server running');
});

export default app;

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}
