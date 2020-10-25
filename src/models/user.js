const sequelize = require('../utils/database.js');
const Sequelize = require('sequelize');

const User = sequelize.define('user', {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    required: true,
    allowNull: false
  },
  designation: {
    type: Sequelize.ENUM('USER', 'MANAGER'),
    required: true,
    allowNull: false,
  }
});
module.exports = User;