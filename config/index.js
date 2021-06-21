require('dotenv').config();

const mongoUrl =
  process.env.NODE_ENV === 'test' ? process.env.DB_TEST : process.env.DB_URL;

module.exports = {
  port: process.env.PORT || 3000,
  mongoURL: mongoUrl,
  secret_key: 'hrm',
  sk_time_life: 2678400,
};
