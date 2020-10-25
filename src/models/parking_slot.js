const sequelize = require('../utils/database.js');
const Sequelize = require('sequelize');

const ParkingSlot = sequelize.define('parking_slots', {
  slot_no: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('PARKED', 'VACANT', 'UNDER_MAINTENANCE'),
    required: true,
    allowNull: false
  }
});
module.exports = ParkingSlot;