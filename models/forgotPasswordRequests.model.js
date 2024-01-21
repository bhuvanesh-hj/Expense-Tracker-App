const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema({
  isActive: Boolean,
  id: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

module.exports = mongoose.model("ForgotPassword", forgotPasswordSchema);

// const { Sequelize } = require("sequelize");

// const sequelize = require("../utils/database");

// const forgotPasswordRequests = sequelize.define("forgotpasswords", {
//   id: {
//     type: Sequelize.UUID,
//     defaultValue: Sequelize.UUIDV4,
//     allowNull: false,
//     primaryKey: true,
//   },
//   isActive: Sequelize.BOOLEAN,
// });

// module.exports = forgotPasswordRequests;
