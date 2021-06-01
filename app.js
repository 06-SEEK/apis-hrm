const express = require('express');
const logger = require('morgan');
const DB = require('./db');

const app = express();
const config = require('./config');
const { errorHandler, notFound, converter } = require('./util');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to Database
DB(config.mongoURL)
  .then(() => console.log('MongoDb connected'))
  .catch((e) => console.log(e));

// test server
app.get('/', (req, res) => {
  res.json(`I am using port:${config.port}`);
});

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

app.listen(config.port, () =>
  console.log(`Server is listening at port ${config.port}`)
);
