require('dotenv').config();
const mongoose = require('mongoose');

const dbParams = {
  dbURL: process.env.DB_URL,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
};
const { dbURL, dbPort, dbName, dbUser, dbPassword } = dbParams;

mongoose.connect(`mongodb://${dbUser}:${dbPassword}@${dbURL}:${dbPort}/${dbName}`);
mongoose.Promise = global.Promise;
