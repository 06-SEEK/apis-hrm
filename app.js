const express = require('express');
const logger = require('morgan');
const { ApolloServer } = require('apollo-server-express');
const DB = require('./db');

const app = express();
const config = require('./config');
const { errorHandler, notFound, converter } = require('./util');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const auth = require('./util/auth');
const dateScalar = require('./resolvers/date');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to Database
DB(config.mongoURL)
  .then(() => console.log('MongoDb connected'))
  .catch((e) => console.log(e));

app.get('/', (req, res) => res.send(`Hello: ${process.env.MSG}`));
// // mount api routes
// app.use('/api', require('./routes'));

// if error is not an instanceOf APIError, convert it.
// app.use(converter);

// // catch 404 and forward to error handler
// app.use(notFound);

// // error handlers
// app.use((err, req, res, next) => {
//   errorHandler(err, req, res, next);
// });

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Date: dateScalar,
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    ...resolvers,
  },
  context: async ({ req }) => {
    const { isAuth, user } = await auth(req);
    return { isAuth, user };
  },
  playground: true,
  introspection: true,
});

server.applyMiddleware({ app });

app.listen(config.port, () =>
  console.log(`Server is listening at port ${config.port}`)
);
