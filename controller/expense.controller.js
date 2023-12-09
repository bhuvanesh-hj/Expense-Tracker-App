const Expense = require("../models/expense.model");
const User = require("../models/user.model");
const sequelize = require("../utils/database");
const DownloadExpenses = require("../models/downloadedexpense.model");
const S3Services = require("../services/S3services");

exports.downloadExpense = async (req, res) => {
  try {
    const expenses = await req.user.getExpenses();
    const stringifiedExpenses = JSON.stringify(expenses);
    const userId = req.user.id;
    const fileName = `Expense${userId}/${new Date()}.txt`;
    const fileURL = await S3Services.uploadToS3(stringifiedExpenses, fileName);
    console.log(fileURL);
    await req.user.createDownloadedExpense({ fileUrl:fileURL });
    res.status(200).json({ success: true, fileURL });
  } catch (error) {
    console.log("Error in download expense", error);
    res.status(500).json({ success: false, error });
  }
};

exports.downloadedExpense = async (req, res) => {
  try {
    const downloadedExpenses = await req.user.getDownloadedExpenses();
    res.status(200).json({ success: true, downloadedExpenses });
  } catch (error) {
    console.log("Error in downloaded expenses ", error);
    res.status(500).json({ success: false, error });
  }
};

exports.postExpense = async (req, res, next) => {
  const transac = await sequelize.transaction();

  try {
    const { amount, description, category, date } = req.body;
    const userId = req.user.id;
    if (
      amount == undefined ||
      description == undefined ||
      category == undefined ||
      date == undefined
    ) {
      throw new Error({ status: 400, message: "Please fill the form." });
    }

    const response = await Expense.create(
      {
        amount,
        description,
        category,
        date,
        userId,
      },
      { transaction: transac }
    );

    const totalExpenses = +req.user.totalExpenses + +amount;

    // console.log(totalExpenses);

    await User.update(
      { totalExpenses: totalExpenses },
      { where: { id: req.user.id }, transaction: transac }
    );
    await transac.commit();
    res
      .status(200)
      .json({ message: "Successfully added the expense.", response });
  } catch (error) {
    await transac.rollback();
    res.status(error.status || 500).json({
      message: error.message || "Something went wrong while adding expense..",
    });
  }
};

exports.getExpense = async (req, res, next) => {
  try {
    const response = await Expense.findAll({ where: { userId: req.user.id } });
    const userResponse = await User.findOne({ where: { id: req.user.id } });

    res.status(200).json({
      expense: response,
      user: userResponse.isPremiumMember,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error, success: false });
  }
};

exports.deleteExpense = async (req, res, next) => {
  const transac = await sequelize.transaction();

  try {
    const expenseId = req.params.expenseId;

    const deletedExpense = await Expense.findOne({
      where: { id: expenseId },
    });

    if (!deletedExpense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found!" });
    }

    await Expense.destroy({
      where: { id: expenseId },
      transaction: transac,
    });

    const updatedTotalExpenses =
      +req.user.totalExpenses - +deletedExpense.dataValues.amount;

    await User.update(
      { totalExpenses: updatedTotalExpenses },
      { where: { id: req.user.id }, transaction: transac }
    );

    await transac.commit();

    res.status(200).json({ message: "Deleted successfully", success: true });
  } catch (error) {
    await transac.rollback();
    res.status(500).json({ message: "error occurs", success: false });
  }
};
