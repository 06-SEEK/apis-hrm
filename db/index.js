// connection database

const mongoose = require("mongoose");

const connectDb = (uri) => {
  return mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
};

module.exports = connectDb;
