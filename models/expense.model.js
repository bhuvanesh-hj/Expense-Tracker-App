const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

module.exports = mongoose.model("Expenses", expenseSchema);

// const { Sequelize } = require("sequelize");

// const sequelize = require("../utils/database");

// const Expense = sequelize.define("expense", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   date: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   amount: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   category: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// module.exports = Expense;
