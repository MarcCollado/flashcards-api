require('dotenv').config();

module.exports = {
  // MongoDB
  dbUrl: process.env.DB_URL,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  sessionSecret: process.env.SESSION_KEY,
};
