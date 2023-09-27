const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user'); 

const Expense = sequelize.define('expense', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Expense.belongsTo(User); // Establish the relationship

module.exports = Expense;
