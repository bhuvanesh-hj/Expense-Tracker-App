const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: String,
  paymentId: String,
  status: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);

// const { Sequelize } = require("sequelize");
// const sequelize = require("../utils/database");

// const Order = sequelize.define("order", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   paymentid: Sequelize.STRING,

//   orderid: Sequelize.STRING,

//   status: Sequelize.STRING,
// });

// module.exports = Order;
