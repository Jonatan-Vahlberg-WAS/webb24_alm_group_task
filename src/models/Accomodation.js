const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Accomodation = sequelize.define('Accomodation', {
  adress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  land: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postnummer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hyra: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rum: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

module.exports = Accomodation;
