const DataTypes = require('sequelize');
const sequelize = require('../db');

const userModel = sequelize.define(
  'users',

  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: DataTypes.CHAR,
    password: DataTypes.CHAR,
    name: DataTypes.STRING,
  },

  {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  },
);

module.exports = userModel;
