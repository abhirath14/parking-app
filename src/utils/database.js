const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const sequelize = new Sequelize('parking', process.env.DB_USERNAME, process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: 'localhost'
  }
);
module.exports = sequelize;
