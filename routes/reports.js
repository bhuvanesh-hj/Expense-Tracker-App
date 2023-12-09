const router = require("express").Router();
const authentication = require("../middleware/authentication");
const reportsController = require("../controller/reports.controller");

router.get("/getReports", reportsController.getReports);

router.post("/dailyReports", authentication.authenticate, reportsController.dailyReports);

router.post("/monthlyReports", authentication.authenticate, reportsController.monthlyReports);

module.exports = router;