require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongoURL:
    process.env.MONGO_URL ||
    'mongodb+srv://dbadmin:dbpassword@cluster0.c9agf.mongodb.net/hrmdb?retryWrites=true&w=majority',
  secret_key: 'hrm',
  sk_time_life: 2678400,
};
