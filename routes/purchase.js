const router = require("express").Router();

const authentication = require("../middleware/authentication");
const purchaseController = require("../controller/purchase.controller");

router.get(
  "/premiumMembership",
  authentication.authenticate,
  purchaseController.purchasePremium
);

router.post(
  "/updateTransactionStatus",
  authentication.authenticate,
  purchaseController.updateTransactionStatus
);

module.exports = router;
