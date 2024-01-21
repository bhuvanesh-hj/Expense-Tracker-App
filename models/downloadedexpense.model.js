const mongoose = require("mongoose");

const downloadedExpensesSchema = new mongoose.Schema(
  {
    fileUrl: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DownloadedExpenses", downloadedExpensesSchema);

// const { Sequelize } = require("sequelize");
// const sequelize = require("../utils/database");

// const DownloadedExpenses = sequelize.define("downloadedExpenses", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   fileUrl: Sequelize.STRING,
// });

// module.exports = DownloadedExpenses;
