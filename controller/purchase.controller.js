const Order = require("../models/order.model");
const Razorpay = require("razorpay");
const jwt = require("jsonwebtoken");

const generateAccessToken = (id, isPremiumMember) => {
  return jwt.sign(
    { userId: id, isPremiumMember: isPremiumMember },
    process.env.SECRET_KEY
  );
};

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
      Order.create({ orderId: order.id, status: "PENDING", userId: req.user })
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
    const order = await Order.findOne({ orderId: order_id });
    // console.log(order);
    if (!payment_id) {
      order.status = "FAILED";
      await order.save();
      return res
        .status(203)
        .json({ success: true, message: "Transaction failed!" });
    } else {
      // const Promise1 = order.updateOne({
      //   paymentId: payment_id,
      //   status: "SUCCESSFUL",
      // });
      order.paymentId = payment_id;
      order.status = "SUCCESSFUL";
      req.user.isPremiumMember = true;

      // const Promise2 = req.user.updateOne({ isPremiumMember: true });

      const userId = req.user._id;

      Promise.all([order.save(), req.user.save()])
        .then(() => {
          return res.status(202).json({
            success: true,
            message: "Transaction successful",
            token: generateAccessToken(userId, true),
          });
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
