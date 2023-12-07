const { Sequelize } = require("sequelize");

const sequelize = require("../utils/database");

const forgotPasswordRequests = sequelize.define("forgotpassword", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  userid: {
    type: Sequelize.INTEGER,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = forgotPasswordRequests;
