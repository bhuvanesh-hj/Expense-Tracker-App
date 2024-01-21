const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isPremiumMember: {
    type: Boolean,
    default: false,
  },
  totalExpenses: {
    type: Number,
  },
});

module.exports = mongoose.model("Users", userSchema);

// const { Sequelize } = require("sequelize");

// const sequelize = require("../utils/database");

// const Users = sequelize.define("users", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   username: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   isPremiumMember: Sequelize.BOOLEAN,
//   totalExpenses: Sequelize.INTEGER,
// });

// module.exports = Users;
