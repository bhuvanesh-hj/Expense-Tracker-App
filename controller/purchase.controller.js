const Order = require("../models/order.model");
const Razorpay = require("razorpay");

exports.purchasePremium = (req, res, next) => {
  try {
    const razorPY = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const amount = 2200;

    razorPY.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      req.user
        .createOrder({ orderid: order.id, status: "PENDING" })
        .then(() => {
          return res.status(201).json({ order, key_id: razorPY.key_id });
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  } catch (error) {
    console.log("Error in purchase premium", error);
    res.status(401).json({ message: "Something went wrong", error: err });
  }
};

exports.updateTransactionStatus = async (req, res, next) => {
  const { payment_id, order_id } = req.body;

  try {
    const order = await Order.findOne({ where: { orderid: order_id } });

    if (!payment_id) {
      order.update({ status: "FAILED" }).then(() => {
        return res.status(203).json({ success: true, message: "Transaction failed!" });
      });
    }else {
    const Promise1 = order.update({
      paymentid: payment_id,
      status: "SUCCESSFUL",
    });

    const Promise2 = req.user.update({ isPremiumMember: true });

    Promise.all([Promise1, Promise2])
      .then(() => {
        return res
          .status(202)
          .json({ success: true, message: "Transaction successful" });
      })
      .catch((err) => {
        throw new Error(err);
      });

    // Order.findOne({ where: { orderid: order_id } })
    //   .then((order) => {
    //     order
    //       .update({ paymentid: payment_id, status: "SUCCESSFUL" })
    //       .then(() => {
    //         req.user
    //           .update({ isPremiumMember: true })
    //           .then(() => {
    //             return res
    //               .status(202)
    //               .json({ success: true, message: "Transaction successful" });
    //           })
    //           .catch((err) => {
    //             throw new Error(err);
    //           });
    //       })
    //       .catch((err) => {
    //         throw new Error(err);
    //       });
    //   })
    //   .catch((err) => {
    //     throw new Error(err);
    //   });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      message: "Something went wrong while updating the transaction!",
      error: error.err,
    });
  }
};
