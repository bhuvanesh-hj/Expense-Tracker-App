const Expenses = require("../models/expense.model");
const { Op } = require("sequelize");

exports.getReports = (req, res) => {
  try {
    res.sendFile("reports.html", { root: "views" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Not found!", success: false });
  }
};

exports.dailyReports = async (req, res) => {
  try {
    const { date } = req.body;
    const userId = req.user.id;
    const response = await Expenses.findAll({ where: { date, userId } });

    response.length > 0
      ? res.status(200).json({ success: true, response })
      : res.status(201).json({ success: true, message: "No Expenses found!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.monthlyReports = async (req, res) => {
  try {
    const { month } = req.body;
    const userId = req.user.id;

    const response = await Expenses.findAll({
      where: {
        date: {
          [Op.like]: `%-${month}%`,
        },
        userId,
      },
      raw: true,
    });

    response.length > 0
      ? res.status(200).json({ success: true, response })
      : res.status(201).json({ success: true, message: "No Expenses found!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
