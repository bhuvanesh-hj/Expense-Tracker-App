const express = require("express");

const router = express.Router();

const expenseController = require("../controller/expense");

router.get("/", (req, res) => {
  res.sendFile("expense.html", { root: "views" });
});

router.post("/addExpense", expenseController.postExpense);

router.get("/getExpense", expenseController.getExpense);

router.delete("/deleteExpense/:expenseId", expenseController.deleteExpense);

module.exports = router;
