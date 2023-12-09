const { Sequelize } = require("sequelize");

const sequelize = require("../utils/database");

const forgotPasswordRequests = sequelize.define("forgotpasswords", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  isActive: Sequelize.BOOLEAN,
});

module.exports = forgotPasswordRequests;
