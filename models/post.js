const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,          // PK
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,             // required
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  authorId: {                     // foreign key → authors.id
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'posts',
  timestamps: true,
});

module.exports = Post;
