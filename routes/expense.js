const express = require("express");

const router = express.Router();

const expenseController = require("../controller/expense.controller");
const authentication = require("../middleware/authentication");

router.get("/", (req, res) => {
  res.sendFile("expense.html", { root: "views" });
});

router.post(
  "/addExpense",
  authentication.authenticate,
  expenseController.postExpense
);

router.get(
  "/getExpense",
  authentication.authenticate,
  expenseController.getExpense
);

router.delete(
  "/deleteExpense/:expenseId",
  authentication.authenticate,
  expenseController.deleteExpense
);

module.exports = router;
