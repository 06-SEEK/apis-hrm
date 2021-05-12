const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const userRoutes = require("./routes/user.router");
const historyRoutes = require("./routes/history.router");
const DB = require("./db");
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
  res.json("hello world");
});

app.use("/user", userRoutes);
app.use("/history", historyRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
const startSever = async () => {
  app.listen(port, async () => {
    console.log(`QLBH API is running on port ${port} http://localhost:${port}`);
  });
};
startSever();

// module.exports = app;

//Connect to Database
DB().then(() => {
  console.log("MongoDb connected");
});