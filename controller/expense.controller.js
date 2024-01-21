const Expense = require("../models/expense.model");
const User = require("../models/user.model");
// const sequelize = require("../utils/database");
const DownloadedExpenses = require("../models/downloadedexpense.model");
const S3Services = require("../services/S3services");
const mongoose = require("mongoose");

exports.downloadExpense = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id });
    const stringifiedExpenses = JSON.stringify(expenses);
    const userId = req.user._id;
    const fileName = `Expense${userId}/${new Date()}.txt`;
    const fileURL = await S3Services.uploadToS3(stringifiedExpenses, fileName);
    // console.log(fileURL);
    await DownloadedExpenses.create({ fileUrl: fileURL, userId: req.user });
    res.status(200).json({ success: true, fileURL });
  } catch (error) {
    console.log("Error in download expense", error);
    res.status(500).json({ success: false, error });
  }
};

exports.downloadedExpense = async (req, res) => {
  try {
    const downloadedExpenses = await DownloadedExpenses.find({
      userId: req.user._id,
    });
    // console.log(downloadedExpenses);
    res.status(200).json({ success: true, downloadedExpenses });
  } catch (error) {
    console.log("Error in downloaded expenses ", error);
    res.status(500).json({ success: false, error });
  }
};

exports.postExpense = async (req, res, next) => {
  // const transac = await sequelize.transaction();
  const session = await mongoose.startSession();

  try {
    const { amount, description, category, date } = req.body;
    const userId = req.user;
    // console.log(req.user);
    if (
      amount == undefined ||
      description == undefined ||
      category == undefined ||
      date == undefined
    ) {
      throw new Error({ status: 400, message: "Please fill the form." });
    }

    let response;

    await session.withTransaction(async () => {
      response = await Expense.create(
        [
          {
            amount,
            description,
            category,
            date,
            userId,
          },
        ],
        {
          session: session,
        }
      );

      // await expense.save();

      const totalExpenses = +req.user.totalExpenses + +amount;

      await User.updateOne(
        {
          _id: req.user._id,
        },
        {
          totalExpenses: totalExpenses,
        },
        {
          session: session,
        }
      );
    });

    // const response = new Expense(
    //   {
    //     amount,
    //     description,
    //     category,
    //     date,
    //     userId,
    //   },
    //   { transaction: transac }
    // );

    // const totalExpenses = +req.user.totalExpenses + +amount;

    // console.log(totalExpenses);

    // await User.update(
    //   { totalExpenses: totalExpenses },
    //   { where: { id: req.user.id }, transaction: transac }
    // );
    // await transac.commit();

    await session.endSession();

    // const response = await Expense.find().populate("userId");

    // console.log(response);

    res
      .status(200)
      .json({ message: "Successfully added the expense.", response });
  } catch (error) {
    // await session.abortTransaction();
    await session.endSession();
    res.status(error.status || 500).json({
      message: error.message || "Something went wrong while adding expense..",
    });
  }
};

exports.getExpensesForPagination = async (req, res) => {
  try {
    const pageNo = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const offset = (pageNo - 1) * limit;

    const totalExpenses = await Expense.countDocuments({
      userId: req.user._id,
    });

    const totalPages = Math.ceil(totalExpenses / limit);

    const expenses = await Expense.find({
      userId: req.user._id,
    })
      .skip(offset)
      .limit(limit);
    const userResponse = await User.findOne({ _id: req.user._id });

    res.status(200).json({
      success: true,
      expenses,
      totalPages,
      user: userResponse.isPremiumMember,
    });
  } catch (error) {
    console.log("Error while getting all the expenses", error);
    res.status(500).json({ success: false, message: error });
  }
};

exports.getExpense = async (req, res, next) => {
  try {
    const response = await Expense.find({ userId: req.user._id }).populate(
      "userId"
    );
    const userResponse = await User.findOne({ _id: req.user._id });

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
  // const transac = await sequelize.transaction();
  const session = await mongoose.startSession();

  try {
    const expenseId = req.params.expenseId;

    const deletedExpense = await Expense.findOne({ _id: expenseId });

    // console.log(deletedExpense);

    if (!deletedExpense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found!" });
    }

    await session.withTransaction(async () => {
      await Expense.deleteOne(
        { _id: expenseId },
        {
          session: session,
        }
      );

      // console.log(deletedExpense);

      const updatedTotalExpenses =
        +req.user.totalExpenses - +deletedExpense.amount;

      await User.updateOne(
        { _id: req.user._id },
        {
          totalExpenses: updatedTotalExpenses,
        },
        {
          session: session,
        }
      );
    });

    // await User.update(
    //   { totalExpenses: updatedTotalExpenses },
    //   { where: { id: req.user.id }, transaction: transac }
    // );

    // await transac.commit();

    await session.endSession();

    res.status(200).json({ message: "Deleted successfully", success: true });
  } catch (error) {
    // await transac.rollback();
    await session.endSession();
    res.status(500).json({ message: "error occurs", success: false });
  }
};
