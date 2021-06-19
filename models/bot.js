const DataTypes = require('sequelize');
const sequelize = require('../db');

const botModel = sequelize.define(
  'bots',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    token: DataTypes.CHAR,
    shemeId: DataTypes.INTEGER,
  },

  {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  },
);

module.exports = botModel;
