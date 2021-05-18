// connection database
const mongoose = require('mongoose');

const connectDb = (uri) =>
  mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });

module.exports = connectDb;
