const router = require("express").Router();
const forgotPasswordController = require("../controller/forgotPassword.controller");

router.post("/forgotpassword", forgotPasswordController.forgotPassword);

module.exports = router;
