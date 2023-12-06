const Expense = require("../models/expense.model");

exports.postExpense = async (req, res, next) => {
  try {
    const { amount, description, category } = req.body;
    const userId = req.user.id;
    if (
      amount == undefined ||
      description == undefined ||
      category == undefined
    ) {
      throw new Error({ status: 400, message: "Please fill the form." });
    }

    const response = await Expense.create({
      amount,
      description,
      category,
      userId,
    });

    res
      .status(200)
      .json({ message: "Successfully added the expense.", response });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Something went wrong while adding expense..",
    });
  }
};

exports.getExpense = async (req, res, next) => {
  try {
    const response = await Expense.findAll({ where: { userId: req.user.id } });

    res.status(200).json({ response, success: true });
  } catch (error) {
    res.status(500).json({ error: error, success: false });
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const expenseId = req.params.expenseId;

    const response = await Expense.destroy({ where: { id: expenseId } });

    res.status(200).json({ message: "Deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "error occurs", success: false });
  }
};
