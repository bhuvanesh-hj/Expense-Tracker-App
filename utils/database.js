const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "expense",
  "root",
  process.env.DATABASE_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.HOST,
  }
);

module.exports = sequelize;
