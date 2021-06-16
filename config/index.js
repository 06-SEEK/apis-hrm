require('dotenv').config();

const mongoUrl =
  process.env.NODE_ENV === 'test'
    ? 'mongodb://localhost:27017/test'
    : process.env.MONGO_URL ||
      'mongodb+srv://dbadmin:dbpassword@cluster0.c9agf.mongodb.net/hrmdb?retryWrites=true&w=majority';

module.exports = {
  port: process.env.PORT || 3000,
  mongoURL: mongoUrl,
  secret_key: 'hrm',
  sk_time_life: 2678400,
};
