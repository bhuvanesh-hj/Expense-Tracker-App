const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.authenticate = (req, res, next) => {
  try {
    const token = req.header("Authentication");
    const userId = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(userId);
    User.findByPk(userId.userId)
      .then((user) => {
        // console.log(user);
        req.user = user;
        next();
      })
      .catch((err) => {
        throw new Error("Authentication failed!!");
      });
  } catch (error) {
    // console.log(error);
    res.status(401).json({ success: false, message: error.message });
    // res.sendFile("userActions.html", { root: "views" });
    // res.status(404).send(`<h1>404 Not found! <a href="/">got to sig-in page</a></h1>`)
  }
};
