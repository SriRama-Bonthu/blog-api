const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Author = sequelize.define('Author', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,          // PK
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,             // required
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,                 // unique email
    validate: {
      isEmail: true,              // must be a valid email
    },
  },
}, {
  tableName: 'authors',
  timestamps: true,               // createdAt, updatedAt
});

module.exports = Author;
