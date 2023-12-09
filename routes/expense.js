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

router.get("/leaderBoard", (req, res) => {
  res.sendFile("leaderBoard.html", { root: "views" });
});

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

router.get(
  "/download",
  authentication.authenticate,
  expenseController.downloadExpense
);
router.get(
  "/downloaded-expenses",
  authentication.authenticate,
  expenseController.downloadedExpense
);

module.exports = router;
