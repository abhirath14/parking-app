const sequelize = require('../utils/database.js');
const Sequelize = require('sequelize');

const UserSlot = sequelize.define('user_slots', {
  slot_no: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  start_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    required: true
  },
  end_time: {
    type: Sequelize.DATE,
    required: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    required: true
  }
});
module.exports = UserSlot;