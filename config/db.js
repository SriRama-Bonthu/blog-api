const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("blog_api_db", "root", "Sriramcse@123", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});

module.exports = sequelize;
