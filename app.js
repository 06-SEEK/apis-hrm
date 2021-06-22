const express = require('express');
const DB = require('./db');

const app = express();
const config = require('./config');
const { errorHandler, notFound, converter } = require('./util');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to Database
DB(config.mongoURL)
  .then(() => console.log('MongoDb connected'))
  .catch((e) => console.log(e));

app.get('/', (req, res) => res.send(`Hello world`));
// mount api routes
app.use('/api', require('./routes'));

// if error is not an instanceOf APIError, convert it.
app.use(converter);

// catch 404 and forward to error handler
app.use(notFound);

// error handlers
app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

// server.applyMiddleware({ app });
module.exports = app;
