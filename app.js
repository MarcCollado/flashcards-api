require('./config/db.js');
const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
// GraphQL
const graphqlHTTP = require('express-graphql');
const { schema } = require('./api/schema');
// Express
const app = express();
app.get('/favicon.ico', (req, res) => res.status(204));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  '/graphql',
  graphqlHTTP((req) => ({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })),
);

app.use(
  '/3p7rp6g1zd3ct2oa7v8h',
  graphqlHTTP((req) => ({
    schema,
    graphiql: true,
  })),
);

app.listen(process.env.PORT || 4000);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
