require('dotenv').config();
const mongoose = require('mongoose');

const dbParams = {
  dbURL: process.env.DB_URL,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  sessionSecret: process.env.SESSION_KEY,
};
const { dbURL, dbPort, dbName, sessionSecret } = dbParams;

mongoose.connect(`mongodb://${dbURL}:${dbPort}/${dbName}`);
mongoose.Promise = global.Promise;
