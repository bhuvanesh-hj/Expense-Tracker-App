const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");

const DownloadedExpenses = sequelize.define("downloadedExpenses", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fileUrl: Sequelize.STRING,
});

module.exports = DownloadedExpenses;
