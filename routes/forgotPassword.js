const router = require("express").Router();
const forgotPasswordController = require("../controller/forgotPassword.controller");

router.use("/forgotpassword", forgotPasswordController.forgotPassword);

router.get("/resetpassword/:id", forgotPasswordController.resetPassword);

router.post("/updatepassword/:id", forgotPasswordController.updatePassword);

module.exports = router;
