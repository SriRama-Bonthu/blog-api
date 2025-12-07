const sequelize = require('../config/db');
const Author = require('./author');
const Post = require('./post');

// One Author → many Posts
Author.hasMany(Post, {
  foreignKey: 'authorId',
  as: 'posts',
  onDelete: 'CASCADE',   // when Author deleted → delete posts
  hooks: true,
});

// Each Post belongs to one Author
Post.belongsTo(Author, {
  foreignKey: 'authorId',
  as: 'author',
});

const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connection OK');

    // create/update tables and constraints
    await sequelize.sync({ alter: true });
    console.log('✅ Models synchronized');
  } catch (err) {
    console.error('❌ DB error:', err);
  }
};

module.exports = {
  sequelize,
  Author,
  Post,
  initDB,
};
