const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Update your User model to include a method for generating a JWT token
User.prototype.generateAuthToken = function () {
  const token = jwt.sign({ id: this.id }, secretKey, {
    expiresIn: '1h', // Adjust the expiration time as needed
  });
  return token;
};

User.beforeCreate(async (user) => {
  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

module.exports = User;
