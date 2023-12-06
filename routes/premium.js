const router = require("express").Router();

const authentication = require("../middleware/authentication");
const premiumController = require("../controller/premium.controller");

router.get(
  "/leaderBoard",
  authentication.authenticate,
  premiumController.showLeaderBoard
);

module.exports = router;
