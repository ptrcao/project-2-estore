
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
// require('dotenv').config({ path: '../.env' });

const Sequelize = require('sequelize');

// Create a connection object
const sequelize = new Sequelize(
  // Database name
  process.env.DB_NAME,
  // 'estore_db',
  // User
  process.env.DB_USER,
  // 'root',
  // Password
  process.env.DB_PASSWORD,
  // '',
  {
    // Database location
    host: 'localhost',
    dialect: 'mysql',
    port: process.env.PORT
  }
);

// console.log(process.env.DB_NAME)
// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASSWORD)
// console.log(process.env.PORT)

module.exports = sequelize;
