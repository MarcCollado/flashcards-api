const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');

// mongoose
const mongoose = require('mongoose');
// config file to set db paths
const { dbUrl, dbPort, dbName, sessionSecret } = require('./config');
// connect to the database using mongoose
mongoose.connect(`mongodb://${dbUrl}:${dbPort}/${dbName}`);
mongoose.Promise = global.Promise;

// require all the routes
const index = require('./routes/index.js');

// express
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', index);

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

module.exports = app;
