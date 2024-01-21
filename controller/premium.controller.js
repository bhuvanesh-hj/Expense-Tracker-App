const Expense = require("../models/expense.model");
const User = require("../models/user.model");
const sequelize = require("../utils/database");

exports.showLeaderBoard = async (req, res, next) => {
  try {
    // const expensesList = await User.findAll({
    //   // attributes: [
    //   //   "id",
    //   //   "username",
    //   //   [sequelize.fn("sum", sequelize.col("expenses.amount")), "total_amount"],
    //   // ],
    //   // include: [
    //   //   {
    //   //     model: Expense,
    //   //     attributes: [],
    //   //   },
    //   // ],
    //   // group: ["id"],
    //   order: [["totalExpenses", "DESC"]],
    // });
    const expensesList = await User.find().sort({ totalExpenses: -1 });
    res.status(200).json({ expensesList });
  } catch (error) {
    console.log("leaderBoard error", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
